import { Etcd3 } from 'etcd3';
import dotenv from 'dotenv';

dotenv.config();

const client = new Etcd3({
    hosts: [
        `http://node1:${process.env.ETCD1_PORT}`,
        `http://node2:${process.env.ETCD2_PORT}`,
        `http://node3:${process.env.ETCD3_PORT}`,
    ],
})

const put = async (data) => {
    return new Promise(async (resolve, reject) => {
        /*
         * If use log insertion, add the following lines
         */
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

            key = key.toString('utf-8');
            value = value.toString('utf-8');
            const data = JSON.parse(value);

            if (data.includes('attack')) {
                console.log('Received an attack on: ' + key);
                // ban the sourceIP
                const regex = /nodes\/([\w:]+)\//;
                const matches = key.match(regex);
                var sourceIP;

                if (matches && matches.length >= 2) {
                    sourceIP = matches[1];
                } else {
                    console.log("err: ipv6 address not matched");
                }
                // if sourceIP not exist in bannedIPs, then add it
                if(!global.bannedIPs.includes(sourceIP))
                    banIP(sourceIP);
            }
        })
            .on('error', err => {
                console.error('Error:', err);
            });
    })
    .catch(err => {
        console.error('Error: ' + err.message);
    });

export default { put }
