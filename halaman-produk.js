// halaman-produk.js - Detail Produk dari Postingan

window.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".post-body");
  if (!content) return;

  const title = document.querySelector(".post-title")?.innerText || "";
  const img = content.querySelector("img")?.src || "https://via.placeholder.com/600x600?text=No+Image";
  const hargaMatch = content.innerHTML.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i);
  const harga = hargaMatch ? "Rp" + hargaMatch[1] : "Hubungi Kami";

  const deskripsi = content.innerHTML;
  const waText = `Halo kak, saya tertarik dengan produk *${title}* di Andry Store.`;
  const waLink = `https://wa.me/6281574938272?text=${encodeURIComponent(waText)}`;

  const detailHTML = `
    <div class="produk-detail">
      <div class="detail-gambar">
        <img src="${img}" alt="${title}" />
      </div>
      <div class="detail-info">
        <h1 class="produk-nama">${title}</h1>
        <div class="produk-harga">${harga}</div>
        <div class="produk-stok">Stok: Tersedia</div>
        <div class="produk-kirim">Pengiriman: Seluruh Indonesia</div>
        <div class="aksi-produk">
          <button onclick="tambahKeranjang()">Masukkan Keranjang</button>
          <a href="${waLink}" target="_blank"><button>Beli Sekarang</button></a>
        </div>
      </div>
    </div>
    <div class="deskripsi-produk">
      <h3>Deskripsi Produk</h3>
      ${deskripsi}
    </div>
  `;

  content.innerHTML = detailHTML;

  window.tambahKeranjang = function () {
    const produk = {
      nama: title,
      harga: harga,
      gambar: img,
      link: window.location.href
    };
    let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    keranjang.push(produk);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert("Produk ditambahkan ke keranjang!");
  };
});
