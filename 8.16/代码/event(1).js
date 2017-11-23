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