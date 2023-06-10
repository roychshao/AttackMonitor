import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath, URL } from "url";
import helmet from "helmet";

import dataRouter from "./routes/data.js";

import Writer from "./utils/logProcessor.js";
import { transformIP } from "./utils/mapping.js"

const app = express();
dotenv.config();

// create the black list
global.bannedIPs = [];

const port = process.env.PORT || 8080;


// log to access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

// customized ip address
morgan.token('sourceIP', function (req) {
    if(req.headers['origin']) {
        const originPort = new URL(req.headers['origin']).port;
        const sourceIP = transformIP(originPort);
        return sourceIP;
    } else {
        return '0.0.0.0';
    }
});

morgan.token('targetIP', function (req) {
    if(req.headers['host']) {
        const originPort = req.headers['host'].split(':').pop();
        const sourceIP = transformIP(originPort);
        return sourceIP;
    } else {
        return '0.0.0.0';
    }
});

app.use(
  morgan(
      ':sourceIP -> :targetIP - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream }
  )
);

// frontend file
app.use(express.static(path.join("/AttackMonitor/frontend/dist")));

// watcher access.log
fs.watch('access.log', (eventType, filename) => {
    if (filename === 'access.log' && eventType === 'change') {
        // read the latest log
        const logData = fs.readFileSync('access.log', 'utf8');
        const logs = logData.trim().split('\n');
        const latestLog = logs[logs.length - 1];

        // write th latest log into etcd
        console.log(latestLog);
        Writer(latestLog);
    }
});

// helmet
app.use(helmet());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

// express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/data", dataRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

/*
 * Some Route has risks, like GET /.env, /admin, /database, /backup, /config
 * those Routes can be sensitive to the security of a web application
 */
