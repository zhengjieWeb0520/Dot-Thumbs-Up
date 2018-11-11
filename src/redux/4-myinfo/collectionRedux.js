import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const COLLECTIONACTIVE = 'COLLECTIONACTIVE' //收藏列表
const ISCOLLECT = 'ISCOLLECT'               //是否收藏
const ADDCOLLECT = 'ADDCOLLECT'             //添加收藏
const REMOVECOLLECT = 'REMOVECOLLECT'       //移除收藏

let initState = {
	active: {},
  business: {},
  have_collection : null,
  collect_info: ''
}

//收藏信息
export function collection(state = initState, action) {
	switch (action.type) {
		case COLLECTIONACTIVE:
      return { ...state, active: action.data }
    case ISCOLLECT:
      return {...state, have_collection: action.data}
    case ADDCOLLECT:
      return {...state, collect_info: action.data}
    case REMOVECOLLECT:
      return {...state, collect_info: action.data}
		default:
			return state
	}
}

//获取收藏的活动
export function getCollectionActive(pageConfig, fn) {
	let data = qs.stringify({
		collection_type: 'active',
		pageNo: pageConfig.pageNo,
    pageSize: pageConfig.pageSize
	})
	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/collection/getCollections.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
          dispatch({ type: COLLECTIONACTIVE, data: res.data.result_info })
          fn ? fn() : null
				}
			})
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
        console.log(res)
        if(res.data.result_code === '0'){
          dispatch({ type: ISCOLLECT, data: res.data.result_info })
        }
      })
  }
}
//添加收藏
export function addCollection(collection_type, collection_id){
  let data = qs.stringify({
    collection_type: collection_type,
    collection_id: collection_id
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/collection/addCollection.do', 
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
          dispatch({ type: ADDCOLLECT, data: '已收藏' })
        }
      })
  }
}
//移除收藏
export function removeCollection(collection_type, collection_id){
  let data = qs.stringify({
    collection_type: collection_type,
    collection_id: collection_id
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/collection/removeCollection.do', 
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
          dispatch({ type: REMOVECOLLECT, data: '已取消' })
        }
      })
  }
}
