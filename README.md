## AttackMonitor
---
### Intro
> Simulating a condition which a node suffer from attacks and use etcd to store the logs of the node,  
monitoring logs stored in the etcd through etcd watcher to make nodes take actions

### Getting Start
first it need a etcd cluster run on a node, to install etcd, see https://etcd.io/docs/v3.5/install/  
<br/>

then create a file named **.env**
```
PORT=3000
ETCD_HOST="localhost:2379"
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
