## AttackMonitor
---
### Intro
> Simulating a condition which a node suffer from attacks and use etcd to store the logs of the node,  
monitoring logs stored in the etcd through etcd watcher to make nodes take actions

### Getting Start
first it need a etcd cluster run on a node, to install etcd, see https://etcd.io/docs/v3.5/install/  
<br/>

then create a file in **/backend** named **.env**
```
PORT=3000
ETCD_HOST="localhost:2379"
```

Still in /backend  
Install libraries

```
pnpm i
```
Start the server

```
pnpm start
```

---

create a file in **/frontend** named **.env.local**
```
VITE_NODE1_URL="http://localhost:3000"   /* for example */
VITE_NODE2_URL="http://localhost:3000"
VITE_NODE3_URL="http://localhost:3000"
```

Install libraries
```
pnpm i
```

start frontend server
```
pnpm run dev
```
