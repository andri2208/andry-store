// kategori.js - Sidebar Kategori Otomatis

const kategoriContainer = document.querySelector(".kategori-list");

fetch("https://andrystore01.blogspot.com/feeds/posts/default?alt=json&max-results=999")
  .then(res => res.json())
  .then(data => {
    const posts = data.feed.entry;
    if (!posts) return;

    let allLabels = [];
    posts.forEach(post => {
      if (post.category) {
        post.category.forEach(cat => {
          if (!allLabels.includes(cat.term)) {
            allLabels.push(cat.term);
          }
        });
      }
    });

    if (allLabels.length === 0) return;

    kategoriContainer.innerHTML = allLabels.map(label => `
      <li><a href="/search/label/${encodeURIComponent(label)}">${label}</a></li>
    `).join("");
  })
  .catch(err => console.error("Gagal memuat kategori:", err));
