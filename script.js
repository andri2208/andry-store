// Ambil data WA dari konfigurasi
const tokoData = document.getElementById('data-toko');
const nomorWA = tokoData?.getAttribute('data-wa') || '6281574938272';

// Fungsi ambil postingan via Blogger JSON Feed
fetch('/feeds/posts/default/-/produk?alt=json&max-results=10')
  .then(res => res.json())
  .then(data => {
    const wrapper = document.getElementById('produk-wrapper');
    const posts = data.feed.entry || [];

    posts.forEach(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;
      const content = post.content.$t;

      // Ambil gambar pertama dari konten
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const img = imgMatch ? imgMatch[1] : 'https://via.placeholder.com/300x300?text=No+Image';

      // Ambil harga (misal: Harga: Rp 30.000)
      const hargaMatch = content.match(/Harga[:：]\s*(Rp[0-9.,]+)/i);
      const harga = hargaMatch ? hargaMatch[1] : 'Hubungi CS';

      // Format pesan WA
      const pesan = `Halo, saya tertarik dengan produk ini:%0A${title}%0AHarga: ${harga}%0ALink: ${link}`;
      const waLink = `https://wa.me/${nomorWA}?text=${pesan}`;

      // Buat elemen kartu produk
      const card = document.createElement('div');
      card.className = 'produk-card';
      card.innerHTML = `
        <img src="${img}" alt="${title}" style="width:100%; max-height:300px; object-fit:cover;">
        <h3>${title}</h3>
        <p><strong>${harga}</strong></p>
        <a class="btn-wa" href="${waLink}" target="_blank">Beli via WhatsApp</a>
      `;

      wrapper.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Gagal memuat produk:', err);
    const wrapper = document.getElementById('produk-wrapper');
    if (wrapper) wrapper.innerHTML = '<p>Produk tidak tersedia saat ini.</p>';
  });
