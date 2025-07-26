
async function ambilProduk() {
  try {
    const res = await fetch('/feeds/posts/default?alt=json&max-results=100');
    const data = await res.json();
    const entri = data.feed.entry || [];
    const container = document.getElementById('daftar-produk');

    entri.forEach(item => {
      const judul = item.title.$t;
      const link = item.link.find(l => l.rel === 'alternate').href;
      const konten = item.content.$t;

      const img = konten.match(/<img[^>]+src="([^">]+)"/);
      const gambar = img ? img[1] : 'https://via.placeholder.com/300x200?text=No+Image';

      const hargaMatch = konten.match(/(?:Harga|Rp)[^0-9]*(\d[\d\.]*)/i);
      const harga = hargaMatch ? 'Rp ' + hargaMatch[1].replace(/\./g, '.') : 'Harga tidak tersedia';

      const el = document.createElement('div');
      el.className = 'kartu-produk';
      el.innerHTML = `
        <img src="${gambar}" alt="${judul}" />
        <div class="isi-produk">
          <div class="judul-produk">${judul}</div>
          <div class="harga-produk">${harga}</div>
          <a class="btn-order" href="https://wa.me/62${nomorWA.replace(/^0/, '')}?text=Halo%2C%20saya%20ingin%20pesan%20produk%20${encodeURIComponent(judul)}%20${encodeURIComponent(link)}" target="_blank">Order via WhatsApp</a>
        </div>
      `;
      container.appendChild(el);
    });

  } catch (e) {
    console.error('Gagal memuat produk:', e);
  }
}

ambilProduk();
