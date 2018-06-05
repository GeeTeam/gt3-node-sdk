/*
 * url参数获取
 */
function GetRequest(name) {
    var i = new RegExp("(\\?|&)" + name + "=([^&]+)(&|$)","i")
        , n = location.search.match(i);
    return n ? n[2]:false;
}