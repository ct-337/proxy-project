function loadProxy() {
  const url = document.getElementById('urlInput').value;

  // Use your live Render backend URL
  const proxyUrl = `https://proxy-project-llyt.onrender.com/proxy?url=${encodeURIComponent(url)}`;

  // Load the proxied content into the iframe
  document.getElementById('proxyFrame').src = proxyUrl;
}
