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
    let codeString = window.location.href.split("&")[0].split("=")[1];
    let _this = this
    alert(codeString)
    if(codeString !== undefined){
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
        }else{
          alert('没进来')
          alert(res.data.result_info)
        }
      })
    }else{
      let tokenStr = '9539'
      let user_id = '652159'
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
