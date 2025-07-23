const tokoData = document.getElementById('data-toko');
const nomorWA = tokoData?.getAttribute('data-wa') || '6281574938272';

const wrapper = document.getElementById('produk-wrapper');

// Dropdown Sorting
const sorter = document.createElement('select');
sorter.innerHTML = `
  <option value="">Urutkan</option>
  <option value="az">Nama A-Z</option>
  <option value="za">Nama Z-A</option>
`;
sorter.style.marginBottom = '20px';
wrapper?.before(sorter);

sorter.addEventListener('change', () => {
  const cards = Array.from(wrapper.querySelectorAll('.produk-card'));
  const sorted = cards.sort((a, b) => {
    const nameA = a.dataset.nama.toLowerCase();
    const nameB = b.dataset.nama.toLowerCase();
    return sorter.value === 'az' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  wrapper.innerHTML = '';
  sorted.forEach(c => wrapper.appendChild(c));
});

fetch('/feeds/posts/default/-/produk?alt=json&max-results=20')
  .then(res => res.json())
  .then(data => {
    const posts = data.feed.entry || [];

    posts.forEach(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;
      const content = post.content.$t;

      const imgMatchAll = [...content.matchAll(/<img[^>]+src="([^">]+)"/g)];
      const images = imgMatchAll.length > 0
        ? imgMatchAll.map(m => m[1])
        : ['https://via.placeholder.com/300x300?text=No+Image'];

      const hargaAsliMatch = content.match(/Harga[:：]\s*(Rp\s*[0-9.,]+)/i);
      const hargaDiskonMatch = content.match(/Diskon[:：]\s*(Rp\s*[0-9.,]+)/i);

      const hargaAsli = hargaAsliMatch ? hargaAsliMatch[1] : null;
      const hargaDiskon = hargaDiskonMatch ? hargaDiskonMatch[1] : null;
      const hargaTampil = hargaDiskon || hargaAsli || 'Hubungi CS';

      // Hitung diskon %
      let badge = '';
      if (hargaAsli && hargaDiskon) {
        const angkaAsli = parseInt(hargaAsli.replace(/\D/g, ''));
        const angkaDiskon = parseInt(hargaDiskon.replace(/\D/g, ''));
        const persen = Math.round(((angkaAsli - angkaDiskon) / angkaAsli) * 100);
        badge = `<span class="badge-diskon">-${persen}%</span>`;
      }

      const pesan = `Halo, saya tertarik dengan produk ini:%0A${title}%0AHarga: ${hargaTampil}%0ALink: ${link}`;
      const waLink = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

      // Buat slider HTML
      let slider = '';
      if (images.length > 1) {
        slider = `<div class="slider">` + images.map(src => `<img src="${src}"/>`).join('') + `</div>`;
      } else {
        slider = `<img src="${images[0]}" alt="${title}" style="width:100%; border-radius:12px;">`;
      }

      const card = document.createElement('div');
      card.className = 'produk-card';
      card.dataset.nama = title;
      card.innerHTML = `
        ${badge}
        ${slider}
        <h3>${title}</h3>
        <p><strong>${hargaTampil}</strong></p>
        <a class="btn-wa" href="${waLink}" target="_blank">Beli via WhatsApp</a>
        <button class="btn-add-cart">+ Keranjang</button>
      `;

      card.querySelector('.btn-add-cart').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('keranjang') || '[]');
        cart.push({ title, img: images[0], harga: hargaTampil, link });
        localStorage.setItem('keranjang', JSON.stringify(cart));
        alert('✅ Ditambahkan ke keranjang!');
      });

      wrapper.appendChild(card);
    });

    // Jalankan slider otomatis
    setInterval(() => {
      document.querySelectorAll('.slider').forEach(slider => {
        const first = slider.querySelector('img');
        if (first && slider.children.length > 1) {
          slider.appendChild(first.cloneNode(true));
          slider.removeChild(first);
        }
      });
    }, 3000); // Ganti gambar tiap 3 detik
  });
