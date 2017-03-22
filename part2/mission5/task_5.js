

var inputValue = document.getElementById('input-number');
var ul = document.getElementById('arr-area');
var li = ul.getElementsByTagName('li');
var leftIn = document.getElementById('left-in'),
	rightIn = document.getElementById('right-in'),
	leftOut = document.getElementById('left-out'),
	rightOut = document.getElementById('right-out'),
	setNum = document.getElementById('set-num'),
	sortNum = document.getElementById('sort-num');


leftIn.onclick = function() {
		if (/^([1-9][0-9]|100)$/.test(inputValue.value)) {   //正则表达验证
			var newNode = document.createElement('li');
			//newNode.innerHTML = inputValue.value;
			newNode.style.height = inputValue.value*3 + 'px';
			newNode.setAttribute('date',inputValue.value);
			ul.insertBefore(newNode, ul.firstChild); 
	} 
	else if (li.length > 10) {
			alert("数量不能超过60！");
		} 
	else {
		alert("请输入数字10-100:");
	}
}

rightIn.onclick = function() {
	if (li.length > 60) {
			alert("数量不能超过60！");
	} 
	else if (/^([1-9][0-9]|100)$/.test(inputValue.value)) { 
		var newNode = document.createElement('li');
		newNode.style.height = inputValue.value*3 + 'px';
		newNode.setAttribute('date',inputValue.value); 
		ul.appendChild(newNode);      
	} 
	else {
		alert("请输入数字10-100:");
	}
}

leftOut.onclick = function() {
	if (ul.hasChildNodes()) {
		alert(ul.firstChild.getAttribute("date"));
		ul.removeChild(ul.firstChild);
	} else {
		alert("队列为空");
	}
}

rightOut.onclick = function() {
	if (ul.hasChildNodes()) {
		alert(ul.lastChild.getAttribute("date"));
		ul.removeChild(ul.lastChild);
	} else {
		alert("队列为空");
	}
}
//点击删除事件元素
ul.onmouseover = function () {
			for (var i in li) {
				li[i].index = i;
				li[i].onclick = function () {
					alert(ul.childNodes[this.index].getAttribute("date")); //取得属性值显示
					ul.removeChild(ul.childNodes[this.index]);
				}
			}
		}
//排序函数 用的直接插入法
function insertSort(arr) {
	var len = arr.length;

	if (len <= 1) {
		return arr;
	}
	//1~n-1 排序
	for (var i = 1; i < len; i++) {
		let tmp = arr[i];
		for (var j = i ; j > 0 && arr[j-1] > tmp; j--) {
			arr[j] = arr [j - 1]; 
		}
		arr[j] = tmp;
	}
	return arr;
}
//生成一组50的随机数
setNum.onclick = function() {
	for (var i = li.length ; i < 50 ; i++) { 
		var newNode = document.createElement('li');
		newNode.setAttribute("date",Math.floor(Math.random() * 91 + 10)); 
		newNode.style.height = newNode.getAttribute("date")*3 + 'px';
		ul.appendChild(newNode);
	}
}
//改变两个节点的位置，li本身就是数组
function change(num1,num2) {
	li[num1].className = 'rightMove';
	li[num2].className = 'leftMove';
	setTimeout(function(){         //动画完成，两节点交换位置
		li[num1].className = '';
		li[num2].className = '';
		ul.insertBefore(li[num2],li[num1]);//把小的num2左移
	},35);
}
//冒泡排序
sortNum.onclick = function() {
	var i = li.length,
		j = 0,
		changeNum = 0;
	if (i==0) {
		alert('没有数据用来排序');
	} else if(i==1){
		alert('只有一组数据不需要排序');
	}
	timer = setInterval(function(){  //每隔50毫秒对比一次数据
		if (j >= i-1) {
			j = 0; //一轮比较下来，j的值已经是满的了，所以要初始化
			if(!changeNum){
				clearInterval(timer);  //排序完成 清空计时器并退出
				timer = null;
				return 0;
			}
			i = changeNum;   //最后一次交换的数据给i，这样相当于i的长度减少
			changeNum = 0;   //初始化changeNum
		}
		setColor(j);
		//比较的是数值不是字符串，getAttribute返回的是字符串
		if (Number(li[j].getAttribute('date')) > Number(li[j+1].getAttribute('date'))) {
			change(j,j+1);
			changeNum = j + 1;  //比较大的数字给 Num 然后
		}
		j++;
	},50);
}

function setColor(j){
    li[j].style.backgroundColor='black';     //设置正在比较大小的节点颜色为black
    li[j+1].style.backgroundColor='black';
    setTimeout(function(){
        li[j].style.backgroundColor='red';      //清空之前设置的颜色
        li[j+1].style.backgroundColor='red';
    },35);
}
