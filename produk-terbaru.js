// === Konfigurasi ===
const blogUrl = "https://andrystore01.blogspot.com"; // Ganti jika domain berbeda
const maxPost = 12; // Jumlah produk yang ditampilkan
const nomorWA = "6281574938272"; // Tanpa +, ganti sesuai kebutuhan

// === Fungsi utama ===
fetch(`${blogUrl}/feeds/posts/default?alt=json&max-results=${maxPost}`)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    const posts = data.feed.entry;

    if (!posts) {
      container.innerHTML = "<p>Tidak ada produk ditemukan.</p>";
      return;
    }

    let html = "";

    posts.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;

      // Ambil gambar pertama dari konten
      let thumbnail = "https://via.placeholder.com/300x300?text=No+Image";
      const content = entry.content.$t;
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) thumbnail = imgMatch[1];

      // Ambil harga dari konten
      let harga = "Hubungi kami";
      const hargaMatch = content.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i);
      if (hargaMatch) harga = "Rp" + hargaMatch[1];

      // Buat tombol WA
      const waText = `Halo kak, saya tertarik dengan produk *${title}* di Andry Store.`;
      const waLink = `https://wa.me/${nomorWA}?text=${encodeURIComponent(waText)}`;

      html += `
        <div class="produk-item">
          <a href="${link}" title="${title}">
            <img src="${thumbnail}" alt="${title}" loading="lazy" />
            <h3>${title}</h3>
          </a>
          <div class="harga">${harga}</div>
          <a href="${waLink}" target="_blank">Order via WhatsApp</a>
        </div>
      `;
    });

    container.innerHTML = html;
  })
  .catch(error => {
    document.getElementById("produk-container").innerHTML = "<p>Gagal memuat produk.</p>";
    console.error("Error:", error);
  });
