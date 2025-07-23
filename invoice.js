const data = JSON.parse(localStorage.getItem('invoiceData') || '{}');

if (!data || !data.nama) {
  document.getElementById('invoice').innerHTML = '<p>Data tidak ditemukan.</p>';
} else {
  const html = `
    <div style="border:1px solid #ccc; padding:20px; max-width:600px;">
      <h3>INVOICE #${data.nomor}</h3>
      <p><strong>Tanggal:</strong> ${data.tanggal}</p>
      <p><strong>Nama:</strong> ${data.nama}</p>
      <p><strong>Alamat:</strong> ${data.alamat}</p>
      <p><strong>Ekspedisi:</strong> ${data.ekspedisi}</p>
      <p><strong>Pembayaran:</strong> ${data.pembayaran}</p>
      <hr/>
      <ul>${data.produk.map(p => `<li>${p.title} - ${p.harga}</li>`).join('')}</ul>
      <p><strong>Total:</strong> ${data.total}</p>
    </div>
  `;
  document.getElementById('invoice').innerHTML = html;
}
