import AlamatService from "./AlamatService";
import CacheData from "./CacheData";
import Logger from "./Logger";
import Security from "./Security";
import ToleransiSelisihNetto from "./ToleransiSelisihNetto";
import UserService from "./UserService";
import DateService from "./DateService";
import TransactionService from "./TransactionService";
import FormatStringObject from "./FormatStringObject";
import ValidateNetto from "./ValidateNetto";

class Services {
  private variables: any;
  private db: any;

  public alamatService: any;
  public cacheData: any;
  public logger: any;
  public security: any;
  public toleransiSelisihNetto: any;
  public userService: any;
  public dateService: any;
  public transactionService: any;
  public formatStringObject: any;
  public validateNetto: any;

  constructor(db:any, variables: any) {
    this.db = db;
    this.variables = variables;
    
    this.registerService();
  }

  registerService() {
    this.alamatService = new AlamatService();
    this.cacheData = new CacheData();
    this.logger = new Logger();
    this.security = new Security(this.variables, this.cacheData);
    this.toleransiSelisihNetto = new ToleransiSelisihNetto();
    this.userService = new UserService();
    this.dateService = new DateService();
    this.transactionService = new TransactionService(this.db);
    this.formatStringObject = new FormatStringObject();
    this.validateNetto = new ValidateNetto();
  }
}

export default Services;
