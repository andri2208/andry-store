// script.js - Menampilkan produk dari postingan berlabel "produk"

const blogURL = "https://andrystore01.blogspot.com";
const feedURL = `${blogURL}/feeds/posts/default/-/produk?alt=json&max-results=30`;
const wrapper = document.getElementById("produk-wrapper");
const kategoriSelect = document.createElement("select");
kategoriSelect.innerHTML = `<option value="">Filter Kategori</option>`;
kategoriSelect.id = "filter-kategori";

const urutkanSelect = document.createElement("select");
urutkanSelect.innerHTML = `
  <option value="">Urutkan</option>
  <option value="asc">Harga Termurah</option>
  <option value="desc">Harga Termahal</option>
`;
urutkanSelect.id = "sort-produk";

wrapper.before(kategoriSelect, urutkanSelect);

fetch(feedURL)
  .then(res => res.json())
  .then(data => {
    const posts = data.feed.entry || [];
    const produk = posts.map(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const content = entry.content.$t;
      const img = content.match(/<img[^>]+src="([^"]+)"/)?.[1] || "";
      const harga = content.match(/Harga:\s*(Rp\s?[0-9\.]+)/i)?.[1] || "Rp -";
      const kategori = (entry.category || []).map(c => c.term).filter(k => k !== 'produk');
      const isBaru = new Date(entry.published.$t) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const diskon = content.match(/Diskon:\s*(\d+)%/i)?.[1];

      return { title, link, img, harga, kategori, isBaru, diskon };
    });

    const semuaKategori = [...new Set(produk.flatMap(p => p.kategori))];
    semuaKategori.forEach(kat => {
      const opt = document.createElement("option");
      opt.value = kat; opt.textContent = kat;
      kategoriSelect.appendChild(opt);
    });

    function tampilkanProduk(list) {
      wrapper.innerHTML = list.map(p => `
        <div class="produk-card">
          ${p.diskon ? `<div class="badge-diskon">-${p.diskon}%</div>` : ""}
          ${p.isBaru ? `<div class="badge-baru">Baru</div>` : ""}
          <img src="${p.img}" alt="${p.title}" />
          <h3>${p.title}</h3>
          <p>${p.harga}</p>
          <a class="btn-wa" href="https://wa.me/${getWA()}?text=Halo, saya mau pesan: ${encodeURIComponent(p.title)}%0ALink: ${p.link}" target="_blank">Beli via WA</a>
          <button class="btn-add-cart" onclick='tambahKeKeranjang(${JSON.stringify(p)})'>+ Keranjang</button>
        </div>
      `).join("");
    }

    kategoriSelect.addEventListener("change", () => {
      const val = kategoriSelect.value;
      const hasil = val ? produk.filter(p => p.kategori.includes(val)) : produk;
      tampilkanProduk(hasil);
    });

    urutkanSelect.addEventListener("change", () => {
      const val = urutkanSelect.value;
      const data = kategoriSelect.value ? produk.filter(p => p.kategori.includes(kategoriSelect.value)) : [...produk];
      if (val === "asc") data.sort((a, b) => hargaNumber(a.harga) - hargaNumber(b.harga));
      if (val === "desc") data.sort((a, b) => hargaNumber(b.harga) - hargaNumber(a.harga));
      tampilkanProduk(data);
    });

    tampilkanProduk(produk);
  });

function hargaNumber(rp) {
  return parseInt((rp || "0").replace(/\D/g, "")) || 0;
}

function getWA() {
  const el = document.querySelector("#data-toko");
  return el?.getAttribute("data-wa") || "6281234567890";
}

function tambahKeKeranjang(p) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]");
  keranjang.push(p);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert("Produk ditambahkan ke keranjang");
}
