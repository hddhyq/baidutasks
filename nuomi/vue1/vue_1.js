//观察者构造函数
function Observer(data) {
	this.data = data;
	this.walk(data);
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
			if (newVal === val) return;
			val = newVal;
		}
	})
};

let data = {
	user: {
		name: "huangdd",
		age: "22"
	},
	address: {
		city: "hubei"
	}
};

let app = new Observer(data);
