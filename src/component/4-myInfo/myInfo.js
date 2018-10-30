import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import MyInfoMain from './components/myInfoMain'
import { getUserInfo } from '../../redux/4-myinfo/getUserInfoRedux'
import './myInfo.scss'

//我的组件
class MyInfo extends React.Component {
	componentWillMount() {
		this.props.getUserInfo()
	}

	render() {
		const url = this.props.match.url
		return (
			<div className="myContainer">
				<Switch>
					<Route path={`${url}`} exact component={MyInfoMain} />
				</Switch>
			</div>
		)
	}
}

MyInfo = connect(
	null,
	{ getUserInfo }
)(MyInfo)

export default MyInfo
