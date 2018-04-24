
$(function(){
	var targetObjPosition = [];
	var scrollTargetObj = $("body").find("h3[scrollTargetName]");
	var navHeight = $(".fs_nav_list1").parent().height();      //nav高度
	if( navHeight == 65){
		navHeight = navHeight + 5;
	}
	//scrollSide();
	//midNav();
	/*左侧导航栏*/
$(".side_nav_list>a").on("click",function(){
		$(this).next("ul").slideToggle("fast");
	});
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
		//var puspHeight = (navHeight == 65 ) ? ( $(obj).offset().top - navHeight - 150) : ( $(obj).offset().top - navHeight - 85);
	var puspHeight = (navHeight == 65 ) ? ( $(obj).offset().top - navHeight - 150) : ( $(obj).offset().top - navHeight - 150);
		targetObjPosition.push( {"height":puspHeight,"tagName":$(obj).attr("scrolltargetname")} );
	});
	/***顶部导航栏事件绑定****/
	$(".header_nav > li").on("mouseover",function(){
		$(this).find(".nav_box_wrap").stop(true,false).show().addClass("animations");
	}).on("mouseleave",function(){
		$(this).find(".nav_box_wrap").stop(true,false).hide().removeClass("animations");
	});
	$(window).scroll(function(){
		var _this = $(this);

		if($(this).scrollTop()>420)
		{
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
				/*fs_nav_list1.eq(targetNum).addClass("active");*/
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

	var $top_box_li = $('#top_box li');    //页面侧边栏绑定事件
	$top_box_li.hover(function(){
		 if($(this).index() == 0){
			$('#box_li_info').fadeIn();
			$(this).find('a').addClass('img_tab1');
		}else if($(this).index() == 1){
			$(this).find('a').addClass('img_tab2');
		}
	},function(){
		 if($(this).index() == 0){
			$('#box_li_info').fadeOut();
			$(this).find('a').removeClass('img_tab1');
		}else if($(this).index() == 1){
			$(this).find('a').removeClass('img_tab2');
		}
	});

	$("body").on("click","#top_box .go_top",function(){    //页面侧边栏滚动绑定事件
		$('body,html').animate({scrollTop:0},500);
		return false;
	});

	//nav滚动定位

	$(window).scroll(function(){
		//scrollSide();
		//midNav();
	});
	var d=0,t=0;
	var m;
	function scrollSide(){
		var _sideNav=$(".side_menus").height();
		var _wh=$(window).height();
		var _footPos=$(document).height() - $(window).height()-160;
		var _this = $(window);
		var p =  _this.scrollTop();
		if(p>_footPos){

			$(".side_menus").css({
				position:"absolute",
				bottom:0,
				top:"auto"
			});
			m=2;

		}else if(p<=66){
			m=1;
			$(".side_menus").css({
				position:"absolute",
				bottom:"auto",
				top:"0"
			});


		}else if(p>66&&p<=_footPos){

			if(_sideNav<=_wh){
				$(".side_menus").css({
					position:"fixed",
					top:0
				})
			}else{
				d = $(window).scrollTop();
				var csm=$(window).height()-_sideNav;
				var _navM;
				if(m==1){
					if(t<=d){//向下滚
						var mwT=$(".side_menus").position().top;
						var _Tops=mwT-(d-t)>csm?$(".side_menus").position().top-(d-t):csm;
						//_navM=-(p-100)>=csm?-(p-100):csm;
						$(".side_menus").css({
							position:"fixed",
							top:_Tops,
							bottom:"auto"
						})
					}else{//向上滚


						var _Tops=$(".side_menus").position().top+(t-d)>0?0:$(".side_menus").position().top+(t-d);
						$(".side_menus").css({
							position: "fixed",
							top: _Tops,
							bottom: "auto"
						});
					}
					setTimeout(function(){t = d;},0);
				}else if(m==2){
					if(t<=d){//向下滚
						var mwT=$(".side_menus").position().top;
						var _Tops=mwT-(d-t)>csm?$(".side_menus").position().top-(d-t):csm;
						//_navM=-(p-100)>=csm?-(p-100):csm;
						$(".side_menus").css({
							position:"fixed",
							top:_Tops,
							bottom:"auto"
						})
					}else{//向上滚
						var _Tops=$(".side_menus").position().top+(t-d)>0?0:$(".side_menus").position().top+(t-d);

						$(".side_menus").css({
							position: "fixed",
							top: _Tops,
							bottom: "auto"
						});
					}
					setTimeout(function(){t = d;},0);
				}


			}

		}
	}


	function midNav(){
		var _this = $(window);
		if(_this.scrollTop()>420)
		{
			$('.scroll_top').css('position','fixed');
			$('.scroll_top').css('top','0');
			$('.scroll_top').css('z-index','99');
			//2017-4-24 hzl
			$(".all-classify").show();
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
				/*fs_nav_list1.eq(targetNum).addClass("active");*/
				break;
			}

			if( i ==  targetObjPosition.length - 1 && thisTop >= targetObjPosition[targetObjPosition.length - 1]['height'] ){
				fs_nav_list1.removeClass("active");
//				fs_nav_list1.eq(targetObjPosition.length - 1).addClass("active");
				var targetNameFlag = targetObjPosition[targetObjPosition.length-1]['tagName'];
				$('.fs_nav_list1 li > a[scrolltargetname="'+ targetNameFlag +'"]').addClass("active");
			}
		}

		/*********网页侧边栏鼠标滚动***********/
		if ($(window).scrollTop() > 100){
			$(".go_top").fadeIn(500);
		}else{
			$(".go_top").fadeOut(500);
		}
	}
	//二级下拉菜单
	(function(){
		$('.head_nav ul li').hover(
			function(){
				$(this).find('div').show();
				$(this).find('span').addClass('triangle');
			},function(){
				$(this).find('div').hide();
				$(this).find('span').removeClass('triangle').addClass('last_icon');
			});
	})();

	//点击切换两张图片
	(function(){
		var oBox = $('.app_ep_tab');
		var oBtnPrev = $('.app_ep_prev');
		var oBtnNext = $('.app_ep_next');
		var aLi = oBox.find('li');
		var $app_text_dt = $('.app_text_list li');
		var $span1 = $('.span1_text');
		var $span2 = $('.span2_text');
		var arrSpan = ['加密前','加密后','资源文件隐藏前','资源文件隐藏后','so库lvm编译级混淆前','so库lvm编译级混淆后','加密前','加密后'];
		var arrH4 = ['DEX动态分离加密','应用数据安全','so库文件高级加密','防逆向篡改'];
		var oH4 = oBox.find('h4');

		var oUl = oBox.find('ul');
		var iWidth = aLi.outerWidth(true);
		//oUl[0].style.width = aLi.length * iWidth +'px';
		oUlWidth = aLi.length * iWidth +'px';
		$('.app_ep_tab ul').css('width',oUlWidth);

		var iNow = 0;
		var num = Math.ceil(aLi.length/2);
		oBtnNext.click( function (){
			iNow++;
			if(iNow > 3){
				iNow = 0;
			}

			oUl.animate({'left':-iNow*1094},'linear');

			if( iNow == 0){
				$span1.text(arrSpan[iNow]);
				$span2.text(arrSpan[iNow+1]);
				oH4.text(arrH4[iNow]);
			}else if(iNow==1){
				$span1.text(arrSpan[iNow+1]);
				$span2.text(arrSpan[iNow+2]);
				oH4.text(arrH4[iNow]);

			}else if(iNow==2){
				$span1.text(arrSpan[iNow+2]);
				$span2.text(arrSpan[iNow+3]);
				oH4.text(arrH4[iNow]);
			}else if(iNow==3){
				$span1.text(arrSpan[iNow+3]);
				$span2.text(arrSpan[iNow+4]);
				oH4.text(arrH4[iNow]);
			}
		});

		$('.app_text_list li').hover(function(){
			$(this).find('dt').eq(0).css('color','#156cd5');

		},function(){
			$(this).find('dt').css('color','#333');
		});

		oBtnPrev.click( function (){
			if(iNow==0){
				iNow = 4;
			}

			iNow--;

			oUl.animate({'left':-iNow*1094},'linear');

			if(iNow==0){
				$span1.text(arrSpan[iNow]);
				$span2.text(arrSpan[iNow]);
				oH4.text(arrH4[iNow]);
			}else if(iNow == 1){
				$span1.text(arrSpan[iNow+1]);
				$span2.text(arrSpan[iNow+2]);
				oH4.text(arrH4[iNow]);
			}else if(iNow == 2){
				$span1.text(arrSpan[iNow+2]);
				$span2.text(arrSpan[iNow+3]);
				oH4.text(arrH4[iNow]);
			}else if(iNow == 3){
				$span1.text(arrSpan[iNow+3]);
				$span2.text(arrSpan[iNow+4]);
				oH4.text(arrH4[iNow]);
			}
		});

		$app_text_dt.hover(function(){

			if($(this).index() ==0 ){
				$(this).stop();
				oUl.animate({'left':0 },300);
				oH4.text(arrH4[0]);
				$span1.text(arrSpan[0]);
				$span2.text(arrSpan[1]);
				iNow = 0;
			}else if($(this).index() ==1 ){
				$(this).stop();
				oUl.animate({'left':-1094 },300);
				oH4.text(arrH4[1]);
				$span1.text(arrSpan[2]);
				$span2.text(arrSpan[3]);
				iNow = 1;
			}else if($(this).index() ==2 ){
				$(this).stop();
				oUl.animate({'left':-2188 },300);
				oH4.text(arrH4[2]);
				$span1.text(arrSpan[4]);
				$span2.text(arrSpan[5]);
				iNow = 2;
			}else if($(this).index() ==3 ){
				$(this).stop();
				oUl.animate({'left':-3282 },300);
				oH4.text(arrH4[3]);
				$span1.text(arrSpan[6]);
				$span2.text(arrSpan[7]);
				iNow = 3;
			}

		},function(){
			$(this).stop();
		});

	})();

	//999
	(function(){
		var $fs_case_ul = $('.fs_case ul');
		var $aLi = 	$fs_case_ul.find('li');
		var $oA = $('.Circle_min a');

		var iNow =0;
		var iNow2 =0;
		var iTmer = null;
		$fs_case_ul.width(1200*$oA.length);

		$oA.click(function(){
			iNow++;
			$(this).addClass('active').siblings().removeClass('active');
			$fs_case_ul.animate({'left':-$(this).index() *1200},'linear');

		});


		$('.fs_case').hover(function(){
			clearInterval(iTmer);
		},function(){
			iTmer = setInterval(toRun,4000);
		});

		iTmer = setInterval(toRun,4000);
		function toRun(){

			var aLi0 =$fs_case_ul.children().get(0);
			if(iNow >= $oA.size()-1){

				iNow = 0;
			}else{
				iNow++;
			}

			$oA.eq(iNow).addClass('active').siblings().removeClass('active');

			$fs_case_ul.animate({'left':-iNow*1200},'linear');
		}
		//底部切换
		(function(){
			var $fs_pic_li = $('.fs_Piclist_top ul li a');
			$fs_pic_li.click(function(){
				$fs_pic_li.removeClass()
				if( $(this).text() == '资质列表'){
					$('.Qualif_List').show();
					$('.HonorList').hide();
					$(this).addClass('active');

				}else if( $(this).text() == '荣誉照片'){
					$('.Qualif_List').hide();
					$('.HonorList').show();
					$(this).addClass('active');
				}
			});

			//图片切换
			var $list_h_ul = $('.list_h ul');
			var $list_h_ul_li = $list_h_ul.find('li');
			var ulWidth = 1200;
			var $list_h_prve = $('.a_tab .prev');
			var $list_h_next = $('.a_tab .next');
			var iNum = 0;
			$list_h_ul.width(ulWidth*3);

			$list_h_next.click(function(){
				iNum++;
				if(iNum > 1){
					iNum = 1;
				}

				$list_h_ul.animate({'left':-iNum*1200},300);

			});

			$list_h_prve.click(function(){

				if(iNum<1){
					iNum = 0;
					return false;
				}
				iNum--;
				$list_h_ul.animate({'left':-iNum*1200},300);

			});

			$list_h_ul_li.hover(function(){
				$(this).find('p').show();
			},function(){
				$(this).find('p').hide();
			});
		})();
	})();



});
