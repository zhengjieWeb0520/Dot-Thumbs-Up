import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
//引入异步加载组件
import asyncComponent from './../../asyncComponent'
//引入自定义组件

const Activity = asyncComponent(()=>{return import('./../1-activity/activity')})
const Participate = asyncComponent(()=>{return import('./../2-participate/participate')})
const Comment = asyncComponent(()=>{return import('./../2-participate/component/comment')})
const MyInfo = asyncComponent(()=>{return import('./../4-myInfo/myInfo')})

class RouteConfig extends Component {
	render() {
		const url = this.props.match.url
		return (
			<Switch>
				<Route path={`${url}`} exact component={Activity} />
				<Route path={`${url}/participate`} exact component={Participate} />
        <Route path={`${url}/participate/comment`} component={Comment} />
				<Route path={`${url}/myInfo`} component={MyInfo} />
			</Switch>
		)
	}
}
export default withRouter(RouteConfig)
