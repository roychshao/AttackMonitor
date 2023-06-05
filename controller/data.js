import etcd from './../etcd/config.js'

export const monitor = async (req, res, next) => {
    const { data } = req.body;

    // TODO: use the received data to do things more than just watch logs

    res.status(201).send("request is received");
}
