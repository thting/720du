//封装简介样式弹出提示框
//依赖js：jquery.js，bootstrap-modal.js 
//封装简介样式弹出提示框
//引用样式js：jquery-1.4.2.min.js，jquery.blockUI.js  引用样式 common.css
$.prompt_autohide = function (title, message, intdelay, onClose) {
    var html = '<div class="blockUI_wrap_in"><div class="blockUI_wrap_bar"  onselectstart="return false;"><div class="blockUI_wrap_title"><span>' + title + '</span></div><a href="javascript:void(0);" onclick="$.unblockUI();" class="blockUI_wrap_close" title="关闭">×</a></div><div class="blockUI_wrap_body">' + message + '</div></div>';
    $.blockUI({ message: html, timeout: intdelay, onUnblock: onClose });
}

$.prompt = function (title, message, onClose) {
    var html = '<div class="blockUI_wrap_in"><div class="blockUI_wrap_bar"  onselectstart="return false;"><div class="blockUI_wrap_title"><span>' + title + '</span></div><a href="javascript:void(0);" onclick="$.unblockUI();" class="blockUI_wrap_close" title="关闭">×</a></div><div class="blockUI_wrap_body">' + message + '</div></div>';
    $.blockUI({ message: html, onUnblock: onClose });
}
//封装jqueryAjaxPost方法
$.ajaxPost = function (url, dataMap, fnSuccess, jqButton, origButtonText) {
    $.ajax({
        type: "POST",    //访问WebService使用Post方式请求  
        //contentType: "json",   //WebService 返回Json类型  
        url: url,   //调用WebService的地址和方法名称组合 ---- *.asmx/方法名  
        data: dataMap,   //要提交传递的参数，格式为 data: "{paraName1:paraValue1 , paraName2:paraValue2 , ......}"  
        dataType: "json",  //传输的数据类型  
        beforeSend: function () {if (jqButton) {jqButton.attr("disabled", true);jqButton.val("数据提交中...");}
        },  //返回结果前的执行的函数， 例如 loading 或 waiting 视图
        success: fnSuccess,  //返回后，页面执行结果的函数  
        complete: function () {if (jqButton) {jqButton.attr("disabled", false);if (origButtonText) {jqButton.val(origButtonText);}else jqButton.val("提交");}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) { $.prompt_autohide("错误提示", errorThrown, 2000, null); } //alert(e.responseText); }
    });
}