Component({
	properties: {
		chatList: {
			type: Array,
			value: []
		},
		isToBottom: {
			type: Boolean,
			value: false
		}
	},
	data: {},
	methods: {
		/**
		 * 用户滚动到顶部触发
		 */
		scrolltoupper: function () {
			console.log("用户滚动到顶部触发");
		},

		/**
		 * 用户滚动到底部触发
		 */
		scrolltolower: function () {
			console.log("用户滚动到底部触发");
		},

		/**
		 * 语音时间处理
		 */
		cutTime: function (num) {
			console.log(num);
			return;
		},

		/**
		 * 图片预览
		 */
		previewImage(e) {
			let src = e.currentTarget.dataset.src;
			let chatList = this.data.chatList;
			let urls = [];
			for (let i = 0; i < chatList.length; i++) {
				if (chatList[i].msgType === '1') {
					urls.push(chatList[i].content)
				}
			}
			wx.previewImage({
				current: src,
				urls: urls
			})
		},

		/**
		 * 播放语音
		 */
		playVoice(e) {
			let chatList = this.data.chatList;
			let {
				index,
				src
			} = e.currentTarget.dataset;
			this.stopVoice();
			let innerAudioContext = wx.createInnerAudioContext();
			innerAudioContext.src = src;
			innerAudioContext.autoplay = true;
			innerAudioContext.onPlay(() => {
				console.log('开始播放');
				chatList[index].playing = true;
				this.setData({
					chatList: chatList,
					innerAudioContext: innerAudioContext,
				})
			});
			innerAudioContext.onStop(() => {
				console.log('停止播放');
				chatList[index].playing = false;
				this.setData({
					chatList: chatList,
					innerAudioContext: null
				})
			});
			innerAudioContext.onError((res) => {
				console.log(res.errMsg)
				console.log(res.errCode)
			});
		},

		/**
		 * 停止语音播放
		 */
		stopVoice() {
			let innerAudioContext = this.data.innerAudioContext;
			innerAudioContext && innerAudioContext.stop();
		},


	}
})