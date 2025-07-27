// === Konfigurasi ===
const blogUrl = "https://andrystore01.blogspot.com";
const maxPost = 12;
const nomorWA = "6281574938272";

// === Ambil Postingan ===
fetch(`${blogUrl}/feeds/posts/default?alt=json&max-results=${maxPost}`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    const posts = data.feed.entry;
    if (!posts) {
      container.innerHTML = "<p>Tidak ada produk.</p>";
      return;
    }

    let html = "";
    posts.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;

      let thumbnail = "https://via.placeholder.com/300x300?text=No+Image";
      const content = entry.content.$t;
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) thumbnail = imgMatch[1];

      let harga = "Hubungi Kami";
      const hargaMatch = content.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i);
      if (hargaMatch) harga = "Rp" + hargaMatch[1];

      const waText = `Halo kak, saya tertarik dengan produk *${title}* di Andry Store.`;
      const waLink = `https://wa.me/${nomorWA}?text=${encodeURIComponent(waText)}`;

      html += `
  <div class="produk-item">
    <a href="${link}" title="${title}">
      <div class="img-wrap">
        <img src="${thumbnail}" alt="${title}" loading="lazy" />
      </div>
      <h3>${title}</h3>
      <div class="harga">${harga}</div>
    </a>
  </div>
`;

    });

    container.innerHTML = html;
  })
  .catch(err => {
    document.getElementById("produk-container").innerHTML = "<p>Gagal memuat produk.</p>";
    console.error("Error:", err);
  });
