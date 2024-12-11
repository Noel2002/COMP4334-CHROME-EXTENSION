chrome.storage.local.get("pageStats", (data) => {
    // const statsDiv = document.getElementById("stats");
    const httpsDiv = document.getElementById("https-value");
    const httpDiv = document.getElementById("http-value");
    const stats = data.pageStats || {};
    const https = stats["https:"] || { count: 0, lastVisited: null };
    const http = stats["http:"] || { count: 0, lastVisited: null };
    httpsDiv.textContent = `${https.count}`;
    httpDiv.textContent = `${http.count}`;
});