
var inputValue = document.getElementById('input-area');
var ul = document.getElementById('arr-area'),
	iptSearch = document.getElementById('input-search'),
	searchFor = document.getElementById('search-for'),
	rightIn = document.getElementById('right-in'),
	clearAll = document.getElementById('clear-all');

rightIn.onclick = function() {
	var items = inputValue.value.trim().split(/[^\d\u4e00-\u9fa5a-zA-Z]+/);//去除空格及正则
	alert(items);
	for(var i = 0; i < items.length; i++) {
		var newNode = document.createElement('li');
		newNode.innerHTML = items[i];
		ul.appendChild(newNode, ul.firstChild);
	}
	inputValue.value = null;
}
//点击删除事件元素
ul.onmouseover = function () {
			var li = ul.getElementsByTagName('li');
			for (var i in li) {
				li[i].index = i;
				li[i].onclick = function () {
					alert(ul.childNodes[this.index].innerHTML);
					ul.removeChild(ul.childNodes[this.index]);
				}
			}
		}
//查询字符串
searchFor.onclick = function() {
	var li = ul.getElementsByTagName('li');
	for(var i = 0; i < li.length; i++) {
		var innerWord = li[i].innerHTML.toLowerCase();
		var keyword = iptSearch.value.toLowerCase();
		if (innerWord.search(keyword)!=-1) {
			li[i].style.background = "black";
		}
	}
}

clearAll.onclick = function() {
	var li = ul.getElementsByTagName('li');
	for (var i = li.length - 1; i >= 0; i--) {
		ul.removeChild(ul.firstChild);
	}
}