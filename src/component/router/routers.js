import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

//引入自定义组件
import Activity from './../1-activity/activity'
import Participate from './../2-participate/participate'
import Comment from './../2-participate/component/comment'
import MyInfo from './../4-myInfo/myInfo'

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
