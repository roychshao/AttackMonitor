import { URL } from 'url'
import etcd from './../etcd/config.js'

export const transformIP = (port) => {
    switch(port) {
        case "3000":
            return "172.16.238.200";
        case "3001":
            return "172.16.238.201";
        case "3002":
            return "172.16.238.202";
        default:
            return "none";
    }
}

export const monitor = async (req, res, next) => {
    const { data } = req.body;
    const originPort = new URL(req.headers['origin']).port;
    const sourceIP = transformIP(originPort);
    
    /*
     * Need to demo on one node, so use the fake ip,
     * if it can let more nodes to connect, use the real ip
     */
    // var realIP = req.ip;
    // realIP = realIP.split(':').pop();

    console.log("received request from: " + sourceIP);
    console.log(global.bannedIPs);

    if(global.bannedIPs.includes(sourceIP)) {
        res.status(403).send("Access Denied");
    } else {
        res.status(201).send("request is received");
    }
}
