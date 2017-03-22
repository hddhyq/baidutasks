var dlrBtn = document.getElementById('dlr_order'),
	ldrBtn = document.getElementById('ldr_order'),
	lrdBtn = document.getElementById('lrd_order'),
	treeRoot = document.getElementById('root'),
	divList = [],
	timer = null;

window.onload = function() {
		dlrBtn.onclick = function() {
			reset();
			dlrOrder(treeRoot);
			changeColor();
		}
		ldrBtn.onclick = function() {
			reset();
			ldrOrder(treeRoot);
			changeColor();
		}
		lrdBtn.onclick = function() {
			reset();
			lrdOrder(treeRoot);
			changeColor();
		}
}

//前序遍历 递归真厉害
function dlrOrder(node) {
	if (!(node == null)) {
		divList.push(node);
		dlrOrder(node.firstElementChild);
		dlrOrder(node.lastElementChild);
	}
}
//中序遍历
function ldrOrder(node) {
	if (!(node == null)) {
		ldrOrder(node.firstElementChild);
		divList.push(node);
		ldrOrder(node.lastElementChild);
	}
}
//后序遍历
function lrdOrder(node) {
	if (!(node == null)) {
		lrdOrder(node.firstElementChild);
		lrdOrder(node.lastElementChild);
		divList.push(node);
	}
}
//变换颜色函数
function changeColor() {
	var i = 0;
	divList[i].style.backgroundColor = 'red';
	timer = setInterval(function(argument) {
		i++;
		if (i < divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'red';
		} else {
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500)
}
//初始化样式
function reset() {
	divList = [];
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}