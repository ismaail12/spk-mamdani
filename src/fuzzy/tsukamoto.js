//KURVA
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

const kecil = (a) => {
  //  𝑧 = 𝑧𝑚𝑎𝑥 − 𝑎 ∗ (𝑧𝑚𝑎𝑥 − 𝑧𝑚𝑖𝑛)
  if (a <= 0) {
    return 1;
  } else if (a > 0 && a < 0.5) {
    return 0.5 - (a * 0.5);
  } else return 0;
}

const sedang = (a) => {
  //  𝑧 = 𝑧𝑚𝑎𝑥 − 𝑎 ∗ (𝑧𝑚𝑎𝑥 − 𝑧𝑚𝑖𝑛)
  //  z = 𝑎(𝑧𝑚𝑎𝑥 − 𝑧𝑚𝑖𝑛) + 𝑧𝑚𝑖n
  if (a <= 0 || a >= 1) {
    return 1;
  } else {
    if (a > 0 && a < 0.5) {
      return (a * 0.5)
    } else {
      return 1 - (a * 0.5);
    }
  }
}


const besar = (a) => {
  //  z = 𝑎(𝑧𝑚𝑎𝑥 − 𝑧𝑚𝑖𝑛) + 𝑧𝑚𝑖n
  if (a <= 0) {
    return 0;
  } else if (a > 0.5 && a < 1) {
    return (a * 0.5) + 0.5
  } else return 1;
}

const fuzifikasi = (batas1, batas2, batas3, x) => {
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
  return result;
  // return Object.filter(result, value => value !== 0);

}

const fuzBMI = (batas1, batas2, batas3, x) => {
  const fuzzy = fuzifikasi(batas1, batas2, batas3, x);
  return {
    kurus: fuzzy.rendah,
    normal: fuzzy.normal,
    obesitas: fuzzy.tinggi
  }
  // return Object.filter(result, value => value !== undefined);

}



export const resiko = (td, gd, kl, bmi2, rwt) => {
  const result = []
  let a = 0.0;
  let az = 0.0;
  const tekananDarah = fuzifikasi(110, 120, 140, td);
  const gulaDarah = fuzifikasi(70, 110, 140, gd);
  const kolesterol = fuzifikasi(200, 240, 250, kl);
  const bmi = fuzBMI(18.5, 22.9, 24.9, bmi2);
  const riwayat = { tidak: rwt == 1 ? 0 : 1, ada: rwt == 1 ? 1 : 0 }

  const a1 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak), z1 = kecil(a1);
  result.push([a1, z1]);

  const a2 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada), z2 = sedang(a2);
  result.push([a2, z2]);

  const a3 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak), z3 = kecil(a3);
  result.push([a3, z3]);

  const a4 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada), z4 = sedang(a4);
  result.push([a4, z4]);

  const a5 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z5 = sedang(a5);
  result.push([a5, z5]);

  const a6 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada), z6 = besar(a6);
  result.push([a6, z6]);

  const a7 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak), z7 = kecil(a7);
  result.push([a7, z7]);

  const a8 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada), z8 = sedang(a8);
  result.push([a8, z8]);

  const a9 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak), z9 = kecil(a9);
  result.push([a9, z9]);

  const a10 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada), z10 = sedang(a10);
  result.push([a10, z10]);

  const a11 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak), z11 = sedang(a11);
  result.push([a11, z11]);

  const a12 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada), z12 = besar(a12);
  result.push([a12, z12]);

  const a13 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z13 = sedang(a13);
  result.push([a13, z13]);

  const a14 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada), z14 = besar(a14);
  result.push([a14, z14]);

  const a15 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak), z15 = sedang(a15);
  result.push([a15, z15]);

  const a16 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada), z16 = besar(a16);
  result.push([a16, z16]);

  const a17 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z17 = besar(a17);
  result.push([a17, z17]);

  const a18 = Math.min(tekananDarah.rendah, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z18 = besar(a18);
  result.push([a18, z18]);

  const a19 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak), z19 = kecil(a19);
  result.push([a19, z19]);

  const a20 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada), z20 = sedang(a20);
  result.push([a20, z20]);

  const a21 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak), z21 = kecil(a21);
  result.push([a21, z21]);

  const a22 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada), z22 = sedang(a22);
  result.push([a22, z22]);

  const a23 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z23 = sedang(a23);
  result.push([a23, z23]);

  const a24 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada), z24 = besar(a24);
  result.push([a24, z24]);

  const a25 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak), z25 = kecil(a25);
  result.push([a25, z25]);

  const a26 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada), z26 = sedang(a26);
  result.push([a26, z26]);

  const a27 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak), z27 = kecil(a27);
  result.push([a27, z27]);

  const a28 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada), z28 = sedang(a28);
  result.push([a28, z28]);

  const a29 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak), z29 = sedang(a29);
  result.push([a29, z29]);

  const a30 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada), z30 = besar(a30);
  result.push([a30, z30]);

  const a31 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z31 = sedang(a31);
  result.push([a31, z31]);

  const a32 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada), z32 = besar(a32);
  result.push([a32, z32]);

  const a33 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak), z33 = sedang(a33);
  result.push([a33, z33]);

  const a34 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada), z34 = besar(a34);
  result.push([a34, z34]);

  const a35 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z35 = sedang(a35);
  result.push([a35, z35]);

  const a36 = Math.min(tekananDarah.rendah, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z36 = besar(a36);
  result.push([a36, z36]);

  const a37 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak), z37 = sedang(a37);
  result.push([a37, z37]);

  const a38 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada), z38 = besar(a38);
  result.push([a38, z38]);

  const a39 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak), z39 = sedang(a39);
  result.push([a39, z39]);

  const a40 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada), z40 = besar(a40);
  result.push([a40, z40]);

  const a41 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z41 = besar(a41);
  result.push([a41, z41]);

  const a42 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada), z42 = besar(a42);
  result.push([a42, z42]);

  const a43 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak), z43 = sedang(a43);
  result.push([a43, z43]);

  const a44 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada), z44 = besar(a44);
  result.push([a44, z44]);

  const a45 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak), z45 = sedang(a45);
  result.push([a45, z45]);

  const a46 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada), z46 = besar(a46);
  result.push([a46, z46]);

  const a47 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak), z47 = besar(a47);
  result.push([a47, z47]);

  const a48 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada), z48 = besar(a48);
  result.push([a48, z48]);

  const a49 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z49 = besar(a49);
  result.push([a49, z49]);

  const a50 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada), z50 = besar(a50);
  result.push([a50, z50]);

  const a51 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak), z51 = besar(a51);
  result.push([a51, z51]);

  const a52 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada), z52 = besar(a52);
  result.push([a52, z52]);

  const a53 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z53 = besar(a53);
  result.push([a53, z53]);

  const a54 = Math.min(tekananDarah.rendah, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z54 = besar(a54);
  result.push([a54, z54]);

  const a55 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak), z55 = kecil(a55);
  result.push([a55, z55]);

  const a56 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada), z56 = kecil(a56);
  result.push([a56, z56]);

  const a57 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak), z57 = kecil(a57);
  result.push([a57, z57]);

  const a58 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada), z58 = kecil(a58);
  result.push([a58, z58]);

  const a59 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z59 = kecil(a59);
  result.push([a59, z59]);

  const a60 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada), z60 = sedang(a60);
  result.push([a60, z60]);

  const a61 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak), z61 = kecil(a61);
  result.push([a61, z61]);

  const a62 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada), z62 = sedang(a62);
  result.push([a62, z62]);

  const a63 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak), z63 = kecil(a63);
  result.push([a63, z63]);

  const a64 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada), z64 = kecil(a64);
  result.push([a64, z64]);

  const a65 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak), z65 = kecil(a65);
  result.push([a65, z65]);

  const a66 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada), z66 = sedang(a66);
  result.push([a66, z66]);

  const a67 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z67 = kecil(a67);
  result.push([a67, z67]);

  const a68 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada), z68 = sedang(a68);
  result.push([a68, z68]);

  const a69 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak), z69 = kecil(a69);
  result.push([a69, z69]);

  const a70 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada), z70 = sedang(a70);
  result.push([a70, z70]);

  const a71 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z71 = sedang(a71);
  result.push([a71, z71]);

  const a72 = Math.min(tekananDarah.normal, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z72 = besar(a72);
  result.push([a72, z72]);

  const a73 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak), z73 = kecil(a73);
  result.push([a73, z73]);

  const a74 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada), z74 = kecil(a74);
  result.push([a74, z74]);

  const a75 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak), z75 = kecil(a75);
  result.push([a75, z75]);

  const a76 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada), z76 = kecil(a76);
  result.push([a76, z76]);

  const a77 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z77 = kecil(a77);
  result.push([a77, z77]);

  const a78 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada), z78 = sedang(a78);
  result.push([a78, z78]);

  const a79 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak), z79 = kecil(a79);
  result.push([a79, z79]);

  const a80 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada), z80 = kecil(a80);
  result.push([a80, z80]);

  const a81 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak), z81 = kecil(a81);
  result.push([a81, z81]);

  const a82 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada), z82 = kecil(a82);
  result.push([a82, z82]);

  const a83 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak), z83 = kecil(a83);
  result.push([a83, z83]);

  const a84 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada), z84 = sedang(a84);
  result.push([a84, z84]);

  const a85 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z85 = kecil(a85);
  result.push([a85, z85]);

  const a86 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada), z86 = sedang(a86);
  result.push([a86, z86]);

  const a87 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak), z87 = kecil(a87);
  result.push([a87, z87]);

  const a88 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada), z88 = sedang(a88);
  result.push([a88, z88]);

  const a89 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z89 = sedang(a89);
  result.push([a89, z89]);

  const a90 = Math.min(tekananDarah.normal, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z90 = besar(a90);
  result.push([a90, z90]);

  const a91 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak), z91 = kecil(a91);
  result.push([a91, z91]);

  const a92 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada), z92 = sedang(a92);
  result.push([a92, z92]);

  const a93 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak), z93 = kecil(a93);
  result.push([a93, z93]);

  const a94 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada), z94 = sedang(a94);
  result.push([a94, z94]);

  const a95 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z95 = sedang(a95);
  result.push([a95, z95]);

  const a96 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada), z96 = besar(a96);
  result.push([a96, z96]);

  const a97 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak), z97 = kecil(a97);
  result.push([a97, z97]);

  const a98 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada), z98 = sedang(a98);
  result.push([a98, z98]);

  const a99 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak), z99 = kecil(a99);
  result.push([a99, z99]);

  const a100 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada), z100 = sedang(a100);
  result.push([a100, z100]);

  const a101 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak), z101 = sedang(a101);
  result.push([a101, z101]);

  const a102 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada), z102 = besar(a102);
  result.push([a102, z102]);

  const a103 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z103 = sedang(a103);
  result.push([a103, z103]);

  const a104 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada), z104 = besar(a104);
  result.push([a104, z104]);

  const a105 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak), z105 = sedang(a105);
  result.push([a105, z105]);

  const a106 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada), z106 = besar(a106);
  result.push([a106, z106]);

  const a107 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z107 = besar(a107);
  result.push([a107, z107]);

  const a108 = Math.min(tekananDarah.normal, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z108 = besar(a108);
  result.push([a108, z108]);

  const a109 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.tidak), z109 = kecil(a109);
  result.push([a109, z109]);

  const a110 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.kurus, riwayat.ada), z110 = sedang(a110);
  result.push([a110, z110]);

  const a111 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.tidak), z111 = kecil(a111);
  result.push([a111, z111]);

  const a112 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.normal, riwayat.ada), z112 = sedang(a112);
  result.push([a112, z112]);

  const a113 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z113 = sedang(a113);
  result.push([a113, z113]);

  const a114 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.rendah, bmi.obesitas, riwayat.ada), z114 = besar(a114);
  result.push([a114, z114]);

  const a115 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.tidak), z115 = kecil(a115);
  result.push([a115, z115]);

  const a116 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.kurus, riwayat.ada), z116 = sedang(a116);
  result.push([a116, z116]);

  const a117 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.tidak), z117 = kecil(a117);
  result.push([a117, z117]);

  const a118 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.normal, riwayat.ada), z118 = sedang(a118);
  result.push([a118, z118]);

  const a119 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.tidak), z119 = sedang(a119);
  result.push([a119, z119]);

  const a120 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.normal, bmi.obesitas, riwayat.ada), z120 = besar(a120);
  result.push([a120, z120]);

  const a121 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z121 = sedang(a121);
  result.push([a121, z121]);

  const a122 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.kurus, riwayat.ada), z122 = besar(a122);
  result.push([a122, z122]);

  const a123 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.tidak), z123 = sedang(a123);
  result.push([a123, z123]);

  const a124 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.normal, riwayat.ada), z124 = besar(a124);
  result.push([a124, z124]);

  const a125 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z125 = besar(a125);
  result.push([a125, z125]);

  const a126 = Math.min(tekananDarah.tinggi, gulaDarah.rendah, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z126 = besar(a126);
  result.push([a126, z126]);

  const a127 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.tidak), z127 = kecil(a127);
  result.push([a127, z127]);

  const a128 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.kurus, riwayat.ada), z128 = sedang(a128);
  result.push([a128, z128]);

  const a129 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.tidak), z129 = kecil(a129);
  result.push([a129, z129]);

  const a130 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.normal, riwayat.ada), z130 = sedang(a130);
  result.push([a130, z130]);

  const a131 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z131 = sedang(a131);
  result.push([a131, z131]);

  const a132 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.rendah, bmi.obesitas, riwayat.ada), z132 = besar(a132);
  result.push([a132, z132]);

  const a133 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.tidak), z133 = kecil(a133);
  result.push([a133, z133]);

  const a134 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.kurus, riwayat.ada), z134 = sedang(a134);
  result.push([a134, z134]);

  const a135 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.tidak), z135 = kecil(a135);
  result.push([a135, z135]);

  const a136 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.normal, riwayat.ada), z136 = sedang(a136);
  result.push([a136, z136]);

  const a137 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.tidak), z137 = sedang(a137);
  result.push([a137, z137]);

  const a138 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.normal, bmi.obesitas, riwayat.ada), z138 = besar(a138);
  result.push([a138, z138]);

  const a139 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z139 = sedang(a139);
  result.push([a139, z139]);

  const a140 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.kurus, riwayat.ada), z140 = besar(a140);
  result.push([a140, z140]);

  const a141 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.tidak), z141 = sedang(a141);
  result.push([a141, z141]);

  const a142 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.normal, riwayat.ada), z142 = besar(a142);
  result.push([a142, z142]);

  const a143 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z143 = besar(a143);
  result.push([a143, z143]);

  const a144 = Math.min(tekananDarah.tinggi, gulaDarah.normal, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z144 = besar(a144);
  result.push([a144, z144]);

  const a145 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.tidak), z145 = sedang(a145);
  result.push([a145, z145]);

  const a146 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.kurus, riwayat.ada), z146 = besar(a146);
  result.push([a146, z146]);

  const a147 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.tidak), z147 = sedang(a147);
  result.push([a147, z147]);

  const a148 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.normal, riwayat.ada), z148 = besar(a148);
  result.push([a148, z148]);

  const a149 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.tidak), z149 = sedang(a149);
  result.push([a149, z149]);

  const a150 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.rendah, bmi.obesitas, riwayat.ada), z150 = besar(a150);
  result.push([a150, z150]);

  const a151 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.tidak), z151 = sedang(a151);
  result.push([a151, z151]);

  const a152 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.kurus, riwayat.ada), z152 = besar(a152);
  result.push([a152, z152]);

  const a153 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.tidak), z153 = sedang(a153);
  result.push([a153, z153]);

  const a154 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.normal, riwayat.ada), z154 = besar(a154);
  result.push([a154, z154]);

  const a155 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.tidak), z155 = besar(a155);
  result.push([a155, z155]);

  const a156 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.normal, bmi.obesitas, riwayat.ada), z156 = besar(a156);
  result.push([a156, z156]);

  const a157 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.tidak), z157 = besar(a157);
  result.push([a157, z157]);

  const a158 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.kurus, riwayat.ada), z158 = besar(a158);
  result.push([a158, z158]);

  const a159 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.tidak), z159 = besar(a159);
  result.push([a159, z159]);

  const a160 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.normal, riwayat.ada), z160 = besar(a160);
  result.push([a160, z160]);

  const a161 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.tidak), z161 = besar(a161);
  result.push([a161, z161]);

  const a162 = Math.min(tekananDarah.tinggi, gulaDarah.tinggi, kolesterol.tinggi, bmi.obesitas, riwayat.ada), z162 = besar(a162);
  result.push([a162, z162]);



  result.map(v => {
    if (v[0] !== 0) {
      a += v[0];
      az += v[0] * v[1];
    }
  });

  return az/a;

}

// console.log(resiko(128, 103, 170, 24.9, 1));