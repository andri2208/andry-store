const WA = '6281574938272'; // Ganti nomor admin

const produk = JSON.parse(localStorage.getItem('keranjang') || '[]');
const wrapper = document.getElementById('checkout-produk');
if (produk.length === 0) {
  wrapper.innerHTML = '<p>Keranjang kosong.</p>';
} else {
  wrapper.innerHTML = produk.map(p => `
    <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
      <strong>${p.title}</strong><br/>
      Harga: ${p.harga}<br/>
      <img src="${p.img}" width="100">
    </div>
  `).join('');
}

document.getElementById('checkout-form').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const ekspedisi = document.getElementById('ekspedisi').value;
  const bayar = document.getElementById('pembayaran').value;

  let pesan = `*PESANAN BARU*%0A%0A`;
  pesan += `Nama: ${nama}%0A`;
  pesan += `Alamat: ${alamat}%0A`;
  pesan += `Ekspedisi: ${ekspedisi}%0A`;
  pesan += `Pembayaran: ${bayar}%0A%0A`;
  pesan += `Produk:%0A`;

  produk.forEach(p => {
    pesan += `- ${p.title} (${p.harga})%0A`;
  });

  const url = `https://wa.me/${WA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
});
