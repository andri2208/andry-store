

function loadKeranjang() {
  const container = document.getElementById("cart-container");
  const totalHargaEl = document.getElementById("total-harga");
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center">Keranjang kosong.</p>';
    totalHargaEl.textContent = 'Total: Rp 0';
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const hargaAngka = parseInt(item.harga.replace(/\D/g, "")) || 0;
    total += hargaAngka;

    const itemHTML = `
      <div class="cart-item">
        <img src="${item.gambar}" alt="${item.judul}" />
        <div class="cart-info">
          <h2>${item.judul}</h2>
          <p>${item.harga}</p>
          <button class="remove-btn" onclick="hapusItem(${index})">Hapus</button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", itemHTML);
  });

  totalHargaEl.textContent = `Total: Rp ${total.toLocaleString("id-ID")}`;
}

function hapusItem(index) {
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  cart.splice(index, 1);
  localStorage.setItem("keranjang", JSON.stringify(cart));
  location.reload();
}

window.addEventListener("DOMContentLoaded", loadKeranjang);
