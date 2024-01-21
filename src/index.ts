import express, { NextFunction } from "express";
import sequelize from "./sequelize";
import config from "./config";
import chalk from "chalk";
import bodyParser from "body-parser";
import userRoutes from "../src/routes/user.routes";

const app = express();
const log = console.log;
sequelize
  .authenticate()
  .then(() => {
    console.log(config.databaseName + " db was connected succesfully");
    startServer();
  })
  .catch((e) => {
    console.log(e);
  });

const startServer = () => {
  // Rules for our server
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  //logging when the API fineshes and response has been send
  app.use((req, res, next) => {
    //logging incoming request to our server
    log(
      chalk.blueBright(
        `Incoming --> Method : [${req.method}] + URL : [${req.url}] - IP : [${req.socket.remoteAddress}]`,
      ),
    );

    res.on("finish", () => {
      log(
        chalk.blueBright(
          `Outgoing <-- Method: [${req.method}] + URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
        ),
      );
    });
    next();
  });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Origin",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );

    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
      return res.status(200).json({});
    }
    next();
  });
  app.use("/users", userRoutes);
  /*Default Gateway*/
  app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });

  /*HealthCheck*/
  app.get("/ping", (req, res, next) => {
    try {
      res.status(200).json({ message: "pong" });
    } catch (e) {
      log(chalk.red(e));
    }
  });
  /*Routes*/

  /*Error Handling*/
  //always will be last cause if it hasnt executed one of the use or request succesfully on any call to server this will be called.
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    log(chalk.redBright(err));
    next(err);
  });

  /*Starting with the server*/
  app.listen(config.port, () => {
    console.log(`Server Started on ${config.port}`);
  });
};
