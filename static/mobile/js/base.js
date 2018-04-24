$.fn.iCheck = function(){
  return $(this).each(function(index){
    var data = $(this).data('ui');
    if(!data){
      var id = $(this).attr('id'),
      type = $(this).data('type')||$(this).attr('type');
      id||$(this).attr('id',id=(new Date().getTime())+index.toString());
      $('<label class="ui-'+type+'" for="'+id+'"><span><i></i></span></label>').insertAfter($(this).hide());
      $(this).data('ui',true);
    }
  });
};
//左侧菜单伸缩切换
$(function(){
  //初始化 datetimepicker
  !$.fn.datetimepicker||$('form input[data-toggle="datetimepicker"]').datetimepicker({format:'YYYY-MM-DD HH:mm:ss',locale:'zh-cn'});

  var $body = $(document.body),isDisabled = false;
  $('.navbar-title-icon').on('click','.icon',function(e){
    $body.toggleClass('tpro-menu-df',$(this).hasClass('icon-df'));
  });

  $('.side-menu-container .navbar-nav').on('click','li',function(){
    if(!$(this).hasClass('status-active')){
      $(this).siblings().removeClass('status-active').end().addClass('status-active');
    }
  }).on('click','li>a',function(){
    if($(this).hasClass('dropdown-toggle'))return;
    $(this).parent().parent().find('li a.active').removeClass('active');
    if(!$(this).next().hasClass('dropdown-menu')&&!$(this).hasClass('active')){
      $(this).addClass('active');
    }
  });
  $(document).on('click','.table-select tr',function(){
    if($(this).children('td').length>0){
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');
    }
  }).on('change','[data-toggle="visibility"]',function(){
    var $target = $($(this).data('target')),isCheck = $(this).is(':radio')||$(this).is(':checkbox');
    if(isCheck){
      var $that = $(this);
      if(!$(this).data('click.visibility')){
        var type = $(this).attr('type'),name = $(this).attr('name');
        var $group = $($(this).get(0).tagName+'[name="'+name+'"]:'+type);
        $group.on('click',function(){
          $target.removeClass('tn-hidden tn-visible').addClass($that.prop('checked')?'tn-visible':'tn-hidden');
        });
        $(this).data('click.visibility',true);
      }
      $target.removeClass('tn-hidden tn-visible').addClass($(this).prop('checked')?'tn-visible':'tn-hidden');
    }else{
      $target.toggle();
    }
  });
  $('form input:radio:not([ui="false"]),form input:checkbox:not([ui="false"]),table input:checkbox:not([ui="false"]),input[data-toggle="iCheck"]:not([ui="false"])').iCheck();
  $(document).on('click','table th:first input:checkbox',function(){
    var $all = $(this).parents('tr').siblings('tr').find('td:first-child input:checkbox');
    $all.prop('checked',$(this).prop('checked'));
  }).on('click','table td:first input:checkbox',function(){
    var $cbx_all = $(this).parents('table').find('tr th:first input:checkbox');
    var $all = $(this).parents('table').find('tr td:first-child input:checkbox');
    $cbx_all.prop('checked',$all.length==$all.filter(':checked').length);
  });
  $(".filter-options input:not('.cbx-all')").on('click',function(){
    if(!$(this).prop('checked')){
      $(this).parents(".filter-options").find(".cbx-all").prop('checked', false);
    }
  });
  //左侧菜单展开效果
  $('.side-menu-container .navbar-nav').on('click','li > a',function(){
    var $container = $(this).parent().siblings();
    $container.removeClass('open');
    if(!$(this).parents("body").hasClass("tpro-menu-df")&&$(this).hasClass("dropdown-toggle")){
      $(this).parents("body").addClass("tpro-menu-df");
      $(this).parent().addClass('open');
    }else{
      $(this).parent().toggleClass('open');
    }
  });
  //下拉菜单动画效果
  //$('.dropdown-toggle').on('click show.bs.dropdown',function(){
  //  $(this).next().addClass('animated anim-slideDown');
  //}).on('hidden.bs.dropdown',function(){
  //  $(this).next().removeClass('animated anim-slideDown');
  //});

  var menu = $("#page-menu");
  if (menu&&menu.offset()) {
    oTop = menu.offset().top;
    sHeight = menu.height();
    var to_bottom = $(document).height() - oTop;
    menu.css("height",to_bottom);

    $(window).resize(function(){
      var menu = $("#page-menu");
      menu.css("height","inherit");
      oTop = menu.offset().top;
      sHeight = menu.height();
      var to_bottom = $(document).height() - oTop;
      menu.css("height",to_bottom);
    });
  }
  $(document).ready(function(){
    var ul_height = $("#page-menu").height() - 89;
    var ul_min = $(document).height() -142;
    $(".usecase_management .ui-left").css({"height":ul_height,"min-height":ul_min});
  });
  $(window).resize(function(){
    var ul_height = $("#page-menu").height() - 89;
    $(".usecase_management .ui-left").css("height",ul_height);
  });
});
$(".backTop").click(function(){
  $('html,body').animate({scrollTop: 0}, 500);
});

$(".contact-mb .c_btn").click(function(){
  $(this).hide();
  $(".c_btn_in").show();
  event.stopPropagation();
});
$(".contact-mb .c_btn_in").click(function(){
  event.stopPropagation();
});
$(document).click(function(){
  $(".c_btn").show();
  $(".c_btn_in").hide();
});
$("body").children().click(function () {

});

$(window).scroll(function(){
  var overHeight = $(window).scrollTop() - $(window).height();
  if(overHeight>0){
    $(".backTop").parent().addClass("top_active");
  }else{
    $(".backTop").parent().removeClass("top_active");
  }
});

//顶部提示
$(".alert_close").click(function(){
  $(this).parent(".overview-alert").fadeOut(500);
});
//未认证
$(".certified_tip label").mouseenter(function(){
  $(".certifie_drop").fadeIn(200);
});
$(".certified_tip").mouseleave(function(){
  $(".certifie_drop").fadeOut(200);
});


$(".contact-tools .online,.contact-alert").hover(function(){
  $(".contact-alert").show();
},function(){
  $(".contact-alert").hide();
});
