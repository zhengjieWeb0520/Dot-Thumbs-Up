import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { serverIp, toast } from '../../utils/utils'

const GETBANKCARDLIST = 'GETBANKCARDLIST'
const GETBANKLIST = 'GETBANKLIST'
const ADDBANKCARD = 'ADDBANKCARD'
const DELETEBANKCARD = 'DELETEBANKCARD'
const ALLBANK = 'ALLBANK'

let initState = {
	cardList: [],
	bankList: []
}

//银行卡
export function backCard(state = initState, action) {
	switch (action.type) {
		case GETBANKCARDLIST:
			return { ...state, cardList: action.data }
		case GETBANKLIST:
      return { ...state, bankList: action.data }
		case ADDBANKCARD:
			return { ...state }
		case DELETEBANKCARD:
			return { ...state }
		case ALLBANK:
			return { ...state, allBank: action.data }
		default:
			return state
	}
}

//获取银行卡列表
export function getBankCardList() {
	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/bank/getBankCards.do', null, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					dispatch({ type: GETBANKCARDLIST, data: res.data.result_info.cards })
				}
			})
	}
}

//增加银行卡
export function addBankCard(values, fn) {
	values = qs.stringify(values)
	return dispatch => {
		axios
			.post(serverIp + '/dianzanbao/bank/addBankCard.do', values, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					dispatch({ type: ADDBANKCARD })
					fn('添加成功')
				} else {
					fn(res.data.err_msg)
				}
			})
	}
}

//删除银行卡
export function deleteBankCard() {
	return { type: DELETEBANKCARD }
}

//获取所有银行列表
export function getAllBank() {
	return { type: ALLBANK }
}
