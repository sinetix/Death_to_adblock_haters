var removeFromCookies = function(cookiesStr, cookieName)
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

var cookieExists = function (cookieStr, cookieName)
{
    return cookieStr.indexOf(cookieName + '=') > -1;
}
