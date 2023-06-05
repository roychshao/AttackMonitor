import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

import dataRouter from "./routes/data.js";

import Writer from "./controller/logProcessor.js";

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

app.use(morgan("combined", { stream: accessLogStream }));

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

// TODO: get ip from etcd to persistent the bannedIPs or not to use volume in docker (recommended)
// TODO: make both AP and etcd run on cluster and fix .env.local in /frontend
