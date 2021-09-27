// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"cloud1-7gy29yhwf740ef6f"
})

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()

    // return {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }

    const res = await cloud.cloudPay.unifiedOrder({
        "body" : "六爻易卦咨询费用",//商品标题
        "outTradeNo" : "20210831888888"+ new Data().getTime(),//订单号
        "spbillCreateIp" : "127.0.0.1",//回调ip地址，可不变
        "subMchId" : "1614508498",//商户号-大度山
        "totalFee" : 1,/*重要-商品单价-单位分*/
        "envId": "cloud1-7gy29yhwf740ef6f",/*重要-云开发环境ID*/
        "functionName": "pay_cb"//要回调哪个云函数，可以随便填，也可以自己写
      })
      return res
}