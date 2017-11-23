
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