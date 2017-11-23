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