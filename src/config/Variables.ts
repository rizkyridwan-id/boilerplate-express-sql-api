class Variables {
  private mode: any;
  private jwtPrivateKey: any;
  private port: any;
  private urlDb: any;

  constructor() {
    this.mode = process.env.MODE_API_WASHLY;
    this.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    this.port = process.env.PORT_API_WASHLY;
    this.urlDb = process.env.URL_DB_API_WASHLY;

    this.checkVariables();
  }

  checkVariables() {
    if (!this.mode) throw new Error("ERROR: MODE api not found!");
    if (!this.jwtPrivateKey) throw new Error("ERROR: JWT key api not found!");
    if (!this.port) throw new Error("ERROR: Port api not found!");
    if (!this.urlDb) throw new Error("ERROR: Url Connection Database api not found!");
  }

  getVariables() {
    return {
      mode: this.mode,
      jwtPrivateKey: this.jwtPrivateKey,
      port: this.port,
      urlDb: this.urlDb
    };
  }
}

export default Variables;