function g(id) {
	return document.getElementById(id);
}
//显示弹出层 关闭弹出层
function showDia() {
	g('show-area').style.display = 'block';
	g('mask').style.display = 'block';
	var oWidth = document.documentElement.clientWidth - g('show-area').offsetWidth; //计算边距
	var oHeight = document.documentElement.clientHeight - g('show-area').offsetHeight;
	g('show-area').style.left = oWidth / 2 + 'px';
	g('show-area').style.top = oHeight / 2 + 'px';
}

function hideDia() {
	g('show-area').style.display = 'none';
	g('mask').style.display = 'none';
}

g('show-btn').addEventListener('click', showDia, false);
g('close1').addEventListener('click', hideDia, false);
g('close2').addEventListener('click', hideDia, false);
g('close3').addEventListener('click', hideDia, false);
g('mask').addEventListener('click', hideDia, false);
//拖拽部分
var mouseOffsetX = 0;
var mouseOffsetY = 0;

var  isDraging = false; //标记是否为可拖动
//鼠标按下标题栏
g('show-title').addEventListener('mousedown', function(e){
	var e = event || window.event;
	mouseOffsetX = e.clientX - g('show-area').offsetLeft;
	mouseOffsetY = e.clientY - g('show-area').offsetTop;
	isDraging = true;

}, false);
//鼠标移动事件
document.onmousemove = function(e) {
	var e = event || window.event;
	var mouseX = e.clientX;
	var mouseY = e.clientY;

	var moveX = 0;
	var moveY = 0;
	if (isDraging === true) {
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;
		//范围限定 moveX > 0 && moveX < (页面最大高度 - 浮层高度)
		//         moveY > 0 && moveY < (页面最大宽度 - 浮层宽度

		var maxX = document.documentElement.clientWidth - g('show-area').offsetWidth;
		var maxY = document.documentElement.clientHeight - g('show-area').offsetHeight;

		moveX = Math.min(maxX, Math.max(0,moveX));
		moveY = Math.min(maxY, Math.max(0,moveY));

		g('show-area').style.left = moveX + 'px';
		g('show-area').style.top = moveY + 'px';

	}
}
//鼠标松开事件
document.onmouseup = function() {
	isDraging = false;
}