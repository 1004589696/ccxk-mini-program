// components/c-navbar/c-navbar.js
const app = getApp();
Component({
	properties: {
		content: {
			type: String,
			value: ""
		}
	},
	data: {
		isIPhoneX: app.globalData.isIPhoneX,
		isShowBackIcon: false
	},
	lifetimes: {
		attached: function () {
			const pages = getCurrentPages();
			this.setData({
				isShowBackIcon: pages.length > 1,
				isIPhoneX: app.globalData.isIPhoneX,
			});
		}
	},
	methods: {
		backFun: function () {
			wx.navigateBack({
				delta: 1
			})
		}
	}
})