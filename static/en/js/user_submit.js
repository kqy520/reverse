function random_code(){
	document.getElementById('random_img').src='/random_code?t='+ new Date().getTime();
}
$(function(){
	var flag = true;
	var areas ="";            			
			var res_city = areas.split(",");
			if ($(".select-city").length!=0) {
				$(".select-city").citySelect({
					prov:"请选择",
					city:"请选择",	
					nodata:"none"
				});
			}
			

	$("input").each(function(){
	$(this).blur(function(){
		var obj=$(this).attr("name");
		switch(obj)
			{
				//用户名
			case "uname":
				var v=$("input[name='uname']").val();
				if(v==""){
					$("#error-username").text("姓名不能为空");
				}else{
					$("#error-username").text("");
				}
				break;
				//公司名称
			case "ucompany":
				var v=$("input[name='ucompany']").val();
				if(v==""){
					$("#error-comName").text("公司名不能为空");
				}else{
					$("#error-comName").text("");
				}
				break;
				//手机号码
			case "uphone":
				var v=$("input[name='uphone']").val();
				if(v==""){
					$("#error-phone").text("联系电话不能为空");
				}else if(chkPhone(v)==false){
					$("#error-phone").text("联系电话格式有误");
				}
				else{
				  	$("#error-phone").text("");
				}
				break;
				//邮箱
			case "uemail":
				var v=$("input[name='uemail']").val();
				if(v==""){
					$("#error-mail").text("邮箱不能为空");
				}else if(chkMail(v)==false){
				  	$("#error-mail").text("邮箱格式有误");
				}else{
				  	$("#error-mail").text("");
				}
				break;
				//验证码
			case "code":
				var v=$("input[name='code']").val();
				if(v==""){
					$("#error-Verification").text("验证码不能为空");
				}else{
					$("#error-Verification").text("");
				}
				break;
				
			default:
			 
			}
	})
});

	//手机验证
	function chkPhone(obj){
		var reg =/^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
		if(reg.test(obj)==false){
			return false;
		}
		return true;
	};

	//邮箱验证
	function chkMail(obj){
		var reg =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
		if(reg.test(obj)==false){
			return false;
		}
		return true;
	};

	//问题/建议 字符统计
	$("#question").keyup(function(){
		var v_len=$("#question").val().length;
		if(v_len>200){
			$("#error-question").text("字数不能超过200");	
			return false;
		}else{		
			$("#error-question").text("");
		}
	});


	//获取行业选中值
	function checkIndustry (){
		var checkValue = "";
		$("input[type='checkbox']").each(function(){
			if($(this).is(":checked") == true){
				checkValue =checkValue+$(this).val()+",";
			}
		});
		return checkValue;
	}
	//获取地址信息
	function getAddress(){
		var address = "";
		if($(".city").val() != "请选择"){
			address = $(".prov").val()+" "+$(".city").val();
		}
		return address;
	}
	var industryCount=0;
	$("input[type='checkbox']").each(function(){
		if($(this).is(":checked") == true){
			industryCount ++;
		}
	});
	
	//提交验证
	$(".apply-form-submt").on("click",function(){
		//表单验证非空
		var count = 0;
		$("input").each(function(){
				var obj=$(this).attr("name");
				switch(obj)
					{
						//用户名
					case "uname":
						var v=$("input[name='uname']").val();
						if(v==""){
							$("#error-username").text("姓名不能为空");
							count ++;
						}else{
							$("#error-username").text("");
						}
						break;
						//公司名称
					case "ucompany":
						var v=$("input[name='ucompany']").val();
						if(v==""){
							$("#error-comName").text("公司名不能为空");
							count ++;
						}else{
							$("#error-comName").text("");
						}
						break;
						//手机号码
					case "uphone":
						var v=$("input[name='uphone']").val();
						if(v==""){
							$("#error-phone").text("联系电话不能为空");
							count ++;
						}else if(chkPhone(v)==false){
							$("#error-phone").text("联系电话格式有误");
							count ++;
						}
						else{
						  	$("#error-phone").text("");
						}
						break;
						//邮箱
					case "uemail":
						var v=$("input[name='uemail']").val();
						if(v==""){
							$("#error-mail").text("邮箱不能为空");
							count ++;
						}else if(chkMail(v)==false){
						  	$("#error-mail").text("邮箱格式有误");
						  	count ++;
						}else{
						  	$("#error-mail").text("");
						}
						break;
					//验证码
					case "code":
						var v=$("input[name='code']").val();
						if(v==""){
							$("#error-Verification").text("验证码不能为空");
							count ++;
						}else{
							$("#error-Verification").text("");
						}
						break;
					default:
					 
					}

		});
		//验证地址
		var addressCount = 0;
		if($(".city").val() == "请选择"){
			$("#error-address").text("地址不能为空");
			addressCount ++;
		}else{
			$("#error-address").text("");
		}
		//验证行业数据不能为空
		var industryCount = 0;
		$("input[type='checkbox']").each(function(){
			if($(this).is(":checked") == true){
				industryCount ++;
			}
		});
		//提交
		if(count <= 0 && industryCount > 0 && addressCount == 0 ){
			//清除行业提示
			$("#error-uindustry").text("");
			//赋值隐藏域
			var checkValue = checkIndustry();
			var address = getAddress();
			var typetxt = $(".typetxt").text();
			$("input[name='industry']").val(checkValue);
			$("input[name='address']").val(address);
			$("input[name='type']").val(typetxt);
			//提交表单
			var href = "/activity/advise";
			if(flag){
				flag = false;
				$.ajax({
	                cache: true,
	                type: "POST",
	                url:href,
	                data:$('.myform').serialize(),// 你的formid
	                async: false,
	                error: function(request) {
	                	layer.alert("系统异常，保存失败",{
	                		title:'提示',
	                		icon:1
	                	});
	                	flag = true;
	                },
	                success: function(data) {
	                	var obj = JSON.parse(data);
	                    if(obj.msg == "505"){
	                    	layer.alert("保存失败",{
	                    		title:'提示',
	                    		icon:1
	                    	});
	                    	flag = true;
	                    }
	                    if(obj.msg == "1001"){
	                    	layer.alert("验证码错误",{
	                    		title:'提示',
	                    		icon:1
	                    	});
	                    	flag = true;
	                    }
	                    if(obj.msg == "200"){
	                    	//用户信息验证通过，提交成功   提示弹框
	                    	layer.alert("提交成功",{
	                    		title:'提示',
	                    		icon:1
	                    	},function(index){
	                    		window.location.reload();
	                    	});
	                    }
	                }
	            });
			} else {
				layer.alert("请稍后再提交",{
               		title:'提示',
               		icon:1
               	});
			}	
		}else{
			//不提交
			if(industryCount <= 0 ){
				$("#error-uindustry").text("行业不能为空");
			}else{
				$("#error-uindustry").text("");
			}
			return false;
		}
		
	});
	
	//回车提交表单
	$(document).keyup(function(event){
		if(event.keyCode ==13){
		  //提交验证
			$(".apply-form-submt").click();
		}
	});
})



