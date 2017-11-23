// 选项卡的封装
	// id: 选项卡的父盒子的id值
	// isSelected: 选中的类名
	// event: 该选项卡的事件
	function tab (id,isSelected,event) {
		event = event || 'onmouseover';
		// isSelected = isSelected || 'active';
		// 选项卡的大盒子
		var oBox = document.getElementById(id);
		//ul1
		var oUl1 = oBox.children[0];
		var aLi1 = oUl1.children;
		// ul2
		var oUl2 = oBox.children[1];
		var aLi2 = oUl2.children;
		// 默认显示第一个
		aLi1[0].className = isSelected;
		aLi2[0].style.display = 'block';

		for (var i = 0;i < aLi1.length;i++) {
			aLi1[i].index = i;
			aLi1[i][event] = function () {
				// 先清空所有
				for (var j = 0;j < aLi1.length;j++) {
					aLi1[j].className = '';
					aLi2[j].style.display = 'none';
				}

				// 再给自己添加
				this.className = isSelected;
				aLi2[this.index].style.display = 'block';
			}
		}
	}
