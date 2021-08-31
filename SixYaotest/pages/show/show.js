// pages/show/show.js
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
      {id:"111111",name:"乾为天"},{id:"000000",name:"坤为地"},{id:"010001",name:"水雷屯"},{id:"100010",name:"山水蒙"},{id:"010111",name:"水天需"},{id:"111010",name:"天水讼"},
      {id:"000010",name:"地水师"},{id:"010000",name:"水地比"},{id:"110111",name:"风天小畜"},{id:"111011",name:"天泽履"},{id:"000111",name:"地天泰"},{id:"111000",name:"天地否"},
      {id:"111101",name:"天火同人"},{id:"101111",name:"火天大有"},{id:"000100",name:"地山谦"},{id:"001000",name:"雷地豫"},{id:"011001",name:"泽雷随"},{id:"100110",name:"山风蛊"},
      {id:"000011",name:"地泽临"},{id:"110000",name:"风地观"},{id:"101001",name:"火雷噬嗑"},{id:"100101",name:"山火贲"},{id:"100000",name:"山地剥"},{id:"000001",name:"地雷复"},
      {id:"111001",name:"天雷无妄"},{id:"100111",name:"山天大畜"},{id:"100001",name:"山雷颐"},{id:"011110",name:"泽风大过"},{id:"010010",name:"坎为水"},{id:"101101",name:"离为火"},
      {id:"011100",name:"泽山咸"},{id:"001110",name:"雷风恒"},{id:"111100",name:"天山遁"},{id:"001111",name:"雷天大壮"},{id:"101000",name:"火地晋"},{id:"000101",name:"地火明夷"},
      {id:"110101",name:"风火家人"},{id:"101011",name:"火泽睽"},{id:"010100",name:"水山蹇"},{id:"001010",name:"雷水解"},{id:"100011",name:"山泽损"},{id:"110001",name:"风雷益"},
      {id:"011111",name:"泽天夬"},{id:"111110",name:"天风姤"},{id:"011000",name:"泽地萃"},{id:"000110",name:"地风升"},{id:"011010",name:"泽水困"},{id:"010110",name:"水风井"},
      {id:"011101",name:"泽火革"},{id:"101110",name:"火风鼎"},{id:"001001",name:"震为雷"},{id:"100100",name:"艮为山"},{id:"110100",name:"风山渐"},{id:"001011",name:"雷泽归妹"},
      {id:"001101",name:"雷火丰"},{id:"101100",name:"火山旅"},{id:"110110",name:"巽为风"},{id:"011011",name:"兑为泽"},{id:"110010",name:"风水涣"},{id:"010011",name:"水泽节"},
      {id:"110011",name:"风泽中孚"},{id:"001100",name:"雷山小过"},{id:"010101",name:"水火既济"},{id:"101010",name:"火水未济"}
    ],
    sixtyfourhexagramsid:"",
    sixtyfourhexagramsname:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('parentPageEmit', (data) => {
      // console.log(data);
      this.setData({
        showupperhexagram: data.tempupperhexagram,
        showhexagram:data.temphexagram,
        showmovingline:data.tempmovingline
      });
    });

    // var textqian,textdui,textli,textzhen,textxun,textkan,textgen,textkun;
    var switchtextshowupperhexagram;
    if(this.data.showupperhexagram==1)
      switchtextshowupperhexagram="111";
    if(this.data.showupperhexagram==2)
      switchtextshowupperhexagram="011";
    if(this.data.showupperhexagram==3)
      switchtextshowupperhexagram="101";
    if(this.data.showupperhexagram==4)
      switchtextshowupperhexagram="001";
    if(this.data.showupperhexagram==5)
      switchtextshowupperhexagram="110";
    if(this.data.showupperhexagram==6)
      switchtextshowupperhexagram="010";
    if(this.data.showupperhexagram==7)
      switchtextshowupperhexagram="100";
    if(this.data.showupperhexagram==0)
      switchtextshowupperhexagram="000";
    
    var switchtextshowhexagram;
    if(this.data.showhexagram==1)
      switchtextshowhexagram="111";
    if(this.data.showhexagram==2)
      switchtextshowhexagram="011";
    if(this.data.showhexagram==3)
      switchtextshowhexagram="101";
    if(this.data.showhexagram==4)
      switchtextshowhexagram="001";
    if(this.data.showhexagram==5)
      switchtextshowhexagram="110";
    if(this.data.showhexagram==6)
      switchtextshowhexagram="010";
    if(this.data.showhexagram==7)
      switchtextshowhexagram="100";
    if(this.data.showhexagram==0)
      switchtextshowhexagram="000";

    var mergehexagram=switchtextshowupperhexagram+switchtextshowhexagram;
    var copythesixtyfourhexagrams=this.data.thesixtyfourhexagrams;

    for(var i=0;i<copythesixtyfourhexagrams.length;i++){
      if(mergehexagram==copythesixtyfourhexagrams[i].id)
        this.setData({
          sixtyfourhexagramsid:copythesixtyfourhexagrams.indexOf(copythesixtyfourhexagrams[i]),
          sixtyfourhexagramsname:copythesixtyfourhexagrams[i].name
        })
    }
    // console.log(this.data.sixtyfourhexagramsid+this.data.sixtyfourhexagramsname)
      // eventChannel.on('parentPageEmit', function(data) {
    //   console.log(data.tempupperhexagram)
    //   this.setData({
    //         showupperhexagram: data.tempupperhexagram,
    //         showhexagram:data.temphexagram,
    //         showmovingline:data.tempmovingline
    //       });
    // })
    // eventChannel.on('parentPageEmit2', (data) => {
    //   console.log(data);
    //   this.setData({
    //     showhexagram: data,
    //   });
    // });
    // eventChannel.on('parentPageEmit3', (data) => {
    //   console.log(data);
    //   this.setData({
    //     showmovingline: data,
    //   });
    // });
    // console.log(options)
    // const{a,b,c}=options;
    // this._getlist(a,b,c);
  },

  // _getlist(a,b,c){
  //   this.setData({
  //     showupperhexagram:a,
  //     showhexagram:b,
  //     showmovingline:c
  //   })
  // },

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