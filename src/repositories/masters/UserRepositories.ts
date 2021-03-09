import RepositoryBase from "../RepositoryBase"

class UserRepositories extends RepositoryBase {

  constructor(db: any, jf: any, service: any) {
    let sendColumn = {
      "_id": "$_id",
      "name": "$name"
    }
    super(db, jf, service, sendColumn)
  }
}

export default UserRepositories