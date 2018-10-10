import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'
import $ from 'zepto'

const REPORTMERCHANT = "REPORTMERCHANT"
const FEEDBACK = "FEEDBACK"

let initState = {
  reportResult: '',
  feedBackResult: ''
}

//举报商家
export function reportMerchant(state = initState, action) {
	switch (action.type) {
		case REPORTMERCHANT:
      return { ...state}
    case FEEDBACK:
      return { ...state}
		default:
			return state
	}
}

//举报商家接口
export function reportMerchantInfo(content, img_urls, name, phone, to_user_id) {
  let data = qs.stringify({
    content: content,
    img_urls: img_urls,
    name: name,
    phone: phone,
    to_user_id: to_user_id
  })
  console.log(img_urls[0])
  let data2 = new FormData()
  data2.append("inputFile", img_urls[0])
  data2.append("title","thisAGoodTitle")
  console.log(data2)
	return dispatch => {
    $.ajax({
      url:serverIp + '/dianzanbao/sys/file/saveImg.do',
      type:"post",
      data:data2,
      processData:false,
      contentType:false,
      success:function(data){
          console.log(data);
      },
      error:function(e){
          alert("错误！！");
      }
  });
    // axios.post(
    //   serverIp + '/dianzanbao/sys/file/saveImg.do',
    //   data2,
    //   {
    //     headers: {
    //       token: window.sessionStorage.getItem('token'),
    //       user_id: window.sessionStorage.getItem('user_id'),
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // ).then(res => {
    //   console.log(res)
    // })
		// axios
    //   .post(
    //     serverIp + '/dianzanbao/report/accusation.do', 
    //     data,
    //     {
    //       headers: {
    //         token: window.sessionStorage.getItem('token'),
    //         user_id: window.sessionStorage.getItem('user_id')
    //       }
		// 	  })
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.result_code === '0') {
    //         dispatch({ type: REPORTMERCHANT, data: res.data.result_info })
    //         Toast.info(res.data.result_info, 1)
    //       }
    //     })
	}
}

//反馈
export function feedBackInfo(content, img_urls, name, phone) {
  let data = qs.stringify({
    content: content,
    img_urls: img_urls,
    name: name,
    phone: phone,
    to_user_id: ''
  })
  console.log(data)
	return dispatch => {
		axios
      .post(
        serverIp + '/dianzanbao/report/feedback.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
			  })
        .then(res => {
          console.log(res)
          if (res.data.result_code === '0') {
            dispatch({ type: REPORTMERCHANT, data: res.data.result_info })
            Toast.info(res.data.result_info, 1)
          }
        })
	}
}