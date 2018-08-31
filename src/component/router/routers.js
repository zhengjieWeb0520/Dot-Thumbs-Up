import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

//引入自定义组件
import Communicate from './../study/communicate'
import ReactReduxStudy from './../study/reactRedux'

class RouteConfig extends Component{
  render() {
    const url = this.props.match.url
    return(
      <Switch>
        <Route path={`${url}`} exact component={Communicate}></Route>
        <Route path={`${url}/reactRedux`} component={ReactReduxStudy}></Route>
      </Switch>
    )
  }
} 
export default withRouter(RouteConfig)