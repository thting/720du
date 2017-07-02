var JsonDateHelper = {

    //获取日期
    getDate: function (jsondate) {
        var date = this._convertJSONDateToJSDateObject(jsondate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        return year + "-" + month + "-" + day;
    },

    //获取日期时间
    getDateTime: function (jsondate) {
        var date = this._convertJSONDateToJSDateObject(jsondate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = date.getDate();
        day = day < 10 ? "0" + day : day;
        var hh = date.getHours();
        hh = hh < 10 ? "0" + hh : hh;
        var mm = date.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        var ss = date.getSeconds();
        ss = ss < 10 ? "0" + ss : ss;
        return year + "-" + month + "-" + day + " " + hh + ":" + mm;
    },

    //获取指定格式日期时间
    getFormatDateTime: function (jsondate, strformatdatetime) {
        var date = this._convertJSONDateToJSDateObject(jsondate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        mm = mm < 10 ? "0" + mm : mm;
        var ss = date.getSeconds();
        ss = ss < 10 ? "0" + ss : ss;
        var newdatetime = strformatdatetime.replace("{yyyy}", year);
        newdatetime = newdatetime.replace("{m}", month);
        newdatetime = newdatetime.replace("{d}", day);
        newdatetime = newdatetime.replace("{hh}", hh);
        newdatetime = newdatetime.replace("{mm}", mm);
        newdatetime = newdatetime.replace("{ss}", ss);
        return newdatetime;
    },

    //获取指定短格式时间
    getShortTime: function (jsondate) {
        var date = this._convertJSONDateToJSDateObject(jsondate);
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var mm = date.getMinutes() == 0 ? "00" : date.getMinutes();
        return hh + ":" + mm;
    },

    //获取指定短格式时间
    getShortHour: function (jsondate) {
        var date = this._convertJSONDateToJSDateObject(jsondate);
        var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        //var mm = date.getMinutes() == 0 ? "00" : date.getMinutes();
        return hh + ":00";
    },

    _convertJSONDateToJSDateObject: function (jsondate) {
        var date = new Date(parseInt(jsondate.replace("/Date(", "").replace(")/", ""), 10));
        return date;
    }
}