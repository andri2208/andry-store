const nomorWA = '081574938272'; // Ganti dengan nomor WA kamu (tanpa +62)

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

      // Ambil gambar dari konten
      const img = konten.match(/<img[^>]+src="([^">]+)"/);
      const gambar = img ? img[1] : 'https://via.placeholder.com/300x300?text=No+Image';

      // Ambil harga dari konten (format: "Harga: Rp 123.000" atau "Rp123000")
      const hargaMatch = konten.match(/(?:Harga|Rp)[^0-9]*(\d[\d\.]*)/i);
      const harga = hargaMatch ? 'Rp ' + hargaMatch[1].replace(/\./g, '.') : 'Harga tidak tersedia';

      // Buat elemen kartu produk
      const el = document.createElement('div');
      el.className = 'kartu-produk';
      el.innerHTML = `
        <img src="${gambar}" alt="${judul}" />
        <div class="isi-produk">
          <div class="judul-produk">${judul}</div>
          <div class="harga-produk">${harga}</div>
          <a class="btn-order" href="https://wa.me/62${nomorWA.replace(/^0/, '')}?text=${encodeURIComponent('Saya ingin pesan: ' + judul + ' ' + link)}" target="_blank">Order via WhatsApp</a>
          <button class="btn-ke-keranjang" onclick="tambahKeKeranjang('${judul}', '${link}', '${gambar}', '${harga}')">+ Keranjang</button>
        </div>
      `;
      container.appendChild(el);
    });
  } catch (e) {
    console.error('Gagal memuat produk:', e);
  }
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', ambilProduk);
