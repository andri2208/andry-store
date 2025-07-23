const API_KEY = 'YOUR_API_KEY'; // Ganti dengan API key RajaOngkir

function populateDropdown(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items.map(i => `<option value="${i.city_id}">${i.city_name}</option>`).join('');
}

fetch('https://api.rajaongkir.com/starter/province', {
  headers: { key: API_KEY }
})
.then(res => res.json())
.then(data => {
  const provinsi = data.rajaongkir.results;
  const provSelect = document.getElementById('provinsi');
  provSelect.innerHTML = provinsi.map(p => `<option value="${p.province_id}">${p.province}</option>`).join('');
  
  provSelect.addEventListener('change', () => {
    fetch(`https://api.rajaongkir.com/starter/city?province=${provSelect.value}`, {
      headers: { key: API_KEY }
    })
    .then(res => res.json())
    .then(data => populateDropdown('kota', data.rajaongkir.results));
  });
});

function cekOngkir() {
  const kota = document.getElementById('kota').value;
  const berat = document.getElementById('berat').value;
  const origin = '321'; // ganti dengan kota asal (misal Bekasi)
  
  fetch('https://api.rajaongkir.com/starter/cost', {
    method: 'POST',
    headers: {
      key: API_KEY,
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: `origin=${origin}&destination=${kota}&weight=${berat}&courier=jne:tiki:pos`
  })
  .then(res => res.json())
  .then(data => {
    const results = data.rajaongkir.results;
    let output = '';
    results.forEach(r => {
      r.costs.forEach(c => {
        output += `<p><strong>${r.code.toUpperCase()}</strong> ${c.service}: Rp ${c.cost[0].value} (${c.cost[0].etd} hari)</p>`;
      });
    });
    document.getElementById('hasil-ongkir').innerHTML = output;
  });
}
