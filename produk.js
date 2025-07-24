document.addEventListener("DOMContentLoaded", function () {
  const feedUrl = '/feeds/posts/default/-/produk?alt=json&max-results=20';
  const container = document.querySelector(".produk-grid");
  const nomorWA = "6281574938272"; // Nomor WA

  if (!container) return;

  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      const entries = data.feed.entry || [];

      entries.forEach(entry => {
        const title = entry.title.$t;
        const content = entry.content.$t;

        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const image = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/300x180?text=No+Image';

        const hargaMatch = content.match(/(?:Harga|Rp)[^<\n]+/i);
        const harga = hargaMatch ? hargaMatch[0] : 'Harga tidak tersedia';

        const card = document.createElement("div");
        card.className = "produk-card";
        card.innerHTML = `
          <img src="${image}" alt="${title}">
          <h3>${title}</h3>
          <div class="harga">${harga}</div>
        `;

        const btnWA = document.createElement("a");
        const pesanWA = `Halo kak, saya ingin pesan produk:\n\n*${title}*\nHarga: ${harga}\n\nMohon info stok dan cara ordernya ya.`;
        btnWA.href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;
        btnWA.target = "_blank";
        btnWA.className = "wa-btn";
        btnWA.textContent = "Pesan via WhatsApp";

        card.appendChild(btnWA);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Gagal memuat produk:', error);
      container.innerHTML = "<p>Tidak dapat memuat produk.</p>";
    });
});
