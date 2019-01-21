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
        Toast.success('创建活动成功, 提醒:活动奖金分配模式不允许编辑' ,3, true);
        dispatch({ type: CREATEACTIVITY, data: '创建活动成功, 提醒:活动奖金分配模式不允许编辑' })
        //res.data.result_info
        callBack()
        payActivity(res.data.result_info)
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
