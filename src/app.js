import express from "express";
import connectMongoDB from "./database/mongoDB.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//conexão com banco
connectMongoDB();

//rotas
app.use("/user", UserRoutes);
app.use("/auth", AuthRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
