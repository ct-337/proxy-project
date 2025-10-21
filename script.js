async function loadProxy() {
  const url = document.getElementById('urlInput').value;
  const proxyUrl = `https://proxy-project-82kn.onrender.com/proxy?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(proxyUrl);
    const html = await response.text();
    document.getElementById('proxyContent').innerHTML = html;
  } catch (err) {
    document.getElementById('proxyContent').innerText = `Error: ${err.message}`;
  }
}
