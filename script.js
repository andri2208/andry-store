(function() {
  const nomorWA_ScriptJS = '081574938272'; // Ganti nama variabel agar unik

  // Cek jika ada item di localStorage
  function ambilKeranjang() {
    return JSON.parse(localStorage.getItem('keranjang')) || [];
  }

  // Tambah produk ke keranjang
  window.tambahKeKeranjang = function(judul, link, gambar, harga) {
    const keranjang = ambilKeranjang();
    keranjang.push({ judul, link, gambar, harga });
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    alert('Produk ditambahkan ke keranjang!');
  };

  // Tampilkan isi keranjang (bisa dipanggil dari halaman keranjang.html)
  window.tampilkanKeranjang = function(containerId) {
    const keranjang = ambilKeranjang();
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (keranjang.length === 0) {
      container.innerHTML = '<p>Keranjang masih kosong.</p>';
      return;
    }

    keranjang.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'item-keranjang';
      el.innerHTML = `
        <img src="${item.gambar}" alt="${item.judul}" />
        <div class="detail">
          <div class="judul">${item.judul}</div>
          <div class="harga">${item.harga}</div>
          <button onclick="hapusDariKeranjang(${index})">Hapus</button>
        </div>
      `;
      container.appendChild(el);
    });
  };

  // Hapus item dari keranjang
  window.hapusDariKeranjang = function(index) {
    const keranjang = ambilKeranjang();
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    location.reload(); // refresh tampilan
  };

  // Kirim pesanan ke WhatsApp
  window.kirimPesanan = function() {
    const keranjang = ambilKeranjang();
    if (keranjang.length === 0) {
      alert('Keranjang kosong!');
      return;
    }

    let pesan = 'Halo, saya ingin pesan:\n\n';
    keranjang.forEach((item, i) => {
      pesan += `${i + 1}. ${item.judul} - ${item.harga}\n${item.link}\n\n`;
    });

    const waLink = `https://wa.me/62${nomorWA_ScriptJS.replace(/^0/, '')}?text=${encodeURIComponent(pesan)}`;
    window.open(waLink, '_blank');
  };
})();
