import axios from 'axios'
import qs from 'qs'
import { serverIp } from '../../utils/utils'
import { Toast } from 'antd-mobile'

const THUMBSUP = 'THUMBSUP'

const initState = {
  thumbsUpState : ''
}

export function thumbsUp(state = initState, action){
  switch (action.type){
    case THUMBSUP:
      return {...state, thumbsUpState: action.data}
    default:
      return state
    }
}

export function thumpsUpActive(active_id, parent_user_id){
  let data = {} 
  if(parent_user_id){
    data = qs.stringify({
      active_id: active_id,
      parent_user_id: parent_user_id
    })
  }else{
    data = qs.stringify({
      active_id: active_id
    })
  }
  return dispatch => {
    axios
    .post(
      serverIp + '/dianzanbao/like/like.do', 
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
        dispatch({type: THUMBSUP, data: '点赞成功'})
        Toast.success('点赞成功',3);
      }else if(res.data.result_code === '-1'){
        Toast.info(res.data.err_msg,3);
      }
    })   
  }
}