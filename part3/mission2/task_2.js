var nameInfo = document.getElementById('name_info'),
	passworfInfo = document.getElementById('password_info'),
	confirmInfo = document.getElementById('confirm_info'),
	emailInfo = document.getElementById('email_info'),
	phoneInfo = document.getElementById('phone_info');
var right = document.querySelector('.right'),
	userinput = document.querySelectorAll('input'),
	userspan = document.querySelectorAll('span'),
	form = document.getElementById('form1'),
	btn = document.querySelector('button');
//起始加载项
window.onload = function() {
	inFocus();
	outFocus();
	btnClick();
}
//聚焦事件委托
inFocus = function() {
		form.addEventListener('focusin', function(event) { //focus不支持冒泡
			var target = event.target;
			switch(target.id) {
				case '0':
					userspan[0].innerHTML = '请输入长度为4~16位字符';
					break;
				case '1':
					userspan[1].innerHTML = '请输入6~16位密码';
					break;
				case '2':
					userspan[2].innerHTML = '请再次输入密码';
					break;
				case '3':
					userspan[3].innerHTML = '请输入邮箱地址';
					break;
				case '4':
					userspan[4].innerHTML = '请输入手机号码';
					break;

			}
		}, false);
}
//焦点移出
outFocus = function() {
	form.addEventListener('focusout', function(event) { //blur不支持冒泡
		var target = event.target;
		switch(target.id) {
			case '0'://验证姓名
				if (countLength(userinput[0].value) == 0) {
					userspan[0].innerHTML = '姓名不能为空';
					inputInfo(userspan[0], userinput[0], false);
				} else if (countLength(userinput[0].value) >= 4 && countLength(userinput[0].value) <= 16 ) {
					userspan[0].innerHTML = '格式正确';
					inputInfo(userspan[0], userinput[0], true);
				} else {
					userinput[0].innerHTML = '请输入长度为4~16位字符';
					inputInfo(userspan[0], userinput[0], false);
				};
				break;
			case '1'://验证密码
				if (countLength(userinput[1].value) == 0) {
					userspan[1].innerHTML = '密码不能为空';
					inputInfo(userspan[1], userinput[1], false);
				} else if (countLength(userinput[1].value) >= 6 && countLength(userinput[1].value) <= 16 ) {
					userspan[1].innerHTML = '格式正确';
					inputInfo(userspan[1], userinput[1], true);
				} else {
					userinput[1].innerHTML = '请输入长度为6~16位密码';
					inputInfo(userspan[1], userinput[1], false);
				};
				break;
			case '2'://确认密码
				if (userinput[1].value == userinput[2].value) {
					userspan[2].innerHTML = '密码一致';
					inputInfo(userspan[2], userinput[2], true);
				} else {
					userspan[2].innerHTML = '输入的密码不一致';
					inputInfo(userspan[2], userinput[2], false);
				};
				break;
			case '3'://验证邮箱
				var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (filter.test(userinput[3].value)) {
					userspan[3].innerHTML = '邮箱格式正确';
					inputInfo(userspan[3], userinput[3], true);
				} else {
					userspan[3].innerHTML = '您的电子邮件格式不正确';
					inputInfo(userspan[3], userinput[3], false);
				};
				break;
			case '4'://验证手机号
				var filter  = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
				if (filter.test(userinput[4].value)) {
					userspan[4].innerHTML = '手机号码格式正确';
					inputInfo(userspan[4], userinput[4], true);
				} else {
					userspan[4].innerHTML = '您的手机号码格式不正确';
					inputInfo(userspan[4], userinput[4], false);
				};
				break;
		}
	}, false);
} 
//计算字符长度的函数
function countLength(str) {
	var inputLength = 0;
	for (var i = 0; i < str.length; i++) {
		var countCode = str.charCodeAt(i);
		if (countCode >= 0 && countCode <=128) {
			inputLength += 1;
		} else {
			inputLength += 2;
		}
	}
	return inputLength;
}
//input框样式函数
function inputInfo(text,input,bool) {
	if(bool) {
		text.style.color = 'lightgreen';
		input.style.border = '1px solid lightgreen';
	} else {
		text.style.color = 'red';
		input.style.border = '1px solid red';
	}
}
//button 验证
btnClick = function() {
	btn.addEventListener('click', function(){
		for (var i = 0; i < userspan.length; i++) {
			if(userspan[i].style.color != 'lightgreen') {
				alert('输入有误');
				return 0;
			}
			alert('验证成功');
			}
		}
	}, false);
}