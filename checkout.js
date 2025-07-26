<script>

  function parseHarga(hargaStr) {
    return parseInt(hargaStr.replace(/[^\d]/g, ''), 10);
  }

  function tampilkanCheckout() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const daftar = document.getElementById('daftar-checkout');
    const totalHargaEl = document.getElementById('total-harga');
    const tombolWA = document.getElementById('kirim-wa');
    let total = 0;
    let pesanWA = 'Halo, saya ingin order:\n\n';

    if (keranjang.length === 0) {
      daftar.innerHTML = '<p>Keranjang kosong.</p>';
      tombolWA.style.display = 'none';
      return;
    }

    keranjang.forEach((item, index) => {
      total += parseHarga(item.harga);
      pesanWA += `${index + 1}. ${item.judul} - ${item.harga}\n${item.link}\n\n`;

      const el = document.createElement('div');
      el.className = 'item-checkout';
      el.innerHTML = `
        <img src="${item.gambar}" style="width:80px;height:80px;object-fit:cover;border-radius:10px;margin-right:10px;" />
        <div style="flex:1;">
          <div><strong>${item.judul}</strong></div>
          <div>${item.harga}</div>
        </div>
      `;
      daftar.appendChild(el);
    });

    totalHargaEl.innerHTML = `<strong>Total:</strong> Rp ${total.toLocaleString('id-ID')}`;
    tombolWA.href = `https://wa.me/62${nomorWA.replace(/^0/, '')}?text=${encodeURIComponent(pesanWA + '\nTotal: Rp ' + total.toLocaleString('id-ID'))}`;
  }

  tampilkanCheckout();
</script>
