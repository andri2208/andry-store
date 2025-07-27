document.addEventListener("DOMContentLoaded", () => {
  const post = document.querySelector(".post-body");
  if (!post) return;

  const data = localStorage.getItem("produk_terakhir");
  if (!data) return;

  const { judul, gambar, harga } = JSON.parse(data);
  const konten = post.innerHTML;
  const pengiriman = (konten.match(/<b>\s*Pengiriman:\s*<\/b>\s*(.*)/i) || [])[1] || "Toko Andry Store";
  const stok = (konten.match(/<b>\s*Stok:\s*<\/b>\s*(.*)/i) || [])[1] || "Tersedia";

  post.innerHTML = `
    <div class="produk-detail">
      <div class="detail-gambar"><img src="${gambar}" /></div>
      <div class="detail-info">
        <h2>${judul}</h2>
        <div class="harga">Rp${harga}</div>
        <p><b>Stok:</b> ${stok}</p>
        <p><b>Pengiriman:</b> ${pengiriman}</p>
        <div class="aksi-produk">
          <button onclick="tambahKeranjang()">Masukkan Keranjang</button>
          <button onclick="beliSekarang()">Beli Sekarang</button>
        </div>
      </div>
    </div>
    <div class="deskripsi-produk">
      <h3>Deskripsi Produk</h3>
      ${konten}
    </div>
  `;
});

function tambahKeranjang() {
  const data = JSON.parse(localStorage.getItem("produk_terakhir"));
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  cart.push(data);
  localStorage.setItem("keranjang", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang.");
}

function beliSekarang() {
  window.location.href = "/p/checkout.html";
}
