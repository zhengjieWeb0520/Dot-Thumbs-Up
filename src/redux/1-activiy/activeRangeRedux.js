//获取活动排名
import qs from 'qs'
import axios from 'axios'
import { serverIp, dataFormat } from '../../utils/utils'

const LIKEUSERRANGE = 'LIKEUSERRANGE'
const CLEAR = 'CLEAR'

const initState = {
  userRankings : [],
  updateTime : ''
}

export function userRanking (state= initState, action){
  switch (action.type){
    case LIKEUSERRANGE:
      return {...state, userRankings: action.data, updateTime: action.time}
    case CLEAR:
      return {...state, userRankings:[], updateTime:''}
    default:
      return state
  }
}
//获取点赞排行
export function getUserRanking(params, fn){
  let data = qs.stringify({
    id: params.id,
    pageNo: params.pageNo,
    pageSize: params.pageSize
  })
  let currentTime = dataFormat(new Date(),'yyyy-MM-dd hh:mm')
  return dispatch => {
    axios
    .post(
      serverIp + '/dianzanbao/active/getActiveUserRankings.do', 
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
        dispatch({ type: LIKEUSERRANGE, data: res.data.result_info, time:currentTime})
        fn ? fn(res.data.result_info) : null
      }
    })
  }

}
export function clearData(){
  return {type: CLEAR}
}