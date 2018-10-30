import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const CREATEACTIVITY = 'CREATEACTIVITY'


let initState = {
  publishState: []
}

//
export function createActivity(state = initState, action){
  switch (action.type){
    case CREATEACTIVITY:
      return {...state}
    default :
      return state
  }
}
//
export function publishActive(activeInfo){
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
        dispatch({ type: CREATEACTIVITY })
        toast(message, res.data.result_info, 'success')
      }
    }) 
  }
}
