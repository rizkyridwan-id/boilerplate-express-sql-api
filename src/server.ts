import "regenerator-runtime";
import "reflect-metadata";
import * as dotenv from "dotenv";
import * as jf from "joiful";

import App from "./App";
import Variables from "./config/Variables";
import Routes from "./routes/Routes";
import Repository from "./repositories/Repository";
import DataBase from "./config/DataBase";
import Service from "./services/Services";
import Logger from "./services/Logger";

dotenv.config();
const variables = new Variables();
const dataBase = new DataBase(variables.getVariables(), new Logger())
const service = new Service(dataBase, variables.getVariables());

const app = new App(
  new Routes,
  new Repository(dataBase, jf, service),
  variables.getVariables(),
  service
);
app.init();
app.start();
