import express, { Application } from "express";
import { MainRouter } from "./http/routes/main.router";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limiter } from "../infrastructure/middlewares/rateLimiter";
import session from "express-session";
import passport from "passport";
import { googleAuthConfig } from "../infrastructure/config";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "DELETE"],
      })
    );
    this.app.use(cookieParser());

    this.app.use(
      session({
        secret: googleAuthConfig.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // this.app.use(limiter);
  }

  private initializeRoutes() {
    const mainRouter = new MainRouter();

    this.app.use("/v1", mainRouter.getRouter());

    this.app.use("/ping", (req: any, res: any) => {
      return res.status(200).json({
        message: "PONG",
      });
    });
  }

  public getApp() {
    return this.app;
  }
}
