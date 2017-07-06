seajs.config({
    // 别名配置
    alias: {
        'app': 'application',
        'app2': 'dist/application',
        'json': '/content/js/json/1.0.2/json',
        'jquery': 'jquery/jquery/1.10.1/jquery' //使用http://或./或/，会自动判断为绝对路径，否则是相对路径，会加上base目录。
    },

    // Sea.js 的基础路径，在 seajs@2.3.0 之前，Sea.js 会根据 sea.js 的路径去猜测 base 路径，一般为路径上含有 seajs 字符串的上一级路径。
    //在 seajs@2.3.0 后，去掉了这个模糊的猜测。我们推荐始终手动设置一个准确的 base 路径。
    base: '/html/js/',

    // 文件编码
    charset: 'utf-8'
});