//观察者构造函数
function Observer(data) {
	this.data = data;
	this.walk(data);
	this.eventsBus = new Event();
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
	let _this = this;
	Object.defineProperty(this.data, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			console.log('你访问了' + key);
			return val;
		},
		set: function(newVal) {
			console.log('你设置了' + key);
			console.log('新的' + key + ' = ' + newVal);
			_this.eventsBus.emit(key, val, newVal);   //触发$watch回调函数的增加
			if (typeof newVal === 'object') {  //传入对象是对象 增加一个递归的判断
				new Observer(newVal);
			}
			if (newVal === val) return;
			val = newVal;
		}
	})
};
Observer.prototype.$watch = function(attr, callback) {
	this.eventsBus.on(attr, callback);
}
//
function Event(){
  this.events = {};
}
Event.prototype.on = function(attr, callback){
  if(this.events[attr]){
    this.events[attr].push(callback);
  }else{
    this.events[attr] = [callback];
  }
}
Event.prototype.off = function(attr){
  for(let key in this.events){
    if(this.events.hasOwnProperty(key) && key === attr){
      delete this.events[key];
    }
  }
}
Event.prototype.emit = function(attr, ...arg){
  this.events[attr] && this.events[attr].forEach(function(item){
    item(...arg);
  })
}
/*******************************************************************************/
let obj = {
	a: 1,
	b: 2,
	c: {
		d: 3,
		e: 4
	}
};

obj1 = new Observer(obj);

let app1 = new Observer({
	name: 'brokenbones',
	age: 22
});
app1.$watch('age', function(oldVal, newVal) {
	console.log(`我的年纪变了，原来是：${oldVal}, 现在已经是：${newVal}岁了`);
})