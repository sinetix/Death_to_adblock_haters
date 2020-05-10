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

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {

                /** LE DEVOIR **/
                if (details.url.indexOf('ledevoir.com') > -1) {
                    let evilCookieName = 'pw6';
                    if (cookieExists(requestHeader.value, evilCookieName)) {
                        requestHeader.value = removeFromCookies(requestHeader.value, evilCookieName);
                    }
                }

                /** WASHINGTON POST **/
                if (details.url.indexOf('washingtonpost.com') > -1) {
                    let evilCookieNames = [
                        'bm_mi',
                        'rpld1',
                        'rplm2'
                    ];

                    for (let i = 0; i < evilCookieNames.length; i++) {
                        if (cookieExists(requestHeader.value, evilCookieNames[i])) {
                            requestHeader.value = removeFromCookies(requestHeader.value, evilCookieNames[i]);
                        }
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

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: true};
    }, {
        urls: [
            // SCIENCE & VIE (Poool Paywall)
            "https://www.science-et-vie.com/qiota/test",
            "*://qiota.com/*",
            "*://*.qiota.com/*",

            // GLOBE AND MAIL
            // TODO: Find a way to deactivate just the right paywall code in the main JS file...
            "https://www.theglobeandmail.com/pb/resources/scripts/build/chunk-bootstraps/main.*.js",
        ]
    }, ['blocking']
);