chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {

                /** LE DEVOIR **/
                requestHeader.value = removeFromCookies(requestHeader.value, 'pw6');
            }
        });

        return {requestHeaders: details.requestHeaders};
    }, {
        urls: [
            "*://*.ledevoir.com/*"
        ]
    }, ['blocking', 'requestHeaders']
);
