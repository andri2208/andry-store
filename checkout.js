// checkout.js - Kirim data checkout ke WhatsApp

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const nohp = document.getElementById("nohp").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const catatan = document.getElementById("catatan").value.trim();

  const cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = `*Andry Store - Order Baru*\n\n`;
  pesan += `*Nama:* ${nama}\n`;
  pesan += `*No HP:* ${nohp}\n`;
  pesan += `*Alamat:* ${alamat}\n`;
  if (catatan) pesan += `*Catatan:* ${catatan}\n`;

  pesan += `\n*Daftar Produk:*\n`;
  let total = 0;

  cart.forEach((item, i) => {
    const hargaAngka = parseInt(item.harga.replace(/\D/g, "")) || 0;
    total += hargaAngka;
    pesan += `${i + 1}. ${item.judul} - ${item.harga}\n`;
  });

  pesan += `\n*Total:* Rp ${total.toLocaleString("id-ID")}`;

  const noWa = "6281574938272";
  const waLink = `https://wa.me/${noWa}?text=${encodeURIComponent(pesan)}`;

  window.open(waLink, "_blank");
  localStorage.removeItem("keranjang");
});
