<script>
async function loadProduk() {
  const container = document.getElementById('produk-list');
  const response = await fetch("https://andrystore01.blogspot.com/feeds/posts/default?alt=json&max-results=10");
  const data = await response.json();

  const entries = data.feed.entry || [];

  entries.forEach(post => {
    const title = post.title.$t;
    const link = post.link.find(l => l.rel === "alternate").href;
    const content = post.content.$t;

    // Ambil gambar pertama dari isi postingan
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const img = tempDiv.querySelector("img")?.src || "https://via.placeholder.com/200x200?text=No+Image";

    // Ambil harga dari isi postingan (misal <b>Rp99.000</b>)
    const harga = tempDiv.querySelector("b")?.textContent || "Rp -";

    // Render produk
    const produkHTML = `
      <div class="produk">
        <img src="${img}" alt="${title}" />
        <h3>${title}</h3>
        <p class="harga">${harga}</p>
        <a class="wa-button" href="https://wa.me/6281574938272?text=Halo,%20saya%20mau%20beli%20${encodeURIComponent(title)}" target="_blank">Beli via WA</a>
        <p><a href="${link}" target="_blank">Lihat Detail</a></p>
      </div>
    `;
    container.innerHTML += produkHTML;
  });
}

document.addEventListener("DOMContentLoaded", loadProduk);
</script>
