//观察者构造函数
function Observer(data) {
	this.data = data;
	this.walk(data);
	this.dep = new Dep();
}

let p = Observer.prototype;

//此函是用于深层次遍历对象的各个属性
//采用递归思路
//我们要给每一个属性绑定getter和setter
p.walk = function(obj) {
	let val;
	for (let key in obj) { 
		//这里为什么要用hasOwnProperty进行过滤呢？
		//因为for...in 循环会吧对象原型链上上的所有可枚举属性都循环出来
		//而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做
		if (obj.hasOwnProperty(key)) {
			val = obj[key];

			//这里进行判断，如果没有遍历到最底层，继续 new Observer
			if (typeof val === 'object') {
				new Observer(val);
			}
			this.convert(key, val);
		}
	}
};

p.convert = function(key, val) {
	let dep = new Dep();
	if (typeof val === 'object') {
		var childOb = new Observer(val);
	}
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			//console.log('你访问了' + key);
			
			if (Dep.target) {
				dep.depend();
				if (childOb) {
					childOb.dep.depend();
				}
			}

			return val;
		},
		set: function(newVal) {
			//console.log('你设置了' + key);
			//console.log('新的' + key + ' = ' + newVal);
			//_this.eventsBus.emit(key, val, newVal);   //触发$watch回调函数的增加
			if (typeof newVal === 'object') {  //传入对象是对象 增加一个递归的判断
				childOb = new Observer(newVal);
			}
			if (newVal === val) return;
			val = newVal;
			dep.notify();                
		}
	})
};
/*******************************************************************************/
//观察者
function Dep() {
	this.subs = [];
}
Dep.target = null;

Dep.prototype.depend = function() {
	Dep.target.addDep(this);
}

Dep.prototype.addSub = function(sub) {
	this.subs.push(sub);
}

Dep.prototype.notify = function() {
	for(let i = 0, len = this.subs.length; i < len; i++) {
		this.subs[i].update();
	}
}
//Watcher
function Watcher(value, attr){
  this.value = value;
  this.attr = attr;
  this.get();
}

Watcher.prototype.beforeGet = function(){
  Dep.target = this;
}

Watcher.prototype.get = function(){
  this.beforeGet();

  let val = this.value[this.attr];

  if(typeof val === 'object'){
    for(let childAttr in val){
      new Watcher(val[childAttr], childAttr);
    }
  }
}
Watcher.prototype.addDep = function(dep){
  dep.addSub(this);
  //console.log("我订阅了name的变化")
}
Watcher.prototype.update = function(){
  console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。');
}

let app1 = new Observer({
	name: {
		firstName: 'huang',
		lastName: 'dd'
	},
	age: 22
});

let watcher = new Watcher(app1.data, "name");//订阅名字
app1.data.name.firstName = 'hahahaha';
//app1.data.name.lastName = 'wudiwudi';