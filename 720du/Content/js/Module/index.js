var page = 1;
var isLoading = false;
function nextpage(stationId, shopType) {
    if (isLoading) return false;
    if (page == 1) {
        $("#divList").empty();
    }
    $("#divList").parent().off("scroll");
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
            layerHelp.loading2(true);
        },
        success: function (data) {
            layerHelp.loading2Close();
            var result = JsonEval(data);
            if (result.StatsCode == 200 && result.Data != null && result.Data.list.length > 0) {
                createHTML(result.Data.list);
                page++;
                if (result.Data.list.length < 20) {
                    $("#divList").append($('<div class="ac">没有更多了</div>'));
                }
                else {
                    $("#divList").parent().off("scroll").on("scroll", function () {
                        if ($("#divList").parent().scrollTop() > $("#divList").height() - $("#divList").parent().height() - 20) {
                            nextpage(stationId, shopType);
                        }
                    });
                }
            }
            else {
                if (page == 1) {
                    $("#divList").append($('<img class="zwkt-img" src="img/zwkt.png">'));
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
        str += '<a id="r' + item.Id + '" class="map-store-item listItem" data-imgsrc="' + item.ShopImageUrl + '" data-title="' + item.ShopName + '" data-addr="' + item.Address + '" data-shopno="' + item.ShopNo + '">';
        str += '    <div class="lef">';
        str += '        <img src="' + item.ShopImageUrl + '">';
        str += '        <div class="map-store-list-btn">领取优惠券</div>';
        str += '    </div>';
        str += '    <div class="rit">';
        str += '        <ul class="map-store-ulinfo">';
        str += '            <li>' + item.ShopName + '</li>';
        str += '            <li>No.' + item.ShopNo + '</li>';
        str += '            <li>Add:' + item.Address + '</li>';
        str += '        </ul>';
        str += '    </div>';
        str += '</a>';
    });

    $("#divList").append(str);
}

