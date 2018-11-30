import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp } from '../../utils/utils'

const USERINFO = 'USERINFO'

let initState = {
	userInfo: ''
}

//获取个人信息
export function getUserInfo(state = initState, action) {
	switch (action.type) {
		case USERINFO:
			return { ...state, userInfo: action.data }
		default:
			return state
	}
}

//获取个人信息
function getUserInformation(data) {
	return { data, type: USERINFO }
}

//获取个人信息接口
export function getUserInfoPort(token, user_id) {
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
			)
			.then(res => {
				if (res.data.result_code === '0') {
					dispatch(getUserInformation(res.data.result_info))
				}
			})
	}
}

//修改商家信息
export function modifyUserInfo(key, value, callBack) {
	let data

	if (key === 'region') {
		data = qs.stringify({
			province: value[0],
			city: value[1],
			area: value[2]
		})
	} else {
		data = qs.stringify({
			[key]: value
		})
	}

	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/userInfo/updUserInfo.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					Toast.info('修改成功', 1)
					callBack()
				}
			})
	}
}

//添加商家详情图片
export function addMerchentImg(value, callBack) {
	let data = qs.stringify({
		img_urls: value
	})

	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/userInfo/addImgs.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					Toast.info('添加成功', 1)
					callBack()
				}
			})
	}
}

//删除商家详情图片
export function removeMerchentImg(id, callBack) {
	let data = qs.stringify({
    img_ids: id
	})

	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/userInfo/delImgs.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					Toast.info('删除成功', 1)
					callBack()
				}
			})
	}
}
