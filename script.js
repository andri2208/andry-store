document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("produk-list");
  if (!container) return;

  fetch("/feeds/posts/default?alt=json")
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      let html = "";

      entries.forEach(entry => {
        const title = entry.title.$t;
        const content = entry.content.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;

        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        const img = imgMatch ? imgMatch[1] : "https://via.placeholder.com/200";

        const hargaMatch = content.match(/<b>Harga:<\/b>\s*(.*?)<br/i);
        const harga = hargaMatch ? hargaMatch[1] : "Rp -";

        html += `
          <div class="produk-item">
            <a href="${link}">
              <img src="${img}" alt="${title}" />
              <h3>${title}</h3>
              <p class="harga">${harga}</p>
            </a>
          </div>`;
      });

      container.innerHTML = html || "<p>Tidak ada produk ditemukan.</p>";
    })
    .catch(err => {
      console.error("Gagal load produk:", err);
      container.innerHTML = "<p>Gagal memuat produk.</p>";
    });
});
