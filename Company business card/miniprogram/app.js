//app.js
App({

  // globalData: {
  //   status: 0, // 状态栏高度
  //   navHeight: 0 // 标题栏高度
  // },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}

      // // 通过系统信息计算导航栏高度        
      // const sysinfo = wx.getSystemInfoSync(),
      //   statusHeight = sysinfo.statusBarHeight,
      //   isiOS = sysinfo.system.indexOf('iOS') > -1;
      // let navHeight;
      // if (!isiOS) { 
      //     navHeight = 48;
      //   } else {
      //     navHeight = 44;
      //   }
      // this.globalData.status = statusHeight;
      // this.globalData.navHeight = navHeight;
      // // console.log(this.globalData.status);
      // // console.log(this.globalData.navHeight);
    }
})
