class ValidateNetto {
  validateValue(dataBerat: any) {
    try {
      const jenis = dataBerat.kode_jenis || "-";
      const kadar = dataBerat.kadar || 0;
      const pkg = dataBerat.pkg || 0;
      const gross = dataBerat.gross || 0;
      const bruto = dataBerat.bruto || 0;
      const netto = dataBerat.netto || 0;

      if (kadar === 0) return { error: `Kadar jenis: ${jenis} tidak boleh 0!`};
      
      const brutoCalculate = gross - pkg;
      if (Number(brutoCalculate).toFixed(3) !== Number(bruto).toFixed(3)) return {error: `Jumlah bruto jenis: ${jenis} tidak sesuai!`};
      
      const nettoCalculate = bruto * (kadar/100);
      if (Number(nettoCalculate).toFixed(3) !== Number(netto).toFixed(3)) return {error: `Jumlah netto jenis: ${jenis} tidak sesuai!`};

      return {status: "valid"};
    } catch(err) {
      return {
        error: err.message
      };
    }
  }
}

export default ValidateNetto;
