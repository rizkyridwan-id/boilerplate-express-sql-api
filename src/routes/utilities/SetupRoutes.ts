import RouteBase from "../RoutesBase";
import SetupController from "../../controllers/utilities/SetupController";

class UserRoutes extends RouteBase {
  constructor() {
    super(SetupController);
  }

  getRoutes() {
    this.buildRoute("/setup/generate-system", "post", "generateSystem");
    this.buildRoute("/setup/create-tables","post", "createTables");
    this.buildRoute("/setup/drop-tables/:kode", "delete", "dropTables");
    this.buildRoute("/setup/run-migrations", "post", "runMigrations");
    this.buildRoute("/setup/convert-date", "get", "convertDate");
    
    return this.routes;
  }
}

export default UserRoutes;
