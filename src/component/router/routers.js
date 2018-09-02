import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

//引入自定义组件
import Activity from './../1-activity/activity'
import Participate from './../2-participate/participate'
import MyInfo from './../4-myInfo/myInfo'

class RouteConfig extends Component{
  render() {
    const url = this.props.match.url
    return(
      <Switch>
        <Route path={`${url}`} exact component={Activity}></Route>
        <Route path={`${url}/participate`} component={Participate}></Route>
        <Route path={`${url}/myInfo`} component={MyInfo}></Route>
      </Switch>
    )
  }
} 
export default withRouter(RouteConfig)