class AlamatService {
  public provinsiRepo: any;
  public kotaRepo: any;
  public kecamatanRepo: any;

  async validateDataAlamat(dataAlamat: any) {
    if (!this.provinsiRepo || !this.kotaRepo || !this.kecamatanRepo) {
      throw new Error ("Repository alamat belum di setting!")
    }

    const provinsi = await this.provinsiRepo.getProvinsiByKodeProvinsi(dataAlamat.kode_provinsi);
    if (!provinsi) throw new Error(`Data provinsi: ${dataAlamat.kode_provinsi} tidak di temukan!`);

    const kota = await this.kotaRepo.getKotaByKodeKota(dataAlamat.kode_kota);
    if (!kota) throw new Error(`Data kota: ${dataAlamat.kode_kota} tidak di temukan!`);
    if (kota.kode_provinsi !== dataAlamat.kode_provinsi) throw new Error(`Data provinsi untuk kota: ${kota.kode_kota} tidak valid!`);

    const kecamatan = await this.kecamatanRepo.getKecamatanByKodeKecamatan(dataAlamat.kode_kecamatan);
    if (!kecamatan) throw new Error(`Data kecamatan: ${dataAlamat.kode_kecamatan} tidak di temukan!`);
    if (kecamatan.kode_kecamatan !== dataAlamat.kode_kecamatan) throw new Error(`Data kota untuk kecamatan: ${kecamatan.kode_kecamatan} tidak valid!`);
  }
}

export default AlamatService;