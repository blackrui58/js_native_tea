window.onload = function () {
	// 开始界面
	var beginDiv = document.getElementById('beginDiv');
	var beginButton = document.getElementById('beginButton');

	//游戏界面
	var planeDiv = document.getElementById('planeDiv');

	// 结束界面
	var enddiv = document.getElementById('enddiv');
	// 重新开始的按钮
	var replay = document.getElementById('replay');

	// 暂停界面
	var suspendDiv = document.getElementById('suspendDiv');

	// 分数界面
	var score = document.getElementById('score');

	// 结束分数界面
	var planeScore = document.getElementById('planeScore');

	// 总分数
	var allScore = 0;

	// 背景的y值
	var backgroundY = 0;

	var time1 = 0;
	
	var time2 = 0;

	// 暂停
	var pause = false; // false不是暂停,true暂停
	
	//敌机数组
	var enemyArr = [];
	// 子弹数组
	var bulletArr = [];

	// 定时器
	var timer = null;

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
		// 飞机是否死亡
		this.isDie = false;
		// 死亡开始时间
		this.beginTime = 0;
	}

	// 敌方飞机的继承
	Enemy.prototype = new Plane();
	Enemy.prototype.constructor = Enemy;

	// 敌方飞机下降
	Enemy.prototype.down = function () {
		this.img.style.top = this.speed + this.img.offsetTop + 'px';
	}

	// 子弹的构造函数
	function Bullet (json) {
		Plane.apply(this,arguments);
		this.attack = 1;
	}

	// 子弹方法的继承
	Bullet.prototype = new Plane();
	Bullet.prototype.constructor = Bullet;

	// 子弹上升
	Bullet.prototype.up = function () {
		this.img.style.top = this.img.offsetTop - this.speed + 'px';
	}

	// 创建本方飞机
	var myPlane = new MyPlane({x: 127,y: 478,width:66,height: 80,src: 'image/我的飞机.gif',boomSrc: 'image/本方飞机爆炸.gif'});


	// 添加暂停事件
	addEvent(myPlane.img,'click',suspend);

	// 暂停
	function suspend () {
		 if (!pause) {
		 	// 关闭定时器
			clearInterval(timer);
			// 移除鼠标移动事件
			removeEvent(document,'mousemove',move);
			// 显示暂停界面
			suspendDiv.style.display = 'block';

		 } else {
		 	// 开始游戏
			timer = setInterval(start,30);
		 	// 添加鼠标移动事件
		 	addEvent(document,'mousemove',move);
		 	// 暂停界面隐藏
		 	suspendDiv.style.display = 'none';
		 }
		 pause = !pause;
	}


	// 开始游戏
	beginButton.onclick = function () {
		beginDiv.style.display = 'none';
		planeDiv.style.display = 'block';
		// 添加鼠标移动事件
		addEvent(document,'mousemove',move);

		// 开始游戏
		timer = setInterval(start,30);
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
				var middleEnemy = new Enemy({x: random(0,274),y: -100,width: 46,height: 60,src: 'image/enemy3_fly_1.png',boomSrc: 'image/中飞机爆炸.gif',blood: 6,score: 500,dietime: 30,speed: 2});
				enemyArr.push(middleEnemy);
			} else if (time2 == 20) {
				var bigEnemy = new Enemy({x: random(0,210),y: -100,width: 110,height: 164,src: 'image/enemy2_fly_1.png',boomSrc: 'image/大飞机爆炸.gif',blood: 12,score: 1000,dietime: 60,speed: 1});
				enemyArr.push(bigEnemy);
				time2 = 0;
			}else {
				var smallEnemy = new Enemy({x: random(0,286),y: -100,width: 34,height: 24,src: 'image/enemy1_fly_1.png',boomSrc: 'image/小飞机爆炸.gif',blood: 1,score: 100,dietime: 10,speed: 3});
				enemyArr.push(smallEnemy);
			}
			
			time1 = 0;
		}

		if (time1 % 5 == 0) {
			// 创建子弹
			var bullet1 = new Bullet({x: myPlane.img.offsetLeft,y: myPlane.img.offsetTop - 14,width: 6,height: 14,src: 'image/bullet1.png',speed: 20});
			var bullet2 = new Bullet({x: myPlane.img.offsetLeft + myPlane.width / 2,y: myPlane.img.offsetTop - 14,width: 6,height: 14,src: 'image/bullet1.png',speed: 20});
			var bullet3 = new Bullet({x: myPlane.img.offsetLeft + myPlane.width,y: myPlane.img.offsetTop - 14,width: 6,height: 14,src: 'image/bullet1.png',speed: 20});
			bulletArr.push(bullet2);
			bulletArr.push(bullet1);
			bulletArr.push(bullet3);
		}

		// 取得每架飞机,再让每架飞机调用down方法
		for (var i = 0;i < enemyArr.length;i++) {
			
			if (enemyArr[i].isDie == false) {
				enemyArr[i].down();
				// 判断本方飞机和每一架敌机碰撞
				// 飞机的left+width >= 敌方飞机的left
				var x1 = myPlane.img.offsetLeft + myPlane.width >= enemyArr[i].img.offsetLeft;
				// 飞机的left  <= 敌方飞机的left + 敌机的宽 （x）
				var x2 = myPlane.img.offsetLeft <= enemyArr[i].img.offsetLeft + enemyArr[i].width;

				var y1 = myPlane.img.offsetTop + myPlane.height >= enemyArr[i].img.offsetTop;
				var y2 = myPlane.img.offsetTop <= enemyArr[i].img.offsetTop + enemyArr[i].height;
				// 碰撞了
				if ((x1 && x2) && (y1 && y2)) {
					// 关闭定时器
					clearInterval(timer);
					// 移除鼠标移动事件
					removeEvent(document,'mousemove',move);

					// 显示结束界面
					enddiv.style.display = 'block';
					planeScore.innerHTML = allScore;

					// 切换爆炸图片
					myPlane.img.src = myPlane.boomSrc;
					enemyArr[i].img.src = enemyArr[i].boomSrc;
				}

				// 超出范围,从div里面移除
				if (enemyArr[i].img.offsetTop >= planeDiv.offsetHeight) {
					// 从界面里面移除
					planeDiv.removeChild(enemyArr[i].img);
					// 从数组里面移除
					enemyArr.splice(i,1);
					i--;

				}

			} else {
				console.log('死了');
				enemyArr[i].beginTime++;
				if (enemyArr[i].beginTime == enemyArr[i].dietime) {
					// 移除敌机
					planeDiv.removeChild(enemyArr[i].img);
					enemyArr.splice(i,1);
					i--;
				}
			}

			
			
		}

		// 取得每颗子弹,再让每颗子弹调用up
		for (var i = 0;i < bulletArr.length;i++) {
			bulletArr[i].up();
			// 子弹不见的时候,应该也移除
			if (bulletArr[i].img.offsetTop <= 0) {
				// 从界面移除
				planeDiv.removeChild(bulletArr[i].img);
				// 从数组里面移除
				bulletArr.splice(i,1);
				i--;
			}
		}

		// 取得每颗子弹,再让子弹和每架敌机碰撞检测
		for (var i = 0;i < bulletArr.length;i++) {
			//  取得每架敌机
			for (var j = 0;j < enemyArr.length;j++) {
				//每颗子弹 i = 0
				var bullet = bulletArr[i].img;
				// 飞机的left+width >= 敌方飞机的left
				var x1 = bullet.offsetLeft + bulletArr[i].width >= enemyArr[j].img.offsetLeft;
				// 飞机的left  <= 敌方飞机的left + 敌机的宽 （x）
				var x2 = bullet.offsetLeft <= enemyArr[j].img.offsetLeft + enemyArr[j].width;

				var y1 = bullet.offsetTop + bulletArr[i].height >= enemyArr[j].img.offsetTop;
				var y2 = bullet.offsetTop <= enemyArr[j].img.offsetTop + enemyArr[j].height;

				if ((x1 && x2) && (y1 && y2)) {
					// 一颗子弹和一架飞机碰撞了
					enemyArr[j].blood -= bulletArr[i].attack;
					if (enemyArr[j].blood == 0) {
						// 敌机死亡
						enemyArr[j].isDie = true;
						// 血量为0,敌机爆炸
						enemyArr[j].img.src = enemyArr[j].boomSrc;

						allScore += enemyArr[j].score;
						// 分数增加
						score.innerHTML = allScore;
					}
					// 子弹消失(界面和数组都移除)
					planeDiv.removeChild(bulletArr[i].img);
					bulletArr.splice(i,1);
					i--;
					// 跳出循环
					break;

				}
			}
		}

		//拖拽: 有边界

		// 子弹
		// 碰撞
	}

	// 鼠标移动
	function move (evt) {
		evt = evt || window.event;

		var disX = evt.clientX - getPos(planeDiv).left - myPlane.img.offsetWidth / 2;
		var disY = evt.clientY - getPos(planeDiv).top - myPlane.img.offsetHeight / 2;
		var maxX = planeDiv.offsetWidth - myPlane.img.offsetWidth;
		var maxY = planeDiv.offsetHeight - myPlane.img.offsetHeight;
		if (disX <= 0) {
			disX = 0;
		}
		if (disX >= maxX) {
			disX = maxX;
		}
		if (disY <= 0) {
			disY = 0;
		}
		if (disY >= maxY) {
			disY = maxY;
		}
		// 本方飞机的left,top
		myPlane.img.style.left = disX + 'px';
		myPlane.img.style.top = disY + 'px';
	}

	// 重新开始
	replay.onclick = function () {
		// 刷新浏览器
		window.location.reload();
	}
  	
  




































































}