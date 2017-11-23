$.extend({
	tab: function tab (selector1,selector2) {
			$(selector1).click(function () {
				// 移出所有
				$(selector1).removeClass('active');
				$(selector2).hide();
				// 给自己添加
				$(this).addClass('active');
				$(selector2).eq($(this).index()).show();
			})
		}
})