
 function JsonEval (jsonObj) {
    var str = "";
    try {
        str = eval(jsonObj);
    } catch (err) {
        str = eval("(" + jsonObj + ")");
    }
    return str;
}