// produk-terbaru.js - FINAL (Updated Link Fix)

const blogUrl = "https://andrystore01.blogspot.com";
const maxPost = 12;
const nomorWA = "6281574938272";
let startIndex = 1;

function loadProduk(start = 1) {
  fetch(`${blogUrl}/feeds/posts/default?alt=json&max-results=${maxPost}&start-index=${start}`)
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

        let link = "#";
        if (entry.link && Array.isArray(entry.link)) {
          const alt = entry.link.find(l => l.rel === "alternate");
          link = alt ? alt.href : entry.link[0].href;
        }

        let thumbnail = "https://via.placeholder.com/300x300?text=No+Image";
        const content = entry.content.$t;
        const imgMatch = content.match(/<img[^>]+src=\"([^\">]+)\"/);
        if (imgMatch) thumbnail = imgMatch[1];

        let harga = "Hubungi Kami";
        const hargaMatch = content.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i);
        if (hargaMatch) harga = "Rp" + hargaMatch[1];

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

      const total = parseInt(data.feed.openSearch$totalResults.$t);
      const totalPages = Math.ceil(total / maxPost);
      renderPagination(totalPages, start);
    })
    .catch(err => {
      document.getElementById("produk-container").innerHTML = "<p>Gagal memuat produk.</p>";
      console.error("Error:", err);
    });
}

function renderPagination(totalPages, currentStart) {
  const pageContainer = document.getElementById("page-controller");
  if (!pageContainer) return;

  const currentPage = Math.ceil(currentStart / maxPost);
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    const start = (i - 1) * maxPost + 1;
    html += `<button onclick="loadProduk(${start})" ${i === currentPage ? 'style="background:#ff5722;color:white"' : ''}>${i}</button>`;
  }
  pageContainer.innerHTML = html;
}

// Load pertama
loadProduk();
