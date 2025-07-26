
// Cek jika nomorWA belum dideklarasikan
if (typeof nomorWA === 'undefined') {
  var nomorWA = '081574938272';
}

// Fungsi Tambah ke Keranjang
function tambahKeKeranjang(judul, link, gambar, harga) {
  const produk = { judul, link, gambar, harga };
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.push(produk);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert('Produk ditambahkan ke keranjang!');
}

// Fungsi Tampilkan Produk dari Feed Blogger
async function ambilProduk() {
  try {
    const res = await fetch('/feeds/posts/default?alt=json&max-results=100');
    const data = await res.json();
    const entri = data.feed.entry || [];
    const container = document.getElementById('daftar-produk');
    if (!container) return;

    entri.forEach(item => {
      const judul = item.title.$t;
      const link = item.link.find(l => l.rel === 'alternate').href;
      const konten = item.content.$t;

      const img = konten.match(/<img[^>]+src="([^">]+)"/);
      const gambar = img ? img[1] : 'https://via.placeholder.com/300x300?text=No+Image';

      const hargaMatch = konten.match(/(?:Harga|Rp)[^0-9]*(\d[\d\.]*)/i);
      const harga = hargaMatch ? 'Rp ' + hargaMatch[1].replace(/\./g, '.') : 'Harga tidak tersedia';

      const el = document.createElement('div');
      el.className = 'kartu-produk';
      el.innerHTML = `
        <img src="${gambar}" style="width:100%;aspect-ratio:1/1;object-fit:cover;" />
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

// Fungsi Tampilkan Isi Keranjang
function tampilkanKeranjang() {
  const daftar = document.getElementById('isi-keranjang');
  if (!daftar) return;

  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  daftar.innerHTML = '';

  if (keranjang.length === 0) {
    daftar.innerHTML = '<p>Keranjang masih kosong.</p>';
    return;
  }

  keranjang.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'item-keranjang';
    el.innerHTML = `
      <img src="${item.gambar}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;" />
      <div class="info-item">
        <div class="judul">${item.judul}</div>
        <div class="harga">${item.harga}</div>
        <a href="${item.link}" target="_blank">Lihat Produk</a>
        <button onclick="hapusDariKeranjang(${index})">Hapus</button>
      </div>
    `;
    daftar.appendChild(el);
  });
}

// Hapus Item Keranjang
function hapusDariKeranjang(index) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang();
}

// Panggil otomatis jika elemen ada
document.addEventListener('DOMContentLoaded', () => {
  ambilProduk();
  tampilkanKeranjang();
});
