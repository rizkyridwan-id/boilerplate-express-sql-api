import ControllerBase from "../ControllerBase";

class UserController extends ControllerBase {
  async getUsers() {
    const user = await this.repository.users.get()
    console.log(user)
    return this.success(user)
  }
  async postUser() {
    const formatedBody = this.formatStringObject(this.body, [])
    try {
      const payload = {
        id: Math.floor(Math.random() * 1000),
        name: formatedBody.name,
        user_id: formatedBody.user_id,
        user_name: formatedBody.user_name,
        password: formatedBody.password,
        createAt: new Date(),
        updatedAt: new Date()
      }
      const user = await this.repository.users.create(payload)
      return this.success(user)
    } catch (err) {
      return this.error(err)
    }
  }
}

export default UserController;
