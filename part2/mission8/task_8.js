var searchBfBtn = document.getElementById('search-1'),
	searchDfBtn = document.getElementById('search-2'),
	iptText = document.getElementById('search');
var dlrBtn = document.getElementById('pre-order'),
	bfsBtn	= document.getElementById('bfs-order'),
	treeRoot = document.getElementById('root'),
	divList = [],
	BFindex = 0,
	timer = null;

//加载动画完成添加的函数
window.onload = function() {
		dlrBtn.onclick = function() {
			reset();
			traverseDF(treeRoot);
			changeColor();
		}
		bfsBtn.onclick = function() {
			reset();
			traverseBF(treeRoot);
			changeColor();
		}
		searchBfBtn.onclick = function() {
			reset();
			traverseDF(treeRoot);
			searchColor();
		}
		searchDfBtn.onclick = function() {
			reset();
			traverseBF(treeRoot);
			searchColor();
		}
}
//深度遍历
function traverseDF(node) {
	if (node) {
		divList.push(node);
		for (var i = 0; i < node.children.length; i++) {
			traverseDF(node.children[i]);
		}
	}
}
//广度遍历
function traverseBF(node) {
	if(node) {
		divList.push(node);
		traverseBF(node.nextElementSibling);
		node = divList[BFindex++];  //创建的标志符
		traverseBF(node.firstElementChild);
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
//查询
function searchColor() {
	var i = 0;
	var lock = false;
	timer = setInterval(function(argument){
		if (i>0) {
			if (divList[i-1].firstChild.nodeValue.trim().toLowerCase() == iptText.value.toLowerCase()) {
				divList[i-1].style.backgroundColor = 'yellow';
			}else{
				divList[i-1].style.backgroundColor = '#fff';
			}
			//divList[i-1].style.backgroundColor = '#fff';
		}
		if (i == divList.length) {
			clearInterval(timer);
			if (lock) {
				alert('已找到');
			} else {
				alert('未找到');
			}
		}
		if (iptText.value == "") {
			alert('请输入搜索值！');
			clearInterval(timer);
		}
		else {//匹配内容
			console.log(divList[i].firstChild.nodeValue.trim());
			console.log(iptText.value);
			if (divList[i].firstChild.nodeValue.trim().toLowerCase() == iptText.value.toLowerCase()) {
				divList[i].style.backgroundColor = 'yellow';
				//clearInterval(timer);
				i++;
				lock = true;
			}else{
				divList[i].style.backgroundColor = 'red';
				i++;
			}
		}
	},500)
}
//初始化样式
function reset() {
	divList = [];
	BFindex = 0;
	clearInterval(timer);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}