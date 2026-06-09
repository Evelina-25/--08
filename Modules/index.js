import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes.js";
import path from "path";

const PORT = 5000;

// База данных системы управления коечным фондом
const uri = "mongodb://localhost:27017/practica";

const frontendPath = path.join(path.resolve(), "frontend");

const app = express();

app.use(cors());
app.use(express.json());

// API
app.use("/api", routes);

// Статические файлы frontend
app.use(express.static(frontendPath));

async function startApp() {
    try {

        await mongoose.connect(uri);

        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON PORT ${PORT}`);
        });

    } catch (e) {

        console.error("Server startup error:", e);

    }
}

startApp();

