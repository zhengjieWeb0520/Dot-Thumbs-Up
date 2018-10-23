import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const GETUSERINFO = 'GETUSERINFO'

let initState = {
	userInfoData: {}
}

//收藏信息
export function collection(state = initState, action) {
	switch (action.type) {
		case GETUSERINFO:
			return { ...state, userInfoData: action.data }
		default:
			return state
	}
}

//获取收藏的活动
export function getCollectionActive() {
	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/collection/getCollections.do', null, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					dispatch({ type: GETUSERINFO, data: res.data.result_info })
				}
			})
	}
}
