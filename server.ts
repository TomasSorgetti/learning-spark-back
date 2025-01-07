// src/server.ts
import express, { Application } from "express";
import { MainRouter } from "./src/infrastructure/http/routes/main.router";

const app: Application = express();
const mainRouter = new MainRouter();

// Middlewares globales
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para formularios

// Rutas principales
app.use("/", mainRouter.getRouter());

// Iniciar el servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
