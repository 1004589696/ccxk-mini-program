const app = getApp();
Page({
	data: {
		isIPhoneX: app.globalData.isIPhoneX,
		navbarCustom: false,


		isToBottom: false,
		chatList: [{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "1", // 类型 0：text、1：image、2：vioce
				content: "http://a.hiphotos.baidu.com/image/h%3D300/sign=42001b3c85d4b31cef3c92bbb7d7276f/6a600c338744ebf812a16440d7f9d72a6159a7f8.jpg", // 内容
				time: "1556000818655", // 时间
				status: '0', // 1 loading  2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "0", // 类型 0：text、1：image、2：vioce
				content: "下班了吗？", // 内容
				time: "1556000702398", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "0", // 类型 0：text、1：image、2：vioce
				content: "下班了吗？", // 内容
				time: "1556000702398", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "0", // 类型 0：text、1：image、2：vioce
				content: "下班了吗？", // 内容
				time: "1556000702398", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/MvgCPxxm0NJpQe9cZtz6C8p1FzWOOqwh0Slwo97M7tQicbGHKhXWyWpSdZkEGyPasQrCQnp3C8toD06GaB27hWA/132",
				},
				msgType: "0", // 类型 0：text、1：image、2：vioce
				content: "还没有呢！你乱发什么东西？", // 内容
				time: "1556000985441", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/MvgCPxxm0NJpQe9cZtz6C8p1FzWOOqwh0Slwo97M7tQicbGHKhXWyWpSdZkEGyPasQrCQnp3C8toD06GaB27hWA/132",
				},
				msgType: "1", // 类型 0：text、1：image、2：vioce
				content: "http://f.hiphotos.baidu.com/image/h%3D300/sign=3dab6c4e42086e0675a8394b32087b5a/023b5bb5c9ea15ceb3e11076b8003af33a87b246.jpg", // 内容
				time: "1556000985441", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/MvgCPxxm0NJpQe9cZtz6C8p1FzWOOqwh0Slwo97M7tQicbGHKhXWyWpSdZkEGyPasQrCQnp3C8toD06GaB27hWA/132",
				},
				msgType: "2", // 类型 0：text、1：image、2：vioce
				content: {
					tempFilePath: "http://mp3.9ku.com/mp3/444/443285.mp3",
					duration: 18500
				}, // 内容
				time: "1556000985441", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			},
			{
				user: {
					nickname: "",
					avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp8hByeW0tsOcfoUMaMHuvfHf7EJ6g2rCZG9cldZaaqELa99jVw1tBvBrNKowDnWwtdAibVT6r7eA/132",
				},
				msgType: "2", // 类型 0：text、1：image、2：vioce
				content: {
					tempFilePath: "http://mp3.9ku.com/mp3/444/443285.mp3",
					duration: 18000
				}, // 内容
				time: "1556000702398", // 时间
				status: '0', // 1 loading 2 fail
				isMe: false,
			}
		]
	},
	onLoad: function () {},
	addData: function (data) {
		console.log(data);
		this.setData({
			chatList: this.data.chatList.concat(data.detail),
			isToBottom: false
		})
	}
})