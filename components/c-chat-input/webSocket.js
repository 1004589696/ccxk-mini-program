export default class AppIMDelegate {
      constructor(app) {
            this.$APP = app;
      }

      // 创建一个 WebSocket 连接
      createWebSocketConnect() {
            let that = this;
            wx.connectSocket({
                  method: 'GET',
                  url: 'wss://hmpxcxtest.qftx.net/ws/im?orgId=lhcs&fromKey=7465a06855e54adfb7f87fd810f0c853&&role=2',
                  header: {
                        'content-type': 'application/json'
                  },
                  complete(res) {
                        console.log(res);
                        that.watchWebSocketConnect();
                        that.watchWebSocketMsg();
                  }
            })
      }

      // 关闭 WebSocket 连接
      closeWebSocketConnect() {
            wx.closeSocket();
      }

      // 监听 WebSocket 连接
      watchWebSocketConnect() {
            wx.onSocketClose((res) => {
                  console.log(res);
            })
      }

      // 监听 WebSocket 消息接收
      watchWebSocketMsg() {
            wx.onSocketMessage((res) => {
                  console.log(res);
            })
      }

      // 发送 WebSocket 消息
      sendMsg(data) {
            return new Promise((resolve, reject) => {
                  wx.sendSocketMessage({
                        data: data,
                        success(res) {
                              console.log(res);
                              resolve(res)
                        },
                        fail(res) {
                              console.log(res);
                              reject(res)
                        }
                  })
            })
      }

      init() {
            this.createWebSocketConnect();
      }

}