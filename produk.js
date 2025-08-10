(function(){
  const LABEL = "Produk";
  const MAX_ITEMS = 10;
  const container = document.getElementById("products");
  const feedUrl = `https://andrystore01.blogspot.com/feeds/posts/default/-/${LABEL}?alt=json&max-results=${MAX_ITEMS}`;

  fetch(feedUrl)
    .then(response => response.json())
    .then(data => {
      const entries = data.feed.entry || [];
      if(entries.length === 0) {
        container.innerHTML = "<p>Tidak ada produk ditemukan.</p>";
        return;
      }
      let html = "";
      entries.forEach(post => {
        const title = post.title.$t;
        let postUrl = "";
        if(post.link) {
          for(let i=0; i < post.link.length; i++) {
            if(post.link[i].rel === "alternate") {
              postUrl = post.link[i].href;
              break;
            }
          }
        }
        let imgUrl = "https://via.placeholder.com/300x180?text=No+Image";
        if(post.media$thumbnail) {
          imgUrl = post.media$thumbnail.url.replace(/\/s72\-c\//, "/s320/");
        } else {
          const content = post.content.$t;
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
          if(imgMatch) {
            imgUrl = imgMatch[1];
          }
        }
        const content = post.content.$t;
        let price = "";
        const priceMatch = content.match(/Harga\s*:\s*Rp\s*([\d\.,]+)/i);
        if(priceMatch) {
          price = "Rp " + priceMatch[1];
        }
        html += `
          <article class="product">
            <img src="${imgUrl}" alt="${title}" />
            <div class="product-info">
              <div class="product-title">${title}</div>
              <div class="product-price">${price}</div>
              <a href="${postUrl}" class="btn-detail" target="_blank" rel="noopener">Detail</a>
            </div>
          </article>
        `;
      });
      container.innerHTML = html;
    })
    .catch(() => {
      container.innerHTML = "<p>Gagal memuat produk.</p>";
    });
})();
