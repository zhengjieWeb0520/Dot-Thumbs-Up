import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const RECENTVIEWACTIVE = 'COLLECTIONACTIVE'
const RECENTVIEWBUSINESS = 'RECENTVIEWBUSINESS'
const CLEARRECENTVIEWACTIVE = 'CLEARCOLLECTIONACTIVE'
const CLEARRECENTVIEWBUSINESS = 'CLEARRECENTVIEWBUSINESS'

let initState = {
	active: {},
	business: {}
}

//收藏信息
export function recentView(state = initState, action) {
	switch (action.type) {
		case RECENTVIEWACTIVE:
			return { ...state, active: action.data }
		case RECENTVIEWBUSINESS:
			return { ...state, business: action.data }
		case CLEARRECENTVIEWACTIVE:
			return { ...state, active: {} }
		case CLEARRECENTVIEWBUSINESS:
			return { ...state, business: {} }
		default:
			return state
	}
}

//获取最近浏览的活动
export function getRecentViewActive(pageConfig, fn) {
	let data = qs.stringify({
		collection_type: 'foot_print_active',
		pageNo: pageConfig.pageNo,
		pageSize: pageConfig.pageSize,
		current_user_lon: window.sessionStorage.getItem('user_lon'),
		current_user_dim: window.sessionStorage.getItem('user_lat')
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
          fn ? fn(res.data.result_info) : null
					dispatch({ type: RECENTVIEWACTIVE, data: res.data.result_info })		
				}
			})
	}
}

//获取最近浏览的商家
export function getRecentViewBusiness(pageConfig, fn) {
	let data = qs.stringify({
    collection_type: 'foot_print_business',
		pageNo: pageConfig.pageNo,
		pageSize: pageConfig.pageSize,
		current_user_lon: window.sessionStorage.getItem('user_lon'),
		current_user_dim: window.sessionStorage.getItem('user_lat')
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
          fn ? fn(res.data.result_info) : null
					dispatch({ type: RECENTVIEWBUSINESS, data: res.data.result_info })		
				}
			})
	}
}

//清空redux活动列表
export function clearRecentViewActive() {
	return { type: CLEARRECENTVIEWACTIVE }
}

//清空redux商家列表
export function clearRecentViewBusiness() {
	return { type: CLEARRECENTVIEWBUSINESS }
}
