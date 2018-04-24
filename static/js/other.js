$(function(){
  var $waves = $('#waves');
  var waves = new SineWaves({
    el: document.getElementById('waves'),

    speed: 2,

    width: function() {
      return $(window).width();
    },

    height: function() {
      return $waves.parent().height();
    },

    wavesWidth: '95%',

    ease: 'SineInOut',

    waves: [
      {
        timeModifier: 1,
        lineWidth: 3,
        amplitude: 150,
        wavelength: 200,
        segmentLength: 1,
        type: 'Fibonacci',
      },
      {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: -75,
        wavelength: 100,
        segmentLength: 1,
        type: 'Fibonacci',
      }
    ],

    initialize: function (){

    },

    resizeEvent: function() {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(.5, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      var index = -1;
      var length = this.waves.length;
      while(++index < length){
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    }
  });
  //测试步骤
  $('.step-tab ul li').bind('mouseenter',function(){
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $('.active .step-tab-main-bg').addClass('animated pulse');
    $('.active .step-name span').addClass('animated pulse');
//		$(this).next().addClass('animated bounceIn');
  })
  $('.step-tab ul li').bind('mouseleave',function(){
    $(this).next().removeClass('active');
    $('.active .step-tab-main-bg').removeClass('animated pulse');
    $('.active .step-name span').removeClass('animated pulse');
  })

})
