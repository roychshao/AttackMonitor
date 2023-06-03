import etcd from './../etcd/config.js'

export const monitor = async (req, res, next) => {
    const { data } = req.body;

    await etcd.put(data).then(() => {
        console.log("insert into etcd success");
        res.status(201).send("success");
    }).catch((err) => {
        console.log("err: " + err.message);
        res.status(500).send("err: " + err.message);
    })
}
