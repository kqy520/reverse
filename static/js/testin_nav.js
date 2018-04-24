/*testin 副导航*/
$(function(){
	$("#side_nav").hide();
	var targetObjPosition = [];
	var scrollTargetObj = $("body").find("h3[scrollTargetName]");
	var navHeight = $(".fs_nav_list1").parent().height();      
	if( navHeight == 65){
		navHeight = navHeight + 5;
	}

	$(".side_nav_list>a").on("click",function(){
		
		if($(this).parent("div").hasClass("show")){
			$(this).parent("div").removeClass("show");
			return false;
		}else{
			$(this).parent("div").addClass("show");
			return false;
		}
	});
	$.each(scrollTargetObj,function(index,obj){
	var puspHeight = (navHeight == 65 ) ? ( $(obj).offset().top - navHeight - 150) : ( $(obj).offset().top - navHeight - 150);
		targetObjPosition.push( {"height":puspHeight,"tagName":$(obj).attr("scrolltargetname")} );
	});

	$(".header_nav > li").on("mouseover",function(){
		$(this).find(".nav_box_wrap").stop(true,false).show().addClass("animations");
	}).on("mouseleave",function(){
		$(this).find(".nav_box_wrap").stop(true,false).hide().removeClass("animations");
	});
	$(window).scroll(function(){
		var _this = $(this);

		if($(this).scrollTop()>620)
		{
			$("#side_nav").show();
			$('.scroll_top').css('position','fixed');
			$('.scroll_top').css('top','0');
			$('.scroll_top').css('z-index','99');

			if(!$(".scroll_top").hasClass("fullscreen")){
				$('.scroll_top').find("li a").stop(true,false).animate({
					"padding":"0 20px"
				},200);
				$('.scroll_top>div').find(".consult_btnNav").remove();
				$('.scroll_top>div.pw_nav').append("")
			}
			$('.fullscreen').css({
				width:"100%"
			});
			$(".all-classify").show();
		}else{
			$("#side_nav").hide(); 
			
			$('.scroll_top').css('position','relative');
			if($(".scroll_top").hasClass("fullscreen")){
				$('.scroll_top').css('width','auto');
			}else{
				$('.scroll_top').css('width','');
				$('.scroll_top').find("li a").stop(true,false).animate({
					"padding":"0 40px"
				},200);
				$('.scroll_top>div').find(".consult_btnNav").remove();
			}
			$('.scroll_top').css('z-index','99');
			$(".all-classify").hide();
		}
		var fs_nav_list1 = $('.fs_nav_list1 li > a');
		for( var i = 0;i < targetObjPosition.length; i++ ){
			var thisTop =  _this.scrollTop()+5;
			var targetTop = targetObjPosition[i]['height'];
			if( thisTop < targetTop ){
				var targetNum = 0;
				if( i == 0 ){
					targetNum = 0;
				}else{
					targetNum =i-1;
				}
				fs_nav_list1.removeClass("active");
				var targetNameFlag = targetObjPosition[targetNum]['tagName'];				
				$('.fs_nav_list1 li > a[scrolltargetname="'+ targetNameFlag +'"]').addClass("active");
				break;
			}

			if( i ==  targetObjPosition.length - 1 && thisTop >= targetObjPosition[targetObjPosition.length - 1]['height'] ){
				
				fs_nav_list1.removeClass("active");
				fs_nav_list1.eq(targetObjPosition.length - 1).addClass("active");
				var targetNameFlag = targetObjPosition[targetObjPosition.length - 1]['tagName'];
				
				$('.fs_nav_list1 li > a[scrolltargetname="'+ targetNameFlag +'"]').addClass("active");
			}
		}
	});

	var $top_box_li = $('#top_box li');
	$(".fs_nav_list1 li a").click(function(){
		var _data=($(this).attr("scrollTargetName"));
		var _el = $(document).find("h3[scrollTargetName='"+ _data +"']");
		if(!_el.length==0){
			var scrollTop = $(document).scrollTop(); 
			var _top=_el.offset().top;
			var navHeight = $(".fs_nav_list1").parent().height();
			if( navHeight == 80 ){
				navHeight = navHeight + 5;
			}			
			var toScrollTop = 0 ;
			if( scrollTop < 420 ){
				toScrollTop = ( navHeight == 85 ) ? ( _top - navHeight - 151 ) : (_top - navHeight - 96 );
			}else{
				toScrollTop = ( navHeight == 85 ) ? (_top - navHeight - 66) : (_top - navHeight - 31);
			}
			
			$("html,body").animate({"scrollTop":toScrollTop+ "px"});
		}

	});
	function midNav(){
		var _this = $(window);
		if(_this.scrollTop()>420)
		{			
			$('.scroll_top').css('position','fixed');
			$('.scroll_top').css('top','0');
			$('.scroll_top').css('z-index','99');
			$(".all-classify").slideDown();
		}else{			
			$('.scroll_top').css('position','relative');
			if($(".scroll_top").hasClass("fullscreen")){
				$('.scroll_top').css('width','auto');
			}else{
				$('.scroll_top').css('width','px');
			}
			$('.scroll_top').css('z-index','99');
			$(".all-classify").hide();
		}
		var fs_nav_list1 = $('.fs_nav_list1 li > a');

		for( var i = 0;i < targetObjPosition.length; i++ ){
			var thisTop =  _this.scrollTop();
			var targetTop = targetObjPosition[i]['height'];

			if( thisTop < targetTop ){
				var targetNum = 0;
				if( i == 0 ){
					targetNum = 0;
				}else{
					targetNum =i-1;
				}

				fs_nav_list1.removeClass("active");
				var targetNameFlag = targetObjPosition[targetNum]['tagName'];
				$('.fs_nav_list1 li > a[scrolltargetname="'+ targetNameFlag +'"]').addClass("active");
				
				break;
			}
			if( i ==  targetObjPosition.length - 1 && thisTop >= targetObjPosition[targetObjPosition.length - 1]['height'] ){
				fs_nav_list1.removeClass("active");

				var targetNameFlag = targetObjPosition[targetObjPosition.length-1]['tagName'];
				$('.fs_nav_list1 li > a[scrolltargetname="'+ targetNameFlag +'"]').addClass("active");
			}
		}

		if ($(window).scrollTop() > 100){
			$(".go_top").fadeIn(500);
		}else{
			$(".go_top").fadeOut(500);
		}
	}
});
