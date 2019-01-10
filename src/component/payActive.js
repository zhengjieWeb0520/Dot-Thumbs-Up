import axios from 'axios'
import qs from 'qs'
import { serverIp }  from './../utils/utils'
import wx from 'weixin-js-sdk'

export function payActivity(active_id){
  let url = qs.stringify({
    url: window.location.href.split('#')[0]
  })
  axios.post(serverIp + '/dianzanbao/wechat/getConfig.do', url).then(res => {
    if (res.data.result_code === '0') {
      let data = qs.stringify({
        active_id: active_id
      })
      wx.config({
        debug: true,
        appId: res.data.result_info.appid,
        timestamp: res.data.result_info.timestamp,
        nonceStr: res.data.result_info.noncestr,
        signature: res.data.result_info.signature,
        jsApiList: ['chooseWXPay']
      })
      wx.ready(function() {
        axios.post(
          serverIp + '/dianzanbao/active/payActiveOrder.do',
          data,
          {
            headers: {
              token: window.sessionStorage.getItem('token'),
              user_id: window.sessionStorage.getItem('user_id')
            }
          }   
        ).then(res => {
          if (res.data.result_code === '0') {
            let result_info = res.data.result_info
            wx.chooseWXPay({
              timestamp:result_info.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr:result_info.nonceStr, // 支付签名随机串，不长于 32 位
              package:result_info.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType:result_info.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign:result_info.paySign,// 支付签名
              success: function (res) {
                console.log(res)
                  // This.setState({
                  //     paySuccessVisible:true
                  // })
              },
              fail: function(res){
                alert('pay fail');
                alert(JSON.stringify(res));
            }
          })
          }
        })
      })
    }
  })
}
