chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "setPwnedIcon") {
        if (msg.value) {
            chrome.browserAction.setIcon({
                path: "images/hand_finger_32.png",
                tabId: sender.tab.id
            });
        }
        else {
            chrome.browserAction.setIcon({
                path: "images/hand_32.png",
                tabId: sender.tab.id
            });
        }
    }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {

                /** LE DEVOIR **/
                if (details.url.indexOf('ledevoir.com') > -1) {
                    let evilCookieName = 'pw6';
                    if (cookieExists(requestHeader.value, evilCookieName)) {
                        requestHeader.value = removeFromCookies(requestHeader.value, evilCookieName);
                        window.pwned = true;
                        chrome.runtime.sendMessage({
                            action: 'setPwnedIcon',
                            value: true
                        });
                    }
                }
            }
        });

        return {requestHeaders: details.requestHeaders};
    }, {
        urls: [
            "*://*/*"
        ]
    }, ['blocking', 'requestHeaders', 'extraHeaders']
);
