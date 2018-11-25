import React from 'react'
import './participaye.scss'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { goldConfig } from './../config'
import { Toast } from 'antd-mobile'
import { getChildNode, ObjectEquals, dataFormat } from './../../utils/utils'
import { getParticipateActivity, clearActive } from './../../redux/5-merchant/merchantRedux'

import ParticipateContent from './component/participateContent'
//参与组件
class Participate extends React.Component {
	constructor(props) {
		super(props)
		this.count = 2
		this.state = {
			paticipateActive: [],
			active_status: '0',
			user_status: ''
		}
	}
	componentWillMount() {
		this.getFirstPageData('first')
	}
	changeState(_this) {
		let data = {
			active_status: _this.state.active_status,
			user_status: _this.state.user_status,
			pageNo: '1',
			pageSize: '5'
		}
		_this.props.getParticipateActivity(data)
	}
	componentDidMount() {
		let _this = this
		let navListUl = document.querySelector('.participateTab ul')
		let navListLis = getChildNode(navListUl)
		//点击menu切换样式
		navListUl.addEventListener(
			'click',
			function(e) {
				navListLis.forEach((item, index) => {
					item.classList.remove('processingActive')
				})
				if (e.target.tagName === 'I' || e.target.tagName === 'P') {
					e.target.parentNode.classList.add('processingActive')
				} else {
					e.target.classList.add('processingActive')
				}
				if (e.target.textContent === '进行中' || e.target.parentNode.textContent === '进行中') {
					_this.setState(
						{
							active_status: '0',
							user_status: ''
						},
						() => {
							_this.changeState(_this)
						}
					)
				} else if (e.target.textContent === '已结束' || e.target.parentNode.textContent === '已结束') {
					_this.setState(
						{
							active_status: '1',
							user_status: ''
						},
						() => {
							_this.changeState(_this)
						}
					)
				} else if (e.target.textContent === '已中奖' || e.target.parentNode.textContent === '已中奖') {
					_this.setState(
						{
							active_status: '1',
							user_status: '1'
						},
						() => {
							_this.changeState(_this)
						}
					)
				} else if (e.target.textContent === '未中奖' || e.target.parentNode.textContent === '未中奖') {
					_this.setState(
						{
							active_status: '1',
							user_status: '0'
						},
						() => {
							_this.changeState(_this)
						}
					)
				} else if (e.target.textContent === '全部活动' || e.target.parentNode.textContent === '全部活动') {
					_this.setState(
						{
							active_status: '',
							user_status: ''
						},
						() => {
							_this.changeState(_this)
						}
					)
				}
			},
			false
		)

		const wrapper = document.querySelector('.participateWrapper')
		const topTip = wrapper.querySelector('.top-tip')
		const bottomTip = wrapper.querySelector('.bottom-tip')
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
			if (position.y > 40) {
				setTimeout(function() {
					_this.getFirstPageData('refresh', function() {
						// 恢复文本值
						topTip.innerText = '下拉刷新'
						// 刷新成功后的提示
						Toast.info('刷新成功', 1)
						_this.count = 2
					})
					// 刷新列表后,重新计算滚动区域高度
					_this.scroll.refresh()
				}, 1000)
			} else if (position.y < this.maxScrollY - 40) {
				bottomTip.innerText = '加载中...'
				setTimeout(function() {
					_this.pullUpLoadData(function(data) {
						if (ObjectEquals(data.list, _this.state.paticipateActive)) {
							// 恢复文本值
							bottomTip.innerText = '没有更多数据'
						} else {
							// 恢复文本值
							bottomTip.innerText = '查看更多'
							_this.count++
						}
					})
					// 加载更多后,重新计算滚动区域高度
					_this.scroll.refresh()
				}, 1000)
			}
		})
	}
	componentWillReceiveProps(nextProps) {
		if (
			!ObjectEquals(nextProps.paticipateInfo.participateActiveList, this.props.paticipateInfo.participateActiveList)
		) {
			this.setState({
				paticipateActive: nextProps.paticipateInfo.participateActiveList.list
			})
		}
	}
	//请求第一页数据（页面刚加载和下拉刷新）
	getFirstPageData(type, fn) {
		let data = {
			active_status: this.state.active_status,
			user_status: this.state.user_status,
			pageNo: '1',
			pageSize: '5'
		}
		if (type === 'first') {
			this.props.getParticipateActivity(data)
		} else {
			this.props.getParticipateActivity(data, fn)
		}
	}
	//上拉加载
	pullUpLoadData(fn) {
		let data = {
			active_status: this.state.active_status,
			user_status: this.state.user_status,
			pageNo: '1',
			pageSize: String(5 * this.count)
		}
		this.props.getParticipateActivity(data, fn)
	}

	//创建组件内容
	createParticipateContent() {
		let content = []
		if (JSON.stringify(this.state.paticipateActive) !== '[]') {
			this.state.paticipateActive.forEach((item, index) => {
				let column = null
				let data = {
					activeId: item.id,
					distance_format: item.distance_format,
					good_count: item.good_count
				}
				let path = {
					pathname: `/activityInfo`,
					query: data
				}
				let commentPath = {
					pathname: `/index/participate/comment`,
					query: {
						activeId: item.id
					}
				}
				let distribute_Content
				if (item.distribute_type === 0) {
					let bonus = item.bonus.split(',').reverse()
					distribute_Content = (
						<div>
							<i />
							{this.createBonusItem(bonus)}
						</div>
					)
				} else {
					distribute_Content = (
						<div>
							<i />
							<span>{`${item.bonus}   人人有份`}</span>
						</div>
					)
				}
				let user_status = item.user_status === 0 ? '未中奖' : '中奖'
				column = (
					<Link to={path} className="participateItem">
						<div className="participateItemHeader">
							<div>
								<span />
								<span>
									{item.business_name}
									<i />
								</span>
							</div>
							<div>{user_status}</div>
						</div>
						<div className="participateItemContent">
							<div>
								<span>{item.name}</span>
								<span>
									{item.start_date.substring(0, 13)}
									&nbsp;-&nbsp;
									{item.end_date.substring(0, 13)}
								</span>
							</div>
							<div>{item.desc}</div>
							{distribute_Content}
							<Link to={commentPath} className="toCommentBtn">
								评价
							</Link>
						</div>
					</Link>
				)
				content.push(column)
			})
			return content
		} else {
			return null
		}
	}
	//奖金模式
	createBonusItem(bonus) {
		let content = []
		bonus.forEach((item, index) => {
			let column
			let bonusValue = Number(item)
			let goldValue
			goldConfig.forEach((item2, index2) => {
				if (index === item2.id) {
					goldValue = item2.value
				}
			})
			column = <span key={index}>{`${goldValue}:${bonusValue}RMB`}</span>
			content.push(column)
		})
		return content
	}
	componentWillUnmount() {
		this.props.clearActive()
	}
	//组件切换
	render() {
		return (
			<div id="Participate">
				<div className="participateHeader">
					<div className="participateTitle">我&nbsp;的&nbsp;参&nbsp;与</div>
					<div className="participateTab">
						<ul>
							<li id="processing" className="processingActive">
								<i />
								<p>进行中</p>
							</li>
							<li id="haveover">
								<i />
								<p>已结束</p>
							</li>
							<li id="havewon">
								<i />
								<p>已中奖</p>
							</li>
							<li id="notwon">
								<i />
								<p>未中奖</p>
							</li>
							<li id="allType">
								<i />
								<p>全部活动</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="participateContent participateWrapper">
					<div id="ParticipateContent" className="ParticipateContent content">
						<div className="top-tip">
							<span className="refresh-hook">下拉刷新</span>
						</div>
						{this.createParticipateContent()}
						<div className="bottom-tip">
							<span className="loading-hook">查看更多</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Participate = connect(
	state => ({
		paticipateInfo: state.merchantActivity
	}),
	{ getParticipateActivity, clearActive }
)(Participate)

export default Participate
