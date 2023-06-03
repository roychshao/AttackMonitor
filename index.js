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

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;


// log to access.log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

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
