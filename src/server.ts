import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initializeDatabase } from "./models";
import apiRoutes from "./routes";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"], // Add OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // Set to true if you need cookies
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("SIMRS Backend is running...");
});

app.use(errorHandler);

const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
