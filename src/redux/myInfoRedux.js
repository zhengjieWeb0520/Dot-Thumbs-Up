// import axios from 'axios'
// import qs from 'qs'
// import { serverIp } from '../utils/utils'

// const GETUSERINFO = 'GETUSERINFO'
// const initState = {
//   User: []
// }

// //我的reducer
// export function myInfo (state = initState, action){
//     switch(action.type){
//         case GETUSERINFO:
//          return {}
//         default:
//          return state 
//     }
// }
// //action creator
// export function GETUSERINFO(){
//     return { type: GETUSERINFO }
// }

// //异步执行
// export function addGUNAsync(){
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(addGUN())
//         }, 2000);
//     }
// }