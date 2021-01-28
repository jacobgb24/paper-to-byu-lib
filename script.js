// on extension button click
chrome.browserAction.onClicked.addListener(function(tab) {
    let tabUrl = new URL(tab.url);

    // take old hostname, replace all '.' with '-', append erl.lib.byu.edu, leave rest of url as is
    tabUrl.hostname = tabUrl.hostname.replace(/\./g, '-') + ".erl.lib.byu.edu";

    // update tab to go to new url
    chrome.tabs.update(tab.id, {url: tabUrl.href});
});
