//活动首页
import qs from 'qs'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { serverIp, toast } from '../../utils/utils'

const CLEARINFO = 'CLEARINFO'
const GETINDUSTRY = 'GETINDUSTRY'
const GETACTIVELIST = 'GETACTIVELIST'
const ACTIVEINFO = 'ACTIVEINFO'

let initState = {
  industryInfo: [],
  activeList: {},
  activeInfo: {}
}
//获取类别
export function getIndustryInfo(state = initState, action){
  switch (action.type){
    case GETINDUSTRY:
      return {...state, industryInfo: action.data}
    case GETACTIVELIST:
      return {...state, activeList: action.data}
    case ACTIVEINFO:
      return {...state, activeInfo: action.data}
    case CLEARINFO:
      return {...state, industryInfo: {}, activeList: {}, activeInfo:{}}
    default:
      return state
  }
}
//行业类别
function getIndustryAction(data){
  return {data, type: GETINDUSTRY}
}
//活动列表
function getActiveAction(data){
  return {data, type: GETACTIVELIST}
}
//活动详情
function getActiveInfoAction(data){
  return {data, type: ACTIVEINFO}
}
export function clearInfo(){
  return {type: CLEARINFO}
}
//获取行业类别
export function getIndustry(){
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/config/getIndustry.do', 
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch(getIndustryAction(res.data.result_info))
        }
      })
  }
}
//获取活动列表
export function getActiveList(activeParam, fn){
  let data = qs.stringify({
    dir_one: activeParam.dir_one,
    dir_two: activeParam.dir_two,
    by_user_id: activeParam.by_user_id,
    key_word: activeParam.key_word,
    order: activeParam.order,
    distance_lately: activeParam.distance_lately,
    current_user_lon: activeParam.current_user_lon,
    current_user_dim: activeParam.current_user_dim,
    business_level: activeParam.business_level,
    pageNo: activeParam.pageNo,
    pageSize: activeParam.pageSize
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/active/getActiveList.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch(getActiveAction(res.data.result_info))
          fn ? fn(res.data.result_info) : null
        }
      })
  }
}
//获取活动详情
export function getActiveInfo(id){
  let data = qs.stringify({
    id: id,
    with_business_info: 1,
    with_rankings: 10
  })
  return dispatch => {
    axios
      .post(
        serverIp + '/dianzanbao/active/getActiveDetail.do', 
        data,
        {
          headers: {
            token: window.sessionStorage.getItem('token'),
            user_id: window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data.result_code === '0'){
          dispatch(getActiveInfoAction(res.data.result_info))
        }
      })
  }
}
//收藏活动
export function addCollection(collection_type, collection_id){
  let data = qs.stringify({
    collection_type: collection_type, 
    collection_id: collection_id
  })
  return dispatch => {
    axios
    .post(
      serverIp + '/dianzanbao/collection/addCollection.do', 
      data,
      {
        headers: {
          token: window.sessionStorage.getItem('token'),
          user_id: window.sessionStorage.getItem('user_id')
        }
      }
    ).then(res => {
      if(res.data.result_code === '0'){
        dispatch(getActiveInfoAction(res.data.result_info))
      }
    })
  }
}