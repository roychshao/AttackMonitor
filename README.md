## AttackMonitor
---
### Intro
> Simulating a condition which a node suffer from attacks and use etcd to store the logs of the node,  
monitoring logs stored in the etcd through etcd watcher to make nodes take actions

### Getting Start

create a file in **/frontend** named **.env.local**
```
VITE_NODE1_URL="http://localhost:3000"
VITE_NODE2_URL="http://localhost:3001"
VITE_NODE3_URL="http://localhost:3002"
```

launch docker
> In the docker cluster, there are three etcd nodes, three application containers and one network container

```
docker compose build
docker compose up
```

open the following url in the browser, each port is mapped to a fake IP address  
> it is because of the need to demostrate this application of three nodes within localhost.

```
http://localhost:3000 -> 172.16.238.200
http://localhost:3001 -> 172.16.238.201
http://localhost:3002 -> 172.16.238.202
```

#### Note
***this application cannot run on one node without docker***
