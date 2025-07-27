// === Ambil Label dari Feed ===
const blogLabelURL = "https://andrystore01.blogspot.com/feeds/posts/default?alt=json&max-results=100";

fetch(blogLabelURL)
  .then(res => res.json())
  .then(data => {
    const kategoriSet = new Set();
    const container = document.querySelector("#kategori-container ul");
    const posts = data.feed.entry;

    if (!posts) {
      container.innerHTML = "<li>Tidak ada kategori</li>";
      return;
    }

    posts.forEach(post => {
      if (post.category) {
        post.category.forEach(cat => {
          kategoriSet.add(cat.term);
        });
      }
    });

    const sorted = Array.from(kategoriSet).sort();
    sorted.forEach(label => {
      const url = `/search/label/${encodeURIComponent(label)}`;
      container.innerHTML += `<li><a href="${url}">${label}</a></li>`;
    });
  })
  .catch(err => {
    console.error("Gagal ambil label:", err);
  });
