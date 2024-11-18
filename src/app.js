import express from "express";
import cors from "cors";
import connectMongoDB from "./database/mongoDB.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import MovieRoutes from "./routes/MovieRoutes.js";
import RatingRoutes from "./routes/RatingRoutes.js";
import { config } from "dotenv";

config();

const app = express();
const { PORT } = process.env;

//middleware
app.use(express.json());

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//conexão com banco
connectMongoDB();

//rotas
app.use("/user", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/movies", MovieRoutes);
app.use("/rating", RatingRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
