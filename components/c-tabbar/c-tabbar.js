const app = getApp();
Component({
	properties: {},
	data: {
		isIPhoneX: app.globalData.isIPhoneX,
	},
	observers: {
		// 数据监听
	},
	lifetimes: {
		created: function () {
			// 组件实例刚刚被创建好时， created 生命周期被触发
			// 还不能调用 setData
			// 用于给组件 this 添加一些自定义属性字段
		},
		attached: function () {
			// 在组件实例进入页面节点树时执行
			this.setData({
				isIPhoneX: app.globalData.isIPhoneX,
			})
		},
		ready: function () {
			// 在组件在视图层布局完成后执行
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
		show: function () {
			// 页面被展示
		},
		hide: function () {
			// 页面被隐藏
		},
		resize: function (size) {
			// 页面尺寸变化
		}
	},
	methods: {}
})