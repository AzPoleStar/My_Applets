// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //从show页面拿到的灵签数据赋值给data数据
        newspiritualdata:"",
        //按钮索引-确定是第几个按钮
        contentindexdata:"",
        //内容变量
        // content1data:"",
        // content1_desdata:"",
        content2data:"",
        content2_desdata:"",
        content3data:"",
        content3_desdata:"",
        content4data:"",
        content4_desdata:"",
        content5data:"",
        content5_desdata:"",
        content6data:"",
        content6_desdata:"",
        content7data:"",
        content7_desdata:"",
        // //背景图
        // background:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // //设置背景图
        // var app=getApp();
        // var backgrounddata=app.globalData.background;
        // this.setData({
        // background:backgrounddata
        // })

        const neweventChannel = this.getOpenerEventChannel();
        neweventChannel.on('newparentPageEmit', (data) => {
        // console.log(data);
            this.setData({
                newspiritualdata:data.copyspiritualdata,
                contentindexdata:data.contentindex,
                // content1data:data.copyspiritualdata[0].content_01,
                // content1_desdata:data.copyspiritualdata[0].content_01_des,
                content2data:data.copyspiritualdata[0].content_02,
                content2_desdata:data.copyspiritualdata[0].content_02_des,
                content3data:data.copyspiritualdata[0].content_03,
                content3_desdata:data.copyspiritualdata[0].content_03_des,
                content4data:data.copyspiritualdata[0].content_04,
                content4_desdata:data.copyspiritualdata[0].content_04_des,
                content5data:data.copyspiritualdata[0].content_05,
                content5_desdata:data.copyspiritualdata[0].content_05_des,
                content6data:data.copyspiritualdata[0].content_06,
                content6_desdata:data.copyspiritualdata[0].content_06_des,
                content7data:data.copyspiritualdata[0].content_07,
                content7_desdata:data.copyspiritualdata[0].content_07_des
            });
        });
        console.log("这是传到content里面的数据：",this.data.newspiritualdata,"这是第几个按钮：",this.data.contentindexdata)
        // console.log("数据测试",this.data.newspiritualdata[0].content_01)
        // console.log("test",this.data.content1data)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})