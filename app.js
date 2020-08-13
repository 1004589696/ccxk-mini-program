App({
	onLaunch: function (op) {
		this.checkNewVersion(); // 检查版本更新
		this.getSystemInfo(); // 获得系统信息
	},

	globalData: {
		userInfo: null,
		systemInfo: null,
		isIPhoneX: false
	},

	checkNewVersion: function () { // 检查版本更新
		// 获取小程序更新机制兼容
		if (wx.canIUse("getUpdateManager")) {
			const updateManager = wx.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: "更新提示",
							content: "新版本已经准备好，是否重启应用？",
							success: function (res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							}
						});
					});
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
							title: "已经有新版本了哟~",
							content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
						});
					});
				}
			});
		} else {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			wx.showModal({
				title: "提示",
				content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
			});
		}
	},

	getSystemInfo: function () { // 获取系统信息
		try {
			const res = wx.getSystemInfoSync();
			let iphoneX = /iphone x/i.test(res.model);
			let iphoneNew = /iPhone11/i.test(res.model) && res.screenHeight === 812;
			this.globalData.systemInfo = res;
			this.globalData.isIPhoneX = iphoneX || iphoneNew;
		} catch (e) {
			console.log(" 获取系统信息错误", e);
		}
	},

	wxAjax: function (method, url, data = {}) {
		return new Promise((resolve, reject) => {
			wx.showNavigationBarLoading();
			wx.request({
				method: method,
				url: url,
				data: data,
				success: res => {
					reject(res); // 错误
					resolve(res); // 成功
				},
				fail: () => {
					wx.showToast({
						title: '网络繁忙，请稍后重试',
						icon: 'none'
					});
				},
				complete: (res) => {
					wx.hideNavigationBarLoading();
					console.log("请求数据", method, url, data);
					console.log("请求返回数据", res);
				}
			});
		})
	},
})