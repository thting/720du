function JsonEval(jsonObj) {
    var str = "";
    try {
        str = eval(jsonObj);
    } catch (err) {
        str = eval("(" + jsonObj + ")");
    }
    return str;
}

//Json时间格式化 时间格式yyyy-MM-dd hh:mm:ss
function JsontimeTostring(time, fmt) {
    var Jsontime = parseInt(time.replace(/\D/igm, ""));
    birthday = new Date(Jsontime);

    return birthday.Format(fmt);
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var loading = $('<div class="loading-circle fix"><div class="ld-circle1 ld-circle"><span></span></div><div class="ld-circle2 ld-circle"><span></span></div><div class="ld-circle3 ld-circle"><span></span></div><div class="ld-circle4 ld-circle"><span></span></div><div class="ld-circle5 ld-circle"><span></span></div><div class="ld-circle6 ld-circle"><span></span></div><div class="ld-circle7 ld-circle"><span></span></div><div class="ld-circle8 ld-circle"><span></span></div><div class="ld-circle9 ld-circle"><span></span></div><div class="ld-circle10 ld-circle"><span></span></div><div class="ld-circle11 ld-circle"><span></span></div><div class="ld-circle12 ld-circle"><span></span></div></div>');
var loadingmask = $('<div class="loadingmask"></div>');
var layerHelp = {
    msg: function (msg, endf, t, shadeClose) {
        layer.open({
            content: msg,
            style: 'background-color:#000; color:#fff; border:none;text-align:center',
            time: t ? t : 2,
            shadeClose: shadeClose === true ? true : false,
            end: function (elem) {
                endf && endf();
            }
        });
    },
    alert: function (msg, btnTitle, yesf, nof) { //btnTitle ["确定","取消"]
        var l = layer.open({
            content: msg,
            style: 'text-align:center',
            shadeClose: false,
            btn: btnTitle || ["确定"],
            yes: function () {
                yesf ? yesf() : layer.close(l);
            },
            no: function () {
                nof && nof();
            }
        });
    },
    loading: function (msg) {
        var content = msg ? msg : "加载中...";
        layer.open({
            type: 2,
            content: content,
            shadeClose: false
        });
    },
    loading2: function (ismask, target) {
        if (target) {
            $(target).append(loading);
        }
        else {
            $("body").append(loading);
        }
        if (ismask) {
            $("body").append(loadingmask);
        }
    },
    loading2Close: function (target) {
        $(".loading-circle,.loadingmask").remove();
    }
};


//验证金额
function ValidatePrice(price) {
    var reg = new RegExp("^([1-9][\\d]{0,7}|0)(\.[\\d]{1,2})?$");

    if (!reg.test(price)) {
        return false;
    }
    return true;
}

//验证数字
function ValidateNum(num) {
    var reg = new RegExp("^[0-9]+$");
    if (reg.test(num)) {
        return true;
    }
    return false;
}

function getUrlParam(name) {
    var url = decodeURI(window.location.search);
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = url.substr(1).match(reg);
    //返回参数值
    if (r != null) return unescape(r[2]);
    return null;
}

/*
*js Unicode编码转换
*/
function convertToUnicode (str) {
    var res = [];
    for (var i = 0; i < str.length; i++)
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u" + res.join("\\u");
}

function convertToAscii(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

//跳登陆
function GoLogin() {
    window.location.href = '/login.html?returnurl=' + window.location.href;
}

//分页缓存类
var pagingCacheHelp = (function () {
    var jsonData = {};     //2015快乐厨房美食集锦缓存
    var jsonIndexData = {};//首页缓存
    var pagingData = {
        setData: function (pageName, dataList, curPage, hasMore, otherData) {
            var top = document.body.scrollTop;
            jsonData = {
                dataList: dataList,
                curPage: curPage,
                top: top,
                hasMore: hasMore != undefined ? hasMore : true,
                otherData: otherData != undefined ? otherData : null,
            }
            if (window.localStorage) {
                localStorage.setItem(pageName + "_pagingCache", JSON.stringify(jsonData));
            }
        },
        setIndexData: function (pageName, typeId, dataList, top, left, curPage) {            
            jsonData = {
                typeId: typeId,     //推荐分类
                dataList: dataList, //列表数据
                top: top,           //下拉位置
                left: left,         //导航条位置              
                curPage: curPage    //当前页
            }
            if (window.localStorage) {
                localStorage.setItem(pageName + "_pagingCache", JSON.stringify(jsonData));
            }
        },
        getData: function (pageName) {
            if (window.localStorage) {
                jsonData = JSON.parse(localStorage.getItem(pageName + "_pagingCache"))
            }
            return jsonData;
        },
        gotoPosition: function (top) {
            //var c = 0, t = $(".foodList img").length;
            //$(".foodList img").each(function () {
            //    $(this).on("load", function () {
            //        c++;
            //        if (c == t) {
            //            if ($ === window.jQuery) {
            //                $('body').stop().animate({ scrollTop: top }, 50);
            //            }
            //            else {
            //                setTimeout(function () {
            //                    $('body').scrollTop(top);
            //                }, 500);
            //            }
            //        }
            //    });
            //})
            if ($ === window.jQuery) {
                $('body,html').stop().animate({ scrollTop: top }, 50);
            }
            else {
                setTimeout(function () {
                    $('body,html').scrollTop(top);
                }, 500);
            }
        }
    }

    return pagingData;
})();

    //if (location.href.indexOf("food") == -1) {
    //    $.cookie('food_list_loadcache', "", -1, "/"); //设置列表读取缓存标记为过期
    //}


    //定义默认Get的Ajax方法。
    //$Request: function () {
    //    var option =
    //    {
    //        type: "Get",
    //        contentType: "application/json",
    //        url: '',
    //        data: '',
    //        dataType: "json",
    //        async: true,
    //        beforeSend: function () { },
    //        success: function () { },
    //        complete: function () { },
    //        error: function () { }
    //    };
    //    function send(parmes) {
    //        option.type = parmes.type || option.type;
    //        option.contentType = parmes.contentType || option.contentType;
    //        option.url = parmes.url || option.url;
    //        option.data = parmes.data || option.data;
    //        option.dataType = parmes.dataType || option.dataType;
    //        option.async = parmes.async || option.async;
    //        option.beforeSend = parmes.beforeSend || option.beforeSend;
    //        option.success = parmes.success || option.success;
    //        option.complete = parmes.complete || option.complete;
    //        option.error = parmes.error || option.error;
    //        $.ajax(option);
    //    };
    //    return {
    //        send: send
    //    }
    //}

    //调用样式不一样，HTML排版也不一样
    var pagei;
    function ShowGoAPPComment(fun) {
        var _html = '<div class="popbox" style="width: 100%;">'
                    + '<img src="/content/images/pop-01.png" class="imgstyle">'
                    + '<p class="f18 ta_c mt20 mb20">请给我们好评吧~</p>'
                    + '<p class="ta_c"><button type="button" class="butbase bg_red" id="btnGoItunes">鼓励一下</button></p>'
                    + '<div class="box mt10 mb20">'
                    + '<span class="line"></span><button type="button" class="abox btn-yellow" id="btnNextCancel">下次吧</button>'
                    + '<span class="line"></span><button type="button" class="abox btn-yellow" id="btnNotShowRemind">不再提示</button><span class="line"></span>'
                    + '</div></div>';
        LayerOpenGoAppComment(_html, fun);
    }

    function ShowGoAPPCommentToCalculator(fun) {
        var _html = '<div class="popbox">'
                    + '<img src="/content/images/pop-01.png" class="imgstyle">'
                    + '<p class="popTitle">请给我们好评吧~</p>'
                    + '<p><button type="button" class="btnbase fd-b-red" style="width:90%;" id="btnGoItunes">鼓励一下</button></p>'
                    + '<div class="flexbox" style=" margin:20px 0">'
                    + '<span class="line"></span><button type="button" class="flex1 btn-yellow" id="btnNextCancel">下次吧</button>'
                    + '<span class="line"></span><button type="button" class="flex1 btn-yellow" id="btnNotShowRemind">不再提示</button><span class="line"></span>'
                    + '</div></div>';
        LayerOpenGoAppComment(_html, fun);
    }

    function ShowGoAPPCommentToShake(fun) {
        var _html = '<div class="tip window card" style="position: static;top:0;left:0;width:100%;">'
                   + '<img src="/content/images/pop-01.png" class="p100" style="border-radius:7px 7px 0 0">'
                   + '<div class="ta-c mtb20">请给我们好评吧~</div>'
                   + '<div class="buy">'
                   + '<div class="abox">'
                   + '<a href="javascript:void(0);" id="btnGoItunes">鼓励一下</a>'
                   + '</div></div>'
                   + '<div class="buy box mtb20">'
                   + '<span class="line"></span><a href="javascript:void(0);" class="abox btn-yewllow" id="btnNextCancel">下次吧</a><span class="line"></span>'
                   + '<a href="javascript:void(0);" class="abox btn-yewllow" id="btnNotShowRemind">不再提示</a><span class="line"></span>'
                   + '</div></div>';
        LayerOpenGoAppComment(_html, fun);
    }

    function LayerOpenGoAppComment(_html, fun) {
        pagei = layer.open({
            type: 1,
            content: _html,
            style: 'width:70%; height:auto; border-radius: 8px;',
            shadeClose: false,
            success: function () {
                $("#btnGoItunes").off().live("click", function () {
                    NotShowRemind(function (data, pagei) {
                        //直接先关闭。
                        layer.close(pagei);
                        location.href = "https://itunes.apple.com/cn/app/id528235681";
                    });
                });
                $("#btnNextCancel").off().live("click", function () {
                    layer.close(pagei);
                    //layer.closeAll();
                });
                $("#btnNotShowRemind").off().live("click", function () {
                    NotShowRemind(fun);
                });
            }
        });
    }
    function NotShowRemind(fun) {
        var loading;
        $.ajax({
            type: "post",
            url: "/User/SetNotShowRemind",
            data: {},
            datatype: "json",
            beforeSend: function () {
                loading = layer.open({ type: 2 });
                $("#btnNotShowRemind").attr("disabled", "disabled");
            },
            success: function (data) {
                if (fun != null && typeof (fun) == 'function')
                    fun(data, pagei);
                else {
                    //直接先关闭。
                    layer.close(pagei);
                    //var result = JsonEval(data);
                    //if (result.code == 200) {
                    //    //layerHelp.msg(result.message, function () {
                    //    //    //layer.closeAll();
                    //    //    layer.close(pagei);
                    //    //});
                    //    //layer.close(pagei);
                    //}
                    //else if (result.code == 502) {
                    //    //layerHelp.msg(result.message, function () {
                    //    //    //layer.closeAll();
                    //    //});
                    //    layer.close(pagei);
                    //} else {
                    //    //layerHelp.msg(result.message);
                    //    layer.close(pagei);
                    //}
                }
            },
            complete: function () {
                layer.close(loading);
                $("#btnNotShowRemind").removeAttr("disabled");
            }
        });
    }

    function addPost() {
        $(".publicbox").toggle();
    }
    $(function () {
        $("body").on("click", function (e) {
            if ($(e.target).closest(".add_post").length == 0) {
                $("#div_post_add").hide();
            }
        });
    });