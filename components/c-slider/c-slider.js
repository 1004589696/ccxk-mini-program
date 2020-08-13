const app = getApp();
Component({
	options: {
		multipleSlots: true
	},
	properties: {},
	lifetimes: {
		ready: function () {
			const query = this.createSelectorQuery();
			query.select('.c-slider.c-slider-after').boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec((res) => {
				this.setData({
					btnWidth: res[0].width
				})
			})
		},
	},
	data: {
		startX: null,
		styleLeft: 0,
		btnWidth: 0,
	},
	methods: {
		touchStart: function (e) {
			if (e.touches.length == 1) {
				this.setData({
					startX: e.touches[0].clientX
				});
			}
		},
		touchMove: function (e) {
			if (e.touches.length == 1) {
				//手指移动时水平方向位置
				var moveX = e.touches[0].clientX;
				//手指起始点位置与移动期间的差值
				var disX = this.data.startX - moveX;
				var btnWidth = this.data.btnWidth;
				var styleLeft = 0;
				if (disX == 0 || disX < 0) { //如果移动距离小于等于0，说明向右滑动，文本层位置不变
					styleLeft = 0;
				} else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
					styleLeft = -disX;
					if (disX >= btnWidth) {
						//控制手指移动距离最大值为删除按钮的宽度
						styleLeft = -btnWidth;
					}
				}
				//更新列表的状态
				this.setData({
					styleLeft
				});
			}
		},
		touchEnd: function (e) {
			if (e.changedTouches.length == 1) {
				//手指移动结束后水平位置
				var endX = e.changedTouches[0].clientX;
				//触摸开始与结束，手指移动的距离
				var disX = this.data.startX - endX;
				var btnWidth = this.data.btnWidth;
				//如果距离小于删除按钮的1/2，不显示删除按钮
				var styleLeft = disX > btnWidth / 2 ? -btnWidth : 0;
				//更新列表的状态
				this.setData({
					styleLeft
				});
			}
		},
	}
})