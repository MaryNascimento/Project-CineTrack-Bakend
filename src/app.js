import express from "express";
import connectMongoDB from "./database/mongoDB.js";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

connectMongoDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));
