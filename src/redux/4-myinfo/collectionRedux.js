import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const COLLECTIONACTIVE = 'COLLECTIONACTIVE'

let initState = {
	active: {},
	business: {}
}

//收藏信息
export function collection(state = initState, action) {
	switch (action.type) {
		case COLLECTIONACTIVE:
			return { ...state, active: action.data }
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
					fn ? fn(res.data.result_info) : null
				}
			})
	}
}
