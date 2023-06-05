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

then create a file in **/backend** named **.env**
```
PORT=3000
ETCD1_PORT=1
ETCD2_PORT=2
ETCD3_PORT=3
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
