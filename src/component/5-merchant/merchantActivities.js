import React from 'react'
import BScroll from 'better-scroll'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './merchant.scss'
import axios from 'axios'
import qs from 'qs'
import $ from 'zepto'
import { Carousel, WingBlank, Button, Modal, Toast } from 'antd-mobile'
import { ObjectEquals, createStarLevel, serverIp } from './../../utils/utils'
import { mechantLevel, goldConfig } from './../config'
import { getMerchantActivity } from './../../redux/5-merchant/merchantRedux'

const alert = Modal.alert

class MerchantActivities extends React.Component {
	constructor(props) {
		super(props)
		this.count = 2
		this.state = {
			userImages: [], //商家图片信息
			userName: '', //商家名称
			user_id: '', //商家ID
			business_level: '', //商家等级
			star_level: '', //商家星级
			merchantActive: [] //商家发布的活动
		}
	}
	componentWillMount() {
		let merchantCache = window.sessionStorage.getItem('merchantActive')
		if (this.props.userInfo.userInfo) {
			this.setState(
				{
					user_id: this.props.userInfo.userInfo.user_info.user_id,
					userImages: this.props.userInfo.userInfo.img_data.imgs,
					userName: this.props.userInfo.userInfo.user_info.user_name,
					business_level: this.props.userInfo.userInfo.user_info.business_level,
					star_level: this.props.userInfo.userInfo.user_info.star_level
				},
				() => {
					if (merchantCache !== null) {
						this.setState({
							merchantActive: JSON.parse(merchantCache)
						})
					} else {
						let data = {
							pageNo: 1,
							pageSize: 5
						}
						this.getFirstPageData('first')
					}
				}
			)
		} else {
			this.props.history.push('/index')
		}
	}
	//请求第一页数据（页面刚加载和下拉刷新）
	getFirstPageData(type, fn) {
		let data = {
			pageNo: '1',
			pageSize: '5'
		}
		if (type === 'first') {
			this.props.getMerchantActivity(data)
		} else {
			this.props.getMerchantActivity(data, fn)
		}
	}
	//上拉加载
	pullUpLoadData(fn) {
		let data = {
			pageNo: '1',
			pageSize: String(5 * this.count)
		}
		this.props.getMerchantActivity(data, fn)
	}

	componentDidMount() {
		let _this = this
		const wrapper = document.querySelector('.merchantContent')
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
						if (ObjectEquals(data.list, _this.state.merchantActive)) {
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

		//底部菜单点击
		let mechantBtnUl = document.querySelector('.mechantBtnUl')
		mechantBtnUl.addEventListener('click', function(e) {
			if (e.target.textContent === '修改资料') {
				_this.props.history.push('/publish/setting')
			} else if (e.target.textContent === '发布活动') {
				_this.props.history.push('/publish')
			}
		})

		let x, X
		$('.merchantContent .swipeAction').on('touchstart', 'li', function(e) {
			//记录初始触控点横坐标
			x = e.changedTouches[0].pageX
		})

		$('.merchantContent .swipeAction').on('touchmove', 'li', function(e) {
			//记录当前触控点横坐标
			X = e.changedTouches[0].pageX
			//判断是否展开，如果展开则收起
			if (_this.expansion) {
				_this.expansion.className = ''
			}

			if (x - X > 10) {
				// 左滑展开
				this.className = 'swipeleft'
				_this.expansion = this
			}

			if (X - x > 10) {
				//右滑收起
				this.className = ''
				_this.expansion = null
			}
		})

		$(window).on('touchstart', this.listRecovery)
	}
	//列表恢复
	listRecovery = () => {
		if (this.expansion) {
			this.expansion.className = ''
		}
	}
	componentWillUnmount() {
		$(window).off('touchstart', this.listRecovery)
	}
	componentWillReceiveProps(nextProps) {
		if (!ObjectEquals(nextProps.userInfo, {})) {
		}
		if (!ObjectEquals(nextProps.merchantInfo.merchantActiveList, {})) {
			this.setState(
				{
					merchantActive: nextProps.merchantInfo.merchantActiveList.list
				},
				() => {
					window.sessionStorage.setItem(
						'merchantActive',
						JSON.stringify(nextProps.merchantInfo.merchantActiveList.list)
					)
				}
			)
		}
	}
	editeActive = (e, activeId) => {
		let data = {
			id: activeId
		}
		let path = {
			pathname: '/editePublish',
			query: data
		}
		this.props.history.push(path)
	}
	//确定删除
	confirmDeleteActive = (e, activeId) => {
		alert('删除', '确定删除?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{ text: '确定', onPress: () => this.deleteActive(activeId) }
		])
	}
	//删除活动
	deleteActive = activeId => {
		let data = {
			id: activeId
		}
		axios
			.post(serverIp + '/dianzanbao/active/deleteActive.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					let data1 = {
						pageNo: 1,
						pageSize: 5
					}
					this.props.getMerchantActivity(data1)
				}
			})
	}
	pay = (e, val) => {}
	//创建活动内容
	createActiveContent() {
		let content = []
		if (!ObjectEquals(this.state.merchantActive, {})) {
			this.state.merchantActive.map((item, index) => {
				let activeStatus
				if (item.status === 0) {
					activeStatus = '进行中'
				} else if (item.status === 1) {
					activeStatus = '已结束'
				} else if (item.status === -1) {
					activeStatus = '待支付'
				}
				let column = null
				let data = {
					activeId: item.id,
					distance_format: item.distance_format,
					good_count: item.good_count,
					activeStatus: item.status
				}
				let path = {
					pathname: `/activityInfo`,
					query: data
				}
				let distribute_Content
				if (item.distribute_type === 0) {
					let bonus = item.bonus.split(',').reverse()
					distribute_Content = (
						<div>
							{this.createBonusItem(bonus)}
							<p>
								状态：
								{activeStatus}
							</p>
						</div>
					)
				} else if (item.distribute_type === 1) {
					distribute_Content = (
						<div>
							<div className="bonusequal" />
							<p>
								状态：
								{activeStatus}
							</p>
						</div>
					)
				} else if (item.distribute_type === -1) {
					//distribute_Content = <div><div className='bonusequal'></div><p>状态：<Button type={'primary'} onClick={(v, val)=>{this.pay(v, item.id)}}>待支付</Button></p></div>
				}
				column = (
					<li className="wrapper" key={`wrapper${index}`}>
						<Link to={path} className="merchantItem" key={item.id}>
							<div>
								<p>{item.name}</p>
								<p>
									{createStarLevel(item.star_level, 'orangeStar', 'grayStar')}
									<span>{`${item.star_level.toFixed(1)}分`}</span>
								</p>
								<p>
									<i />
									<span>{item.good_count}</span>
								</p>
								<p>
									发起时间：
									{item.start_date}
								</p>
							</div>
							{distribute_Content}
						</Link>
						<div className="operate">
							<Button
								type="primary"
								onTouchEnd={v => {
									this.editeActive(v, item.id)
								}}
							>
								编辑
							</Button>
							<Button
								type="warning"
								onTouchEnd={v => {
									this.confirmDeleteActive(v, item.id)
								}}
							>
								删除
							</Button>
						</div>
					</li>
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
			column = (
				<p key={index} className={`radiu_${index + 1}`}>
					<i />
					<span>
						{goldValue}:<span>¥{bonusValue}</span>
						<span className="rmb">RMB</span>
					</span>
				</p>
			)
			content.push(column)
		})
		return content
	}
	render() {
		return (
			<div id="merchantActivities" className="merchantActivities">
				<div className="merchantActivitiesContainer">
					<div className="merchantActivitiesContent">
						<div>
							<div className="carousel">
								<Carousel autoplay infinite className={'my-carousel'}>
									{this.state.userImages.map((item, index) => {
										return (
											<img
												key={index}
												src={item.img_url}
												alt=""
												style={{ width: '100%', verticalAlign: 'top' }}
												onLoad={() => {
													// fire window resize event to change height
													window.dispatchEvent(new Event('resize'))
													//this.setState({ imgHeight: 'auto' });
												}}
											/>
										)
									})}
								</Carousel>
							</div>
							<div>
								<Link to="/index" />
							</div>
						</div>
						<div>
							<div>
								<p>
									<span>{this.state.userName}</span>
									<span />
								</p>
								<p>
									{createStarLevel(this.state.star_level, 'orangeStar', 'grayStar')}
									<span>{this.state.star_level}分</span>
								</p>
							</div>
							<div>
								{mechantLevel.map((item, index) => {
									if (item.id === this.state.business_level) {
										return (
											<p key={index}>
												<i id="merchant" className={item.classValue} />
												<span>{item.value}</span>
											</p>
										)
									}
								})}
								<p />
							</div>
						</div>
					</div>
					<div className="merchantContent">
						<div className="merchantItemContent swipeAction wrapper">
							<div className="top-tip">
								<span className="refresh-hook">下拉刷新</span>
							</div>
							<ul>{this.createActiveContent()}</ul>
							<div className="bottom-tip">
								{JSON.stringify(this.state.merchantActive) ? (
									<span className="loading-hook">查看更多</span>
								) : (
									<span className="loading-hook">没有更多数据</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="mechantBtn">
					<ul className="mechantBtnUl">
						<li>修改资料</li>
						<li>发布活动</li>
					</ul>
				</div>
			</div>
		)
	}
}
MerchantActivities = connect(
	state => ({
		userInfo: state.getUserInfo,
		merchantInfo: state.merchantActivity
	}),
	{ getMerchantActivity }
)(MerchantActivities)
export default MerchantActivities
