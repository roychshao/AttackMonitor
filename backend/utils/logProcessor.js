import etcd from './../etcd/config.js';

const Writer = async (log) => {
    await etcd.put(log).then(() => {
        console.log("put into etcd successfully");
    }).catch((err) => {
        console.log("err: " + err.message);
    })
}

export default Writer
