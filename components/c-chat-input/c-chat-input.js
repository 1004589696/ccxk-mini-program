// components/ck-chat-input/ck-chat-input.js
const app = getApp();
import WebSocket from "./webSocket.js";
const webSocket = new WebSocket(app);
webSocket.init();
let recorderManager = wx.getRecorderManager(); // 获取全局唯一的录音管理器
let recorderQueryLeft = null;
let recorderQueryRight = null;
let recorderQueryTop = null;
let recorderQueryBottom = null;
let ableSendRecord = true;
Component({
	properties: {},
	data: {
		is_recording: false, // 录音中
		is_input: true, // 输入框
		input_value: "", //输入框中的值
		systemInfo: {}, //系统信息
		recordCancel: false, // 录音取消
		showAdd: false, //展示添加项
		isIPhoneX: false
	},
	lifetimes: {
		attached: function () {
			if (app.globalData.systemInfo) {
				let model = app.globalData.systemInfo.model;
				let screenHeight = app.globalData.systemInfo.screenHeight;
				let iphoneX = /iphone x/i.test(model);
				let iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
				let isIPhoneX = iphoneX || iphoneNew;
				this.setData({
					isIPhoneX
				})
			}
		}
	},
	methods: {
		// 语音文字切换
		changeType(e) {
			let type = e.currentTarget.dataset.type;
			this.setData({
				is_input: type
			})
			if (!type) {
				const query = this.createSelectorQuery();
				query.select('#record').boundingClientRect();
				query.selectViewport().scrollOffset();
				query.exec((res) => {
					recorderQueryLeft = res[0].left;
					recorderQueryRight = res[0].right;
					recorderQueryTop = res[0].top;
					recorderQueryBottom = res[0].bottom;
				})
			}
		},

		// 开始录音
		startRecord: function () {
			this.recorderListener();
			recorderManager.start({
				format: 'mp3'
			});
		},

		// 录音监听
		recorderListener: function () {
			recorderManager.onStart(() => {
				this.setData({
					is_recording: true
				})
			});
			recorderManager.onStop((res) => {
				console.log(res);
				this.setData({
					is_recording: false
				})
				if (res.duration < 1000) {
					wx.showToast({
						title: '时间太短',
						icon: 'loading',
						duration: 500
					})
					return
				}
				if (!ableSendRecord) {
					wx.showToast({
						title: '取消发送语音',
						icon: 'loading',
						duration: 500
					})
				}
				this.send('2', res);
			});
		},

		// 录音触摸开始
		recorderTouchStart: function (e) {
			this.startRecord();
			ableSendRecord = true;
		},

		// 录音触摸移动
		recorderTouchMove(e) {
			let touches = e.touches[0];
			let clientX = touches.clientX;
			let clientY = touches.clientY;
			if (clientX < recorderQueryLeft || clientX > recorderQueryRight || clientY < recorderQueryTop || clientY > recorderQueryBottom) {
				ableSendRecord = false;
				recorderManager.stop();
			}
		},

		// 录音触摸开始
		recorderTouchEnd: function (e) {
			recorderManager.stop();
		},

		// 文本消息输入
		enterInput(e) {
			this.setData({
				input_value: e.detail.value
			})
		},

		// 发送文本消息
		sendText(e) {
			if (e.detail.value) {
				this.send('0', e.detail.value)
			} else {
				wx.showToast({
					title: '不允许发送空',
					icon: 'none',
					duration: 500
				})
			}
			this.setData({
				input_value: ""
			})
		},

		//照片弹窗
		addItem() {
			this.setData({
				showAdd: true
			})
		},

		//照片弹窗
		hideAddItem() {
			this.setData({
				showAdd: false
			})
		},

		//选择图片
		chooseImage() {
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFilePaths;
					this.send('1', tempFilePaths[0]);
				}
			})
		},

		//  wss 发送消息
		send: function (msgType, msg) {
			let other = {
				user: {
					nickname: "哇咔咔",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "1", // 类型 0：text、1：image、2：vioce
				content: "http://a.hiphotos.baidu.com/image/h%3D300/sign=42001b3c85d4b31cef3c92bbb7d7276f/6a600c338744ebf812a16440d7f9d72a6159a7f8.jpg", // 内容
				time: "1556000818655", // 时间
				status: '1',
				isMe: true
			}
			other.msgType = msgType;
			other.content = msg;
			this.triggerEvent("addData", other);
			// webSocket.sendMsg(JSON.stringify(msg)).then(() => {});
		}
	}
})