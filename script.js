function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) return callback(el);
  setTimeout(() => waitForElement(selector, callback), 100);
}

function loadProdukCallback(data) {
  waitForElement('#produk-list', (container) => {
    const entries = data.feed.entry || [];

    entries.forEach(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === "alternate").href;
      const content = post.content.$t;

      const tmp = document.createElement("div");
      tmp.innerHTML = content;

      const img = tmp.querySelector("img")?.src || "https://via.placeholder.com/200x200?text=No+Image";
      const harga = tmp.querySelector("b")?.textContent || "Rp -";

      const html = `
        <div class="produk">
          <img src="${img}" alt="${title}" />
          <h3>${title}</h3>
          <p class="harga">${harga}</p>
          <a class="wa-button" href="https://wa.me/6281574938272?text=Halo,%20saya%20mau%20beli%20${encodeURIComponent(title)}" target="_blank">Beli via WA</a>
          <p><a href="${link}" target="_blank">Detail Produk</a></p>
        </div>
      `;
      container.innerHTML += html;
    });
  });
}

// Ambil postingan untuk beranda
(function() {
  const s = document.createElement('script');
  s.src = "https://andrystore01.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadProdukCallback&max-results=8";
  document.body.appendChild(s);
})();
