window.onload = function () {
	// 开始界面
	var beginDiv = document.getElementById('beginDiv');
	var beginButton = document.getElementById('beginButton');

	//游戏界面
	var planeDiv = document.getElementById('planeDiv');

	// 背景的y值
	var backgroundY = 0;
	beginButton.onclick = function () {
		beginDiv.style.display = 'none';
		planeDiv.style.display = 'block';

		// 开始游戏
		setInterval(start,30);
	}

	// 开始游戏的函数
	function start () {
		// 改变背景
		backgroundY++;
		if (backgroundY >= planeDiv.offsetHeight) {
			backgroundY = 0;
		}
		planeDiv.style.backgroundPositionY = backgroundY+'px';
	}
	// 飞机的构造函数
	// x,y,w,h,src,boomSrc,speed,blood,score,dietime
	function Plane (json) {
		json = json || {};
		this.x = json.x;
		this.y = json.y;
		this.width = json.width;
		this.height = json.height;
		this.src = json.src;
		this.boomSrc = json.boomSrc;
		this.speed = json.speed;
		this.blood = json.blood;
		this.score = json.score;
		this.dietime = json.dietime;
		if (json.src) {
			this.init();
		}
	}
	// 创建图片元素
	Plane.prototype.init = function () {
		// 创建一个图片元素
		var img = document.createElement('img');
		img.style.left = this.x + 'px';
		img.style.top = this.y + 'px';
		img.style.width = this.width + 'px';
		img.style.height = this.height + 'px';
		img.src = this.src;
		// 添加
		planeDiv.appendChild(img);
	}

	// 本方飞机的构造函数
	function MyPlane (json) {
		// Plane.apply(this,arguments);
		Plane.call(this,json);
	}

	MyPlane.prototype = new Plane();
	MyPlane.prototype.constructor = MyPlane;

	// 创建本方飞机
	var myPlane = new MyPlane({x: 127,y: 478,width:66,height: 80,src: 'image/我的飞机.gif',boomSrc: 'image/本方飞机爆炸.gif'});
	console.log(myPlane);


  	
  




































































}