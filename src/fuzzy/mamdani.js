const turun = (atas, bawah, x) => {
  if (x <= bawah) return 1;
  if (x > bawah && x < atas) return (atas - x) / (atas - bawah);
  if (x >= atas) return 0;
}

const naik = (atas, bawah, x) => {
  if (x <= bawah) return 0;
  if (x > bawah && x < atas) return (x - bawah) / (atas - bawah);
  if (x >= atas) return 1;
}


const fuzifikasi = (name, batas1, batas2, batas3, x) => {

  const result = {
    rendah: 0,
    normal: 0,
    tinggi: 0,

  };
  if (x <= batas1) {
    result.rendah = 1;
  } else if (x > batas1 && x < batas3) {
    if (x > batas1 && x < batas2) {
      result.rendah = turun(batas2, batas1, x);
      result.normal = naik(batas2, batas1, x);
    } else {
      result.normal = turun(batas3, batas2, x);
      result.tinggi = naik(batas3, batas2, x);
    }
  } else if (x >= batas3) {
    result.tinggi = 1;
  }

  if (name === 'bmi') {
    return {
      kurus: result.rendah,
      normal: result.normal,
      obesitas: result.tinggi
    }
  }

  return result;
}


const inferensi = (td, gd, kl, bmi2, rwt) => {

  const result = []
  let a = 0.0;
  let az = 0.0;
  const tekananDarah = fuzifikasi('', 110, 120, 140, td);
  const gulaDarah = fuzifikasi('', 70, 110, 140, gd);
  const kolesterol = fuzifikasi('', 200, 240, 250, kl);
  const bmi = fuzifikasi('bmi', 18.5, 22.9, 24.9, bmi2);
  const riwayat = { tidak: rwt == 1 ? 0 : 1, ada: rwt == 1 ? 1 : 0 }

  result.push(
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'kecil', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada) },
    { resiko: 'sedang', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak) },
    { resiko: 'besar', value: Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada) }
  );

  const rulesTerpakai = result.filter(data => data.value !== 0);

  const nilaiKecil = [];
  const nilaiSedang = [];
  const nilaiBesar = [];

  rulesTerpakai.map(data => { if (data.resiko === 'kecil') nilaiKecil.push(data.value) })
  rulesTerpakai.map(data => { if (data.resiko === 'sedang') nilaiSedang.push(data.value) })
  rulesTerpakai.map(data => { if (data.resiko === 'besar') nilaiBesar.push(data.value) })


  return {
    kecil: nilaiKecil.length !== 0 ? Math.max(...nilaiKecil) : 0,
    sedang: nilaiSedang.length !== 0 ? Math.max(...nilaiSedang) : 0,
    besar: nilaiBesar.length !== 0 ? Math.max(...nilaiBesar) : 0
  };

}


export const defuzifikasi = (td, gd, kl, bmi2, rwt) => {

  // metode yang digunakan untuk defuzifikasi adalah dengan menggunakan metode LOM (Largest of Maximum)
  // yaitu dengan cara mengambil derajat keanggotaan tertinggi dari semua agregasi

  const inferensiObj = inferensi(td, gd, kl, bmi2, rwt);
  return Math.max(inferensiObj.kecil, inferensiObj.sedang, inferensiObj.besar);

}
