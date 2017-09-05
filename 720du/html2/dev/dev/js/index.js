
var style_tool = {};
style_tool.hint = function (message) {
    var hint = $("<div class='style-tool-hint' ></div>").text(message);
    $("body").append(hint);
    setTimeout(function () {
        hint.css("opacity", 0);
    }, 2500)
    setTimeout(function () {
        hint.remove()
    }, 3000);
}





$(".dev-btn").click(function () {
    var opcy = $(".dev-use").css("opacity");
    if (opcy == "0") {
        $(".dev-use").css("opacity", "0.5");
    } else if (opcy == "0.5") {
        $(".dev-use").css("opacity", "1");
    } else if (opcy == "1") {
        $(".dev-use").css("opacity", "0");
    } else {
        $(".dev-use").css("opacity", "0");
    }

});


