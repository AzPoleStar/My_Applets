// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"cloud1-7gy29yhwf740ef6f"
});

// const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()

    // const openid=wxContext.OPENID
    // const appid = wxContent.APPID
    // const totalFee = event.totalFee // 支付金额（单位：分）
    // const body = event.body // 商品名
    // const outTradeNo = createOutTradeNo() // 订单号

    // // exports.main = async () => {
    // //     const wxContext = cloud.getWXContext()
    // //     //调用getPayParams，就可以返还wx.requestPayment拉起微信支付所需的参数了
    // //     let result = await api.getPayParams({
    // //       out_trade_no: "20210831888888"+ new Data().getTime(),//订单号
    // //       body: "六爻易卦咨询费用",//订单描述
    // //       total_fee: 1,//订单金额，分为单位
    // //       openid: wxContext.OPENID(openID)
    // //     });
    // //    //这里将这样参数return出去就OK
    // //     return result
    // // }
    // // return {
    // //     event,
    // //     openid: wxContext.OPENID,
    // //     appid: wxContext.APPID,
    // //     unionid: wxContext.UNIONID,
    // // }

    // 获取免鉴权支付参数
    const res = await cloud.cloudPay.unifiedOrder({
        "body" :"六爻易卦咨询费用",//商品标题
        "outTradeNo" : "0117752501201407033233368010",//订单号
        "spbillCreateIp" : "127.0.0.1",//回调ip地址，可不变
        "subMchId" : "1614508498",//商户号-大度山
        "totalFee" : 1,/*重要-商品单价-单位分*/
        "envId": "cloud1-7gy29yhwf740ef6f",/*重要-云开发环境ID*/
        "functionName": "payCallBack"//要回调哪个云函数，可以随便填，也可以自己写
      })

    // 创建订单
    // const nowTime = new Date().getTime()
    // const orderObj = {
    //     _openid: openid,
    //     appid: appid,
    //     outTradeNo: outTradeNo,
    //     totalFee: totalFee * 0.01,
    //     payStatus: 'wait',
    //     createTime: nowTime,
    //     updateTime: nowTime,
    //     deleteTime: null,
    // }
    // await addOrder(orderObj)

    return res

    ////创建随机的唯一订单号(32位)
    // (function createOutTradeNo(){
    //     let outTradeNo = new Date().getTime() // 获取当前13位时间戳
    //     let numStr = '0123456789';
    //     let randomStr = '';
    //     for (let i = (32 - 13); i > 0; --i) {
    //     randomStr += numStr[Math.floor(Math.random() * numStr.length)];
    //     }
    //     outTradeNo += randomStr
    //     return outTradeNo
    // })

    // /** 向数据库创建订单 */
    // const addOrder = async (orderObj) => {
    //     return await db.collection('order')
    //     .add({
    //         data: orderObj
    //     })
    //     .then(res => {
    //         console.log("创建订单成功 =====>", res, orderObj)
    //     })
    //     .catch(err => {
    //         console.log("创建订单异常 =====>", err, orderObj)
    //     })
  }