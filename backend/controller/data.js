import etcd from './../etcd/config.js'

export const monitor = async (req, res, next) => {
    const { data } = req.body;
    const sourceIP = req.ip;

    console.log(sourceIP);
    console.log(bannedIPs);
    if(global.bannedIPs.includes(sourceIP)) {
        res.status(403).send("Access Denied");
    } else {
        res.status(201).send("request is received");
    }
}
