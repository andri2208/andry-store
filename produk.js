async function ambilProduk() {
  const feed = await fetch("/feeds/posts/summary?alt=json&max-results=20");
  const data = await feed.json();
  const container = document.getElementById("produkList");
  container.innerHTML = "";

  data.feed.entry.forEach(item => {
    const title = item.title.$t;
    const link = item.link.find(l => l.rel === "alternate").href;
    const content = item.content.$t;
    const parser = new DOMParser().parseFromString(content, "text/html");
    const img = parser.querySelector("img")?.src || "https://via.placeholder.com/300x300?text=No+Image";
    const harga = (content.match(/Rp[\d.]+/) || ["Rp -"])[0];

    const card = `
      <div class="produk-card">
        <img src="${img}" alt="${title}" />
        <h3>${title}</h3>
        <p>${harga}</p>
        <button onclick="location.href='https://wa.me/6281574938272?text=Halo kak, saya mau beli *${title}* dengan harga *${harga}* via Andry Store: ${link}'">Pesan via WA</button>
      </div>
    `;
    container.innerHTML += card;
  });
}

ambilProduk();

<button onclick="tambahKeranjang('${title}', '${harga}')">+ Keranjang</button>
function tambahKeranjang(nama, harga) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push({ nama, harga });
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert("Ditambahkan ke keranjang!");
}

