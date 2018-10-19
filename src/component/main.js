import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from './../component/router/footer'
import RouteConfig from './../component/router/routers'
import { getUserInfoPort } from './../redux/1-activiy/getUserInfoRedux'

class Main extends React.Component{
  componentWillMount(){
    let tokenStr = '9539'
    let user_id = '652159'
    window.sessionStorage.setItem('token', tokenStr)
    window.sessionStorage.setItem('user_id', user_id)
    this.props.getUserInfoPort(tokenStr, user_id)
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }
  render(){
    const url = this.props.match.url
    return (
      <div id = 'main'>
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