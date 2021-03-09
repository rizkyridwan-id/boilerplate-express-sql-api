import RepositoryBase from "./RepositoryBase";

import SetupRepositories from "./utilities/SetupReposirories";

// MASTER
import UserRepositories from "./masters/UserRepositories"

// TRANSACTIONS
class Repository {
  private _db: any;
  private _jf: any;
  private _service: any;

  private global: any;

  private setup: any;

  // MASTER
  private users: any;

  // TRANSACTIONS
  constructor(db: any, jf: any, service: any) {
    this._db = db;
    this._jf = jf;
    this._service = service;
  }

  registerRepositories() {
    this.global = new RepositoryBase(this._db, this._jf, this._service, []);

    this.setup = new SetupRepositories(this._db, this._jf, this._service);

    // MASTER
    this.users = new UserRepositories(this._db, this._jf, this._service);

    // TRANSACTIONS
  }
}

export default Repository;
