function waitForElement(selector, callback) {
  const el = document.querySelector(selector);
  if (el) return callback(el);
  setTimeout(() => waitForElement(selector, callback), 100);
}

function loadProdukCallback(data) {
  waitForElement('#produk-list', (container) => {
    const entries = data.feed.entry || [];

    entries.forEach((post, i) => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === "alternate").href;
      const content = post.content.$t;

      const tmp = document.createElement("div");
      tmp.innerHTML = content;

      const img = tmp.querySelector("img")?.src || "https://via.placeholder.com/200x200?text=No+Image";
      const harga = tmp.querySelector("b")?.textContent || "Rp -";
      const deskripsi = tmp.textContent.replace(harga, "").trim();

      const html = `
        <div class="produk" onclick="toggleDetail('produk-detail-${i}')">
          <img src="${img}" alt="${title}" />
          <h3 class="produk-judul" style="cursor:pointer;">${title}</h3>
          <p class="harga">${harga}</p>
          <div id="produk-detail-${i}" class="produk-detail" style="display:none; text-align:left; font-size:0.9rem; margin-top:0.5rem;">
            <p>${deskripsi}</p>
            <a class="wa-button" href="https://wa.me/6281574938272?text=Halo,%20saya%20mau%20beli%20${encodeURIComponent(title)}%20seharga%20${encodeURIComponent(harga)}" target="_blank">Beli Sekarang via WA</a>
          </div>
        </div>
      `;
      container.innerHTML += html;
    });
  });
}

function toggleDetail(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = el.style.display === "none" ? "block" : "none";
}

// JSONP Blogger Feed
(function() {
  const s = document.createElement('script');
  s.src = "https://andrystore01.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadProdukCallback&max-results=20";
  document.body.appendChild(s);
})();
