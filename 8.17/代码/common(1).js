// 添加事件
function addEvent (obj,type,fn) { // type = 'click'

	if (obj.addEventListener) {
		// 高版本
		obj.addEventListener(type,fn,false);
	} else {
		//低版本
		obj.attachEvent('on'+type,fn);
	}

}
// 移除事件
function removeEvent (obj,type,fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type,fn,false);
	} else {
		obj.detachEvent('on'+type,fn);
	}
}
// ready
function ready(fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded',fn,false);
	} else {
		document.onreadystatechange = function () {
			if (document.readyState == 'complete') {
			// 获取DOM
				fn();
			}
		}
	}
}

// 添加滚轮事件
function addMouseWheel (obj,fn) {
		if (navigator.userAgent.indexOf('Firefox') != -1) {
			// 专门给火狐
			obj.addEventListener('DOMMouseScroll',fn,false);
		} else {
			//除了火狐
			obj.onmousewheel = fn;
		}
}

// 滚轮向上还是向下
function isUp (evt) {
	var up = false; // up向上滚 
	if (evt.wheelDelta) { // 除了火狐
		if (evt.wheelDelta < 0) {
			up = false;
		} else {
			up = true;
		}

	} else { // 火狐
		if (evt.detail < 0) {
			up = true;
		} else {
			up = false;
		}
	}
	return up;
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