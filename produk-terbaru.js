// === Konfigurasi ===
const blogUrl = "https://andrystore01.blogspot.com";
const maxPost = 100; // Ambil semua produk, pagination akan membatasi tampilannya

// === Pagination Setting ===
const itemsPerPage = 8;
const urlParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(urlParams.get("page")) || 1;

// === Ambil Postingan Blogger ===
fetch(`${blogUrl}/feeds/posts/default?alt=json&max-results=${maxPost}`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("produk-container");
    const posts = data.feed.entry;
    if (!posts || posts.length === 0) {
      container.innerHTML = "<p>Tidak ada produk.</p>";
      return;
    }

    let allItems = "";

    posts.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;

      let thumbnail = "https://via.placeholder.com/300x300?text=No+Image";
      const content = entry.content.$t;
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) thumbnail = imgMatch[1];

      let harga = "Hubungi Kami";
      const hargaMatch = content.match(/<b>\s*Harga:\s*<\/b>\s*Rp?([\d.,]+)/i);
      if (hargaMatch) harga = "Rp" + hargaMatch[1];

      allItems += `
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

    container.innerHTML = allItems;

    // Jalankan pagination setelah semua produk masuk
    paginateProducts();
  })
  .catch(err => {
    document.getElementById("produk-container").innerHTML = "<p>Gagal memuat produk.</p>";
    console.error("Error:", err);
  });

// === Fungsi Pagination ===
function paginateProducts() {
  const container = document.getElementById("produk-container");
  const items = Array.from(container.children);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Sembunyikan semua dulu
  items.forEach(el => (el.style.display = "none"));

  // Tampilkan hanya yang sesuai halaman
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  for (let i = start; i < end && i < totalItems; i++) {
    items[i].style.display = "";
  }

  renderPagination(totalPages);
}

// === Render Tombol Pagination ===
function renderPagination(totalPages) {
  const wrapper = document.getElementById("page-controller");
  if (!wrapper) return;

  let html = "";

  if (currentPage > 1) {
    html += `<a href="?page=${currentPage - 1}">&laquo; Sebelumnya</a>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<span class="current">${i}</span>`;
    } else {
      html += `<a href="?page=${i}">${i}</a>`;
    }
  }

  if (currentPage < totalPages) {
    html += `<a href="?page=${currentPage + 1}">Berikutnya &raquo;</a>`;
  }

  wrapper.innerHTML = html;
}
