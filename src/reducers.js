import { combineReducers } from 'redux'
import { counter } from './redux/indexRedux'
import { backCard } from './redux/4-myinfo/backCardRedux'
import { reportMerchant } from './redux/1-activiy/reportMerchantRedux'
import { getUserInfo } from './redux/1-activiy/getUserInfoRedux'
import { createActivity } from './redux/3-publish/createActiceRedux'
import { getIndustryInfo } from './redux/1-activiy/activeIndexRedux'

export default combineReducers({ counter, backCard, reportMerchant, getUserInfo, createActivity, getIndustryInfo })
