import React from 'react'
import BScroll from 'better-scroll'
import TopNavBar from './topNavBar'
import { Link } from 'react-router-dom'
import '../../1-activity/common.scss'

//活动列表
class ActiveList extends React.Component {
	componentDidMount() {
		const wrapper = document.querySelector('.wrapper')
		new BScroll(wrapper, { click: true })
	}
	render() {
		return (
			<div className="activityContent wrapper">
				<ul id="ActivityContent" className="ActivityContent content">
					<Link to="/activityInfo" className="activityItem">
						<div>
							<img src={require('./../../../images/activity/activities/item3.png')} alt="" />
						</div>
						<div>
							<p>商家名称</p>
							<p>活动名称活动名称</p>
							<p>
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="grayStar" />
								<span>4.0分</span>
							</p>
							<p>
								<span>
									<i />
									<span>4365</span>
								</span>
								<span>
									<span>433m</span>
								</span>
							</p>
						</div>
						<div>
							<p className="radiu_1">
								<i />
								<span>
									一等奖:
									<span>¥500</span>
									<span className="rmb">RMB</span>
								</span>
							</p>
							<p className="radiu_2">
								<i />
								<span>
									二等奖:
									<span>¥300</span>
									<span className="rmb">RMB</span>
								</span>
							</p>
							<p className="radiu_3">
								<i />
								<span>
									三等奖:
									<span>¥100</span>
									<span className="rmb">RMB</span>
								</span>
							</p>
						</div>
					</Link>
					<Link to="/activityInfo" className="activityItem">
						<div>
							<img src={require('./../../../images/activity/activities/item3.png')} alt="" />
						</div>
						<div>
							<p>商家名称</p>
							<p>活动名称活动名称</p>
							<p>
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="orangeStar" />
								<i className="grayStar" />
								<span>4.0分</span>
							</p>
							<p>
								<span>
									<i />
									<span>4365</span>
								</span>
								<span>
									<span>433m</span>
								</span>
							</p>
						</div>
						<div className="bonusequal" />
					</Link>
				</ul>
			</div>
		)
	}
}

//商家列表
class BusinessList extends React.Component {
	render() {
		return <div className="businessList">商家列表</div>
	}
}

class Collection extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 0
		}
	}
	componentDidMount() {
		let container = document.querySelector('.collection .topNav')
		let items = container.querySelectorAll('span')
		let _this = this
		container.addEventListener(
			'click',
			function(e) {
				for (let i = 0; i < items.length; i++) {
					items[i].classList.remove('select')
				}
				if (e.target.className.indexOf('active') !== -1) {
					_this.setState({
						index: 0
					})
				} else {
					_this.setState({
						index: 1
					})
				}
				e.target.classList.add('select')
			},
			false
		)
	}

	render() {
		return (
			<div className="collection">
				<TopNavBar title="收藏" />
				<div className="topNav">
					<span className="active select">活动</span>
					<span className="business">商家</span>
				</div>

				<div className="contentList">{this.state.index === 0 ? <ActiveList /> : <BusinessList />}</div>
			</div>
		)
	}
}

export default Collection
