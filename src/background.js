chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        console.log(details);
        details.requestHeaders.forEach(function(requestHeader){
            if (requestHeader.name.toLowerCase() === "cookie") {

                /** LE DEVOIR **/
                requestHeader.value = removeFromCookies(requestHeader.value, 'pw6');
            }
        });

        return {requestHeaders: details.requestHeaders};
    }, {
        urls: [
            "*://*/*"
        ]
    }, ['blocking', 'requestHeaders', 'extraHeaders']
);
