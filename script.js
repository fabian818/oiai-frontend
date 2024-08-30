async function fetchText() {
    const apiUrl = "https://api.oiai.thisguydeploys.com";
    const response = await fetch(`${apiUrl}/text`);
    const data = await response.json();
    document.getElementById('text').innerText = JSON.stringify(data.contents);
}

fetchText();
