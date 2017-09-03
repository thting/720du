function nextpage() {
    if (isLoading) return false;
    if (page == 1) {
        $("#divList").empty();
    }
    $(window).off();
    $.ajax({
        type: "post",
        url: "/Shop/GetList",
        datatype: "json",
        data: {
            page: page,
            stationId: stationId,
            shopType: shopType
        },
        beforeSend: function () {
            isLoading = true;
            $("#divList").append($('<div class="ac voteloading">加载中...</div>'));
        },
        success: function (data) {
            $("#divList .voteloading").remove();
            var result = JsonEval(data);
            if (result.StatsCode == 200 && result.Data != null && result.Data.list.length > 0) {
                createHTML(result.Data.list);
                page++;
                if (result.Data.list.length < 20) {
                    $("#divList").append($('<div class="ac">没有更多了</div>'));
                }
                else {
                    $(window).off().on("scroll", function () {
                        if ($(window).scrollTop() > $("body").height() - $(window).height() - 20) {
                            nextpage();
                        }
                    });
                }
            }
            else {
                if (page == 1) {
                    $("#divList").append($('<div class="ac">没有数据</div>'));
                }
                else {
                    $("#divList").append($('<div class="ac">没有更多了</div>'));
                }
            }
            isLoading = false;
        }
    });
}

function createHTML(data) {
    var str = "";
    $.each(data, function (i, item) {
        str += '<section id="r' + item.Id + '" class="flexbox listItem" data-floor="' + item.Replyfloor + '" onclick="quoteReply(' + item.Id + ', ' + item.Replyfloor + ');">';
        str += '<div id="r' + item.Id + '" class="withdrawals-panel">';
        str += '    <div class="groupby-img-panle"><a href="/Shop/Detail/' + item.Id + '"><img src="/upload/' + item.ShopImageUrl + '" class="am-img-responsive" /></a></div>';
        str += '    <div class="groupby-info-panle">';
        str += '        <h3><a href="/Shop/Detail/' + item.Id + '">' + item.ShopName + '</a></h3>';
        str += '        <p>.No.' + item.ShopNo + '</p>';
        str += '        <p style="border-bottom: 1px solid #ababaa;">' + item.Address + '</p>';
        str += '    </div>';
        str += '</div>';
    });

    $("#divList").append(str);
}

