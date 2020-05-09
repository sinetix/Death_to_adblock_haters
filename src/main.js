(function()
{
    /**
     *
     * @returns {boolean}
     */
    function pwned()
    {
        chrome.runtime.sendMessage({
            action: 'setPwnedIcon',
            value: true
        });

        return window.isPwned = true;
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
             * JOURNAL DE MONTRÉAL | JOURNAL DE QUÉBEC
             */
            if (location.href.indexOf("journaldemontreal.com") > -1 || location.href.indexOf("journaldequebec.com") > -1) {
                let popups = document.getElementsByClassName('popup-adblocker');
                for (let i = 0; i < popups.length; i++) {
                    popups[i].remove();
                }

                document.body.style.overflow = 'auto';
                document.body.style.height = '100%';

                pwned();
            }

             /**
             * MTL BLOG
             */
            if (location.href.indexOf("mtlblog.com") > -1) {
               tryUntil(2000, function ()
               {
                   let overlay = document.getElementsByClassName('fc-ab-root');

                   if (overlay.length > 0) {
                       try {
                           overlay[0].remove();
                           document.body.style.overflow = 'auto';
                           return pwned();
                       } catch(e) {}
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
                        try {
                            tapContainer.parentElement.parentElement.style.position = 'relative';
                            gatewayContent.remove();
                            siteContent.style.position = 'relative';
                            siteContent.parentElement.parentElement.lastElementChild.style.background = 'none';
                            return pwned();
                        } catch(e) {}
                    }
                }, 400);
            }

            /**
             * LE DEVOIR
             */
            if (location.href.indexOf("ledevoir.com") > -1) {
                tryUntil(4000, function ()
                {
                    let popup = document.getElementsByClassName('popup-msg');

                    if (popup.length > 0) {
                        try {
                            popup[0].remove();
                            return pwned();
                        } catch(e) {}
                    }
                });
            }

            /**
             * LA PRESSE
             */
            if (location.href.indexOf("lapresse.ca") > -1) {
                tryUntil(4000, function ()
                {
                    if (document.getElementsByTagName('html')[0].classList.contains('sp-message-open')) {
                        try {
                            document.getElementsByTagName('html')[0].classList.remove('sp-message-open');
                            let fkr = document.getElementById('sp-tabindex-focus').parentElement.parentElement;
                            fkr.previousElementSibling.remove();
                            fkr.remove();
                            return pwned();
                        } catch (e) { }
                    }
                });
            }

            /**
             * WASHINGTON POST
             */
            if (location.href.indexOf("washingtonpost.com") > -1) {
                tryUntil(4000, function ()
                {
                    try {
                        let paywall = document.querySelectorAll('[data-qa="paywall"]');

                        if (paywall.length > 0) {
                            paywall[0].remove();
                            return pwned();
                        }
                    } catch (e) { }
                });
            }

            /**
             * L'ACTUALITÉ
             */
            if (location.href.indexOf("lactualite.com") > -1) {
                tryUntil(4000, function ()
                {
                    try {
                        let paywall = document.getElementById('pelcro-app');

                        if (typeof paywall !== 'undefined') {
                            paywall.remove();
                            document.body.style.overflow = 'auto';
                            return pwned();
                        }
                    } catch (e) { }
                });
            }


        }, 5);
    }

    main();

})();
