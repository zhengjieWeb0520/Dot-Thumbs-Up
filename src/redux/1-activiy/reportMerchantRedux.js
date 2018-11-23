import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

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
	return dispatch => {
		axios
      .post(
        serverIp + '/dianzanbao/report/accusation.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
			  })
        .then(res => {
          if (res.data.result_code === '0') {
            dispatch({ type: REPORTMERCHANT, data: res.data.result_info })
            Toast.info(res.data.result_info, 1)
          }
        })
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
          if (res.data.result_code === '0') {
            dispatch({ type: REPORTMERCHANT, data: res.data.result_info })
            Toast.info(res.data.result_info, 1)
          }
        })
	}
}