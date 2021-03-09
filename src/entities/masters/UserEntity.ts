import { Schema, model } from "mongoose";
import * as jf from "joiful";
import NamesEntity from "../NamesEntity";

export class User {
  constructor() {
    const tableName = new NamesEntity().masterUser();
    const userSchema = new Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      level: String,
      input_by: String,
      input_date: Date,
      edit_by: String,
      edit_date: Date
    });

    const User = model(tableName, userSchema, tableName);
    return User;
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