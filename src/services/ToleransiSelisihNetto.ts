class ToleransiSelisihNetto {
  public toleransiSelisihNettoRepo: any;

  async validateSelisihNettoTerimaSupplier(total_netto: number, total_netto_ext: number) {
    if (!this.toleransiSelisihNettoRepo) {
      return { error: "Repository toleransi selisih netto belum di setting!" };
    }

    try {
      let toleransiSelisihTerimaSupplier;
      let satuan;
      let toleransiNum;

      const result = await this.toleransiSelisihNettoRepo.getToleransiTerimaSupplier();
      if (!result) {
        toleransiSelisihTerimaSupplier = 1;
        satuan = "%";
      } else {
        toleransiSelisihTerimaSupplier = result.toleransi_selisih;
        satuan = result.satuan;
      }

      const diffNum = Math.abs(total_netto - total_netto_ext);
      if (satuan === "%") {
        toleransiNum = Number(((total_netto / 100) * toleransiSelisihTerimaSupplier).toFixed(2));
      } else {
        toleransiNum = Number(toleransiSelisihTerimaSupplier).toFixed(2);
      }
      
      if (diffNum > toleransiNum) {
        return { error: "Selisih netto internal dan external melebihi toleransi yang di tentukan!" };
      }
      return { valid: true };
    } catch(err) {
      return { error: err.message };
    }
  }
}

export default ToleransiSelisihNetto;