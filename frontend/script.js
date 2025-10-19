function loadProxy() {
  const url = document.getElementById('urlInput').value;
  const proxyUrl = `https://your-render-app.onrender.com/proxy?url=${encodeURIComponent(url)}`;
  document.getElementById('proxyFrame').src = proxyUrl;
}
