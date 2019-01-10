import qs from 'qs'
import axios from 'axios'
import wx from 'weixin-js-sdk'
import { Toast } from 'antd-mobile'
import { serverIp } from '../../utils/utils'
import $ from 'zepto'
import { payActivity } from './../../component/payActive'

const CREATEACTIVITY = 'CREATEACTIVITY'
const EDITECTIVITY = 'EDITECTIVITY'


let initState = {
  publishState: '',
  editeState: '',
}

//
export function createActivity(state = initState, action){
  switch (action.type){
    case CREATEACTIVITY:
      return {...state, publishState: action.data}
    case EDITECTIVITY:
      return {...state}
    default :
      return state
  }
}
// function jsApiCall(result_info, WeixinJSBridge) {
//   WeixinJSBridge.invoke(
//     'getBrandWCPayRequest', {
//        "appId": result_info.appId,     //公众号名称，由商户传入     
//        "timeStamp":result_info.timeStamp,         //时间戳，自1970年以来的秒数     
//        "nonceStr":result_info.nonceStr, //随机串     
//        "package":result_info.package,     
//        "signType":result_info.signType,         //微信签名方式：     
//        "paySign":result_info.paySign //微信签名 
//     },
//     function(res){
//     if(res.err_msg == "get_brand_wcpay_request:ok" ){
//     // 使用以上方式判断前端返回,微信团队郑重提示：
//           //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
//     } 
//  }); 
// }

// 发布活动
export function publishActive(activeInfo, callBack){
  let data = qs.stringify({
    active_name: activeInfo.active_name,
    active_start_date: activeInfo.active_start_date,
    active_end_date: activeInfo.active_end_date,
    active_desc: activeInfo.active_desc,
    bonus_type : activeInfo.bonus_type,
    distribute_type: activeInfo.distribute_type,
    bonus: activeInfo.bonus,
    active_images: activeInfo.active_images
  })
  return dispatch => {
    axios
    .post(
      serverIp + '/dianzanbao/active/createActive.do',
      data,
      {
        headers: {
          token: window.sessionStorage.getItem('token'),
          user_id: window.sessionStorage.getItem('user_id')
        }
      }
    )
    .then(res => {
      if (res.data.result_code === '0') {
        dispatch({ type: CREATEACTIVITY, data: '创建活动成功, 提醒:活动奖金分配模式不允许编辑' })
        //res.data.result_info
        callBack()
        payActivity(res.data.result_info)
        //payActivity(res.data.result_info)
        //   if (typeof WeixinJSBridge == "undefined"){
        //     if( document.addEventListener ){
        //         document.addEventListener('WeixinJSBridgeReady', payActivity (res.data.result_info, WeixinJSBridge), false);
        //     }else if (document.attachEvent){
        //         document.attachEvent('WeixinJSBridgeReady', payActivity (res.data.result_info, WeixinJSBridge)); 
        //         document.attachEvent('onWeixinJSBridgeReady', payActivity (res.data.result_info, WeixinJSBridge));
        //     }
        //  }else{
        //   payActivity (res.data.result_info, WeixinJSBridge)
        //  }

      }
    }) 
  }
}
//微信支付配置
function wxPay(active_id){

}
// 活动支付
export function payActivity2(active_id) {
  let data = qs.stringify({
    active_id: active_id
  })
  return dispatch => {
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
        console.log(res.data.result_info)
        let result_info = res.data.result_info
        //jsApiCall(res.data.result_info, WeixinJSBridge)
        //if (typeof window.WeixinJSBridge == "undefined"){
          // $(document).on('WeixinJSBridgeReady',function(){ 
          //   WeixinJSBridge.invoke(
          //     'getBrandWCPayRequest', {
          //        "appId": result_info.appId,     //公众号名称，由商户传入     
          //        "timeStamp":result_info.timeStamp,         //时间戳，自1970年以来的秒数     
          //        "nonceStr":result_info.nonceStr, //随机串     
          //        "package":result_info.package,     
          //        "signType":result_info.signType,         //微信签名方式：     
          //        "paySign":result_info.paySign //微信签名 
          //     },
          //     function(res){
          //     if(res.err_msg == "get_brand_wcpay_request:ok" ){
          //     // 使用以上方式判断前端返回,微信团队郑重提示：
          //           //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          //     } 
          //  });
          // })
        //}
      }
    })
  }
}
//编辑活动
export function editeActive(params) {
  let data = qs.stringify({
    id: params.id,
    active_name: params.active_name,
    active_desc: params.active_desc,
    active_images: params.active_images
  })
  return dispatch => {
    axios
    .post(
      serverIp + '/dianzanbao/active/updateActive.do',
      data,
      {
        headers: {
          token: window.sessionStorage.getItem('token'),
          user_id: window.sessionStorage.getItem('user_id')
        }
      }
    )
    .then(res => {
      if (res.data.result_code === '0') {
        dispatch({ type: EDITECTIVITY })
        Toast.success(res.data.result_info, 1);
      }
    }) 
  }
}
