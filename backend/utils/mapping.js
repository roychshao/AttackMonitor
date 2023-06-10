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
