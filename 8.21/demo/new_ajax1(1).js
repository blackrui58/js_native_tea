function ajax(url,data,sucessFn,failFn) {
		// url = user.php
		//user.php?act=add&user=用户名&pass=密码
		// {
		// 	act: add,
		// 	user: 用户名,
		// 	pass: 密码
		// }

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
		// url
		// 是否异步: true
		oAjax.open('GET',url,true);

		// 3.发送(说话)
		oAjax.send();

		// 4.接收数据
		 // 当交互状态改变的时候
		oAjax.onreadystatechange = function () {
			// console.log(oAjax.readyState);
			if (oAjax.readyState == 4) {
				// 数据请求成功
				if (oAjax.status >= 200 && oAjax.status <= 299 || oAjax.status == 304) {
					// responseText: 响应的文本内容
					// console.log(eval('('+oAjax.responseText+')'));
					// console.log(oAjax.responseText);
					sucessFn(oAjax.responseText);
				} else {
					// 请求失败
					failFn(oAjax.status);
				}
			}
		}
}