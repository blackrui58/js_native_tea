
// 随机函数
function random (n,m) {
	return Math.floor(Math.random() * (m - n) + n);
}

// 绝对位置
function getPos (obj) {
	var left = 0,top = 0;
	while (obj) {
		left += obj.offsetLeft;
		top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		left: left,
		top: top
	}
}

// 添加
function addEvent (obj,type,fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	} else {
		obj.attachEvent('on'+type,fn);
	}
}

// 删除
function removeEvent (obj,type,fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type,fn,false);
	} else {
		obj.detachEvent('on'+type,fn);
	}
}