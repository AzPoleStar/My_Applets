// pages/explain/explain.js
const db=wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //记录第几卦，卦名
        newhexagramnumber:"",
        newexagramname:"",
        //解释卦象数据
        explainhexagram:[],
        //解释动爻数据
        explainmovingline:[],
        //变卦图索引
        changeexagramindex:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //接收content页面传来的数据
        let that=this
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('PageEmitToExplain',function(data){
        // console.log(data)
        that.setData({
            newhexagramnumber:data.temphexagramnumber,
            newexagramname:data.temphexagramname
            })
            // console.log('这是卦名',that.data.newexagramname)
            // console.log('这是第几卦',that.data.newhexagramnumber)
        })

        var checkDB=that.data.newhexagramnumber+'_Data'
        var checkDB='Hexagram_01_Data'

        var changeexagramindextemp=checkDB.substring(9,11)
        // console.log(checkDB)
        //链接数据库
        db.collection(checkDB).doc('General').get({
            success:function(res){
                // console.log('这是从数据库拿到的数据',res.data)
                that.setData({
                    //赋值给data中的变量
                    explainhexagram:res.data
                  })
                // console.log('这是赋值后的数据',that.data.explainhexagram)
            }
        })

        //从缓存数据中拿到动爻数据
        var movinglinevalue=wx.getStorageSync('movinglinedata')
        console.log("这是动爻数据",movinglinevalue)
        //根据动爻数据从数据库中提取动爻详解
        var checkDBinfor=""
        if(movinglinevalue==0){
            checkDBinfor="Change01"
            changeexagramindextemp+='01.png'
        }
        else if(movinglinevalue==1){
            checkDBinfor="Change02"
            changeexagramindextemp+='02.png'
        }
        else if(movinglinevalue==2){
            checkDBinfor="Change03"
            changeexagramindextemp+='03.png'
        }
        else if(movinglinevalue==3){
            checkDBinfor="Change04"
            changeexagramindextemp+='04.png'
        }
        else if(movinglinevalue==4){
            checkDBinfor="Change05"
            changeexagramindextemp+='05.png'
        }
        else{
            checkDBinfor="Change06"
            changeexagramindextemp+='06.png'
        }
        console.log("这是数据库检索数据",checkDBinfor)
        // console.log("这是变卦图检索数据",changeexagramindextemp)
        //给检图片检索赋值
        changeexagramindextemp='../../resource/'+'0101.png'
        that.setData({
            //赋值给data中的变量
            changeexagramindex:changeexagramindextemp
          })
        console.log("这是变卦图检索数据",that.data.changeexagramindex)

        db.collection(checkDB).doc(checkDBinfor).get({
            success:function(res){
                // console.log('这是从数据库拿到的数据',res.data)
                that.setData({
                    //赋值给data中的变量
                    explainmovingline:res.data
                  })
                console.log('这是赋值后的数据',that.data.explainmovingline)
            }
        })

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