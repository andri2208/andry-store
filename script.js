document.addEventListener("DOMContentLoaded", function () {
  const produkContainer = document.getElementById("daftar-produk");
  if (!produkContainer) return;

  fetch('/feeds/posts/default?alt=json')
    .then(res => res.json())
    .then(data => {
      const entries = data.feed.entry || [];
      let output = '';

      entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === 'alternate').href;
        const content = entry.content.$t;

        const imgMatch = content.match(/<img.*?src=['"](.*?)['"]/);
        const imgSrc = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/200x200?text=No+Image';

        const hargaMatch = content.match(/<b>Harga:\s*<\/b>(.*?)<br/);
        const harga = hargaMatch ? hargaMatch[1] : 'Rp -';

       output += `
  <div class="produk-item">
    <img src="${imgSrc}" alt="${title}">
    <h3>${title}</h3>
    <p class="harga">${harga}</p>
    <button class="add-to-cart"
      data-title="${title}"
      data-price="${harga.replace(/[^\d]/g, '')}"
      data-img="${imgSrc}">
      + Keranjang
    </button>
  </div>
`;


      produkContainer.innerHTML = output;
    })
    .catch(err => {
      produkContainer.innerHTML = "<p>Gagal memuat produk. Periksa koneksi atau format postingan.</p>";
      console.error("Error load produk:", err);
    });
});
