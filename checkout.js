const totalHarga = produk.reduce((t, p) => {
  const angka = parseInt(p.harga.replace(/\D/g, '')) || 0;
  return t + angka;
}, 0);

const invoiceData = {
  nomor: Date.now(),
  tanggal: new Date().toLocaleString(),
  nama, alamat, ekspedisi, pembayaran: bayar,
  produk,
  total: `Rp ${totalHarga.toLocaleString()}`
};

localStorage.setItem('invoiceData', JSON.stringify(invoiceData));

// Simpan ke laporan penjualan
const laporan = JSON.parse(localStorage.getItem('laporanPenjualan') || '[]');
laporan.push(invoiceData);
localStorage.setItem('laporanPenjualan', JSON.stringify(laporan));
