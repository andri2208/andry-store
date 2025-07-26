window.nomorWA
function tambahKeKeranjang(judul, link, gambar, harga) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  const sudahAda = keranjang.find(item => item.judul === judul);
  if (sudahAda) {
    alert('Produk sudah ada di keranjang!');
    return;
  }

  keranjang.push({ judul, link, gambar, harga });
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert('Produk ditambahkan ke keranjang!');
}
