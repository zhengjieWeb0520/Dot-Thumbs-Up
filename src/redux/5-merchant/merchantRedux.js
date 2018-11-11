//活动活动
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const MERCHANTACTIVELIST = 'MERCHANTACTIVELIST'

let initState = {
  merchantActiveList : {}
}

export function merchantActivity (state = initState, action) {
  switch (action.type) {
    case MERCHANTACTIVELIST:
      return {...state, merchantActiveList: action.data}
    default:
      return state
  }
}

export function getMerchantActivity(activeParam){
  let data = qs.stringify({
    by_user_id: window.sessionStorage.getItem('user_id'),
    pageNo: activeParam.pageNo,
    pageSize: activeParam.pageSize
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/active/getActiveList.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        console.log(res)
        if(res.data.result_code === '0'){
          dispatch({ type: MERCHANTACTIVELIST, data: res.data.result_info})
        }
      })
  }
}