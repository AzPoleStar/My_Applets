// pages/show/show.js
//灵签数据库
const SpiritualDataDB=wx.cloud.database().collection("SixYao_SpiritualData")
//灵签付费数据库
const SpiritualOrderDB=wx.cloud.database().collection("SixYao_SpiritualOrder")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //上卦数字
    showupperhexagram:"",
    //下卦数字
    showhexagram:"",
    //动爻数字
    showmovingline:"",
    //六十四卦数组
    thesixtyfourhexagrams:[
      {id:"111111",name:"乾为天",index:"Hexagram_01"},{id:"000000",name:"坤为地",index:"Hexagram_02"},{id:"010001",name:"水雷屯",index:"Hexagram_03"},{id:"100010",name:"山水蒙",index:"Hexagram_04"},
      {id:"010111",name:"水天需",index:"Hexagram_05"},{id:"111010",name:"天水讼",index:"Hexagram_06"},{id:"000010",name:"地水师",index:"Hexagram_07"},{id:"010000",name:"水地比",index:"Hexagram_08"},
      {id:"110111",name:"风天小畜",index:"Hexagram_09"},{id:"111011",name:"天泽履",index:"Hexagram_10"},{id:"000111",name:"地天泰",index:"Hexagram_11"},{id:"111000",name:"天地否",index:"Hexagram_12"},
      {id:"111101",name:"天火同人",index:"Hexagram_13"},{id:"101111",name:"火天大有",index:"Hexagram_14"},{id:"000100",name:"地山谦",index:"Hexagram_15"},{id:"001000",name:"雷地豫",index:"Hexagram_16"},
      {id:"011001",name:"泽雷随",index:"Hexagram_17"},{id:"100110",name:"山风蛊",index:"Hexagram_18"},{id:"000011",name:"地泽临",index:"Hexagram_19"},{id:"110000",name:"风地观",index:"Hexagram_20"},
      {id:"101001",name:"火雷噬嗑",index:"Hexagram_21"},{id:"100101",name:"山火贲",index:"Hexagram_22"},{id:"100000",name:"山地剥",index:"Hexagram_23"},{id:"000001",name:"地雷复",index:"Hexagram_24"},
      {id:"111001",name:"天雷无妄",index:"Hexagram_25"},{id:"100111",name:"山天大畜",index:"Hexagram_26"},{id:"100001",name:"山雷颐",index:"Hexagram_27"},{id:"011110",name:"泽风大过",index:"Hexagram_28"},
      {id:"010010",name:"坎为水",index:"Hexagram_29"},{id:"101101",name:"离为火",index:"Hexagram_30"},{id:"011100",name:"泽山咸",index:"Hexagram_31"},{id:"001110",name:"雷风恒",index:"Hexagram_32"},
      {id:"111100",name:"天山遁",index:"Hexagram_33"},{id:"001111",name:"雷天大壮",index:"Hexagram_34"},{id:"101000",name:"火地晋",index:"Hexagram_35"},{id:"000101",name:"地火明夷",index:"Hexagram_36"},
      {id:"110101",name:"风火家人",index:"Hexagram_37"},{id:"101011",name:"火泽睽",index:"Hexagram_38"},{id:"010100",name:"水山蹇",index:"Hexagram_39"},{id:"001010",name:"雷水解",index:"Hexagram_40"},
      {id:"100011",name:"山泽损",index:"Hexagram_41"},{id:"110001",name:"风雷益",index:"Hexagram_42"},{id:"011111",name:"泽天夬",index:"Hexagram_43"},{id:"111110",name:"天风姤",index:"Hexagram_44"},
      {id:"011000",name:"泽地萃",index:"Hexagram_45"},{id:"000110",name:"地风升",index:"Hexagram_46"},{id:"011010",name:"泽水困",index:"Hexagram_47"},{id:"010110",name:"水风井",index:"Hexagram_48"},
      {id:"011101",name:"泽火革",index:"Hexagram_49"},{id:"101110",name:"火风鼎",index:"Hexagram_50"},{id:"001001",name:"震为雷",index:"Hexagram_51"},{id:"100100",name:"艮为山",index:"Hexagram_52"},
      {id:"110100",name:"风山渐",index:"Hexagram_53"},{id:"001011",name:"雷泽归妹",index:"Hexagram_54"},{id:"001101",name:"雷火丰",index:"Hexagram_55"},{id:"101100",name:"火山旅",index:"Hexagram_56"},
      {id:"110110",name:"巽为风",index:"Hexagram_57"},{id:"011011",name:"兑为泽",index:"Hexagram_58"},{id:"110010",name:"风水涣",index:"Hexagram_59"},{id:"010011",name:"水泽节",index:"Hexagram_60"},
      {id:"110011",name:"风泽中孚",index:"Hexagram_61"},{id:"001100",name:"雷山小过",index:"Hexagram_62"},{id:"010101",name:"水火既济",index:"Hexagram_63"},{id:"101010",name:"火水未济",index:"Hexagram_64"}
    ],
    //第几卦ID
    sixtyfourhexagramsid:"",
    //卦名称
    sixtyfourhexagramsname:"",

    //灵签数据-从数据库获取
    //灵签数据
    spiritualdata:[],
    //灵签数据长度
    spiritualdatalength:"",

    //商品费用
    totalFee:1,
    //商品名称
    body:"六爻易卦咨询费",

    //用户openid
    openiddata:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收主页传送的上爻，下爻，动爻数据
    let that=this
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('parentPageEmit',function(data){
      console.log(data)
      that.setData({
        showupperhexagram:data.tempupperhexagram,
        showhexagram:data.temphexagram,
        showmovingline:data.tempmovingline
      })
      console.log("上爻：",that.data.showupperhexagram)
      console.log("下爻：",that.data.showhexagram)
      console.log("动爻：",that.data.showmovingline)

      //根据上爻，下爻数据，转换为二进制与六十四卦比对
      var switchtextshowupperhexagram;
      if(that.data.showupperhexagram==1)
        switchtextshowupperhexagram="111";
      if(that.data.showupperhexagram==2)
        switchtextshowupperhexagram="011";
      if(that.data.showupperhexagram==3)
        switchtextshowupperhexagram="101";
      if(that.data.showupperhexagram==4)
        switchtextshowupperhexagram="001";
      if(that.data.showupperhexagram==5)
        switchtextshowupperhexagram="110";
      if(that.data.showupperhexagram==6)
        switchtextshowupperhexagram="010";
      if(that.data.showupperhexagram==7)
        switchtextshowupperhexagram="100";
      if(that.data.showupperhexagram==8)
        switchtextshowupperhexagram="000";
      
      var switchtextshowhexagram;
      if(that.data.showhexagram==1)
        switchtextshowhexagram="111";
      if(that.data.showhexagram==2)
        switchtextshowhexagram="011";
      if(that.data.showhexagram==3)
        switchtextshowhexagram="101";
      if(that.data.showhexagram==4)
        switchtextshowhexagram="001";
      if(that.data.showhexagram==5)
        switchtextshowhexagram="110";
      if(that.data.showhexagram==6)
        switchtextshowhexagram="010";
      if(that.data.showhexagram==7)
        switchtextshowhexagram="100";
      if(that.data.showhexagram==8)
        switchtextshowhexagram="000";
      //组合成新的二进制数组
      var mergehexagram=switchtextshowupperhexagram+switchtextshowhexagram;

      //从data数据中拷贝出来六十四卦二进制数组
      var copythesixtyfourhexagrams=that.data.thesixtyfourhexagrams;

      // //this只是小区域，需要用that来指定大区域可用
      // let that=this

      //与拷贝的数组进行比较，得出数组序号（第几卦）和名称
      for(var i=0;i<copythesixtyfourhexagrams.length;i++){
        if(mergehexagram==copythesixtyfourhexagrams[i].id)
        {
          that.setData({
            sixtyfourhexagramsid:copythesixtyfourhexagrams.indexOf(copythesixtyfourhexagrams[i]),
            sixtyfourhexagramsname:copythesixtyfourhexagrams[i].name
          })
          console.log(copythesixtyfourhexagrams[i].name)
          console.log(copythesixtyfourhexagrams[i].index)
          //从数据库中查找到灵签数据
          SpiritualDataDB.where({
            _id:copythesixtyfourhexagrams[i].index,
            _openid: "o_IPO5c6Urqy_pElay7ZL4N24Rtw"
          })
          .get({
            success:function(res){
              // console.log("这是数据库数据",res.data)
              that.setData({
                //赋值给data中的变量
                spiritualdata:res.data
              })
              // console.log("这是赋值数据",that.data.spiritualdata)
              //获取数据长度
              var n=0;
              for(var i in that.data.spiritualdata[0]){
                n++
              }
              that.setData({
                //赋值数据长度
                spiritualdatalength:n
              })
              // console.log("这是数组长度",that.data.spiritualdatalength)
            }
          })
        }
    }
    });

    //获取用户openid
    this.getOpenid();
  },

  /**
   * 这是内容点击按钮处理
   */
  show_content_02:function(){

    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=2;
    //使用用户openid查询是否已经付费，付费则直接跳转，否则进行付费
    SpiritualOrderDB.where({
      appid:'wxb4dc176d15714310',
      _openid: this.data.openiddata,
      payStatus:'success'
    }).get({
      success(res){
          //跳转目标页面
          wx.navigateTo({
            url:'/pages/content/content',
            // 打开的目标页面
            success: (res) => {
              // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
              res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
            },
          })
        console.log("查询付费用户成功",res.data)
      },
      fail:err=>{
        console.log("该用户没有付费")
        this.wxpayfunction();
      }
    })
  },
  show_content_03:function(){
    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=3;
    //使用用户openid查询是否已经付费，付费则直接跳转，否则进行付费
    SpiritualOrderDB.where({
      appid:'wxb4dc176d15714310',
      _openid: this.data.openiddata,
      payStatus:'success'
    }).get({
      success(res){
          //跳转目标页面
          wx.navigateTo({
            url:'/pages/content/content',
            // 打开的目标页面
            success: (res) => {
              // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
              res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
            },
          })
        console.log("查询付费用户成功",res.data)
      },
      fail:err=>{
        console.log("该用户没有付费")
        this.wxpayfunction();
      }
    })
  },
  show_content_04:function(){
    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=4;
    // var templength=this.data.spiritualdatalength

    wx.navigateTo({
      url:'/pages/content/content',
       // 打开的目标页面
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
        res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
      },
    })
  },
  show_content_05:function(){
    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=5;
    // var templength=this.data.spiritualdatalength

    wx.navigateTo({
      url:'/pages/content/content',
       // 打开的目标页面
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
        res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
      },
    })
  },
  show_content_06:function(){
    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=6;
    // var templength=this.data.spiritualdatalength

    wx.navigateTo({
      url:'/pages/content/content',
       // 打开的目标页面
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
        res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
      },
    })
  },
  show_content_07:function(){
    var copyspiritualdata=this.data.spiritualdata;
    var contentindex=7;
    // var templength=this.data.spiritualdatalength

    wx.navigateTo({
      url:'/pages/content/content',
       // 打开的目标页面
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
        res.eventChannel.emit('newparentPageEmit',{copyspiritualdata,contentindex} );
      },
    })
  },
  /**
   * 跳转函数封装
   */
  // jumppage:function(x,y){
  //   //跳转目标页面
  //   wx.navigateTo({
  //     url:'/pages/content/content',
  //     // 打开的目标页面
  //     success: (res) => {
  //       // 通过eventChannel向被打开页面传送数据，分别为灵签数据，按钮索引，数据长度
  //       res.eventChannel.emit('newparentPageEmit',{x,y} );
  //     },
  //   })
  // },

  /**
   * 支付处理
   */
  /** 支付点击监听 */
  async wxpayfunction() {
    // const totalFee = 1
    // const body = '六爻易卦咨询费'
    wx.showLoading({
      title: '打开微信支付',
      mask: true
    })
 
    // 获取支付免鉴权参数
    const payMentRes = await this.getPayMent(this.data.totalFee, this.data.body)
    wx.hideLoading({
      success: (res) => {},
    })
    // 小程序支付API
    const payRes = await this.wxPay(payMentRes.result.payment)
    // 支付API返回结果打印
    console.log(payRes)
  },
 
  /**
   * 小程序支付API
   * @param {object} payment 支付免鉴权参数
   */
  wxPay(payment) {
    return new Promise((resolve, rejects) => {
      wx.requestPayment({
        ...payment,
        success(res) {
          resolve({
            status: 'success',
            res: res
          })
        },
        fail(err) {
          resolve({
            status: 'fail',
            res: err
          })
        }
      })
    })
  },
 
  /**
   * 获取支付免鉴权参数
   * @param {number} totalFee 支付金额, 单位：分
   * @param {string} body 商品名称
   */
  getPayMent(totalFee, body) {
    return new Promise((resolve, rejects) => {
      wx.cloud.callFunction({
        name: 'pay',
        data: {
          totalFee,
          body
        },
        success(res) {
          resolve(res)
        },
        fail(err) {
          resolve(err)
        }
      })
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

  },

   /**
   * 这是获取用户openid函数
   */
  getOpenid:function(){
    let page = this;
    wx.cloud.callFunction({
      name:'openid',
      complete:res=>{
        console.log('openid--',res.result)
        var openid = res.result.openid
        page.setData({
          openiddata:openid
        })
      }
    })
  }

})