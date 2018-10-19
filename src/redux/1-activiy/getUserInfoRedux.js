import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const USERINFO = 'USERINFO'

let initState = {
  userInfo: ''
}

//获取个人信息
export function getUserInfo(state = initState, action){
  switch (action.type){
    case USERINFO:
      return { ...state, userInfo: action.data }
    default:
      return state
  }
}
//获取个人信息
function getUserInformation(data) {
  return {data, type: USERINFO}
}
//获取个人信息接口
export function getUserInfoPort(token, user_id){
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/userInfo/getUserInfo.do', 
        {},
        {
          headers: {
            token: token,
            user_id: user_id
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch(getUserInformation(res.data.result_info))
        }
      })
  }
}