//活动活动
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const MERCHANTACTIVELIST = 'MERCHANTACTIVELIST'
const PARTICPATEACTIVE = 'PARTICPATEACTIVE'
const CLEARACTIVE = 'CLEARACTIVE'

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
    case CLEARACTIVE:
      return {...state, merchantActiveList: {}, participateActiveList: []}
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
        if(res.data.result_code === '0'){
          fn ? fn(res.data.result_info) : null
          dispatch({ type: MERCHANTACTIVELIST, data: res.data.result_info}) 	
        }
      })
  }
}
//用户参与的活动
export function getParticipateActivity(activeParam, fn){
  let data = qs.stringify({
    active_status: activeParam.active_status,
    user_status: activeParam.user_status,
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
        if(res.data.result_code === '0'){
          fn ? fn(res.data.result_info) : null
          dispatch({ type: PARTICPATEACTIVE, data: res.data.result_info})  	
        }
      })
  }
}

export function clearActive(){
  return {type: CLEARACTIVE}
}