import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

// Activate for Creating Swagger APIs Docs
import * as swaggerUi from "swagger-ui-express";
import Documents from "./docs/Documents";
const swaggerDoc = new Documents();

class App {
  private app: any;
  private expressRouter: any;
  private port: any;
  private routes: any;
  private repository: any;
  private service: any;

  constructor(
    routes: any,
    repository: any,
    variables: any,
    service: any
  ) {
    this.app = express();
    this.expressRouter = express.Router();
    this.port = process.env.PORT || variables.port;
    this.routes = routes;
    this.repository = repository;
    this.service = service;

    this._registerRoute = this._registerRoute.bind(this);
    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);
    this._buildControllerInstance = this._buildControllerInstance.bind(this);
  }

  _registerRoute(uri: any, httpMethod: any, boundAction: any) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  _createRouteBoundAction(controllerClass: any, method: any, isSecure: any) {
    const result = [
      (req: any, res: any) => {
        this._buildControllerInstance(controllerClass, req, res)[method]();
      }];

    if (isSecure) {
      result.unshift(
        this.service.security.authenticate()
      );
    }

    return result;
  }

  _buildControllerInstance(ControllerClass: any, req: any, res: any) {
    return new ControllerClass(
      {
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body,
        repository: this.repository,
        user: req.user,
        send: (statusCode: any, resource: any, location: any) => {
          if (location) {
            res.location(location);
          }
          res.status(statusCode).send(resource);
        }
      }
    );
  }

  init() {
    // Initiate Middlewares
    this.app.use(express.json({ limit: "30mb" }));
    this.app.use(express.urlencoded({ limit: "30mb", extended: true }));
    this.app.use((req: any, res: any, next: any) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
      next();
    });
    this.app.use(cors());
    this.app.use(helmet());

    this.repository.registerRepositories();
    this.routes.registerRoutes(this._registerRoute, this._createRouteBoundAction);
    // Activate For Creating Swagger APIs Docs
    this.app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc.getDoc(), { swaggerOptions: { docExpansion: "none" } }));
    this.app.use("/api/v1", this.expressRouter);
    this.app.use("/api/v1/reconnect-db", (req: any, res: any) => {
      this.service.transactionService.reconnectDB();
      res.status(200).send({ message: "Reconnect database SUCCESS!" });
    });
    this.app.use((req: any, res: any) => {
      res.status(404).send({ url: `${req.originalUrl} not found!` });
    });

    // Activate This for https server
    // const httpsServer = https.createServer(credentials, this.app);
    // httpsServer.listen(this.port, () => this.service.logger.info(`App listening on port: ${this.port}.`));
  }
  start() {
    this.app.listen(this.port, () => this.service.logger.info(`App listening on URL: http://localhost:${this.port}.`));
  }
}

export default App;
