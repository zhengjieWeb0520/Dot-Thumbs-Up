import { combineReducers } from 'redux'
import { counter } from './redux/indexRedux'
import { backCard } from './redux/4-myinfo/backCardRedux'
import { reportMerchant } from './redux/1-activiy/reportMerchantRedux'
import { userInfo } from './redux/4-myinfo/getUserInfoRedux'

export default combineReducers({ counter, backCard, reportMerchant, userInfo })
