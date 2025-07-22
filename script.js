async function loadProduk() {
  const container = document.getElementById('produk-list');
  const feedUrl = "https://andrystore01.blogspot.com/feeds/posts/default?alt=json&max-results=20";

  try {
    const response = await fetch(feedUrl);
    const data = await response.json();
    const entries = data.feed.entry || [];

    entries.forEach(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === "alternate").href;
      const content = post.content.$t;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      const img = tempDiv.querySelector("img")?.src || "https://via.placeholder.com/200x200?text=No+Image";
      const harga = tempDiv.querySelector("b")?.textContent || "Rp -";

      const produkHTML = `
        <div class="produk">
          <img src="${img}" alt="${title}" />
          <h3>${title}</h3>
          <p class="harga">${harga}</p>
          <a class="wa-button" href="https://wa.me/6281234567890?text=Halo,%20saya%20mau%20beli%20${encodeURIComponent(title)}" target="_blank">Beli via WA</a>
          <p><a href="${link}" target="_blank">Lihat Detail</a></p>
        </div>
      `;
      container.innerHTML += produkHTML;
    });
  } catch (e) {
    container.innerHTML = "<p>Gagal memuat produk.</p>";
    console.error("Gagal ambil produk:", e);
  }
}

document.addEventListener("DOMContentLoaded", loadProduk);
