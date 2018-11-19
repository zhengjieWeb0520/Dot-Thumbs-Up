//活动活动
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const MERCHANTACTIVELIST = 'MERCHANTACTIVELIST'
const PARTICPATEACTIVE = 'PARTICPATEACTIVE'

let initState = {
  merchantActiveList : {},
  participateActiveList : []
}

export function merchantActivity (state = initState, action) {
  switch (action.type) {
    case MERCHANTACTIVELIST:
      return {...state, merchantActiveList: action.data}
    case PARTICPATEACTIVE:
      return {...state, participateActiveList: action.data}
    default:
      return state
  }
}
//商家发布的活动
export function getMerchantActivity(activeParam, fn){
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
        	fn ? fn(res.data.result_info) : null
        }
      })
  }
}
//用户参与的活动
export function getParticipateActivity(activeParam, fn){
  let data = qs.stringify({
    joined: '1',
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
          dispatch({ type: PARTICPATEACTIVE, data: res.data.result_info})
        	fn ? fn(res.data.result_info) : null
        }
      })
  }
}