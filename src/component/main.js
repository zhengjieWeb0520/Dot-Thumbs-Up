import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import Footer from './../component/router/footer'
import RouteConfig from './../component/router/routers'
import { getUserInfoPort } from './../redux/1-activiy/getUserInfoRedux'
import { serverIp } from './../utils/utils'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.TmapFlag = true //只获取一次
  }
  componentWillMount(){
    let _this = this
    let hrefParams = window.location.href.split("?")[1]
    if(hrefParams.indexOf("token") != -1 ){
      let userString = hrefParams.split('&')[0].split('=')[1]
      let tokenString  = hrefParams.split('&')[1].split('=')[1]
      window.sessionStorage.setItem('token', tokenString)
      window.sessionStorage.setItem('user_id', userString)
      _this.props.getUserInfoPort(tokenString, userString)
    }else if(hrefParams.indexOf("code") != -1){
      let codeString = window.location.href.split("&")[0].split("=")[1];
      alert(codeString)
      let code = qs.stringify({
        code: codeString
      })
      alert(code)
      axios.post(serverIp + '/dianzanbao/user/weixinLogin.do', code).then(res => {
        if (res.data.result_code === '0') {
          alert('进来了')
          alert(res.data.result_info.user_id)
          let tokenStr = res.data.result_info.token
          let user_id = res.data.result_info.user_id
          window.sessionStorage.setItem('token', tokenStr)
          window.sessionStorage.setItem('user_id', user_id)
          _this.props.getUserInfoPort(tokenStr, user_id)
        }else if(res.data.result_code === '-1'){
          alert('没进来')
          alert(res.data.result_info)
          alert(res.data.err_msg)
          _this.props.history.push('login')
        }else{
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2514283f85a9e278&redirect_uri=http%3a%2f%2fjizanbao.com%2fgetWxCode.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
        }
      })
    }else{
      let tokenStr = '9539'
      let user_id = '652157'
      window.sessionStorage.setItem('token', tokenStr)
      window.sessionStorage.setItem('user_id', user_id)
      this.props.getUserInfoPort(tokenStr, user_id)
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render(){

    let iframeStyle = {
      width: '0',
      height: '0',
      frameBorder : '0',
      display: 'none',
      scrolling: 'no'
    }
    const url = this.props.match.url
    return (
      <div id = 'main'>
              {/* <iframe id="geoPage" style={iframeStyle}
          src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
        </iframe> */}
        <section>
          <RouteConfig />
        </section>
        <Footer />
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
