import ControllerBase from "../ControllerBase"

class UserController extends ControllerBase {
  async loginUser() {
    try {
      const { error } = this.repository.users.validateLoginUser(this.body);
      if (error) {
        return this.error(
          {
            statusCode: 400,
            message: error.details[0].message
          }
        );
      }

      const user = await this.repository.users.getUserPassword(this.body.user_id);
      if (!user) {
        return this.error(
          {
            statusCode: 400,
            message: "User id atau Password yang anda masukan salah!"
          }
        );
      }

      const matchPassword = await this.repository.users.service.userService.comparePassword(this.body.password, user);
      if (!matchPassword) {
        return this.error(
          {
            statusCode: 400,
            message: "User id atau Password yang anda masukan salah!"
          }
        );
      }

      const token = await this.repository.users.service.security.generateToken(user);
      if (!token) {
        return this.error(
          {
            statusCode: 400,
            message: "Gagal login, coba ulangi kembali!"
          }
        );
      }

      const akses = await this.repository.akses.getAkses(this.body.user_id);
      const result = {
        user_id: user.user_id,
        user_name: user.user_name,
        level: user.level,
        token: token,
        akses
      };

      await this.repository.users.service.cacheData.storeCache(result);
      this.success(result);
    } catch (err) {
      this.error(err);
    }
  }

  async addUser() {
    const { error } = this.repository.users.validateAddUser(this.body);
    if (error) return this.error({
      statusCode: 400,
      message: error.details[0].message
    });

    const session = await this.startTransaction();

    try {
      const formatedBody = this.formatStringObject(this.body, ["user_id", "password", "retype_password"]);
      if (formatedBody.password !== formatedBody.retype_password) {
        await this.rollbackTransaction(session);
        return this.error({
          statusCode: 400,
          message: "Password dan retype-password tidak sama!"
        });
      }

      let result = await this.repository.users.getUserById(formatedBody.user_id);
      if (result) {
        await this.rollbackTransaction(session);
        return this.error({
          statusCode: 400,
          message: "User id sudah terdaftar!"
        });
      }

      const newUser = {
        user_id: formatedBody.user_id,
        user_name: formatedBody.user_name,
        level: formatedBody.level,
        password: formatedBody.password,
        input_by: this.user.user_id,
        input_date: this.repository.users.service.dateService.localDateTime(),
        edit_by: "-",
        edit_date: this.repository.users.service.dateService.localDateTime()
      }
      newUser.password = await this.repository.users.service.userService.hashPassword(newUser.password);

      result = await this.repository.users.addUser(newUser, session);

      await this.commitTransaction(session);
      this.success("Simpan data user BERHASIL.");
    } catch (err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async getUsers() {
    try {
      const result = await this.repository.users.getUsers();
      this.success(result);
    } catch (err) {
      this.error(err);
    }
  }

  async getUserByUserId() {
    try {
      const result = await this.repository.users.getUserById(this.params.user_id);
      this.success(result[0]);
    } catch (err) {
      this.error(err);
    }
  }

  async updateUserByUserId() {
    const { error } = this.repository.users.validateUpdateUser(this.body);
    if (error) return this.error({
      statusCode: 400,
      message: error.details[0].message
    });

    const formatedBody = await this.formatStringObject(this.body, []);
    const session = await this.startTransaction();
    try {
      const result = await this.repository.users.updateUserByUserId(this.params.user_id, formatedBody, session);

      await this.commitTransaction(session);
      this.success(result);
    } catch (err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async changePassword() {
    const { error } = this.repository.users.validateChangePassword(this.body);
    if (error) return this.error({
      statusCode: 400,
      message: error.details[0].message
    });

    if (this.body.new_password !== this.body.retype_new_password) {
      return this.error({
        statusCode: 400,
        message: "Password baru dan retype password baru tidak sama!"
      });
    }

    const session = await this.startTransaction();
    try {
      const userPassword = await this.repository.users.getUserPassword(this.user.user_id);
      if (!userPassword) return this.error({
        statusCode: 400,
        message: "Data user tidak valid!"
      });

      const matchPassword = await this.repository.users.service.userService.comparePassword(this.body.password, userPassword);
      if (!matchPassword) return this.error({
        statusCode: 400,
        message: "Password lama yang anda masukan salah!"
      });

      const newPassword = await this.repository.users.service.userService.hashPassword(this.body.new_password);
      const resultChangePassword = await this.repository.users.changePassword(this.user.user_id, newPassword, session);

      await this.commitTransaction(session);
      this.success(resultChangePassword);
    } catch (err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async deleteUser() {
    const session = await this.startTransaction();

    try {
      const user = await this.repository.users.getUserPassword(this.params.user_id);
      if (!user) {
        await this.rollbackTransaction(session);
        return this.error({
          statusCode: 400,
          message: `'Data user: ${this.params.user_id} tidak di temukan!`
        });
      }

      const deletedUser = {
        user_id: user.user_id,
        user_name: user.user_name,
        level: user.level,
        password: user.password,
        input_by: user.input_by,
        input_date: user.input_date,
        edit_by: user.edit_by,
        edit_date: user.edit_date,
        deleted_by: this.user.user_id,
        deleted_date: this.repository.users.service.dateService.localDateTime()
      }
      await this.repository.users.insertToUserDeleted(deletedUser, session);
      const result = await this.repository.users.deleteUser(user.user_id, session);

      await this.commitTransaction(session);
      this.success(result);
    } catch (err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }
}