// === Konfigurasi ===
const blogUrl = "https://andrystore01.blogspot.com";
const maxPost = 100;
const itemsPerPage = 8;
const currentPage = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

// === Ambil Produk ===
fetch(`${blogUrl}/feeds/posts/default?alt=json&max-results=${maxPost}`)
  .then(res => res.json())
  .then(data => {
    const posts = data.feed.entry;
    const container = document.getElementById("produk-container");
    if (!posts) {
      container.innerHTML = "<p>Tidak ada produk.</p>";
      return;
    }

    let allItems = [];

    posts.forEach((entry, i) => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const content = entry.content.$t;
      const img = (content.match(/<img[^>]+src="([^">]+)"/) || [])[1] || "https://via.placeholder.com/300";
      const harga = (content.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i) || [])[1] || "Hubungi Kami";

      allItems.push({ title, link, img, harga });
    });

    // Pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = allItems.slice(start, end);

    container.innerHTML = pageItems.map(item => `
      <div class="produk-item">
        <a href="${item.link}" onclick="saveProduk('${item.title}', '${item.img}', '${item.harga.replace(/'/g, "")}')" title="${item.title}">
          <div class="img-wrap"><img src="${item.img}" loading="lazy" /></div>
          <h3>${item.title}</h3>
          <div class="harga">Rp${item.harga}</div>
        </a>
      </div>`).join("");

    renderPagination(allItems.length);
  });

// === Simpan Produk untuk Detail ===
function saveProduk(judul, gambar, harga) {
  localStorage.setItem("produk_terakhir", JSON.stringify({ judul, gambar, harga }));
}

// === Pagination ===
function renderPagination(totalItems) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const wrapper = document.getElementById("page-controller");
  if (!wrapper) return;
  let html = "";

  for (let i = 1; i <= pageCount; i++) {
    html += `<a href="?page=${i}" ${i === currentPage ? 'class="current"' : ''}>${i}</a>`;
  }
  wrapper.innerHTML = html;
}
