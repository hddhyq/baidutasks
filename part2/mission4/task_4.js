

var inputValue = document.getElementById('input-number');
var ul = document.getElementById('arr-area');
var leftIn = document.getElementById('left-in'),
	rightIn = document.getElementById('right-in'),
	leftOut = document.getElementById('left-out'),
	rightOut = document.getElementById('right-out');


leftIn.onclick = function() {
		if (/^\d+$/.test(inputValue.value)) {   //正则表达验证
			var newNode = document.createElement('li');
			newNode.innerHTML = inputValue.value;
			ul.insertBefore(newNode, ul.firstChild); 
			inputValue.value = null;
	} else {
		alert("请输入数字");
	}
}

rightIn.onclick = function() {
	if (/^\d+$/.test(inputValue.value)) { 
		var newNode = document.createElement('li');
		newNode.innerHTML = inputValue.value;  
		ul.appendChild(newNode);      
		inputValue.value = null;
	} else {
		alert("请输入数字");
	}
}

leftOut.onclick = function() {
	if (ul.hasChildNodes()) {
		alert(ul.firstChild.innerHTML);
		ul.removeChild(ul.firstChild);
	} else {
		alert("队列为空");
	}
}

rightOut.onclick = function() {
	if (ul.hasChildNodes()) {
		alert(ul.lastChild.innerHTML);
		ul.removeChild(ul.lastChild);
	} else {
		alert("队列为空");
	}
}
//点击删除事件元素
ul.onmouseover = function () {
			var li = ul.getElementsByTagName('li');
			for (var i in li) {
				li[i].index = i;
				li[i].onclick = function () {
					ul.removeChild(ul.childNodes[this.index]);
				}
			}
		}