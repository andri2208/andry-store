document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("keranjang")) || [];
  const container = document.getElementById("checkout-container");

  if (data.length === 0) {
    container.innerHTML = "<p>Keranjang kosong.</p>";
    return;
  }

  let total = 0;
  let html = "<ul class='keranjang-list'>";
  data.forEach((item, i) => {
    const hargaNum = parseInt(item.harga.replace(/\D/g, "")) || 0;
    total += hargaNum;
    html += `
      <li>
        <img src="${item.gambar}" />
        <div>
          <b>${item.judul}</b>
          <p>Rp${item.harga}</p>
        </div>
        <button onclick="hapusProduk(${i})">Hapus</button>
      </li>`;
  });
  html += "</ul>";

  html += `<div class="total-belanja">
    <p>Total: <b>Rp${total.toLocaleString("id-ID")}</b></p>
    <a href="https://wa.me/6281574938272?text=${encodeURIComponent(formatWA(data, total))}" target="_blank" class="checkout-btn">Checkout via WhatsApp</a>
  </div>`;

  container.innerHTML = html;
});

function formatWA(data, total) {
  let pesan = "Halo kak, saya ingin memesan:\n";
  data.forEach((p, i) => {
    pesan += `${i + 1}. ${p.judul} - Rp${p.harga}\n`;
  });
  pesan += `\nTotal: Rp${total.toLocaleString("id-ID")}`;
  return pesan;
}

function hapusProduk(index) {
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  cart.splice(index, 1);
  localStorage.setItem("keranjang", JSON.stringify(cart));
  location.reload();
}
