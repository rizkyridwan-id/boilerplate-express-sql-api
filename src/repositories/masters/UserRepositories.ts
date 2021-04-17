import RepositoryBase from "../RepositoryBase"
import {User} from "../../entities/masters/UserEntity"
class UserRepositories extends RepositoryBase {
  private user: any
  constructor(db: any, jf: any, service: any) {
    super(db, jf, service, {})
    this.user = new User()
  }

  async get() {
    const users = await this.user.findAll()
    return users
  }

  async create(databody: any) {
    console.log(this.user)
    const user = await this.user.create(databody)
    return user
  }
}

export default UserRepositories