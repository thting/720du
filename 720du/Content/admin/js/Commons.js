
//把string转化为json数据
function JsonEval(jsonObj) {
    var str = "";
    try {
        str = eval(jsonObj);
    } catch (err) {
        str = eval("(" + jsonObj + ")");
    }
    return str;
}


//切换背景颜色
function TranleteBack() {
    $("#tablist tr").each(function (back) {
        //alert(1);
        $(this).mouseover(function () {
            // alert($(this));
            back = $(this).css("background-color");
            $(this).css("background-color", "#ffdddd");
        });
        $(this).mouseout(function () {
            $(this).css("background-color", back);
        });
    });
}


//先提示后跳转
//content为提示的内容，time为等待多久跳转（默认2s），type为图标类型(默认10)，callback为回调函数
function layermsg(content, callback, time, type) {
    if (typeof (time) == 'undefined' || time == "") {
        time = 2;
    }
    if (typeof (type) == 'undefined' || type == "") {
        type = 10;
    }
    $.layer({
        title: false,
        closeBtn: false,
        time: time,
        btns: 0,
        dialog: {
            type: type,
            msg: content
        },
        end: callback
    });
}

//截取指定长度的字符串
function subStr(input, num) {
    if (input == "" || input.length <= num) {
        return input;
    }
    var subString = input.substring(0, num) + "...";
    return subString;
}
//显示分页其他项 如：总数 共多少页
function ShowOtherPageItem(recordCount, pageSize) {
    $("#CurrentCount").text($("#hidCurrentCount").val());
    $("#recordCount").text(recordCount);
    $("#TotalPage").text($("#hidTotalPage").val());
    $("#PageSize").text(pageSize);
}

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

String.prototype.Convert2DateTime = function () {
    ///Date(1431100800000)/
    var regex = /\/Date\((\d+)\)\//;
    var str = this.replace(regex, "$1");
    return new Date(parseInt(str)).Format("yyyy-MM-dd hh:mm");
}