/**
 * h5e-core
 */
; (function(window, $) {
    window.h5e = {};
})(window, window.Zepto || window.jQuery);
/**
 * h5e-host
 */
; (function(h5e, $) {
    var host = function(env, app, name) {
        var url = {
            mock: {
                login: {
                    getQQInfo: '../mock/login/getInfo.json',
                    getWXInfo: '../mock/login/getInfo.json'
                },
                qqlogin: {
                    getInfo: '../mock/qqlogin/getInfo.json'
                },
                register: {
                    saveInfo: '../mock/register/saveInfo.json'
                },
                comment: {
                    getComment: '../mock/comment/getComment.json',
                    saveComment: '../mock/comment/saveComment.json'
                },
                redpacket: {
                    draw: '../mock/redpacket/draw.json',
                    take: '../mock/redpacket/take.json',
                    save_user: '../mock/redpacket/save_user.json',
                    get_appdrawstatus: '../mock/redpacket/get_appdrawstatus.json',
                    query: '../mock/redpacket/query.json',
                    get_drawnum: '../mock/redpacket/get_drawnum.json'
                },
                seckill: {
                    get: '../mock/seckill/get.json',
                    save_user: '../mock/seckill/save_user.json',
                    query: '../mock/seckill/query.json'
                },
                weixin: {
                    oauth: 'http://beta.api.h5e.qq.com/weixin/oauth',
                    authorize: 'http://beta.api.h5e.qq.com/weixin/authorize'
                },
                countdown: {
                    get: '../mock/countdown/get.json'
                }
            },
            beta: {
                login: {
                    getQQInfo: 'http://beta.api.h5e.qq.com/qqlogin/get_info',
                    getWXInfo: 'http://beta.api.h5e.qq.com/wxlogin/get_info'
                },
                qqlogin: {
                    getInfo: 'http://beta.api.h5e.qq.com/qqlogin/get_info'
                },
                register: {
                    saveInfo: 'http://api.h5e.qq.com/register/save_info'
                },
                comment: {
                    getComment: 'http://beta.api.h5e.qq.com/comment/get_list',
                    saveComment: 'http://beta.api.h5e.qq.com/comment/save_list',
                    saveLike: 'http://beta.api.h5e.qq.com/comment/like'
                },
                danmaku: {
                    getRealTime: 'http://beta.api.h5e.qq.com/danmaku/get_realtime',
                    getDanmaku: 'http://beta.api.h5e.qq.com/danmaku/get_live',
                    saveDanmaku: 'http://beta.api.h5e.qq.com/danmaku/save_live'
                },
                redpacket: {
                    draw: 'http://beta.api.h5e.qq.com/redpacket/draw',
                    take: 'http://beta.api.h5e.qq.com/redpacket/take',
                    save_user: 'http://beta.api.h5e.qq.com/redpacket/save_user',
                    get_appdrawstatus: 'http://beta.api.h5e.qq.com/redpacket/get_appdrawstatus',
                    query: 'http://beta.api.h5e.qq.com/redpacket/query',
                    get_drawnum: 'http://beta.api.h5e.qq.com/redpacket/get_drawnum'
                },
                seckill: {
                    get: 'http://beta.api.h5e.qq.com/seckill/get',
                    save_user: 'http://beta.api.h5e.qq.com/seckill/save_user',
                    query: 'http://beta.api.h5e.qq.com/seckill/query'
                },
                weixin: {
                    oauth: 'http://beta.api.h5e.qq.com/weixin/oauth',
                    authorize: 'http://beta.api.h5e.qq.com/weixin/authorize'
                },
                countdown: {
                    get: 'http://beta.api.h5e.qq.com/countdown/get'
                },
                live: {
                    getStatus: 'http://sh.act.qq.com/hddemo/kits/getActStatus',
                    getFiles: 'http://sh.act.qq.com/hddemo/kits/getFileWorks'
                }
            },
            pro: {
                login: {
                    getQQInfo: 'http://api.h5e.qq.com/qqlogin/get_info',
                    getWXInfo: 'http://api.h5e.qq.com/wxlogin/get_info'
                },
                qqlogin: {
                    getInfo: 'http://api.h5e.qq.com/qqlogin/get_info'
                },
                register: {
                    saveInfo: 'http://api.h5e.qq.com/register/save_info'
                },
                comment: {
                    getComment: 'http://api.h5e.qq.com/comment/get_list',
                    saveComment: 'http://api.h5e.qq.com/comment/save_list',
                    saveLike: 'http://api.h5e.qq.com/comment/like'
                },
                danmaku: {
                    getRealTime: 'http://api.h5e.qq.com/danmaku/get_realtime',
                    getDanmaku: 'http://api.h5e.qq.com/danmaku/get_live',
                    saveDanmaku: 'http://api.h5e.qq.com/danmaku/save_live'
                },
                live: {
                    getStatus: 'http://tams.qq.com/act/getActStatus',
                    getFiles: 'http://tams.qq.com/act/getFileWorks'
                }
            }
        };
        return url[env][app][name] || null;
    };
    h5e.host = host;
})(h5e, window.Zepto || window.jQuery);
/**
 * h5e-util
 */
;
(function(h5e, $) {
    var Util = function() {};
    Util.prototype = {
        cookie: function(name, value, options) {
            if (typeof value != 'undefined') {
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                };
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 1000));
                    } else {
                        date = options.expires;
                    };
                    expires = '; expires=' + date.toUTCString();
                };
                var path = options.path ? '; path=' + options.path : '';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].replace(/^\s*(.*?)\s*$/, "$1");
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        };
                    };
                };
                return cookieValue;
            };
        },
        parse: function (data) {
            if ( typeof data !== "string" || !data ) {
                return null;
            }
            // Attempt to parse using the native JSON parser first
            if ( window.JSON && window.JSON.parse ) {
                return window.JSON.parse( data );
            }
            var rvalidchars = /^[\],:{}\s]*$/,
                rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
            if ( rvalidchars.test( data.replace( rvalidescape, "@" )
                .replace( rvalidtokens, "]" )
                .replace( rvalidbraces, "")) ) {

                return ( new Function( "return " + data ) )();
            }
            throw new Error( "Invalid JSON: " + data );
        },
        formcheckById: function(formid, pattern) {
            var val = $("#" + formid).val();
            switch (pattern) {
                case "mobile":
                    pattern = /^1[34578]\d{9}$/;
                    break;
                case "email":
                    pattern = /^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3}$/;
                    break;
                default:
            };
            return !!val.match(pattern);
        },
        formcheckByVal: function(val, pattern) {
            switch (pattern) {
                case "mobile":
                    pattern = /^1[34578]\d{9}$/;
                    break;
                case "email":
                    pattern = /^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3}$/;
                    break;
                default:
            };
            return !!val.match(pattern);
        },
        alert: function(text) {
            $("body").append('' +
                '<div class="h5e-util-alert-bg">' +
                '<div class="h5e-util-alert">' +
                '<div class="h5e-util-alert-text">' + text + '</div>' +
                '<button type="button" class="h5e-util-alert-confirm">确定</button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            this.fullHeight(".h5e-util-alert-bg");
            $(".h5e-util-alert-confirm").click(function() {
                $(".h5e-util-alert-bg").remove();
            });
        },
        log: function(text) {
            $("body").append('' +
                '<div class="h5e-util-log">' + text + '</div>'
            );
        },
        loading: function(type) {
            switch (type) {
                case 'start':
                    $("body").append('' +
                        '<div class="h5e-util-loading">' +
                        '<img src="http://appmedia.qq.com/media/h5e/common/loading.png" />' +
                        '</div>'
                    );
                    this.fullHeight(".h5e-util-loading");
                    break;
                case 'end':
                    $(".h5e-util-loading").remove();
                    break;
                default:
                    this.alert("loading参数错误!");
            };
        },
        warning: function(selector, text) {
            $("." + selector).append('' +
                '<div class="ui-tooltips ui-tooltips-warn">' +
                '<div class="ui-tooltips-cnt ui-border-b">' +
                '<i></i>' + text +
                '</div>' +
                '</div>'
            );
        },
        fileWarning: function() {
            for (var i in config.file) {
                if (!h5e[config.file[i]]) {
                    this.warning("h5e-file-warning", "您没有引入 h5e-" + config.file[i] + ".js");
                };
            };
        },
        zoom: function(bgwidth) {
            var ratio = $(window).width() / bgwidth;
            $("html").css("zoom", ratio);
        },
        fullHeight: function(selector) {
            var h1 = document.documentElement.clientHeight;
            var h2 = window.document.body.offsetHeight;
            var zoom = $("body").css("zoom");
            if (h1 > h2) {
                $(selector).css("height", zoom ? h1 / zoom : h1);
            } else {
                $(selector).css("height", zoom ? h2 / zoom : h2);
            };
        },
        getQueryString: function(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        },
        urlDelArg: function(url) {
            return url.split("?")[0];
        },
        crossScreen: function() {
            $("body").append('' +
                '<div id="orientLayer" class="mod-orient-layer">' +
                    '<div class="mod-orient-layer__content">' +
                        '<i class="icon mod-orient-layer__icon-orient"></i>' +
                        '<div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div>' +
                    '</div>' +
                '</div>'
            );
        },
        // 把时间字符串（格式为"2015-12-01 17:07:07"）转化为Date对象
        dateStrToObj: function(timeStr) {
            var date = timeStr.split(" ")[0], time = timeStr.split(" ")[1];
            var Y, m, d, H, i, s;
            Y = date.split("-")[0];
            m = date.split("-")[1] - 1;
            d = date.split("-")[2];
            H = time.split(":")[0];
            i = time.split(":")[1];
            s = time.split(":")[2];
            var dateObj = new Date(Y, m, d, H, i, s);
            return dateObj;
        },
        ua: function() {
            return function(ua, appVersion, platform) {
                return {
                    // win系列
                    win32: platform === "Win32",
                    ie: /MSIE ([^;]+)/.test(ua),
                    ieMobile: window.navigator.msPointerEnabled,
                    ieVersion: Math.floor((/MSIE ([^;]+)/.exec(ua) || [0, "0"])[1]),

                    // ios系列
                    ios: (/iphone|ipad/gi).test(appVersion),
                    iphone: (/iphone/gi).test(appVersion),
                    ipad: (/ipad/gi).test(appVersion),
                    iosVersion: parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(ua) || [0, ''])[1])
                        .replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false,
                    safari: /Version\//gi.test(appVersion) && /Safari/gi.test(appVersion),
                    uiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua),

                    // 安卓系列
                    android: (/android/gi).test(appVersion),
                    androidVersion: parseFloat("" + (/android ([0-9\.]*)/i.exec(ua) || [0, ''])[1]),

                    // chrome
                    chrome: /Chrome/gi.test(ua),
                    chromeVersion: parseInt((/Chrome\/([0-9]*)/gi.exec(ua) || [0, 0])[1], 10),

                    // 内核
                    webkit: /AppleWebKit/.test(appVersion),

                    // 其他浏览器
                    uc: appVersion.indexOf("UCBrowser") !== -1,
                    Browser: /Browser/gi.test(appVersion),
                    MiuiBrowser: /MiuiBrowser/gi.test(appVersion),

                    // 微信
                    MicroMessenger: /MicroMessenger/gi.test(ua),

                    // QQ音乐
                    QQMuisc: /qqmusic/gi.test(ua),
                    // 腾讯新闻
                    QQNews: /qqnews/gi.test(ua),
                    // 天天p图
                    Pitu: /pitu/gi.test(ua),
                    // 手Q
                    QQ: /qq\//gi.test(ua),
                    // 腾讯视频
                    TXVideo: /tadchid\/0/gi.test(ua),
                    // 其他
                    canTouch: "ontouchstart" in document
                };
            }(navigator.userAgent, navigator.appVersion, navigator.platform);
        },
        loadScript: function(url, callback) {
            var qqapi_script = document.createElement('script');
            qqapi_script.src = url;
            document.getElementsByTagName("HEAD")[0].appendChild(qqapi_script);
            qqapi_script.addEventListener('load', function() {
                if (typeof callback === 'function') {
                    callback();
                }
            });
        }
    };

    h5e.util = new Util();
})(h5e, window.Zepto || window.jQuery);
; (function($, undefined) {
    var prefix = '',
        eventPrefix, endEventName, endAnimationName,
        vendors = {
            Webkit: 'webkit',
            Moz: '',
            O: 'o'
        },
        document = window.document,
        testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        transform,
        transitionProperty, transitionDuration, transitionTiming, transitionDelay,
        animationName, animationDuration, animationTiming, animationDelay,
        cssReset = {}

    function dasherize(str) {
        return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase()
    }

    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase()
    }

    $.each(vendors, function(vendor, event) {
        if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
            prefix = '-' + vendor.toLowerCase() + '-'
            eventPrefix = event
            return false
        }
    })

    transform = prefix + 'transform'
    cssReset[transitionProperty = prefix + 'transition-property'] =
        cssReset[transitionDuration = prefix + 'transition-duration'] =
        cssReset[transitionDelay = prefix + 'transition-delay'] =
        cssReset[transitionTiming = prefix + 'transition-timing-function'] =
        cssReset[animationName = prefix + 'animation-name'] =
        cssReset[animationDuration = prefix + 'animation-duration'] =
        cssReset[animationDelay = prefix + 'animation-delay'] =
        cssReset[animationTiming = prefix + 'animation-timing-function'] = ''
/*
    $.fx = {
        off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
    }

    $.fn.animate = function(properties, duration, ease, callback, delay) {
        if ($.isFunction(duration))
            callback = duration, ease = undefined, duration = undefined
        if ($.isFunction(ease))
            callback = ease, ease = undefined
        if ($.isPlainObject(duration))
            ease = duration.easing, callback = duration.complete, delay = duration.delay, duration = duration.duration
        if (duration) duration = (typeof duration == 'number' ? duration :
            ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
        if (delay) delay = parseFloat(delay) / 1000
        return this.anim(properties, duration, ease, callback, delay)
    }
*/
    $.fn.anim = function(properties, duration, ease, callback, delay) {
        var key, cssValues = {},
            cssProperties, transforms = '',
            that = this,
            wrappedCallback, endEvent = $.fx.transitionEnd,
            fired = false

        if (duration === undefined) duration = $.fx.speeds._default / 1000
        if (delay === undefined) delay = 0
        if ($.fx.off) duration = 0

        if (typeof properties == 'string') {
            // keyframe animation
            cssValues[animationName] = properties
            cssValues[animationDuration] = duration + 's'
            cssValues[animationDelay] = delay + 's'
            cssValues[animationTiming] = (ease || 'linear')
            endEvent = $.fx.animationEnd
        } else {
            cssProperties = []
                // CSS transitions
            for (key in properties)
                if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') '
                else cssValues[key] = properties[key], cssProperties.push(dasherize(key))

            if (transforms) cssValues[transform] = transforms, cssProperties.push(transform)
            if (duration > 0 && typeof properties === 'object') {
                cssValues[transitionProperty] = cssProperties.join(', ')
                cssValues[transitionDuration] = duration + 's'
                cssValues[transitionDelay] = delay + 's'
                cssValues[transitionTiming] = (ease || 'linear')
            }
        }

        wrappedCallback = function(event) {
            if (typeof event !== 'undefined') {
                if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
                $(event.target).unbind(endEvent, wrappedCallback)
            } else
                $(this).unbind(endEvent, wrappedCallback) // triggered by setTimeout

            fired = true
            $(this).css(cssReset)
            callback && callback.call(this)
        }
        if (duration > 0) {
            this.bind(endEvent, wrappedCallback)
                // transitionEnd is not always firing on older Android phones
                // so make sure it gets fired
            setTimeout(function() {
                if (fired) return
                wrappedCallback.call(that)
            }, ((duration + delay) * 1000) + 25)
        }

        // trigger page reflow so new elements can animate
        this.size() && this.get(0).clientLeft

        this.css(cssValues)

        if (duration <= 0) setTimeout(function() {
            that.each(function() {
                wrappedCallback.call(this)
            })
        }, 0)

        return this
    }

    testEl = null
})(window.Zepto || window.jQuery);
; (function(h5e, $) {
    'use strict';
    if (!$.fn.coffee) {
        $.fn.coffee = function(option) {
            // 动画定时器
            var __time_val = null;
            var __time_wind = null;
            var __flyFastSlow = 'cubic-bezier(.09,.64,.16,.94)';

            // 初始化函数体，生成对应的DOM节点
            var $coffee = $(this);
            var opts = $.extend({}, $.fn.coffee.defaults, option); // 继承传入的值

            // 漂浮的DOM
            var coffeeSteamBoxWidth = opts.steamWidth;
            var $coffeeSteamBox = $('<div class="coffee-steam-box"></div>')
                .css({
                    'height': opts.steamHeight,
                    'width': opts.steamWidth,
                    'right': 0,
                    'top': -45,
                    'position': 'absolute',
                    'overflow': 'hidden',
                    'z-index': 0
                })
                .appendTo($coffee);

            // 动画停止函数处理
            $.fn.coffee.stop = function() {
                clearInterval(__time_val);
                clearInterval(__time_wind);
            }

            // 动画开始函数处理
            $.fn.coffee.start = function() {
                __time_val = setInterval(function() {
                    steam();
                }, rand(opts.steamInterval / 2, opts.steamInterval * 2));

                __time_wind = setInterval(function() {
                    wind();
                }, rand(100, 1000) + rand(1000, 3000))
            }
            return $coffee;

            // 生成漂浮物
            function steam() {
                // 设置飞行体的样式
                var fontSize = rand(8, opts.steamMaxSize); // 字体大小
                var steamsFontFamily = randoms(1, opts.steamsFontFamily); // 字体类型
                var color = '#' + randoms(6, '0123456789ABCDEF'); // 字体颜色
                var position = rand(0, 44); // 起初位置
                var rotate = rand(-90, 89); // 旋转角度
                var scale = rand02(0.4, 1); // 大小缩放
                var transform = $.fx.cssPrefix + 'transform'; // 设置音符的旋转角度和大小
                transform = transform + ':rotate(' + rotate + 'deg) scale(' + scale + ');'

                // 生成fly飞行体
                var $fly = $('<span class="coffee-steam">' + randoms(1, opts.steams) + '</span>');
                var left = rand(0, coffeeSteamBoxWidth - opts.steamWidth - fontSize);
                if (left > position) left = rand(0, position);
                $fly
                    .css({
                        'position': 'absolute',
                        'left': position,
                        'top': opts.steamHeight,
                        'font-size:': fontSize + 'px',
                        'color': color,
                        'font-family': steamsFontFamily,
                        'display': 'block',
                        'opacity': 1
                    })
                    .attr('style', $fly.attr('style') + transform)
                    .appendTo($coffeeSteamBox)
                    .animate({
                        top: rand(opts.steamHeight / 2, 0),
                        left: left,
                        opacity: 0
                    }, rand(opts.steamFlyTime / 2, opts.steamFlyTime * 1.2), __flyFastSlow, function() {
                        $fly.remove();
                        $fly = null;
                    });
            };

            // 风行，可以让漂浮体，左右浮动
            function wind() {
                // 左右浮动的范围值
                var left = rand(-10, 10);
                left += parseInt($coffeeSteamBox.css('left'));
                if (left >= 54) left = 54;
                else if (left <= 34) left = 34;

                // 移动的函数
                $coffeeSteamBox.animate({
                    left: left
                }, rand(1000, 3000), __flyFastSlow);
            };

            // 随即一个值
            // 可以传入一个数组和一个字符串
            // 传入数组的话，随即获取一个数组的元素
            // 传入字符串的话，随即获取其中的length的字符
            function randoms(length, chars) {
                length = length || 1;
                var hash = ''; // 
                var maxNum = chars.length - 1; // last-one
                var num = 0; // fisrt-one
                for (var i = 0; i < length; i++) {
                    num = rand(0, maxNum - 1);
                    hash += chars.slice(num, num + 1);
                }
                return hash;
            };

            // 随即一个数值的范围中的值--整数
            function rand(mi, ma) {
                var range = ma - mi;
                var out = mi + Math.round(Math.random() * range);
                return parseInt(out);
            };

            // 随即一个数值的范围中的值--浮点
            function rand02(mi, ma) {
                var range = ma - mi;
                var out = mi + Math.random() * range;
                return parseFloat(out);
            };
        };

        $.fn.coffee.defaults = {
            steams: ['jQuery', 'HTML5', 'HTML6', 'CSS2', 'CSS3', 'JS', '$.fn()', 'char', 'short', 'if', 'float', 'else', 'type', 'case', 'function', 'travel', 'return', 'array()', 'empty()', 'eval', 'C++', 'JAVA', 'PHP', 'JSP', '.NET', 'while', 'this', '$.find();', 'float', '$.ajax()', 'addClass', 'width', 'height', 'Click', 'each', 'animate', 'cookie', 'bug', 'Design', 'Julying', '$(this)', 'i++', 'Chrome', 'Firefox', 'Firebug', 'IE6', 'Guitar', 'Music', '攻城师', '旅行', '王子墨', '啤酒'],
            /*漂浮物的类型，种类*/
            steamsFontFamily: ['Verdana', 'Geneva', 'Comic Sans MS', 'MS Serif', 'Lucida Sans Unicode', 'Times New Roman', 'Trebuchet MS', 'Arial', 'Courier New', 'Georgia'],
            /*漂浮物的字体类型*/
            steamFlyTime: 5000,
            /*Steam飞行的时间,单位 ms 。（决定steam飞行速度的快慢）*/
            steamInterval: 500,
            /*制造Steam时间间隔,单位 ms.*/
            steamMaxSize: 30,
            /*随即获取漂浮物的字体大小*/
            steamHeight: 200,
            /*飞行体的高度*/
            steamWidth: 300 /*飞行体的宽度*/
        };
        $.fn.coffee.version = '2.0.0'; // 更新为音符的悬浮---重构的代码
    }
    var defaults = {
        autoplay: false,
        loop: true,
        fadeIn: true,
        preload: "auto",
        src: "http://"
    }
    var AudioClass = function() {

    }
    AudioClass.prototype.init = function(option) {
        var self = this;
        this.option = $.extend({}, defaults, typeof option == 'object' && option);
        if(this.option.position){
           this.option.element.css(this.option.position); 
        }
        this.start();
        self.addEvent();
    };
    AudioClass.prototype.start = function() {
        var self = this;
        // media资源的加载
        var options_audio = {
            autoplay: self.option.autoplay,
            loop: self.option.loop,
            preload: self.option.preload,
            src: self.option.src
        }

        self._audio = new Audio();

        for (var key in options_audio) {
            if (options_audio.hasOwnProperty(key) && (key in self._audio)) {
                self._audio[key] = options_audio[key];
            }
        }
        self._audio.load();
        self.option.element.coffee({
            steams: ["<img src='http://appmedia.qq.com/media/h5e/audio/note.png' />", "<img src='http://appmedia.qq.com/media/h5e/audio/note.png'/>"],
            steamHeight: 100,
            steamWidth: 44
        });
        var ua = h5e.util.ua();
        if (this.option.autoplay && !ua.TXVideo && !ua.QQMusic){
           self._audio.play();
           self._audio_play_flag = true; 
        } else{
           self._audio_play_flag = false; 
        }
        
    };
    // 声音事件绑定
    AudioClass.prototype.addEvent = function() {
        var self = this;

        // 声音按钮点击事件
        var txt = self.option.element.find('.info'),
            btn = self.option.element.find('.icon');
        btn.on('click', function(e) {
            e.preventDefault();
            if (self._audio_play_flag) {
                self.stop();
            } else {
                self.play();
            }
        });


        // 声音打开事件
        $(self._audio).on('play', function() {
            //self._audio_flag = false;
            btn.addClass("rotate");
            showInfo("打开");
            // 开启音符冒泡
            $.fn.coffee.start();
            $('.coffee-steam-box').show(500);
        })

        // 声音关闭事件
        $(self._audio).on('pause', function() {
            btn.removeClass("rotate");
            showInfo("关闭");
            // 关闭音符冒泡
            $.fn.coffee.stop();
            $('.coffee-steam-box').hide(500);
        })

        function showInfo(text) {
            var info = self.option.element.find(".info");
            info.html(text);
            if (self.textInterval) clearTimeout(self.textInterval);

            info.removeClass('hide');
            self.textInterval = setTimeout(function() {
                info.addClass('hide');
            }, 1000)
        }
    };

    // 声音播放
    AudioClass.prototype.play = function() {
        var self = this;
        self._audio_play_flag = true;
        if (self._audio) self._audio.play();
    };

    // 声音停止
    AudioClass.prototype.stop = function() {
        var self = this;
        self._audio_play_flag = false;
        if (self._audio) self._audio.pause();
    };

    h5e.audio = new AudioClass();
})(h5e, window.Zepto || window.jQuery);
/*
 * h5e-comment
 */
;
(function(h5e, $) {
	var LiveClass = function() {
        var arg = $("#h5e-node").attr("arg") || "{}";
		this.config = h5e.util.parse(arg);
		this.options = {
			actId: '',
			time: 2000,
			currentStatus: null,
			onChange: function() {
				
			},
			onComplete: function () {
				console.log("getstatus complete");
			},
			onError: function () {
				console.warn("getstatus error");
			}
		}
    }
    LiveClass.prototype.getStatus = function(options) {
    	var self = this;
    	options = $.extend({}, this.options, options);
    	var sync = function() {
            self.sync = window.setTimeout(function() {
            	if(options.currentStatus != 2){
            		sync();
            	}
            }, options.time);
    		$.ajax({
		        type: "GET",
		        url: h5e.host(self.config.env, "live", "getStatus"),
		        data: {actId: options.actId, format:'jsonp'},
		        dataType: 'jsonp',
		        //timeout: 5000,
		        json:"callback",
		        success : function(res){
		        	if(res.code == 0){
		        		if(typeof options.currentStatus == "object" || res.status != options.currentStatus){
			        		switch(res.status){
			        			case 0:
			        				if(options.onBefore){
			        					options.onBefore();
			        				}
			        				break;
			        			case 1:
			        				if(options.onLive){
			        					options.onLive();
			        				}
			        			break;
			        			case 2:
			        				if(options.onAfter){
			        					options.onAfter();
			        				}
			        			break;
			        			default: 
			        		}
			        		
							if(options.onComplete && typeof options.currentStatus == "object"){
								//首次触发onComplete
								options.onComplete(res.status);
							} else{
								//改变时触发onChange
					        	if(options.onChange){
									options.onChange(res.status);
								}
							}
							options.currentStatus = res.status;
			        	} 
		        	}
					
		        },
		        error:function(){
		            if(options.onError){
						options.onError();
	        		}
		        }
		    })
    	};
        sync();
    };
    LiveClass.prototype.getFiles = function(options) {
    	var self = this;
    	options = $.extend({}, this.options, options);
        $.ajax({
	        type: "GET",
	        url:  h5e.host(self.config.env, "live", "getFiles"),
	        data: {actId: options.actId, classId: options.classId, format:'jsonp'},
	        dataType: 'jsonp',
	        //timeout: 5000,
	        json:"callback",
	        success : function(res){
	        	if(res.code == 0){
	        		if(options.callback){
						options.callback(res.data);
    				}
	        	} else{
	        		if(options.error){
						options.error();
	        		}
	        	}
	        },
	        error:function(){
	            if(options.error){
					options.error();
        		}
	        }
	    })
    };
    h5e.live = new LiveClass();
})(h5e, window.Zepto || window.jQuery);
/**
 * h5e-qqlogin
 *
 * @author  yangjiewu<yangjiewu@tencent.com>
 */
; (function(h5e, $) {
    //移动端腾讯视频APP登录方案
    var QQVideoLogin = function() {
        var loginUrl = null;
        this.showLoginPanel = function() {
            if (typeof mraid == 'undefined' || !mraid) {             
                return;
            }
            //TODO: ios登出时不执行回调
            mraid.extend.showLoginPanel('weixin', 'showLoginPanelCallback');
        };

        window.showLoginPanelCallback = function(response) {
            if (typeof loginUrl === 'string') {
                window.location.href = loginUrl;
                loginUrl = null;
            } else {
                window.location.reload();
            }
            return response;
        };

        var isLoginCallback = null;
        var getLoginInfoCallback = null;
        window.getLoginStatusCallback = function(response) {
            response = $.parseJSON(response);
            if (typeof isLoginCallback === 'function') {
                var iCallback = isLoginCallback;
                isLoginCallback = null;
                if (typeof response !== 'undefined' && response != null && typeof response.isLogin !== 'undefined' && response.isLogin != null) {
                    if (response.isLogin === true || response.isLogin === 'true') {
                        iCallback(true);
                    } else {
                        iCallback(false);
                    }
                } else {
                    iCallback(false);
                }
            }
            if (typeof getLoginInfoCallback === 'function') {
                var gCallback = getLoginInfoCallback;
                getLoginInfoCallback = null;
                gCallback(response);
            }
        };

        this.isLogin = function(callback) {
            isLoginCallback = callback;
            this.getLoginInfo(null);
        };
        this.login = function(url) {
            this.showLoginPanel();
        };
        this.logout = function() {
            isLoginCallback = null;
            getLoginInfoCallback = null;

            this.showLoginPanel();
        };
        this.getLoginInfo = function(callback) {
            getLoginInfoCallback = callback;
            if (typeof mraid == 'undefined' || !mraid) {                
                return;
            }
            mraid.extend.getLoginStatus('getLoginStatusCallback');
        };
    };

    //移动端QQ音乐APP登录方案
    var QQMusicLogin = function() {
        var gbridge = window.WebViewJavascriptBridge;
        gbridge.init();

        this.isLogin = function(callback) {
            if (typeof callback === 'function') {
                callback(true);
            }
            return true;
        };
        this.login = function(url) {
            gbridge.callHandler("JS_CMD_DO_LOGIN", {}, function(res){
                if (typeof callback === 'function') {
                    callback(res);
                }
                if (typeof url === 'string') {
                    window.location.href = url;
                } else {
                    window.location.reload();
                }
            });
        };
        this.logout = function() {
            window.location.reload();
        };
        this.getLoginInfo = function(callback) {
            gbridge.callHandler("JS_CMD_DO_LOGIN", {}, function(res){
                //微信{"RESPONSE_CODE": "0", "AUTHST": "8ACB1625D785000xxxxx", "USERNAME": "xxx", "ISVIP": "0", "VIP_LEVEL": "0", "YEAR_VIP_USER" : "0", "UIN": "1152921504607830402", "PAYWAY": "0"}
                //手Q{"RESPONSE_CODE": "0", "AUTHST": "8ACB1625D785000xxxxx", "USERNAME": "xxx", "ISVIP": "0", "VIP_LEVEL": "0", "YEAR_VIP_USER" : "0", "UIN": "244322343", "PAYWAY": "0", "SKEY": "MJtKL6HjkD"}
                if (typeof callback === 'function') {
                    callback(res);
                }
            });
        };
    };

    //移动端QQ的H5登录方案
    var QQLogin = function() {
        var arg = $("#h5e-node").attr("arg") || "{}";
        this.config = h5e.util.parse(arg);
        this.defaults = {
            logo: "http://appmedia.qq.com/media/h5e/qqlogin/logo.png",
            redirect: "#"
        };

        this.login = function(redirect, logo) {
            this.defaults.redirect = redirect || this.defaults.redirect;
            this.defaults.logo = logo || this.defaults.logo;
            var url = window.location.href;
            var urlArr = url.split("/"), host = "";
            for (var s in urlArr) {
                if (s < urlArr.length - 2) {
                    host += urlArr[s] + "/";
                };
            };
            var _redirect, _logo = "";
            if (this.defaults.redirect.indexOf("http:\/\/") == 0) {
                _redirect = this.defaults.redirect;
            } else if(this.defaults.redirect === "#"){
                _redirect = url;
            } else {
                _redirect = host + "app/" + this.defaults.redirect;
            };
            if (logo) {
                _logo = "&hln_css=" + this.defaults.logo;
            };
            var href = "https://ui.ptlogin2.qq.com/cgi-bin/login?appid=4007203&s_url=" + _redirect + "&style=9" + _logo;
            window.location.href = href;
        };

        this.logout = function(param) {
            h5e.util.cookie("uin", null, opts);
            h5e.util.cookie("skey", null, opts);
            h5e.util.cookie("luin", null, opts);
            h5e.util.cookie("lskey", null, opts);
            var opts = {domain: "qq.com", path: "/"};
            h5e.util.cookie("uin", null, opts);
            h5e.util.cookie("skey", null, opts);
            h5e.util.cookie("luin", null, opts);
            h5e.util.cookie("lskey", null, opts);
            if (param == undefined) {
                window.location.reload();
            } else if (typeof param == "string") {
                if (param == "") {
                    window.location.reload();
                } else {
                    window.location.href = param;
                };
            } else {
                param();
            };
        };

        this.isLogin = function(callback) {
            //this.overwriteCookie();
            var uin = h5e.util.cookie("uin");
            var skey = h5e.util.cookie("skey");
            if (uin && uin.length > 4 && skey && skey.length > 0) {
                if (typeof callback === 'function') {
                    callback(true);
                }
                return true;
            } else {
                if (typeof callback === 'function') {
                    callback(false);
                }
                return false;
            }
        };

        this.getqq = function() {
            var uin = h5e.util.cookie("uin");
            if (uin == null) return 0;
            var qq = uin.substr(1);
            qq++; qq--;
            return qq;
        };

        this.getLoginInfo = function(callback) {
            var self = this;
            $.ajax({
                type: "GET",
                url: h5e.host(self.config.env, "login", "getQQInfo"),
                dataType: "jsonp",
                data: {app_id: self.config.appid},
                error: function(res) {
                    if (self.config.debug) {
                        alert(JSON.stringify(res));
                    };
                    h5e.util.alert("ajax error!");
                },
                success: function(res) {
                    if(res.code){
                        self.login();
                    };
                    if (self.config.debug) {
                        alert(JSON.stringify(res));
                    };

                    callback(res);
                }
            });
        };

        this.overwriteCookie = function() {
            var opts = {domain: "qq.com", path: "/"};
            var uin = h5e.util.cookie("uin");
            var skey = h5e.util.cookie("skey");
            var luin = h5e.util.cookie("luin");
            var lskey = h5e.util.cookie("lskey");  
            h5e.util.cookie("uin", uin, opts);
            h5e.util.cookie("skey", skey, opts);
            h5e.util.cookie("luin", luin, opts);
            h5e.util.cookie("lskey", lskey, opts);
        };

        this.showCookie = function() {
            var cookieStr = document.cookie;
            $(".console_cookie").text(cookieStr);
        };
    };

    //***************************创建h5e.login对象*************************************
    var loginObject = null;
    var loginLoadComplete = null;

    //设置对象属性，内部异步执行
    var setLoginObject = function(type) {
        if (typeof type === 'undefined' || type == null || type === '') {
            type = 'web';
        }

        switch (type) {
            case 'video': 
                loginObject = new QQVideoLogin();
                break;
            case 'music': 
                loginObject = new QQMusicLogin();
                break;
            default: 
                loginObject = new QQLogin();
                break;
        }

        h5e.login.loginObject = loginObject;
        h5e.login.loginObject.getInfo = function(callback) {
            h5e.login.loginObject.isLogin(function(isLogin) {
                if (!isLogin) {
                    callback({isLogin: false, platform: type});
                } else {
                    h5e.login.loginObject.getLoginInfo(function(res) {
                        var head = '';
                        var name = '无';
                        var accountType = ''; 
                        var account = '';

                        switch (type) {
                            case 'video':
                                head = res.info.headImgUrl;
                                name = res.info.nickname;
                                if (res.accountFrom === 'qq') {
                                    accountType = 'qq';
                                    //ios是uid，android是uin
                                    account = res.info.uid || res.info.uin;
                                } else if (res.accountFrom === 'wx') {
                                    accountType = 'wx';
                                    account = res.info.openId;
                                }
                                break;
                            case 'music':
                                name = res.USERNAME;
                                if (typeof res.SKEY != 'undefined' && res.SKEY != null && res.SKEY != '') {
                                    accountType = 'qq';
                                } else {
                                    accountType = 'wx';
                                }
                                account = res.UIN;
                                break;
                            default:
                                head = res.data.qqhead_url;
                                name = res.data.nick;
                                accountType = 'qq';
                                account = h5e.login.loginObject.getqq();
                                break;
                        }
                        if (type === 'music' && accountType === 'qq') {
                            var arg = $("#h5e-node").attr("arg") || "{}";
                            var config = JSON.parse(arg);
                            $.ajax({
                                type: "GET",
                                url: h5e.host(config.env, "login", "getQQInfo"),
                                dataType: "jsonp",
                                data: {app_id: config.appid},
                                error: function(res) {
                                    callback({isLogin: true, platform: type, accountType: accountType, account: account, name: name, head: head});
                                },
                                success: function(res) {
                                    callback({isLogin: true, platform: type, accountType: accountType, account: account, name: res.data.nick, head: res.data.qqhead_url});
                                }
                            });
                        } else {
                            callback({isLogin: true, platform: type, accountType: accountType, account: account, name: name, head: head});
                        }
                    });
                }
            });
        };

        if (typeof loginLoadComplete === 'function') {
            loginLoadComplete();
        }
    };

    //登录组件初始化
    var init = function() {
        var user_gent = '';
        if (navigator.userAgent.toLowerCase().indexOf('tadchid/0') > -1) {
            user_gent = 'video';
        } else if (navigator.userAgent.toLowerCase().indexOf('qqmusic') > -1) {
            user_gent = 'music';
        }

        if (h5e.login.qqLoginOnly === true) {
            user_gent = '';
        }
        switch (user_gent) {
            case 'video': 
                try {
                    if (typeof mraid === 'undefined' || !mraid) {
                        var this_script = document.createElement('script');
                        this_script.src = 'mraid.js';
                        document.getElementsByTagName("HEAD")[0].appendChild(this_script);
                        this_script.addEventListener('load', function() {
                            setLoginObject('video');
                        });
                        this_script.addEventListener('error', function() {
                            setLoginObject();
                        });
                    } else {
                        setLoginObject('video');
                    }
                } catch (e) {
                    setLoginObject();
                }
                break;
            case 'music':
                try {
                    if (typeof WebViewJavascriptBridge === 'object') {
                        setLoginObject('music');
                    } else {
                        document.addEventListener('WebViewJavascriptBridgeReady', function(e) {
                            setLoginObject('music');
                        });
                    }
                } catch (e) {
                    setLoginObject();
                }
                break;
            default:
                setLoginObject();
                break;
        };
    };

    //对外接口
    h5e.login = {
        qqLoginOnly: false,
        init: function(callback) {
            loginLoadComplete = callback;
            init();
        },
        login: function(url) {
            if (typeof h5e.login.loginObject != 'undefined') {
                h5e.login.loginObject.login(url);
            } else {
                this.init(function() {
                    h5e.login.loginObject.login(url);
                });
            }
        },
        logout: function() {
            if (typeof h5e.login.loginObject != 'undefined') {
                h5e.login.loginObject.logout();
            } else {
                this.init(function() {
                    h5e.login.loginObject.logout();
                });
            }
        },
        getInfo: function(callback) {
            if (typeof h5e.login.loginObject != 'undefined') {
                h5e.login.loginObject.getInfo(callback);
            } else {
                this.init(function() {
                    h5e.login.loginObject.getInfo(callback);
                });
            }
        }
    }
})(h5e, window.Zepto || window.jQuery);

/**
 * linkage组件
 *
 * @date     2015-07-11
 * @author   yangjiewu<yangjiewu@tencent.com>
 */
; (function($) {
    // 构造函数，参数data为json格式数据，参数that为当前的zepto对象
    var Linkage = function(data) {
        this.data = data;
    };
    Linkage.prototype = {
        build: function(that) {
            var _this = this;
            // 获取that对象内所有的select对象
            var $select_obj = $(that).find("select");
            // 清空select
            $($select_obj).html("");
            // 获取that对象内所有的select对象的数量
            var select_num = $select_obj.size();    
            // 构建第一层select数据
            this._resetSelect($select_obj.eq(0));
            if (this._type(this.data) === "Object") {
                this._renderSelect01(this.data, $select_obj.eq(0), 1);
            } else if (this._type(this.data) === "Array") {
                this._renderSelect02(this.data, $select_obj.eq(0), null);
            };
            // 逐层绑定change事件
            $select_obj.each(function(index, element) {  
                // 如果到了最后一层，则不需要绑定change事件，跳出循环
                if (index + 1 == select_num) {
                    return false;
                };
                // 绑定change事件
                $(element).change(function() {
                    // 清空当前select的所有子层select数据
                    for (var i = index + 1; i < select_num; i++) {
                        _this._resetSelect($select_obj.eq(i));
                    };
                    // 如果当前层select数据不为空，则填充下一层select数据
                    if ($(element).val()) {
                        if (_this._type(_this.data) === "Object") {
                            // 如果是最后一层type为2，否则type为1
                            var type = (index + 2 == select_num) ? 2 : 1;
                            // 构建下一层data
                            var _data = _this.data;
                            for (var i = 0; i < index + 1; i++) {
                                _data = _data[$select_obj.eq(i).val()];
                            };
                            _this._renderSelect01(_data, $select_obj.eq(index + 1), type);
                        } else if (_this._type(_this.data) === "Array") {
                            _this._renderSelect02(_this.data, $select_obj.eq(index + 1), $(element).val());
                        };
                    };
                });
            });
        },
        // 填充select数据
        _renderSelect01: function(data, select, type) {
            $.each(data, function(i, n) {
                switch (type) {
                case 1:
                    select.append("<option value='" + i + "'>" + i + "</option>");
                    break;
                case 2:
                    select.append("<option value='" + n + "'>" + n + "</option>");
                    break;
                default:
                };
            });
        },
        _renderSelect02: function(data, select, parent_id) {
            $.each(data, function(i, n) {      
                if (n.parent_id == parent_id) {
                    select.append("<option value='" + n.id + "'>" + n.name + "</option>");
                };
            });
        },
        // 清空select数据
        _resetSelect: function(select) {
            select.empty();
            select.append("<option value=''></option>");
        },
        // 判断数据类型
        _type: function(obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return "Object";
            } else if (Object.prototype.toString.call(obj) === "[object Array]") {
                return "Array";
            };
            return null;
        }
    };
    function Plugin(data) {
        var linkage = new Linkage(data);
        linkage.build(this);
    };
    $.fn.linkage = Plugin;
})(window.Zepto || window.jQuery);
/**
 * h5e-register
 *
 * @author  yangjiewu<yangjiewu@tencent.com>
 */
; (function(h5e, $) {
    var Register = function() {
        var arg = $("#h5e-node").attr("arg") || "{}";
        this.config = h5e.util.parse(arg);
        this.input_list = [];
        this.data_obj = {};
        this.checkMessage = {
            brand: "品牌不能为空",
            model: "型号不能为空",
            purchase_date: "计划购买时间不能为空",
            budget: "预算不能为空",
            name: "姓名不能为空",
            nick_name: "昵称不能为空",
            sex: "性别不能为空",
            age: "年龄不能为空",
            birth_year: "出生年份不能为空",
            birth_month: "出生月份不能为空",
            birth_day: "出生日不能为空",
            email: "email不能为空",
            mobile: "手机号码不能为空",
            tel: "电话号码不能为空",
            zipcode: "邮政编码不能为空",
            address: "街道地址不能为空",
            province: "省份不能为空",
            city: "城市不能为空",
            brand_blood: "品牌血统不能为空",
            brand_spec: "品牌特点不能为空",
            dealer_province: "经销商所在省份不能为空",
            dealer_city: "经销商所在城市不能为空",
            dealer: "经销商不能为空",
            book_time: "预约试乘试驾时段不能为空",
            to_follow: "请选择是否关注官博",
            to_agree: "请选择是否接受官方推送信息",
            value1: "备用字段1不能为空",
            value2: "备用字段2不能为空",
            value3: "备用字段3不能为空",
            mobile_pattern: "手机格式错误"
        };
        this.codeMessage = {
            0: "提交成功",
            100: "缺少appid",
            104: "验证码输入不正确",
            200: "品牌不能为空",
            201: "型号不能为空",
            202: "经销商不能为空",
            203: "计划购买时间不能为空",
            204: "预算不能为空",
            205: "用户姓名不能为空",
            206: "用户性别不能为空",
            207: "email不能为空",
            208: "手机号码不能为空",
            209: "电话号码不能为空",
            210: "邮政编码不能为空",
            211: "街道地址不能为空",
            212: "省份不能为空",
            213: "城市不能为空",
            214: "品牌血统不能为空",
            215: "品牌特点不能为空",
            216: "经销商不能为空",
            217: "经销商所在省份不能为空",
            218: "经销商所在城市不能为空",
            219: "预约试乘试驾时段不能为空",
            220: "邮箱格式错误",
            221: "手机格式错误",
            222: "您已提交过资料",
            223: "手机号码已存在",
            224: "邮箱已存在",
            225: "是否关注官博不能为空",
            226: "是否接受官方推送信息不能为空",
            227: "备用字段1不能为空",
            228: "备用字段2不能为空",
            229: "备用字段3不能为空",
            300: "您的操作过于频繁",
            400: "系统繁忙，请稍后再试",
            901: "您还没有登录"
        };
    };
    Register.prototype = {
        changeCheckMessage: function(key, value) {
            this.checkMessage[key] = value;
        },
        changeCodeMessage: function(key, value) {
            this.codeMessage[key] = value;
        },
        dataObjInit: function(obj) {
            var _this = this;
            this.data_obj.app_id = _this.config.appid;
            if (obj) {
                for (var index in obj) {
                    this.data_obj[index] = obj[index];
                };
            } else {
                $.each($(".h5e-register-input"), function() {
                    _this.input_list.push($(this).attr("id"));
                });
                for (var index in this.input_list) {
                    var key = this.input_list[index];
                    this.data_obj[key] = $.trim($("#" + key).val());
                };
            };
            for (var index in this.data_obj) {
                if (!this.data_obj[index]) {
                    return this.checkMessage[index];
                };
            };

            // 检测手机号格式
            if (obj) {
                if (!h5e.util.formcheckByVal(obj.mobile, "mobile")) {
                    return this.checkMessage["mobile_pattern"];
                };
            } else {
                if (!h5e.util.formcheckById("mobile", "mobile")) {
                    return this.checkMessage["mobile_pattern"];
                };
            };
            return "0";
        },
        submit: function(obj, callback_success, callback_error) {
            var _this = this;
            if (this.dataObjInit(obj) != "0") {
                if (callback_error) {
                    callback_error(this.dataObjInit(obj));
                } else {
                    h5e.util.alert(this.dataObjInit(obj));
                };
                return false;
            };
            $.ajax({
                type: "GET",
                url: h5e.host(_this.config.env, "register", "saveInfo"),
                dataType: "jsonp",
                jsonpCallback: "callback",
                data: this.data_obj,
                error: function(res) {
                    if (_this.config.debug) {
                        alert(JSON.stringify(res));
                    };
                    alert("接口请求失败！");
                },
                success: function(res) {
                    if (_this.config.debug) {
                        alert(JSON.stringify(res));
                    };
                    if (res.code) {
                        if (callback_error) {
                            callback_error(_this.codeMessage[res.code]);
                        } else {
                            h5e.util.alert(_this.codeMessage[res.code]);
                        };
                    } else {
                        if (res.data.register && res.data.register.code) {
                            if (callback_error) {
                                callback_error(_this.codeMessage[res.data.register.code]);
                            } else {
                                h5e.util.alert(_this.codeMessage[res.data.register.code]);
                            };
                        } else {
                            if (callback_success) {
                                callback_success(_this.codeMessage[res.data.register.code]);
                            } else {
                                h5e.util.alert(_this.codeMessage[0]);
                                $("input").val("");
                                $("select").first().val("");
                                $("select").not($("select").first()).html("");
                            };
                        };
                    };
                }
            });
        }
    };
    h5e.register = new Register();
})(h5e, window.Zepto || window.jQuery);
/**
 * h5e-share
 * 
 * @author  mokang<mokang@tencent.com>
 */
;(function(h5e, $) {
    // 要分享的数据，
    var shareData = null;

    var defaultShareData = {
        title: "分享示例",
        desc: "",
        img: "",
        url: window.location.href
    };

    var Share = function() {};

    // 设置默认的分享内容（使用APP自带的分享按钮时）
    Share.prototype.init = function(data) {
        if (typeof data === 'undefined' || data == null) {
            data = defaultShareData;
        }

        shareData = data;
        var ua = h5e.util.ua();
        switch (true) {
            case ua.MicroMessenger:
                // 微信分享
                var wxShare = function() {
                    var wxShareData = {
                        'title': shareData.title,
                        'desc': shareData.desc,
                        'img_url': shareData.img,
                        'link': shareData.url
                    };

                    // 分享给微信好友
                    WeixinJSBridge.on('menu:share:appmessage', function() {
                        WeixinJSBridge.invoke('sendAppMessage', wxShareData, function(r) {
                            if(r.err_msg == 'send_app_msg:ok'){
                                if (typeof shareData.onSuccess === 'function') {
                                    shareData.onSuccess({from: 'wx', to: 'wx_friend'});
                                }
                            } else if(r.err_msg == 'send_app_msg:cancel') {
                                if (typeof shareData.onCancel === 'function') {
                                    shareData.onCancel({from: 'wx', to: 'wx_friend'});
                                }
                            }
                        });
                    });

                    // 分享到微信朋友圈
                    var wxShareData2 = {
                        'title': shareData.timeLineTitle ? shareData.timeLineTitle : shareData.title,
                        'desc': shareData.desc,
                        'img_url': shareData.img,
                        'link': shareData.url,
                    };

                    WeixinJSBridge.on('menu:share:timeline', function() {
                        WeixinJSBridge.invoke('shareTimeline', wxShareData2, function(r) {
                            if(r.err_msg == 'share_timeline:ok') {
                                if (typeof shareData.onSuccess === 'function') {
                                    shareData.onSuccess({from: 'wx', to: 'wx_timeline'});
                                }
                            } else if(r.err_msg == 'share_timeline:cancel') {
                                if (typeof shareData.onCancel === 'function') {
                                    shareData.onCancel({from: 'wx', to: 'wx_timeline'});
                                }
                            }
                        });
                    });
                };

                if (typeof WeixinJSBridge === 'undefined') {
                    document.addEventListener('WeixinJSBridgeReady', function() {
                       wxShare();
                    }, false);
                } else {
                    wxShare();
                };
                return true;
                break;
            case ua.QQ:
                // QQ分享
                var qqShare = function() {
                    var qqShareData = {
                        'title': shareData.title,
                        'desc': shareData.desc,
                        'image_url': shareData.img,
                        'share_url': shareData.url
                    };

                    mqq.ui.setOnShareHandler(function(type) {
                        qqShareData.share_type = type;
                        mqq.ui.shareMessage(qqShareData, function(r) {
                            var toName = '';
                            switch (type) {
                                case 2:
                                    toName = 'wx_friend';
                                    break;
                                case 3:
                                    toName = 'wx_timeline';
                                    break;
                                case 0:
                                    toName = 'qq_friend';
                                    break;
                                case 1:
                                    toName = 'qq_qzone';
                                    break;
                            }
                            if(r.retCode == 0) {
                                if (typeof shareData.onSuccess === 'function') {
                                    shareData.onSuccess({from: 'qq', to: toName});
                                }
                            } else if(r.retCode == 1) {
                                if (typeof shareData.onCancel === 'function') {
                                    shareData.onCancel({from: 'qq', to: toName});
                                }
                            }
                        });
                    });
                };

                if (typeof mqq === 'undefined') {
                    h5e.util.loadScript('http://pub.idqqimg.com/qqmobile/qqapi.js', function() {
                        qqShare();
                    });
                } else {
                    qqShare();
                };
                return true;
                break;
            case ua.TXVideo:
                // 腾讯视频不支持
                return false;
                break;
            case ua.QQNews:
                var newsShare = function() {
                    TencentNews.setShareArticleInfo(shareData.title, shareData.desc, shareData.desc, shareData.url, shareData.img);
                };

                if (typeof TencentNews === 'undefined') {
                    h5e.util.loadScript('http://mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1', function() {
                        newsShare();
                    });
                } else {
                    newsShare();
                };
                return true;
                break;
            case ua.QQMuisc:
                var qqMusicShare = function() {
                    var qqMusicShareData = {
                        'appid': 'wx5aa333606550dfd5',
                        'img_width': 173,
                        'img_height': 173,
                        'title': shareData.title,
                        'desc': shareData.desc,
                        'img_url': shareData.img,
                        'link': shareData.url
                    };

                    WebViewJavascriptBridge.init();

                    WebViewJavascriptBridge.callHandler('share', qqMusicShareData, function(r) {
                        // 回调目前无法被执行
                    });
                };

                if (typeof WebViewJavascriptBridge === 'undefined') {
                    document.addEventListener('WebViewJavascriptBridgeReady', function() {
                       qqMusicShare();
                    }, false);
                } else {
                    qqMusicShare();
                };
                return true;
                break;
            default:
                return false;
                break;
        }
    };

    // 主动调出APP的分享面板，并分享内容
    Share.prototype.showPanel = function(data) {
        if (typeof data === 'undefined' || data == null) {
            // 无内容则使用默认的自定义设置
            data = shareData;
        }
        if (typeof data === 'undefined' || data == null) {
            data = defaultShareData;
        }
        var ua = h5e.util.ua();
        switch (true) {
            case ua.MicroMessenger:
                //微信不支持
                return false;
                break;
            case ua.QQ:
                var showQQSharePanel = function() {
                    mqq.ui.showShareMenu();
                };

                if (typeof mqq === 'undefined') {
                    h5e.util.loadScript('http://pub.idqqimg.com/qqmobile/qqapi.js', function() {
                        showQQSharePanel();
                    });
                } else {
                    showQQSharePanel();
                };
                return true;
                break;
            case ua.TXVideo:
                window.txVideoShareCallback = function(r) {};

                var showTXVideoSharePanel = function() {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }

                    if (ua.ios) {
                        mraid.showSharePannel(data.title, data.desc, data.url, data.img, 'txVideoShareCallback');
                    } else {
                        mraid.showSharePanel(data.title, data.desc, data.url, data.img, 'txVideoShareCallback');
                    }
                };

                if (typeof mraid === 'undefined') {
                    h5e.util.loadScript('http://tenvideo/mraid.js', function() {
                        showTXVideoSharePanel();
                    });
                } else {
                    showTXVideoSharePanel();
                };
                return true;
                break;
            case ua.QQNews:
                var showNewsSharePanel = function() {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }

                    if (TencentNews && TencentNews.showShareMenu) {
                        TencentNews.showShareMenu(data.url, data.title, data.desc, data.img, 'qqNewsShareCallback');
                    } else {
                        TencentNews.shareFromWebView(data.title, data.desc, data.img);
                    }
                };

                if (typeof TencentNews === 'undefined') {
                    h5e.util.loadScript('http://mat1.gtimg.com/www/js/newsapp/jsapi/news.js?_tsid=1', function() {
                        showNewsSharePanel();
                    });
                } else {
                    showNewsSharePanel();
                };
                return true;
                break;
            case ua.QQMuisc:
                var qqMusicShare = function() {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }

                    var qqMusicShareData = {
                        'appid': 'wx5aa333606550dfd5',
                        'img_width': 173,
                        'img_height': 173,
                        'title': data.title,
                        'desc': data.desc,
                        'img_url': data.img,
                        'link': data.url
                    };
                    WebViewJavascriptBridge.init();

                    WebViewJavascriptBridge.callHandler('callshare', qqMusicShareData, function(r) {
                        // 回调目前无法被执行
                    });
                };

                if (typeof WebViewJavascriptBridge === 'undefined') {
                    document.addEventListener('WebViewJavascriptBridgeReady', function() {
                       qqMusicShare();
                    }, false);
                } else {
                    qqMusicShare();
                };
                return true;
                break;
            default:
                return false;
                break;
        }
    };

    Share.prototype.to = function(type, data) {
        if (typeof type === 'undefined' || type == null) {
            return;
        }

        if (typeof data === 'undefined' || data == null) {
            //无内容则使用默认的自定义设置
            data = shareData;
        }
        if (typeof data === 'undefined' || data == null) {
            data = defaultShareData;
        }

        var ua = h5e.util.ua();
        switch (true) {
            case ua.MicroMessenger:
                // 微信不支持
                return false;
                break;
            case ua.QQ:
                // QQ分享
                var qqShare = function() {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }

                    var qqShareData = {
                        'title': data.title,
                        'desc': data.desc,
                        'image_url': data.img,
                        'share_url': data.url
                    };

                    var qqShareCallback = function(r) {
                        if(r.retCode == 0) {
                            if (typeof data.onSuccess === 'function') {
                                data.onSuccess({from: 'qq', to: type});
                            }
                        } else if(r.retCode == 1) {
                            if (typeof data.onCancel === 'function') {
                                data.onCancel({from: 'qq', to: type});
                            }
                        }
                    };

                    switch (type) {
                        case 'wx_friend':
                            qqShareData.share_type = 2;
                            mqq.ui.shareMessage(qqShareData, qqShareCallback);
                            break;
                        case 'wx_timeline':
                            qqShareData.share_type = 3;
                            mqq.ui.shareMessage(qqShareData, qqShareCallback);
                            break;
                        case 'qq_friend':
                            qqShareData.share_type = 0;
                            mqq.ui.shareMessage(qqShareData, qqShareCallback);
                            break;
                        case 'qq_qzone':
                            qqShareData.share_type = 1;
                            mqq.ui.shareMessage(qqShareData, qqShareCallback);
                            break;
                    }
                };

                if (typeof mqq === 'undefined') {
                    h5e.util.loadScript('http://pub.idqqimg.com/qqmobile/qqapi.js', function() {
                        qqShare();
                    });
                } else {
                    qqShare();
                };
                return true;
                break;
            case ua.TXVideo:
                window.toTxVideoShareCallback = function(r) {};

                var txVideoShare = function() {
                    if (typeof data === 'undefined' || data == null) {
                        return;
                    }

                    switch (type) {
                        case 'wx_friend':
                            mraid.extend.shareToWXFriend(data.title, data.desc, data.url, data.img, 'toTxVideoShareCallback');
                            break;
                        case 'wx_timeline':
                            mraid.extend.shareToWXTimeLine(data.title, data.desc, data.url, data.img, 'toTxVideoShareCallback');
                            break;
                    }
                };

                if (typeof mraid === 'undefined') {
                    h5e.util.loadScript('http://tenvideo/mraid.js', function() {
                        txVideoShare();
                    });
                } else {
                    txVideoShare();
                };
                return true;
                break;
            case ua.QQNews:
                // 腾讯新闻不支持
                return false;
                break;
            case ua.QQMuisc:
                // QQ音乐不支持
                return false;
                break;
            default:
                return false;
                break;
        }
    };

    h5e.share = new Share();

})(h5e, window.Zepto || window.jQuery);

/**
 * h5e-video
 *
 * @author  yangjiewu<yangjiewu@tencent.com>
 */
; (function(h5e, $) {
    var Video = function() {};
     Video.prototype = { 
        init: function(option) {
            option.type == option.type || 2;
            option = $.extend( {
                autoplay: "true",
                isHtml5ShowLoadingAdOnStart: "false",
                isHtml5ShowLoadingAdOnChange: "false"
            }, option)
            switch (option.type) {
            case "1":
                return this._setLiveVideo(option);
                break;
            case "2":
                return this._setDemandVideo(option);
                break;
            default:
                return null
            };
        },
        _setDemandVideo: function(option) {
            var video = new tvp.VideoInfo();
            var player = new tvp.Player();
            video.setVid(option.vid);
            option.playerType = "html5";
            option.video = video;
            delete option.vid;
            player.create(option);
            return player;
        },
        _setLiveVideo: function(option) {
            var video = new tvp.VideoInfo();
            var player = new tvp.Player();
            video.setChannelId(option.vid); 
            option.video = video;
            option.chid = option.vid;
            delete option.vid;
            player.create(option);
            return player;
        }
    };
    h5e.video = new Video();
})(h5e, window.Zepto || window.jQuery);
