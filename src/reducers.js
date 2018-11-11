import { combineReducers } from 'redux'
import { counter } from './redux/indexRedux'
import { backCard } from './redux/4-myinfo/backCardRedux'
import { reportMerchant } from './redux/1-activiy/reportMerchantRedux'
import { getUserInfo } from './redux/1-activiy/getUserInfoRedux'
import { createActivity } from './redux/3-publish/createActiceRedux'
import { getIndustryInfo } from './redux/1-activiy/activeIndexRedux'
import { collection } from './redux/4-myinfo/collectionRedux'
import { merchantActivity } from './redux/5-merchant/merchantRedux'
import { recentView } from './redux/4-myinfo/recentViewRedux'

export default combineReducers({
	counter,
	backCard,
	reportMerchant,
	collection,
	getUserInfo,
	createActivity,
	getIndustryInfo,
	merchantActivity,
	recentView,
	getUserInfo,
	createActivity,
	getIndustryInfo
})
