async function fetchText() {
    const apiUrl = "http://localhost:8000";
    const response = await fetch(`${apiUrl}/text`);
    const data = await response.json();
    document.getElementById('text').innerText = JSON.stringify(data.contents);
}

fetchText();
