//活动评价
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp } from '../../utils/utils'

const ACTIVREVALUATE = 'ACTIVREVALUATE'
const COMMENTSTATISTICS = 'COMMENTSTATISTICS'

let initState = {
  activeEvaluate : [],
  commentsStatistics: []
}

export function activeEvaluate(state = initState, action){
  switch (action.type){
    case ACTIVREVALUATE:
      return {...state, activeEvaluate: action.data}
    case COMMENTSTATISTICS:
      return {...state, commentsStatistics: action.data}
    default:
      return state
  }
}
//获取评价的统计信息
export function getCommentsStatistics(active_id){
  let data = qs.stringify({
    active_id: active_id
  })
  return dispatch =>{
    axios
    .post(
      serverIp + '/dianzanbao/active/getCommentsStatistics.do', 
      data,
      {
        headers: {
          token: window.sessionStorage.getItem('token'),
          user_id: window.sessionStorage.getItem('user_id')
        }
      }
    ).then(res => {
      if(res.data.result_code === '0'){
        dispatch({ type: COMMENTSTATISTICS, data: res.data.result_info})
      }
    })
  }
}
//获取评价列表
export function getActiveEvaluate(activeParam, fn){
  let data = qs.stringify({
    active_id: activeParam.active_id,
    filter: activeParam.filter,
    pageNo: activeParam.pageNo,
    pageSize: activeParam.pageSize
  })
  return dispatch =>{
    axios
      .post(
        serverIp + '/dianzanbao/active/getComments.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch({ type: ACTIVREVALUATE, data: res.data.result_info})
        	fn ? fn(res.data.result_info) : null
        }
      })
  }
}