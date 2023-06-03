import express from "express";
import { monitor } from "./../controller/data.js";

const router = express.Router();

router.post("/", monitor);

export default router;
