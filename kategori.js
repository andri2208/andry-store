// Ambil label/kategori dari feed Blogspot
fetch("https://andrystore01.blogspot.com/feeds/posts/default?alt=json&max-results=100")
  .then(res => res.json())
  .then(data => {
    const labels = new Set();
    const list = document.querySelector(".kategori-list");
    const entries = data.feed.entry;

    if (!entries) {
      list.innerHTML = "<li>Tidak ada kategori</li>";
      return;
    }

    entries.forEach(entry => {
      if (entry.category) {
        entry.category.forEach(cat => {
          labels.add(cat.term);
        });
      }
    });

    const sortedLabels = Array.from(labels).sort();
    sortedLabels.forEach(label => {
      const url = `/search/label/${encodeURIComponent(label)}`;
      list.innerHTML += `<li><a href="${url}">${label}</a></li>`;
    });
  })
  .catch(err => {
    document.querySelector(".kategori-list").innerHTML = "<li>Gagal memuat kategori</li>";
    console.error("Kategori error:", err);
  });
