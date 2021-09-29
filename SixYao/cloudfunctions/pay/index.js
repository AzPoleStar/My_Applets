// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"cloud1-7gy29yhwf740ef6f"
});

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const appid = wxContext.APPID
    const totalFee = event.totalFee // 支付金额（单位：分）
    const body = event.body // 商品名
    const outTradeNo = createOutTradeNo() // 调用订单号函数生成订单号

    // // return {
    // //     event,
    // //     openid: wxContext.OPENID,
    // //     appid: wxContext.APPID,
    // //     unionid: wxContext.UNIONID,
    // // }

    // 获取免鉴权支付参数
    const res = await cloud.cloudPay.unifiedOrder({
        "body" :body,//商品标题
        "outTradeNo" : outTradeNo,//订单号
        "spbillCreateIp" : "127.0.0.1",//回调ip地址，可不变
        "subMchId" : "1614508498",//商户号-大度山
        "totalFee" : totalFee,/*重要-商品单价-单位分*/
        "envId": "cloud1-7gy29yhwf740ef6f",/*重要-云开发环境ID*/
        "functionName": "payCallBack"//要回调哪个云函数，可以随便填，也可以自己写
      })

    //创建订单
    const nowTime = new Date().getTime()
    const orderObj = {
        _openid: openid,
        appid: appid,
        outTradeNo: outTradeNo,
        totalFee: totalFee * 0.01,
        payStatus: 'wait',
        createTime: nowTime,
        updateTime: nowTime,
        deleteTime: null,
    }
    await addOrder(orderObj)//调用生成订单函数，写入数据库

    return res
}
    //创建随机的唯一订单号(32位)
    function createOutTradeNo(){
        let outTradeNo = new Date().getTime() // 获取当前13位时间戳
        let numStr = '0123456789';
        let randomStr = '';
        for (let i = (32 - 13); i > 0; --i) {
        randomStr += numStr[Math.floor(Math.random() * numStr.length)];
        }
        outTradeNo += randomStr
        return outTradeNo
    }

    /** 向数据库创建订单 */
    async function addOrder(orderObj) {
      return await db.collection('SixYao_SpiritualOrder')
        .add({
          data: orderObj
        })
        .then(res => {
          console.log("创建订单成功 =====>", res, orderObj);
        })
        .catch(err => {
          console.log("创建订单异常 =====>", err, orderObj);
        });
      }