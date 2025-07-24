document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("daftar-produk");
  if (!container) return;

  fetch("/feeds/posts/default?alt=json&max-results=50")
    .then((res) => res.json())
    .then((data) => {
      const posts = data.feed.entry || [];
      let html = "";

      posts.forEach((post) => {
        const title = post.title.$t;
        const link = post.link.find(l => l.rel === "alternate").href;
        const content = post.content.$t;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const img = doc.querySelector("img");
        const priceMatch = content.match(/Rp[\s\S]{0,10}[\d.]+/gi);
        const price = priceMatch ? priceMatch[0].replace(/<\/?[^>]+(>|$)/g, "") : "Rp -";

        html += `
          <div class="produk-item" style="border:1px solid #ddd; margin:10px; border-radius:10px; overflow:hidden">
            <a href="${link}" style="text-decoration:none; color:inherit;">
              <img src="${img ? img.src : 'https://via.placeholder.com/300'}" alt="${title}" style="width:100%; height:auto;">
              <div style="padding:10px; text-align:center;">
                <h3 style="color:orange;">${title}</h3>
                <p style="color:#f44336; font-weight:bold;">${price}</p>
              </div>
            </a>
          </div>`;
      });

      container.innerHTML = html || "<p>Tidak ada produk ditemukan.</p>";
    })
    .catch((err) => {
      console.error("Gagal memuat produk:", err);
      container.innerHTML = "<p>Gagal memuat produk.</p>";
    });
});
