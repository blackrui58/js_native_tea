// 判断一个数组里面有没有一个值
	function isFindInArr (arr,value) {
		for (var i = 0;i < arr.length;i++) {
			if (arr[i] == value) {
				return true;
			}
		}
		return false;
	}
	// 根据类名获取元素
	function getByClass (className) {
		// 如果判断条件成立,直接使用js自带
		if (document.getElementsByClassName) {
			return document.getElementsByClassName(className);
		} else { // 自己实现同样的功能
			var result = [];
			// 获取到所有的标签元素 (集合)
			var aTag = document.getElementsByTagName('*');
			for (var i = 0;i < aTag.length;i++) {
				// console.log(aTag[i].className);//box box1
				var arr = aTag[i].className.split(' ');
				if (isFindInArr(arr,className)) {
					result.push(aTag[i]);
				}
			}
			return result;
		}
	}

	// 添加类名
	function addClass (obj,className) {
		var arr = obj.className.split(' ');

		if (isFindInArr(arr,className) == false) {
			obj.className = obj.className + ' '+className;
		}
	}

		// 删除类名
	function removeClass (obj,className) {
		var arr = obj.className.split(' ');
		for (var m = 0;m < arr.length;m++) {
			if (arr[m] == className) {
				arr.splice(m,1);
				m--;
			}
		}
		// 将数组转化为字符串 给类名
		obj.className = arr.join(' ');
	}