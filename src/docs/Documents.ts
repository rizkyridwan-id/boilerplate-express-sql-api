import ServerDoc from "./ServerDoc";
import UsersDoc from "./masters/UsersDoc";
import DataTags from "./DataTags";

// Transactions

// Reports


class Documents {
  private serverDoc: any;
  private paths: any;

  constructor() {
    const dataTags = new DataTags();

    this.serverDoc = new ServerDoc();
    this.paths = {
      "paths": Object.assign(
        // Master
        new UsersDoc(dataTags.masterUser()).getDoc(),

        // Transaksi

        // Report

      )
    };
  }

  getDoc() {
    const swaggerDoc = Object.assign(this.serverDoc.getInfo(), this.paths);
    return swaggerDoc;
  }
}

export default Documents;