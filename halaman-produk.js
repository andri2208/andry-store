<script>
  document.addEventListener("DOMContentLoaded", () => {
    const post = document.querySelector(".post-body");

    if (!post) return;

    // Ambil data
    const title = document.querySelector("h1.post-title").innerText;
    const content = post.innerHTML;

    const img = post.querySelector("img")?.src || "https://via.placeholder.com/500";
    const harga = (content.match(/<b>\s*Harga:\s*<\/b>\s*(Rp[\d.,]+)/i) || [])[1] || "Hubungi Kami";
    const stok = (content.match(/<b>\s*Stok:\s*<\/b>\s*(.*)/i) || [])[1] || "Tidak disebutkan";
    const pengiriman = (content.match(/<b>\s*Pengiriman:\s*<\/b>\s*(.*)/i) || [])[1] || "-";

    const deskripsi = content.split("<p>").slice(1).join("<p>").split("</p>")[0] || "";

    // Gantikan tampilan konten
    post.innerHTML = `
      <div class="detail-produk">
        <div class="detail-gambar">
          <img src="${img}" alt="${title}" />
        </div>
        <div class="detail-info">
          <h2>${title}</h2>
          <div class="harga">${harga}</div>
          <div class="info-lain">
            <p><b>Stok:</b> ${stok}</p>
            <p><b>Pengiriman:</b> ${pengiriman}</p>
          </div>
          <div class="tombol-aksi">
            <button onclick="masukkanKeranjang()">Masukkan Keranjang</button>
            <button onclick="beliSekarang()">Beli Sekarang</button>
          </div>
        </div>
      </div>
      <div class="deskripsi-produk">
        <h3>Deskripsi Produk</h3>
        <p>${deskripsi}</p>
      </div>
    `;
  });

  function masukkanKeranjang() {
    alert("Produk dimasukkan ke keranjang (simulasi)");
  }

  function beliSekarang() {
    alert("Menuju checkout (simulasi)");
  }
</script>
