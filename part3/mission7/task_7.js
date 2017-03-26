function Student(name, math, chinese, english) {
	this.name = name;
	this.math = math;
	this.chinese = chinese;
	this.english = english;
	this.total = math + chinese + english;
}

var data = [];
data[0] = new Student('小明', 30, 50, 60);
data[1] = new Student('小红', 80, 60, 80);
data[2] = new Student('小黑', 50, 50, 60);
data[3] = new Student('抠脚', 100, 100, 100);

var myTable = document.getElementById('tab');
function rederTable(data) {
	var tableTr = '';
	data.forEach(function(item) {
		tableTr += '<tr><td>' + item.name + '</td><td>' + item.math + '</td><td>' + item.chinese + '</td><td>' + item.english + '</td><td>' + item.total +'</td></tr>'
	});
	myTable.innerHTML += tableTr;
}

function clearTable() {
	myTable.innerHTML = '<tr><th>姓名</th><th>数学</th><th>语文</th><th>英语</th><th>总分</th></tr>';
}

window.onload = function() {
	rederTable(data);
	var k = 0, i = 0;
	myTable.addEventListener('click', function(e){
		//alert('hello');
		if (e.target.tagName == 'TH') {
			switch(e.target.innerHTML) {
				case '数学': i = 'math';break;
				case '语文': i = 'chinese';break;
				case '英语': i = 'english';break;
				case '总分': i = 'total';break;
			}
			if (k % 2 == 0) {
				alert('从高到低');
				decreaseTb(data,i);
			} else {
				alert('从低到高');
				increaseTb(data,i);
			}
			k++;
			clearTable();
			rederTable(data);
		}
	});
}
//升序
function increaseTb(data,key) {
	data.sort(function (a, b){
		return a[key] - b[key];
	});
	return data;
}
//降序
function decreaseTb(data, key) {
	data.sort(function(a, b) {
		return b[key] - a[key];
	});
	return data;
}