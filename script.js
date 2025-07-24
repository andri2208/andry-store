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

fetch('https://andrystore01.blogspot.com/feeds/posts/default?alt=json')
  .then(res => res.json())
  .then(data => {
    const entries = data.feed.entry || [];
    const container = document.getElementById('produk-container');
    
    entries.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate")?.href;
      const content = entry.content.$t;
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      const imgSrc = imgMatch ? imgMatch[1] : "";
      const priceMatch = content.match(/Rp[\s.]?\d[\d.]+/i);
      const harga = priceMatch ? priceMatch[0] : "Rp -";

      const card = `
        <div class="produk-card">
          <img src="${imgSrc}" alt="${title}">
          <h3>${title}</h3>
          <p>${harga}</p>
          <a href="${link}" class="btn-detail">Lihat</a>
          <button onclick="addToCart('${title}', '${harga}', '${imgSrc}')">+ Keranjang</button>
        </div>`;
      container.innerHTML += card;
    });
  });

function addToCart(nama, harga, gambar) {
  const produk = { nama, harga, gambar };
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push(produk);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert("Produk ditambahkan ke keranjang!");
  tombolWA.classList.add("wa-btn");

}

