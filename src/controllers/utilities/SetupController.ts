import ControllerBase from "../ControllerBase";

class SetupController extends ControllerBase {
  async generateSystem() {
    const session = await this.startTransaction();
    try {
      const user = await this.repository.users.getUserById("admin");
      if (!user) {
        const newUser = {
          user_id: "admin",
          user_name: "ADMIN",
          level: "OWN",
          password: "admin",
          input_by: "SYSTEM",
          input_date: this.repository.users.service.dateService.localDateTime(),
          edit_by: "-",
          edit_date: this.repository.users.service.dateService.localDateTime()
        }
        newUser.password = await this.repository.users.service.userService.hashPassword(newUser.password);
  
        await this.repository.users.addUser(newUser, session);
      }

      const lokasi = await this.repository.lokasi.getLokasiAllStatusByKodeLokasi("PUSAT");
      if (!lokasi) {
        const newLokasi = {
          kode_lokasi: "PUSAT",
          nama_lokasi: "PUSAT",
          status_aktif: true,
          input_by: "SYSTEM",
          input_date: this.repository.lokasi.service.dateService.localDateTime(),
          edit_by: "-",
          edit_date: this.repository.lokasi.service.dateService.localDateTime(),
          deleted_by: "-",
          deleted_date: this.repository.lokasi.service.dateService.localDateTime()
        };

        await this.repository.lokasi.addLokasi(newLokasi, session);
      }

      await this.commitTransaction(session);
      this.success(`Generate system BERHASIL.`);
    } catch(err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async createTables() {
    try {
      const result = await this.repository.setup.createTables();
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }

  async dropTables() {
    try {
      if (this.params.kode !== "seccreeet") this.error({ statusCode: 400, message: "FORBIDDEN ACCESS!!!"});

      const result = await this.repository.setup.dropTables();
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }

  async runMigrations() {
    try {
      await this.repository.setup.runMigrations();
      this.success("Run migration SUCCESS.");
    } catch(err) {
      this.error(err);
    }
  }

  convertDate() {
    try {
      const strDate = this.repository.setup.service.dateService.dateToString();
      this.success(strDate);
    } catch(err) {
      this.error(err);
    }
  }
}

export default SetupController;