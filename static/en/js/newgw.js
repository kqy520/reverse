$(function(){
    //nav滚动定位
    var p=0;
    var t=0;
    $(".mouse_move").on("click",function(){
        $('html,body').animate({
            scrollTop: jQuery("#index_safe").offset().top-64
        },500);
    });
    $(".navs_box_left li a").on("mouseover",function(){
        var forId=$(this).parent("li").attr("data-for");
        if(!$(this).parent("li").hasClass("active")){
            $(this).parent("li").addClass("active").siblings("li").removeClass("active");
            $("#"+forId).show().siblings("div").hide();
        }
    });
    var solve_list=$(".index_solve_ul").find("li").length;
	//bak class
    $(".index_solve_ul1").css({
        "width":288*solve_list+"px"
    });
    $(".index_solve_net").on("click",function(){

        $(".index_solve_ul").css({
            "webkit-transform": "translate3d(-288px,0px,0)",
            "-moz-transform":  "translate3d(-288px,0px,0)",
            "-ms-transform": "translate3d(-288px,0px,0)",
            "-o-transform":  "translate3d(-288px,0px,0)",
            "transform":  "translate3d(-288px,0px,0)"
        });
    });
    $(".index_solve_prev").on("click",function(){
        $(".index_solve_ul").css({
            "webkit-transform": "translate3d(0px,0px,0)",
            "-moz-transform":  "translate3d(0px,0px,0)",
            "-ms-transform": "translate3d(0px,0px,0)",
            "-o-transform":  "translate3d(0px,0px,0)",
            "transform":  "translate3d(0px,0px,0)"
        });
    });
    var _index_mid=$(".index_mid1_nav>ul li");
   

    $(".index_brand_tab").find("li").on("click",function(){
        if(!$(this).hasClass("active")){
            var dataWarp="#brand_warp"+$(this).attr("data-warp");

            $(this).addClass("active").siblings("li").removeClass("active");
          $(".index_brand").find(dataWarp).fadeIn(500).siblings("ul").hide();
        }
    });
    var unm=1;
    var newsTimer=setInterval(function(){
        if(unm==1){
            var c=$(".index_brand_tab").find("li.active").index();
            var b;
            if(c==$(".index_brand_tab").find("li").length-1){
                b=0;
            }else{
                b=c+1;
            }
            $(".index_brand_tab").find("li").eq(b).click();
        }

    },4000);
    $("#brand_warp1").on("mouseenter",function(){
        unm=2;
    }).on("mouseleave",function(){
        unm=1;
    })
});
function preloadimages(arr){
    var newimages=[], loadedimages=0;
    var postaction=function(){} ;
    var arr=(typeof arr!="object")? [arr] : arr;
    function imageloadpost(){
        loadedimages++;
        if (loadedimages==arr.length){
            postaction(newimages);
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image();
        newimages[i].src=arr[i];
        newimages[i].onload=function(){
            imageloadpost()
        };
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return {
        done:function(f){
            postaction=f || postaction
        }
    }
}
