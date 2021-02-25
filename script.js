// on extension button click
chrome.browserAction.onClicked.addListener(function(tab) {
    let tabUrl = new URL(tab.url);

    if (tabUrl.hostname.endsWith('.erl.lib.byu.edu')) {
        alert('You\'re already on the BYU library version of this site!');
        return;
    }

    // take old hostname, replace all '.' with '-', append erl.lib.byu.edu, leave rest of url as is
    tabUrl.hostname = tabUrl.hostname.replace(/\./g, '-') + ".erl.lib.byu.edu";

    // update tab to go to new url
    chrome.tabs.update(tab.id, {url: tabUrl.href});
});

// automatically redirect for some known sites
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
         var url = new URL(details.url);
         url.hostname = url.hostname.replace(/\./g, '-') + ".erl.lib.byu.edu";
         return {redirectUrl: url.href};
    },
    {
        // list of known URLs to match. When you add a new one, need to also add it to permissions in manifest.json
        urls: [
            "*://dl.acm.org/*",
            "*://link.springer.com/*",
            "*://ieeexplore.ieee.org/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
