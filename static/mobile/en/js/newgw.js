/**
 * Created by Administrator on 2017/10/27 0027.
 */
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
    var arrImages=[
        "view/images/index/bgicon1.jpg",
        "view/images/index/bgicon2.jpg",
        "view/images/index/bgicon3.jpg",
        "view/images/index/bgicon4.jpg",
        "view/images/index/bgicon5.jpg",
        "view/images/index/bgicon6.jpg",
        "view/images/index/bgicon7.jpg",
        "view/images/index/bgicon8.jpg"];
    preloadimages(arrImages).done(function(images){
        $('.index_mid1_mask1').css({
            "background":'url('+images[0].src+') no-repeat 50% center'
        });
        $('.index_mid1_mask2').css({
            "background":'url('+images[1].src+') no-repeat center center'
        });
        $('.index_mid1_mask3').css({
            "background":'url('+images[2].src+') no-repeat center center'
        });
        $('.index_mid1_mask4').css({
            "background":'url('+images[3].src+') no-repeat center center'
        });
        $('.index_mid1_mask5').css({
            "background":'url('+images[4].src+') no-repeat center center'
        });
        $('.index_mid1_mask6').css({
            "background":'url('+images[5].src+') no-repeat center center'
        });
        $('.index_mid1_mask7').css({
            "background":'url('+images[6].src+') no-repeat center center'
        });
        $('.index_mid1_mask8').css({
            "background":'url('+images[7].src+') no-repeat center center'
        });
        var timesFlag=true;
        $(".index_mid2_low").on("mouseenter",function(){
            timesFlag=false;
        }).on("mouseleave",function(){
            timesFlag=true;
        });
        $(".index_mid1_nav").on("mouseenter",function(){
            timesFlag=false;
        }).on("mouseleave",function(){
            timesFlag=true;
        });
            var timers= setInterval(function(){
                if(timesFlag==true){
                    var activeIndex=  $(".index_mid1_nav").find("li.active").index()>=7?-1:$(".index_mid1_nav").find("li.active").index();
                    $(".index_mid1_nav").find("li").eq(activeIndex+1).click();
                }else{
                     return false;
                }
            },6000);


        _index_mid.on("click",function(){
            if(!$(this).hasClass("active")){
                var _indexOf=$(this).index();
                $(this).addClass("active").siblings("li").removeClass("active");
                $(".index_mid2").find(".index_mid_item").eq(_indexOf).show().addClass("index_mid_up").siblings(".index_mid_item").hide().removeClass("index_mid_up");
            }
        });



        $.each($(".index_mid_ct_list"),function(){
            var listLength= $(this).find("a").length;
            if(listLength>4){
                $(this).siblings(".index_mid_next").show();
            }else{
                $(this).siblings(".index_mid_next").hide();
            }
        });
        var flasg=true;
        $("span.index_mid_next").on("click",function(){
            if(flasg==true){
                flasg=false;
                var leftOld=$(this).siblings(".index_mid_ct_list").children("div").position().left;
                if(!$(this).hasClass("disabled")){
                    leftOld-=283;
                    $(this).siblings(".index_mid_ct_list").children("div").css({
                        "-webkit-transition":"-webkit-transform 500ms ease-out",
                        "transform":"translate("+leftOld+"px,0) scale(1) translateZ(0px)"
                    });
                    $(this).siblings(".index_mid_prev").removeClass("disabled").show();
                    var listL=$(this).siblings(".index_mid_ct_list").find("a").length;
                    var Max=(listL-4)*283;
                    if(-leftOld>=Max){
                        $(this).addClass("disabled").hide();
                    }
                }
                setTimeout(function(){
                    flasg=true;
                    console.log(flasg);
                },500)
            }

        });
        var uflasg=true;
        $("span.index_mid_prev").on("click",function(){
            if(uflasg==true){
                uflasg=false;
                var leftOld=$(this).siblings(".index_mid_ct_list").children("div").position().left;
                if(!$(this).hasClass("disabled")){
                    leftOld+=283;
                    $(this).siblings(".index_mid_ct_list").children("div").css({
                        "-webkit-transition":"-webkit-transform 500ms ease-out",
                        "transition":"transform 500ms ease-out",
                        "transform":"translate("+leftOld+"px,0) scale(1) translateZ(0px)"
                    });
                    $(this).siblings(".index_mid_next").removeClass("disabled").show();
                    console.log(leftOld);
                    if(leftOld>=-283){
                        $(this).addClass("disabled").hide();
                    }
                }
            }
            setTimeout(function(){
                uflasg=true;
            },500)
        });


        $(".index_mid_next").on("mouseenter",function(){
            if(!$(this).hasClass("disabled")){
                $(this).addClass("hoverMspan");
            }
        }).on("mouseleave",function(){
            $(this).removeClass("hoverMspan");
        })
        $(".index_mid_prev").on("mouseenter",function(){
            if(!$(this).hasClass("disabled")){
                $(this).addClass("hoverMspan");
                return false;
            }
        }).on("mouseleave",function(){
            $(this).removeClass("hoverMspan");
            return false;
        })
    });

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
