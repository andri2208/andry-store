document.addEventListener("DOMContentLoaded", function () {
  const blogURL = "https://andrystore01.blogspot.com";
  const container = document.querySelector("#konten-blog");
  const kategoriList = new Set();
  let produk = [];

  fetch(`${blogURL}/feeds/posts/default/-/produk?alt=json&max-results=100`)
    .then(res => res.json())
    .then(data => {
      const posts = data.feed.entry || [];
      produk = posts.map(post => {
        const title = post.title.$t;
        const link = post.link.find(l => l.rel === "alternate").href;
        const content = post.content.$t;
        const published = new Date(post.published.$t);
        const labels = post.category?.map(l => l.term) || [];
        const img = /<img[^>]+src="([^">]+)"/.exec(content)?.[1] || "";

        // Ekstrak harga dan diskon dari isi
        const hargaMatch = /Harga:\s*Rp\s*([\d.]+)/i.exec(content);
        const diskonMatch = /Diskon:\s*(\d+)%/i.exec(content);
        const kategoriMatch = /Kategori:\s*([^\n<]+)/i.exec(content);

        const harga = hargaMatch ? `Rp ${hargaMatch[1]}` : "Rp -";
        const diskon = diskonMatch ? parseInt(diskonMatch[1]) : 0;
        const kategori = kategoriMatch ? kategoriMatch[1].split(",").map(k => k.trim()) : labels;

        kategori.forEach(k => kategoriList.add(k));

        return { title, link, content, harga, img, diskon, published, kategori };
      });

      renderFilter([...kategoriList]);
      renderProduk(produk);
    });

  function renderFilter(kategoris) {
    const filterHTML = `
      <div style="padding:10px;text-align:center">
        <select id="filter-kat"><option value="">Semua Kategori</option>
          ${kategoris.map(k => `<option value="${k}">${k}</option>`).join("")}
        </select>
        <select id="filter-sort">
          <option value="">Urutkan</option>
          <option value="termurah">Harga Termurah</option>
          <option value="termahal">Harga Termahal</option>
          <option value="terbaru">Produk Terbaru</option>
        </select>
      </div>`;
    container.insertAdjacentHTML("beforebegin", filterHTML);

    document.getElementById("filter-kat").onchange = () => {
      const val = document.getElementById("filter-kat").value;
