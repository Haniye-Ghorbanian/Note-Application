import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; 
import { AppDataSource } from "./data-source";
import itemRoutes from "./routes/itemRoutes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Connect to SQLite database using DataSource
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to SQLite database");

    // Routes
    app.use("/api", itemRoutes); // Set up routes after DB initialization

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to SQLite database:", error.message);
  });
