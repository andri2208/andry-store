// produk.js - Loader produk dari postingan Blogspot

async function loadProduk() {
  const container = document.getElementById("daftar-produk");
  const blogUrl = "https://andrystore01.blogspot.com/feeds/posts/default/-/produk?alt=json&max-results=20";

  try {
    const res = await fetch(blogUrl);
    const data = await res.json();
    const posts = data.feed.entry;

    if (!posts) {
      container.innerHTML = '<p>Tidak ada produk ditemukan.</p>';
      return;
    }

    posts.forEach(entry => {
      const title = entry.title.$t;
      const content = entry.content.$t;
      const thumbnail = getThumbnail(content);
      const harga = getHarga(content);

      const produkHTML = `
        <div class="produk-item">
          <img src="${thumbnail}" alt="${title}" />
          <h2>${title}</h2>
          <p>${harga}</p>
          <button onclick="tambahKeKeranjang('${title}', '${thumbnail}', '${harga}')">+ Keranjang</button>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", produkHTML);
    });
  } catch (error) {
    container.innerHTML = '<p>Gagal memuat produk.</p>';
    console.error("Gagal mengambil data:", error);
  }
}

function getThumbnail(html) {
  const imgMatch = html.match(/<img.*?src="(.*?)"/);
  return imgMatch ? imgMatch[1] : "https://via.placeholder.com/300x200?text=No+Image";
}

function getHarga(html) {
  const hargaMatch = html.match(/Harga\s*:\s*(Rp\s*\d+[.,\d]*)/i);
  return hargaMatch ? hargaMatch[1] : "Rp -";
}

function tambahKeKeranjang(judul, gambar, harga) {
  const item = { judul, gambar, harga };
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  cart.push(item);
  localStorage.setItem("keranjang", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
}

// Jalankan saat halaman dimuat
window.addEventListener("DOMContentLoaded", loadProduk);
