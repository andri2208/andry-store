const dataToko = document.getElementById('data-toko');
const waNumber = dataToko?.getAttribute('data-wa') || '';
const kecamatanID = dataToko?.getAttribute('data-kecamatan-id') || '';

// Contoh pakai ke tombol WhatsApp:
const linkWA = `https://wa.me/${waNumber}?text=Halo, saya ingin order.`;
