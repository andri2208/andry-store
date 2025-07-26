const nomorWA = '081574938272';

// Menampilkan isi keranjang
function tampilkanKeranjang(containerId) {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (keranjang.length === 0) {
    container.innerHTML = '<p>Keranjang belanja kosong.</p>';
    return;
  }

  keranjang.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'item-keranjang';
    el.innerHTML = `
      <img src="${item.gambar}" alt="${item.judul}" />
      <div class="item-detail">
        <div class="item-judul">${item.judul}</div>
        <div class="item-harga">${item.harga}</div>
        <button class="hapus-btn" onclick="hapusDariKeranjang(${index})">Hapus</button>
      </div>
    `;
    container.appendChild(el);
  });
}

// Menambahkan ke keranjang
function tambahKeKeranjang(judul, link, gambar, harga) {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.push({ judul, link, gambar, harga });
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert("Produk ditambahkan ke keranjang!");
}

// Menghapus item dari keranjang
function hapusDariKeranjang(index) {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang('keranjang-container');
}

// Checkout ke WhatsApp
function kirimPesanan() {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = 'Halo, saya ingin memesan:\n';
  keranjang.forEach(item => {
    pesan += `- ${item.judul} (${item.harga})\n`;
  });

  const url = `https://wa.me/62${nomorWA.replace(/^0/, '')}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}
