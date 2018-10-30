import axios from 'axios'
import { serverIp } from '../../utils/utils'

const GETUSERINFO = 'GETUSERINFO'

let initState = {
	userInfoData: {}
}

//用户信息
export function userInfo(state = initState, action) {
	switch (action.type) {
		case GETUSERINFO:
			return { ...state, userInfoData: action.data }
		default:
			return state
	}
}

//获取个人/商家信息
export function getUserInfo() {
	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/userInfo/getUserInfo.do', null, {
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
