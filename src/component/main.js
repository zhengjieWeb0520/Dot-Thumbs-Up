import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from './../component/router/footer'
import RouteConfig from './../component/router/routers'
import { getUserInfoPort } from './../redux/1-activiy/getUserInfoRedux'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.TmapFlag = true //只获取一次
  }
  componentWillMount(){
    let tokenStr = '9539'
    let user_id = '652157'
    window.sessionStorage.setItem('token', tokenStr)
    window.sessionStorage.setItem('user_id', user_id)
    this.props.getUserInfoPort(tokenStr, user_id)
    // let _this = this
    // window.addEventListener('message', function(event) {
    //   // 接收位置信息
    //   _this.loc = event.data
    //   if(_this.loc != null){
    //     console.log(_this.loc)
    //     window.sessionStorage.setItem('user_lon', _this.loc.lng)
    //     window.sessionStorage.setItem('user_lat', _this.loc.lat)
    //     window.sessionStorage.setItem('user_addr', _this.loc.addr)
    //   }
    //  }, false);
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
