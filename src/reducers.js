import { combineReducers } from 'redux'
import { counter } from './redux/indexRedux'
import { backCard } from './redux/4-myinfo/backCardRedux'
import { reportMerchant } from './redux/1-activiy/reportMerchantRedux'
import { getUserInfo } from './redux/1-activiy/getUserInfoRedux'
import { createActivity } from './redux/3-publish/createActiceRedux'
import { getIndustryInfo } from './redux/1-activiy/activeIndexRedux'
import { userInfo } from './redux/4-myinfo/getUserInfoRedux'
import { collection } from './redux/4-myinfo/collectionRedux'

export default combineReducers({ counter, backCard, reportMerchant,userInfo, collection, getUserInfo, createActivity, getIndustryInfo })

