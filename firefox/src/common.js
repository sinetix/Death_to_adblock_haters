/**
 * Delete specified cookie by it's key (name)
 *
 * @param cookiesStr
 * @param cookieName
 * @returns {string}
 */
function removeFromCookies (cookiesStr, cookieName)
{
    var cookieStrList = cookiesStr.split('; ');
    var newStrList = [];
    cookieStrList.forEach(function(cookieStr){
        if (cookieStr.indexOf(cookieName) === 0) {
            newStrList.push(cookieStr.substring(cookieName.length, cookieStr.length));
        }
    });
    return newStrList.join("; ");
};

/**
 * Check if a cookie with the name exists
 *
 * @param cookieStr
 * @param cookieName
 * @returns {boolean}
 */
function cookieExists(cookieStr, cookieName)
{
    return cookieStr.indexOf(cookieName + '=') > -1;
}
