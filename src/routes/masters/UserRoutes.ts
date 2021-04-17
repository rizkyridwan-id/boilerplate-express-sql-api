import RouteBase from "../RoutesBase";
import UserController from "../../controllers/masters/UserController"

class UserRoutes extends RouteBase {

  constructor() {
    super(UserController)
  }

  getRoutes() {
    this.buildRoute("/user/get/all", "get", "getUsers");
    this.buildRoute("/user/post", "post", "postUser")
    return this.routes
  }
}

export default UserRoutes