import database from "../../config/DataBase"
import * as jf from "joiful";
import { DataTypes } from "sequelize";

export class User {
  constructor() {
    const sequelize = database.connect();
    const user = sequelize.define('users', {
      'user_id': DataTypes.STRING,
      'user_name': DataTypes.STRING,
      'password': DataTypes.STRING,
      'name': DataTypes.STRING,
    })

    return user
  }
}

export class ValidAddUser {
  @jf.string().required()
  email: string;

  @jf.string().required()
  username: string;

  @jf.string().required()
  password: string;

  @jf.string()
  level: string;
}

export class ValidLoginUser {
  @jf.string()
  username: string;

  @jf.string()
  email: string;

  @jf.string().required()
  password: string;
}

export class ValidUpdateUser {
  @jf.string().required()
  email: string;

  @jf.string().required()
  username: string;

  @jf.string().required()
  password: string;

  @jf.string()
  level: string;
}

export class ValidChangePassword {
  @jf.string().required()
  password: string;

  @jf.string().required()
  new_password: string;

  @jf.string().required()
  retype_new_password: string;
}