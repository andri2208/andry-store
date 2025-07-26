// Hanya deklarasi jika belum ada
if (typeof nomorWA === 'undefined') {
  var nomorWA = '081574938272';
}


// ===== Tambah ke Keranjang =====
function tambahKeKeranjang(judul, link, gambar, harga) {
  const item = { judul, link, gambar, harga };
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  // Cek duplikat
  if (!keranjang.some(p => p.judul === judul)) {
    keranjang.push(item);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    alert("Produk ditambahkan ke keranjang!");
  } else {
    alert("Produk sudah ada di keranjang.");
  }
}

// ===== Tampilkan Isi Keranjang =====
function tampilkanKeranjang(idContainer) {
  const container = document.getElementById(idContainer);
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

  if (keranjang.length === 0) {
    container.innerHTML = "<p>Keranjang kamu kosong.</p>";
    return;
  }

  container.innerHTML = '';
  keranjang.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "item-keranjang";
    el.innerHTML = `
      <img src="${item.gambar}" alt="${item.judul}" />
      <div class="item-detail">
        <div class="item-judul">${item.judul}</div>
        <div class="item-harga">${item.harga}</div>
        <a href="${item.link}" target="_blank">Lihat Produk</a><br/>
        <button class="hapus-btn" onclick="hapusDariKeranjang(${index})">Hapus</button>
      </div>
    `;
    container.appendChild(el);
  });
}

// ===== Hapus Produk dari Keranjang =====
function hapusDariKeranjang(index) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang("keranjang-container");
}

// ===== Kirim Pesanan via WhatsApp =====
function kirimPesanan() {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (keranjang.length === 0) {
    alert("Keranjang kosong.");
    return;
  }

  let pesan = "Halo, saya ingin pesan:\n\n";
  keranjang.forEach((item, i) => {
    pesan += `${i + 1}. ${item.judul}\n${item.harga}\n${item.link}\n\n`;
  });

  const urlWA = `https://wa.me/62${nomorWA.replace(/^0/, '')}?text=${encodeURIComponent(pesan)}`;
  window.open(urlWA, "_blank");
}
