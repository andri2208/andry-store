document.addEventListener("DOMContentLoaded", function () {
  const feedUrl = '/feeds/posts/default/-/produk?alt=json&max-results=20';
  const container = document.querySelector(".produk-grid");
  const nomorWA = "6281574938272"; // Ganti dengan nomor Anda

  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      const entries = data.feed.entry || [];

      entries.forEach(entry => {
        const title = entry.title.$t;
        const content = entry.content.$t;

        // Ambil gambar pertama
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        const image = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/300x180?text=No+Image';

        // Ambil harga dari isi konten
        const hargaMatch = content.match(/(?:Harga|Rp)[^<\n]+/i);
        const harga = hargaMatch ? hargaMatch[0] : 'Harga tidak tersedia';

        // Buat elemen produk
        const card = document.createElement("div");
        card.className = "produk-card";
        card.innerHTML = `
          <img src="${image}" alt="${title}">
          <h3>${title}</h3>
          <div class="harga">${harga}</div>
        `;

        // Tambah tombol WhatsApp
        const btnWA = document.createElement("a");
        const pesanWA = `Halo kak, saya ingin pesan produk:\n\n*${title}*\nHarga: ${harga}\n\nMohon info stok dan cara ordernya ya.`;
        btnWA.href = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanWA)}`;
        btnWA.target = "_blank";
        btnWA.textContent = "Pesan via WhatsApp";
        btnWA.style = `
          display: block;
          margin: 0 10px 12px;
          padding: 8px;
          background: #25D366;
          color: white;
          text-align: center;
          border-radius: 6px;
          font-weight: bold;
          text-decoration: none;
        `;

        card.appendChild(btnWA);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Gagal memuat produk:', error);
      container.innerHTML = "<p>Tidak dapat memuat produk.</p>";
    });
});
