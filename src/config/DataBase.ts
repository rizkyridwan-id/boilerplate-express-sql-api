import * as mongoose from "mongoose";
import {Sequelize} from "sequelize";

class DataBase {
  private urlDb: any;
  private logger: any;
  public connection: any;

  constructor(variables: any, logger: any) {
    const { urlDb } = variables;

    this.urlDb = urlDb;
    this.logger = logger;

    DataBase.connect()
  }

  static connect() {
    const sequelize = new Sequelize('db_test_sequelize', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
          max: 5,
          min: 0,
          idle: 10000
      }
    });

    return sequelize
  }
}

export default DataBase;
