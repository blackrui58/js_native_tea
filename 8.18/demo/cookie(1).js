// setCookie(属性名,属性值,过期时间 7);
// 设置cookie
function setCookie(name,value,day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+day);
	document.cookie = name+'='+value+';path=/;expires='+oDate;
}

// document.cookie 
// username=zs; aaa=zs; bbb=18
function getCookie(name) {
	var str = document.cookie;
	var arr = str.split('; ');
	for (var i = 0;i < arr.length;i++) {
		var arr2 = arr[i].split('=');
		// arr2[0] = username  arr2[1] = zs
		// arr2[0] = bbb  arr2[1] = 18
		if (name == arr2[0]) {
			return arr2[1];
		}
	}
	return null;
}

// 删除cookie
// delete json.属性名
function remove (name) {
	setCookie(name,'',-7);
}

