const app = getApp();
Page({
	data: {
		popup_show: false
	},
	onLoad: function () {},
	open_popup: function () {
		this.setData({
			popup_show: true
		})
	}
})