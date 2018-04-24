// Baidu
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1b8c1194303ef64e02f003f0cb8a1906";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
// GA
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-102906426-1');
(function(){
  var gas = document.createElement("script");
  gas.src = "https://www.googletagmanager.com/gtag/js?id=UA-102906426-1";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(gas, s);
})();
// GTA
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WJBJDV');

function changeLang (dom) {
  switch (dom.value) {
    case 'zh-CN':
      window.location.href = '/'
      break
    case 'en-US':
      window.location.href = '/en'
      break
  }
}

$(function(){
  var pageSourceMap = {
    about: '关于我们',
    advisory: '安全咨询',
    audit: '代码审计',
    cipher: '商用密码',
    host: '主机防护',
    index: '首页',
    pentest: '渗透测试',
    reinforce: '应用加固',
    scan: '应用扫描',
    solution: '解决方案'
  };
  var lang = (window.location.pathname.indexOf('/en') === 0 || window.location.pathname.indexOf('/mobile/en') === 0) ? 'en' : 'zh';
  var textMap = {
    en: {
      required: 'required',
      maxlength: 'maximum length exceeded',
      format: 'invalid input',
      success: 'Success'
    },
    zh: {
      required: '该项不能为空',
      maxlength: '超出最大长度',
      format: '格式不正确',
      success: '提交成功'
    }
  };
  // validate-code-image
  var img = $('#random_img');
  var imgRef = $("#move_nav_4 .refresh");
  function changeSrc(){
    img.attr('src', '/api/v1/consultant/captcha?_=' + Math.random());
  }
  img.click(changeSrc);
  imgRef.click(changeSrc);
  changeSrc();
  // field
  var fieldNames = ['username', 'email', 'phone', 'validatecode'];
  var fieldMap = {};
  var fieldMsg = {};
  var hasError;
  fieldValidate = {
    username: function(e){
      var val = fieldMap.username.val();
      if(!val){
        fieldMsg.username.text((hasError = textMap[lang].required));
      }else if(val.length > 20){
        fieldMsg.username.text((hasError = textMap[lang].maxlength));
      }else{
        fieldMsg.username.text((hasError = ''));
      }
    },
    email: function(e){
      var val = fieldMap.email.val();
      if(!val){
        fieldMsg.email.text((hasError = textMap[lang].required));
      }else if(!/^[^@\s]+@([a-zA-Z0-9-_]+)(.[a-zA-Z0-9-_]+){1,2}$/.test(val)){
        fieldMsg.email.text((hasError = textMap[lang].format));
      }else if(val.length > 50){
        fieldMsg.email.text((hasError = textMap[lang].maxlength));
      }else{
        fieldMsg.email.text((hasError = ''));
      }
    },
    phone: function(e){
      var val = fieldMap.phone.val();
      if(!val){
        fieldMsg.phone.text((hasError = textMap[lang].required));
      }else if(!/^(\d|-)+$/.test(val)){
        fieldMsg.phone.text((hasError = textMap[lang].format));
      }else if(val.length > 15){
        fieldMsg.phone.text((hasError = textMap[lang].maxlength));
      }else{
        fieldMsg.phone.text((hasError = ''));
      }
    },
    validatecode: function(e){
      var val = fieldMap.validatecode.val();
      if(!val){
        fieldMsg.validatecode.text((hasError = textMap[lang].required));
      }else if(!/^[a-zA-Z0-9]+$/.test(val)){
        fieldMsg.validatecode.text((hasError = textMap[lang].format));
      }else if(val.length > 6){
        fieldMsg.validatecode.text((hasError = textMap[lang].maxlength));
      }else{
        fieldMsg.validatecode.text((hasError = ''));
      }
    }
  };
  for(var i=0; i<fieldNames.length;i++){
    fieldMap[fieldNames[i]] = $('#' + fieldNames[i]);
    fieldMsg[fieldNames[i]] = $('#error-' + fieldNames[i]);
  }
  fieldMap.username.change(fieldValidate.username);
  fieldMap.email.change(fieldValidate.email);
  fieldMap.phone.change(fieldValidate.phone);
  fieldMap.validatecode.change(fieldValidate.validatecode);

  $(".apply-form-submt").click(function(e){
    e.preventDefault();
    var data = {};
    for(var i=0; i<fieldNames.length;i++){
      fieldValidate[fieldNames[i]]();
      if(hasError){return}
      data[fieldNames[i]] = fieldMap[fieldNames[i]].val();
    }
    var pagePath = location.pathname.replace('.html', '');
    var pageName = pagePath.substring(pagePath.lastIndexOf('/')+1);

    $.ajax({
      headers: { 'Accept-Language': (lang === 'en' ? 'en-US' : 'zh-CN') },
      method: 'POST',
      url: "/api/v1/consultant",
      data: {
        name: data.username,
        email: data.email,
        mobile: data.phone,
        code: data.validatecode,
        source: (pageSourceMap[pageName] || pageName)
      },
      complete: (xhr, status) => {
        changeSrc();
        if (xhr.status !== 200) {
          $("#form-msg").css({marginTop:'10px', fontSize:'14px', color:'#F00'}).text(xhr.responseJSON && xhr.responseJSON.msg || 'ERROR');
        } else {
          $("#form-msg").css({marginTop:'10px', fontSize:'14px', color:'#099'}).text(textMap[lang].success);
          $('.myform').get(0).reset();
        }
      }
    })
  });
});
