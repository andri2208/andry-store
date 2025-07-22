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
          <h3 class="produk-judul">
            <a href="${link}" style="text-decoration:none; color:#333;">${title}</a>
          </h3>
          <p class="harga">${harga}</p>
        </div>
      `;
      container.innerHTML += html;
    });
  });
}

// Load JSONP Blogger feed
(function() {
  const s = document.createElement('script');
  s.src = "https://andrystore01.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadProdukCallback&max-results=20";
  document.body.appendChild(s);
})();
