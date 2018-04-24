var tabbarCollapse = (function($){
    var init = function() {
        collapse();
    };
    function collapse() {
        var tabbar = $("#tabbar");
        var tabbarList = $("#tabbarList");
        var productAndService = $("#productAndService");
        var showChildLists = $(".showChildList");
        tabbar.click(function(){
            if(tabbarList.css("display") == "none") {
                tabbarList.css("display", "block");
            }else {
                tabbarList.css("display", "none");
                showChildLists.children("ul").css("display", "none");
                productAndService.children("ul").css("display", "none");
            }
        });
        productAndService.click(function() {
            if($(this).children("ul").css("display") == "block"){
                $(this).children("ul").css("display", "none");
                $(this).children("span").removeClass("fa-angle-down");
                $(this).children("span").addClass("fa-angle-up");
            }else {
                $(this).children("ul").css("display", "block");
                $(this).children("span").removeClass("fa-angle-up");
                $(this).children("span").addClass("fa-angle-down");
            }
        });
        showChildLists.click(function(e){
            e.stopPropagation();
            if($(this).children("ul").css("display") == "block"){
                $(this).children("ul").css("display", "none");
                $(this).children("span").removeClass("fa-angle-down");
                $(this).children("span").addClass("fa-angle-up");
            }else {
                $(this).children("ul").css("display", "block");
                $(this).children("span").removeClass("fa-angle-up");
                $(this).children("span").addClass("fa-angle-down");
            }
        });
    }
    return {
        init: init
    }
}(jQuery));
