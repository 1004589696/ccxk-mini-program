const app = getApp();
Component({
	properties: {
		visible: {
			type: Boolean,
			value: false
		},
		zIndex: {
			type: Number,
			value: 10000
		},
		position: {
			type: String,
			value: "middle"
		},
		istabbar: {
			type: Boolean,
			value: false
		},
	},
	data: {
		isIPhoneX: app.globalData.isIPhoneX,
		inAnimation: false,
		timer: null
	},
	lifetimes: {
		attached: function () {
			this.setData({
				isIPhoneX: app.globalData.isIPhoneX,
			})
		},
	},
	methods: {
		catchtouchmove: function () {
			return false;
		},
		closePopup: function () {
			let timer = setTimeout(() => {
				this.setData({
					visible: false,
					inAnimation: false,
				})
				clearTimeout(this.data.timer);
			}, 200);
			this.setData({
				timer,
				inAnimation: true
			})
		},
	}
})