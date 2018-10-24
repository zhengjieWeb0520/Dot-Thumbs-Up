import React from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { Toast } from 'antd-mobile'
import TopNavBar from './topNavBar'
import { Link } from 'react-router-dom'
import { getCollectionActive } from '../../../redux/4-myinfo/collectionRedux'
import '../../1-activity/common.scss'

//评分亮星
function OrangeStar(props) {
	var res = []
	for (let i = 0; i < props.length; i++) {
		res.push(<i className="orangeStar" key={i} />)
	}
	return res
}

//评分灰星
function GaryStar(props) {
	var res = []
	for (let i = 0; i < props.length; i++) {
		res.push(<i className="grayStar" key={i} />)
	}
	return res
}

//活动列表
class ActiveList extends React.Component {
	componentWillMount() {
		let data = {
			pageNo: '1',
			pageSize: '5'
		}
		this.props.getCollectionActive(data)
	}

	componentDidMount() {
		const wrapper = document.querySelector('.wrapper')
		const topTip = wrapper.querySelector('.top-tip')
		const bottomTip = wrapper.querySelector('.bottom-tip')
		let _this = this
		this.scroll = new BScroll(wrapper, {
			click: true,
			probeType: 1,
			pullUpLoad: {
        stop: 50,
        threshold: 0
			}
		})

		//滑动监听
		this.scroll.on('scroll', function(pos) {
			if (pos.y > 30) {
				topTip.innerText = '释放立即刷新'
			}
		})

		// 滑动结束
		this.scroll.on('touchEnd', function(position) {
      _this.scroll.off('scroll', function() {})
			if (position.y > 30) {
        setTimeout(function () {
				let data = {
					pageNo: '1',
					pageSize: '5'
				}
				_this.props.getCollectionActive(data, function() {
					// 恢复文本值
					topTip.innerText = '下拉刷新'
					// 刷新成功后的提示
					Toast.info('刷新成功', 1)
				})
				// 刷新列表后,重新计算滚动区域高度
        _this.scroll.refresh()
      }, 1000)
			} else if (position.y < this.maxScrollY - 30) {
				bottomTip.innerText = '加载中...'
				setTimeout(function() {
					// 恢复文本值
					bottomTip.innerText = '查看更多'
					// 向列表添加数据

					// 加载更多后,重新计算滚动区域高度
					_this.scroll.refresh()
				}, 1000)
			}
		})
	}
	render() {
		let activeList = this.props.active
		return (
			<div className="activityContent wrapper">
				<div>
					<div className="top-tip">
						<span className="refresh-hook">下拉刷新</span>
					</div>
					<ul id="ActivityContent" className="ActivityContent content">
						{Object.keys(activeList).length !== 0
							? activeList.list.map(item => {
									return (
										<Link to="/activityInfo" className="activityItem" key={item.id}>
											<div>
												<img src={item.img_url} alt="" />
											</div>
											<div>
												<p>{item.name}</p>
												<p>{item.desc}</p>
												<p>
													<OrangeStar length={item.star_level} />
													<GaryStar length={5 - item.star_level} />
													<span>{item.star_level}分</span>
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
											{item.distribute_type === 0 ? (
												<div>
													<p className="radiuOne">
														<i />
														<span>
															一等奖:
															<span>¥{item.bonus.split(',')[2]}</span>
															<span className="rmb">RMB</span>
														</span>
													</p>
													<p className="radiuTwo">
														<i />
														<span>
															二等奖:
															<span>¥{item.bonus.split(',')[1]}</span>
															<span className="rmb">RMB</span>
														</span>
													</p>
													<p className="radiuThree">
														<i />
														<span>
															三等奖:
															<span>¥{item.bonus.split(',')[0]}</span>
															<span className="rmb">RMB</span>
														</span>
													</p>
												</div>
											) : (
												<div className="bonusequal" />
											)}
										</Link>
									)
							  })
							: null}

						{/* <Link to="/activityInfo" className="activityItem">
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
								<p className="radiuOne">
									<i />
									<span>
										一等奖:
										<span>¥500</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuTwo">
									<i />
									<span>
										二等奖:
										<span>¥300</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuThree">
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
							<div>
								<p className="radiuOne">
									<i />
									<span>
										一等奖:
										<span>¥500</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuTwo">
									<i />
									<span>
										二等奖:
										<span>¥300</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuThree">
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
							<div>
								<p className="radiuOne">
									<i />
									<span>
										一等奖:
										<span>¥500</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuTwo">
									<i />
									<span>
										二等奖:
										<span>¥300</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
								<p className="radiuThree">
									<i />
									<span>
										三等奖:
										<span>¥100</span>
										<span className="rmb">RMB</span>
									</span>
								</p>
							</div>
						</Link> */}
					</ul>
					<div className="bottom-tip">
						<span className="loading-hook">查看更多</span>
					</div>
				</div>
			</div>
		)
	}
}

ActiveList = connect(
	state => state.collection,
	{ getCollectionActive }
)(ActiveList)

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
