(function()
{
    /**
     * Find an element by XPath query
     * i.e: //html/body/div[1]/div/div[1]
     *
     * @param path
     * @returns {Node}
     */
    function getElementByXpath(path)
    {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    /**
     * Try executing a specified function until time has passed or TRUE is returned by the function
     *
     * @param milliseconds
     * @param fn
     * @param delay
     */
    function tryUntil(milliseconds, fn, delay = 100)
    {
        let tick = 0;
        let interval = setInterval(function ()
        {
            if (fn() === true) {
                clearInterval(interval);
                return;
            }

            tick += delay;

            if (tick >= milliseconds) {
                clearInterval(interval);
            }
        }, delay)
    }

    /**
     * Extension's entry point
     */
    function main()
    {
        // Give a little bit of time to the page to get its breath
        setTimeout(function ()
        {
            /**
             * JOURNAL DE MONTRÉAL
             */
            if (location.href.indexOf("journaldemontreal.com") > -1) {
                let popups = document.getElementsByClassName('popup-adblocker');
                for (let i = 0; i < popups.length; i++) {
                    popups[i].remove();
                }

                document.body.style.overflow = 'auto';
                document.body.style.height = '100%';
            }

             /**
             * MTL BLOG
             */
            if (location.href.indexOf("mtlblog.com") > -1) {
               tryUntil(2000, function ()
               {
                   let overlay = document.getElementsByClassName('fc-ab-root');

                   if (overlay.length > 0) {
                       overlay[0].remove();
                       document.body.style.overflow = 'auto';
                       return true;
                   }
               });
            }

            /**
             * NY TIMES
             */
            if (location.href.indexOf("nytimes.com") > -1) {
                tryUntil(4000, function ()
                {
                    let tapContainer = document.getElementById('google-one-tap-container');
                    let gatewayContent = document.getElementById('gateway-content');
                    let siteContent = document.getElementById('site-content');

                    if (typeof tapContainer !== 'undefined' && typeof gatewayContent !== 'undefined' && typeof siteContent !== 'undefined') {
                        tapContainer.parentElement.parentElement.style.position = 'relative';
                        gatewayContent.remove();
                        siteContent.style.position = 'relative';
                        siteContent.parentElement.parentElement.lastElementChild.style.background = 'none';
                        return true;
                    }
                }, 400);
            }
        }, 5);
    };

    main();

})();
