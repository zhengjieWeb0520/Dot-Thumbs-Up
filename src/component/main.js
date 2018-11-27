import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import Footer from './../component/router/footer'
import RouteConfig from './../component/router/routers'
import { getUserInfoPort } from './../redux/1-activiy/getUserInfoRedux'
import { serverIp } from './../utils/utils'
import { Toast } from 'antd-mobile'
import $ from 'zepto'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.TmapFlag = true //只获取一次
    this.state = {
      goRender : false
    }
  }
  componentWillMount(){
    let _this = this
    let ceshidata = qs.stringify({
      wx_open_id: 'o2uL35jAePpEkl6rimFUCC3VDpOQ'
    })
    //this.relationUser(ceshidata, 9539, 652157)
    
    let hrefParams = window.location.href.split("?")[1]
    if(hrefParams === undefined){
      let tokenStr = '9539'
      let user_id = '652157'
      window.sessionStorage.setItem('token', tokenStr)
      window.sessionStorage.setItem('user_id', user_id)
      this.props.getUserInfoPort(tokenStr, user_id)
      this.setState({
        goRender: true
      })
    }else {
      if(hrefParams.indexOf("token") != -1 ){  //app登录
        let userString = hrefParams.split('&')[0].split('=')[1]
        let tokenString  = hrefParams.split('&')[1].split('=')[1]
        window.sessionStorage.setItem('token', tokenString)
        window.sessionStorage.setItem('user_id', userString)
        _this.props.getUserInfoPort(tokenString, userString)
      }else if(hrefParams.indexOf("code") != -1){  //微信登录
        let codeString = window.location.href.split("&")[0].split("=")[1];
        let codeData = qs.stringify({
          code: codeString
        })
        let user_id = window.sessionStorage.getItem('user_id')
        let token = window.sessionStorage.getItem('token')
        //第二次跳转 当sessionStorage内有user_id时则关联
        if(user_id != undefined){
          axios.post(serverIp + '/dianzanbao/user/getWxOpenId.do', codeData).then(res=>{
            if(res.data.result_code === '0'){
              let data2 = qs.stringify({
                wx_open_id: res.data.result_info
              })
              _this.relationUser(data2, token, user_id) 
            }
          })
        }else if(user_id == undefined){ //第一次跳转 当sessionStorage内没有user_id时则登陆
          axios.post(serverIp + '/dianzanbao/user/weixinLogin.do', codeData).then(res => {
            if (res.data.result_code === '0') {
              let tokenStr = res.data.result_info.token
              let user_id = res.data.result_info.user_id
              window.sessionStorage.setItem('token', tokenStr)
              window.sessionStorage.setItem('user_id', user_id)
              _this.props.getUserInfoPort(tokenStr, user_id)
              _this.setState({
                goRender: true
              })
            }else if(res.data.result_code === '-1'){
              _this.props.history.push('login')
            }else{
              window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2514283f85a9e278&redirect_uri=http%3a%2f%2fjizanbao.com%2fgetWxCode.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }
          })
        }else{
        }
      }else if(hrefParams.indexOf("activeId") != -1){   //分享链接
        let activeId
      }else{
        let tokenStr = '9539'
        let user_id = '652157'
        window.sessionStorage.setItem('token', tokenStr)
        window.sessionStorage.setItem('user_id', user_id)
        this.props.getUserInfoPort(tokenStr, user_id)
      }
    }
  }
  relationUser(data, token, user_id){
    let _this = this
    console.log("data：" + data)
    console.log("token：" + token)
    console.log("user_id：" + user_id)
    axios.post(
      serverIp + '/dianzanbao/userInfo/relationUser.do',             
      data,
      {
        headers: {
          token: token,
          user_id: user_id
        }
      }
      ).then(response =>{
        if(response.data.result_code === '0'){
          Toast.info( response.data.result_info, 1)
          _this.setState({
            goRender: true
          })
        }
    }).catch(function (error) {
      console.log(error);
    });
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render(){
    const url = this.props.match.url
    return (
      <div id = 'main'>
        <section>
          {this.state.goRender === true ? <RouteConfig />: null}
        </section>
        {this.state.goRender === true ? <Footer />: null}    
      </div>
    )
  }
}
Main = connect(
  state => ({
    userInfo : state.getUserInfo
  }),
  { getUserInfoPort }
)(Main)
export default Main
