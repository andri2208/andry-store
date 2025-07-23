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
      const filtered = val ? produk.filter(p => p.kategori.includes(val)) : produk;
      renderProduk(filtered);
    };

    document.getElementById("filter-sort").onchange = () => {
      const val = document.getElementById("filter-sort").value;
      const sorted = [...produk];
      if (val === "termurah") {
        sorted.sort((a, b) => parseHarga(a.harga) - parseHarga(b.harga));
      } else if (val === "termahal") {
        sorted.sort((a, b) => parseHarga(b.harga) - parseHarga(a.harga));
      } else if (val === "terbaru") {
        sorted.sort((a, b) => b.published - a.published);
      }
      renderProduk(sorted);
    };
  }

  function renderProduk(data) {
    container.innerHTML = `<div class="produk-wrapper">` + data.map(p => {
      const isBaru = (new Date() - p.published) / 86400000 <= 7;
      const badgeBaru = isBaru ? `<span class="badge-baru">Baru</span>` : "";
      const badgeDiskon = p.diskon ? `<span class="badge-diskon">-${p.diskon}%</span>` : "";
      return `
        <div class="produk-card">
          ${badgeBaru}${badgeDiskon}
          <img src="${p.img}" alt="${p.title}"/>
          <h3>${p.title}</h3>
          <p>${p.harga}</p>
          <a class="btn-wa" target="_blank" href="https://wa.me/6281574938272?text=Halo kak, saya tertarik dengan produk ini:\n${p.title}\n${p.link}">Beli via WA</a>
          <button class="btn-keranjang" onclick='tambahKeranjang(${JSON.stringify({
            title: p.title,
            harga: p.harga,
            img: p.img
          })})'>+ Keranjang</button>
        </div>
      `;
    }).join("") + `</div>`;
  }

  function tambahKeranjang(data) {
    const keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]");
    keranjang.push(data);
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
    alert("Produk ditambahkan ke keranjang!");
  }

  function parseHarga(str) {
    return parseInt(str.replace(/[^\d]/g, "")) || 0;
  }
});
