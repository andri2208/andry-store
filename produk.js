document.addEventListener("DOMContentLoaded", function () {
  const nomorWA = "6281574938272"; // Ganti jika perlu
  const produkCards = document.querySelectorAll(".produk-card");

  produkCards.forEach(function (card) {
    const namaProduk = card.querySelector("h3")?.textContent.trim();
    const hargaProduk = card.querySelector(".harga")?.textContent.trim();
    const tombolWA = document.createElement("a");

    const linkWA = `https://wa.me/${nomorWA}?text=Halo kak, saya ingin pesan produk:\n\n*${namaProduk}*\nHarga: ${hargaProduk}\n\nMohon info stok dan cara ordernya ya.`;

    tombolWA.href = linkWA;
    tombolWA.target = "_blank";
    tombolWA.innerText = "Pesan via WhatsApp";
    tombolWA.style = `
      display: block;
      margin: 10px;
      padding: 8px;
      background: #25D366;
      color: white;
      text-align: center;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
    `;

    card.appendChild(tombolWA);
  });
});
