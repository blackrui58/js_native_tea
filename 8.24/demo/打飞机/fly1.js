window.onload = function () {
	// 开始界面
	var beginDiv = document.getElementById('beginDiv');
	var beginButton = document.getElementById('beginButton');

	//游戏界面
	var planeDiv = document.getElementById('planeDiv');

	// 背景的y值
	var backgroundY = 0;

	var time1 = 0;
	
	var time2 = 0;
	
	//敌机数组
	var enemyArr = [];

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
		this.img = document.createElement('img');
		this.img.style.left = this.x + 'px';
		this.img.style.top = this.y + 'px';
		this.img.style.width = this.width + 'px';
		this.img.style.height = this.height + 'px';
		this.img.src = this.src;
		// 添加
		planeDiv.appendChild(this.img);
	}

	// 本方飞机的构造函数
	function MyPlane (json) {
		// Plane.apply(this,arguments);
		Plane.call(this,json);
	}
	// 本方飞机的继承
	MyPlane.prototype = new Plane();
	MyPlane.prototype.constructor = MyPlane;

	// 敌方飞机的构造函数
	function Enemy (json) {
		Plane.call(this,json);
	}

	// 敌方飞机的继承
	Enemy.prototype = new Plane();
	Enemy.prototype.constructor = Enemy;

	// 敌方飞机下降
	Enemy.prototype.down = function () {
		this.img.style.top = this.speed + this.img.offsetTop + 'px';
	}


	// 创建本方飞机
	var myPlane = new MyPlane({x: 127,y: 478,width:66,height: 80,src: 'image/我的飞机.gif',boomSrc: 'image/本方飞机爆炸.gif'});

	
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

		time1++;
		// 创建敌方飞机
		if (time1 == 20) { // 每隔600ms执行
			time2++;
			if (time2 % 6 == 0) {
				var middleEnemy = new Enemy({x: random(0,274),y: -100,width: 46,height: 60,src: 'image/enemy3_fly_1.png',boomSrc: 'image/中飞机爆炸.gif',blood: 6,score: 500,dietime: 50,speed: 2});
				enemyArr.push(middleEnemy);
			} else if (time2 == 20) {
				var bigEnemy = new Enemy({x: random(0,210),y: -100,width: 110,height: 164,src: 'image/enemy2_fly_1.png',boomSrc: 'image/大飞机爆炸.gif',blood: 12,score: 1000,dietime: 100,speed: 1});
				enemyArr.push(bigEnemy);
				time2 = 0;
			}else {
				var smallEnemy = new Enemy({x: random(0,286),y: -100,width: 34,height: 24,src: 'image/enemy1_fly_1.png',boomSrc: 'image/小飞机爆炸.gif',blood: 1,score: 100,dietime: 10,speed: 3});
				enemyArr.push(smallEnemy);
			}
			
			time1 = 0;
		}

		// 取得每架飞机,再让每架飞机调用down方法
		for (var i = 0;i < enemyArr.length;i++) {
			enemyArr[i].down();
			// 超出范围,从div里面移除
			// 从数组里面移除
		}

		//拖拽: 有边界

		// 子弹
		// 碰撞

		
	}
  	
  




































































}