function json2url (json) {
	console.log(json)
	json.t = Math.random();
    
    var arr = [];
    for (var key in json) {
    	arr.push(key+'='+json[key]);
    }
    // act=add&user=用户名&pass=密码
    return arr.join('&');
}
function ajax(json) {
	// {
	//  type: '',
	// 	url: url,
	// 	data: data,
	// 	success: function () {},
	// 	fail: function (){}
	// }
	if (!json.url){
		alert('死去吧');
		return;
	}
	json.data = json.data || {};
	if (window.XMLHttpRequest) {
			//1. 创建ajax对象 (IE不支持)
			var oAjax = new XMLHttpRequest();
		} else {
			// IE(5,6)
			var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// console.log(oAjax);

		// 2.打开连接
		// 请求方式: get  post
		oAjax.open('GET',json.url+'?'+json2url(json.data),true);

		// 3.发送(说话)
		oAjax.send();

		// 4.接收数据
		 // 当交互状态改变的时候
		oAjax.onreadystatechange = function () {
			if (oAjax.readyState == 4) {
				// 数据请求成功
				if (oAjax.status >= 200 && oAjax.status <= 299 || oAjax.status == 304) {
					json.success && json.success(oAjax.responseText);
				} else {
					// 请求失败
					json.fail && json.fail(oAjax.status);
				}
			}
		}
	}