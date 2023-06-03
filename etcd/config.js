import { Etcd3 } from 'etcd3';
import dotenv from 'dotenv';

dotenv.config();

const client = new Etcd3({
    hosts: process.env.ETCD_HOST,
})

const put = async (data) => {
    return new Promise(async (resolve, reject) => {
        await client.put(`nodes/${data.sourceIP}/${data.timestamp}`).value(JSON.stringify(data))
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    })
}

// register watcher
client.watch()
    .prefix('nodes') // 修改為你的JSON資料所在的目錄
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

                if (data.event === 'network_attack') {
                    console.log('Received an attack from: ' + data.sourceIP);
                    // TODO: send back to the sourceIP server and shutdown
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
