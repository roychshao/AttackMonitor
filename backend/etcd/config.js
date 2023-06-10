import { Etcd3 } from 'etcd3';
import dotenv from 'dotenv';
import { transformIP } from "./../utils/mapping.js"

dotenv.config();

const client = new Etcd3({
    hosts: [
        `http://node1:${process.env.ETCD_PORT}`,
        `http://node2:${process.env.ETCD_PORT}`,
        `http://node3:${process.env.ETCD_PORT}`,
    ],
})

const put = async (data) => {
    return new Promise(async (resolve, reject) => {
        const regex = /([\w.:]+) - - \[(.*?)\]/;
        const matches = data.match(regex);
        var sourceIP;
        var timestamp;

        if (matches && matches.length >= 3) {
            sourceIP = matches[1];
            timestamp = matches[2];
        }

        await client.put(`nodes/${sourceIP}/${timestamp}`).value(JSON.stringify(data))
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    })
}

const banIP = (ip) => {
    global.bannedIPs.push(ip);
}

// register watcher
client.watch()
    .prefix('nodes')
    .create()
    .then(watcher => {
        watcher.on('data', res => {
            /* 
             * res.events is a list, it may be more than one event are put into etcd
             */
            if(!res)
                throw new Error("get no data from etcd");

            var key = res.events[0].kv.key;
            var value = res.events[0].kv.value;
            var sourceIP = '0.0.0.0';    // default
            var targetIP = '0.0.0.0';    // default

            key = key.toString('utf-8');
            value = value.toString('utf-8');

            const data = JSON.parse(value);

            if (data.includes('attack')) {
                // find the origin port from value
                const regex = /(\b(?:\d{1,3}\.){3}\d{1,3}\b)/g;
                const match = value.match(regex);
                if(match && match.length >= 2) {
                    sourceIP = match[0];
                    targetIP = match[1];
                } else {
                    console.log('Port not found');
                }

                // ban the sourceIP
                if(transformIP(process.env.PORT) == targetIP && !global.bannedIPs.includes(sourceIP))
                    banIP(sourceIP);
            }
        }).on('error', err => {
                console.error('Error:', err);
            });
    })
    .catch(err => {
        console.error('Error: ' + err.message);
    });

export default { put }
