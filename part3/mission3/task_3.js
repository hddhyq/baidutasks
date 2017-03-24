var formRadio = document.querySelector('#radio-select'),
	formSelect = document.querySelector('#select1'),
	inSchoolRadio = document.querySelector('#inSchoolRadio'),
	selecterDistrict = document.querySelector('#select1');

formRadio.addEventListener('change', function() {
	if (inSchoolRadio.checked) {
		document.querySelector(".inSchool").className = "inSchool";
        document.querySelector(".outSchool").className = "outSchool hide";
	} else {
		document.querySelector(".inSchool").className = "inSchool hide";
        document.querySelector(".outSchool").className = "outSchool";
	}
}, false);

selecterDistrict.addEventListener('change', function(){
	var data = {
		bj: ['北京大学', '清华大学', '北京航空航天大学'],
		sh: ['复旦大学', '上海交通大学', '同济大学'],
		wh: ['武汉大学', '武汉理工大学', '华中科技大学']
	};
	var source = document.querySelector('#select1');
	var target = document.querySelector('#select2');
	var selected = source.options[source.selectedIndex].value;
	target.innerHTML = '';//复选框清空
	for (var i = 0; i < data[selected].length; i++) {
		var opt = document.createElement('option');
		opt.value = data[selected][i];
		opt.innerHTML = data[selected][i];
		document.querySelector('#select2').appendChild(opt);	
	}
},false);