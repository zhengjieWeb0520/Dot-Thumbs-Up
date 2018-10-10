import { combineReducers } from 'redux'
import { counter } from './redux/indexRedux'
import { backCard } from './redux/4-myinfo/backCardRedux'

export default combineReducers({ counter, backCard  })
