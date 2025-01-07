import express, { Application } from "express";
import { MainRouter } from "./http/routes/main.router";
import morgan from "morgan";
import cors from "cors";

export class App {
  private app: Application;
  private mainRouter: MainRouter;

  constructor() {
    this.app = express();
    this.mainRouter = new MainRouter();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  private initializeRoutes() {
    this.app.use("/", this.mainRouter.getRouter());
  }

  public getApp() {
    return this.app;
  }
}
