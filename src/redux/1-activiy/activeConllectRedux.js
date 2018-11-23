//活动收藏
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const ISCOLLECT = 'ISCOLLECT'

let initState = {
  have_collection : false,
  collect_info: ''
}

export function collectInfo(state = initState, action){
  switch (action.type){
    case ISCOLLECT:
      return {...state, have_collection: action.data}
    default:
      return state
  }
}
//判断是否收藏
export function getIsOrNotCollect(collection_type, collection_id){
  let data = qs.stringify({
    collection_type: collection_type,
    collection_id: collection_id
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/collection/haveCollection.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch({ type: ISCOLLECT, data: res.data.result_info })
        }
      })
  }
}