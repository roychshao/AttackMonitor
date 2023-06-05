## AttackMonitor
---
### Intro
> Simulating a condition which a node suffer from attacks and use etcd to store the logs of the node,  
monitoring logs stored in the etcd through etcd watcher to make nodes take actions

### Getting Start
etcd is in docker, install docker first and run follow command

```
docker compose up
```

then create a file named **.env**
```
PORT=3000
ETCD1_PORT=1
ETCD2_PORT=2
ETCD3_PORT=3
```

<br/>
Install libraries

```
pnpm i
```

<br/>
Start the server

```
pnpm start
```
