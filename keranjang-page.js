document.addEventListener('DOMContentLoaded', () => {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  const keranjangEl = document.getElementById('keranjang');
  let total = 0;

  if (keranjang.length === 0) {
    keranjangEl.innerHTML = '<p>Keranjang kosong.</p>';
    return;
  }

  keranjang.forEach((item, i) => {
    total += parseInt(item.harga.replace(/\D/g, '') || 0);

    const el = document.createElement('div');
    el.className = 'item-keranjang';
    el.innerHTML = `
      <img src="${item.gambar}" alt="${item.judul}" />
      <div class="info-produk">
        <div class="judul">${item.judul}</div>
        <div class="harga">${item.harga}</div>
        <div class="hapus" onclick="hapusItem(${i})">Hapus</div>
      </div>
    `;
    keranjangEl.appendChild(el);
  });

  keranjangEl.innerHTML += `
    <div class="total-harga">Total: Rp ${total.toLocaleString('id-ID')}</div>
    <a class="btn-checkout" href="${buatLinkCheckout(keranjang)}" target="_blank">Checkout via WhatsApp</a>
  `;
});

function hapusItem(index) {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  location.reload();
}

function buatLinkCheckout(data) {
  const nomor = '081574938272';
  let pesan = 'Halo, saya ingin memesan:\n\n';
  data.forEach(item => {
    pesan += `- ${item.judul} (${item.harga})\n`;
  });
  pesan += '\nTerima kasih.';
  return `https://wa.me/62${nomor.replace(/^0/, '')}?text=${encodeURIComponent(pesan)}`;
}
