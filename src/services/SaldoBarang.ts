class SaldoBarang {
  public saldoBarangMaster: any;
  public saldoBarangCard: any;

  async in(dataBarang: any, session: any) {
    let {
      status_trx = "-",
      kode_lokasi = "-", 
      kode_jenis = "-", 
      bruto = 0, 
      netto = 0
    } = dataBarang;
    
    switch (status_trx) {
      case "IN":
        break;
      case "OUT":
        bruto = Number(bruto) * (-1);
        netto = Number(netto) * (-1);
        break;
      default:
        throw new Error('Invalid status transaksi saldo barang!');
    }

    const barang = await this.saldoBarangMaster.getStockBarang(kode_jenis, kode_lokasi);
    if (!barang) {
      await this.saldoBarangMaster.addStockBarang({ 
        kode_lokasi, 
        kode_jenis, 
        total_bruto: Number(Number(bruto).toFixed(3)), 
        total_netto: Number(Number(netto).toFixed(3))
      }, session);
    } else {
      const totalBruto = Number(Number(barang.total_bruto).toFixed(3)) + Number(Number(bruto).toFixed(3));
      const totalNetto = Number(Number(barang.total_netto).toFixed(3)) + Number(Number(netto).toFixed(3));

      await this.saldoBarangMaster.updateStockBarang(kode_jenis, kode_lokasi, {
        total_bruto: Number(Number(totalBruto).toFixed(3)),
        total_netto: Number(Number(totalNetto).toFixed(3))
      }, session);
    }

    return `Proses in saldo barang berhasil.`;
  }

  async out(dataBarang: any, session: any) {
    const {
      kode_lokasi, 
      kode_jenis, 
      bruto, 
      netto
    } = dataBarang;
    
    if (!this.saldoBarangMaster || !this.saldoBarangCard) {
      throw new Error ("Repository saldo barang belum di setting!");
    }

    const barang = await this.saldoBarangMaster.getStockBarang(kode_jenis, kode_lokasi);
    if (!barang) {
      await this.saldoBarangMaster.addStockBarang({ 
        kode_lokasi, 
        kode_jenis, 
        total_bruto: bruto * -1, 
        total_netto: netto * -1 
      }, session);
    } else {
      const totalBruto = Number(Number(barang.total_bruto).toFixed(3)) - Number(Number(bruto).toFixed(3));
      const totalNetto = Number(Number(barang.total_netto).toFixed(3)) - Number(Number(netto).toFixed(3));

      await this.saldoBarangMaster.updateStockBarang(kode_jenis, kode_lokasi, {
        total_bruto: totalBruto,
        total_netto: totalNetto
      }, session);
    }

    return `Proses out saldo barang berhasil.`;
  }

  async inCard(dataBarang: any, session: any) {
    let barangCard;

    let awalBruto = 0;
    let awalNetto = 0;
    let akhirBruto = 0;
    let akhirNetto = 0;

    const {
      tanggal,
      jam, 
      kode_lokasi, 
      kode_kategori, 
      kode_jenis, 
      bruto, 
      netto,
      no_ref,
      no_ext,
      keterangan,
      input_by
    } = dataBarang;

    if (!this.saldoBarangMaster || !this.saldoBarangCard) {
      throw new Error ("Repository saldo barang belum di setting!");
    }

    const barang = await this.saldoBarangMaster.getStockBarangAndCard(kode_jenis, kode_lokasi, tanggal);
    if (!barang) throw new Error('Invalid data barang!');

    if (barang.saldoBarangCard.length !== 0) {
      awalBruto = Number(Number(barang.saldoBarangCard[0].barangCard.akhir_bruto).toFixed(3));
      awalNetto = Number(Number(barang.saldoBarangCard[0].barangCard.akhir_netto).toFixed(3));

      akhirBruto = Number(Number(bruto).toFixed(3)) + Number(Number(awalBruto).toFixed(3));;
      akhirNetto = Number(Number(netto).toFixed(3)) + Number(Number(awalNetto).toFixed(3));;
    } else {
      akhirBruto = Number(Number(bruto).toFixed(3));
      akhirNetto = Number(Number(netto).toFixed(3));
    }

    barangCard = {
      tanggal,
      jam,
      kode_lokasi,
      kode_kategori,
      kode_jenis,
      awal_bruto: awalBruto,
      awal_netto: awalNetto,
      in_bruto: bruto,
      in_netto: netto,
      out_bruto: 0,
      out_netto: 0,
      akhir_bruto: akhirBruto,
      akhir_netto: akhirNetto,
      keterangan,
      no_ref,
      no_ext,
      input_by,
      input_date: this.saldoBarangMaster.service.dateService.localDateTime()
    }

    await this.saldoBarangCard.addStockBarang(barangCard, session);
    await this.saldoBarangCard.inSaldoAwalAkhir(tanggal, kode_lokasi, kode_jenis, bruto, netto, session);

    return `Proses insert barang card berhasil.`;
  }

  async outCard(dataBarang: any, session: any) {
    let barangCard;

    let awalBruto = 0;
    let awalNetto = 0;
    let akhirBruto = 0;
    let akhirNetto = 0;

    const {
      tanggal,
      jam, 
      kode_lokasi, 
      kode_kategori, 
      kode_jenis, 
      bruto, 
      netto,
      no_ref,
      no_ext,
      keterangan,
      input_by
    } = dataBarang;

    if (!this.saldoBarangMaster || !this.saldoBarangCard) {
      throw new Error ("Repository saldo barang belum di setting!");
    }

    const barang = await this.saldoBarangMaster.getStockBarangAndCard(kode_jenis, kode_lokasi, tanggal);
    if (!barang) throw new Error('Invalid data barang!');

    if (barang.saldoBarangCard.length !== 0) {
      awalBruto = Number(Number(barang.saldoBarangCard[0].barangCard.akhir_bruto).toFixed(3));
      awalNetto = Number(Number(barang.saldoBarangCard[0].barangCard.akhir_netto).toFixed(3));

      akhirBruto = Number(Number(bruto).toFixed(3)) - Number(Number(awalBruto).toFixed(3));;
      akhirNetto = Number(Number(netto).toFixed(3)) - Number(Number(awalNetto).toFixed(3));;
    } else {
      akhirBruto = Number(Number(bruto * -1).toFixed(3));
      akhirNetto = Number(Number(netto * -1).toFixed(3));
    }

    barangCard = {
      tanggal,
      jam,
      kode_lokasi,
      kode_kategori,
      kode_jenis,
      awal_bruto: awalBruto,
      awal_netto: awalNetto,
      in_bruto: 0,
      in_netto: 0,
      out_bruto: bruto,
      out_netto: netto,
      akhir_bruto: akhirBruto,
      akhir_netto: akhirNetto,
      keterangan,
      no_ref,
      no_ext,
      input_by,
      input_date: this.saldoBarangMaster.service.dateService.localDateTime()
    }

    await this.saldoBarangCard.addStockBarang(barangCard, session);
    await this.saldoBarangCard.outSaldoAwalAkhir(tanggal, kode_lokasi, kode_jenis, bruto, netto, session);

    return `Proses insert barang card berhasil.`;
  }
}

export default SaldoBarang;
