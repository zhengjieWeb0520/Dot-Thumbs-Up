import React from 'react'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import qs from 'qs'
import { getChildNode, ObjectEquals, createStarLevel, serverIp } from './../../../utils/utils'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Carousel, WingBlank, ActionSheet, Toast, Button } from 'antd-mobile'
import ActivityEvaluate from './activityInfo/activityEvaluate'
import ActivityInfoContent from './activityInfo/activityInfoContent'
import ActivityMerchant from './activityInfo/activityMerchant'
import { getActiveInfo, clearInfo } from './../../../redux/1-activiy/activeIndexRedux'
import { thumpsUpActive } from './../../../redux/1-activiy/activeThumbsUp'
import { getIsOrNotCollect, addCollection, removeCollection } from './../../../redux/4-myinfo/collectionRedux'
import { mechantLevel } from './../../config'
import { payActivity } from './../../payActive'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
	wrapProps = {
		onTouchStart: e => e.preventDefault()
	}
}

//活动详细信息
class ActivityInfo extends React.Component {
	constructor(props) {
    super(props)
    this.title = ''
		this.state = {
			imgHeight: 175,
			tabFlag: 0, //组件切换标识
			collectCondition: '', //收藏状态
			have_collection: null, //是否已收藏
			activeInfo: {}, //活动详情
			activeDetail: {
				merchantName: '', //商家名称
				merchantLevel: '', //商家等级
				activeName: '', //活动名称
				have_collection: '', //是否已收藏
				starLevel: '', //活动评分
				distance: '', //距离
				goodNum: '', //点赞数量
				startDate: '', //开始时间
				endDate: '', //结束时间
				activeDesc: '', //活动描述
				distributeType: null, //0 奖金  1代金券
				bonusType: null, //0排名，1平摊
				bonus: '', //奖金详情
				activeImg: [] //活动图片
			}
		}
	}
	componentWillMount() {
    if(window.location.href.indexOf("activeId") != -1){//从分享界面进入系统
      let params =window.location.href.split('?')[2]
      let activeIdParams = params.split('&')[0]
      let parentIdParams = params.split('&')[1]
      let goodCountParams = params.split('&')[2]
      let activeId = activeIdParams.split('=')[1]
      let parentId = parentIdParams.split('=')[1]
      let goodCount = goodCountParams.split('=')[1]
      // alert('活动id:'+activeId)
      // alert('父id：' + parentId)
      window.sessionStorage.setItem('activeId', activeId)
      window.sessionStorage.setItem('parentId', parentId)
      window.sessionStorage.setItem('goodCount', goodCount)
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2514283f85a9e278&redirect_uri=http%3a%2f%2fjizanbao.com%2fgetWxCode.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
    }else{//正常页面加载
      if (this.props.location.query == undefined) {
        //this.props.history.goBack()
        let selectedActive = JSON.parse(window.sessionStorage.getItem('selectedActive')) 
        this.props.getActiveInfo(selectedActive.activeId, 'active')
        this.props.getIsOrNotCollect('active', selectedActive.activeId)
      } else {
        console.log(this.props)
        let selectActiveInfo = {
          activeId: this.props.location.query.activeId,
          distance_format: this.props.location.query.distance_format,
          good_count: this.props.location.query.good_count
        }
        window.sessionStorage.setItem('selectedActive', JSON.stringify(selectActiveInfo))
        this.props.getActiveInfo(this.props.location.query.activeId, 'active')
        this.props.getIsOrNotCollect('active', this.props.location.query.activeId)
      }
    }
		let url = qs.stringify({
			url: window.location.href.split('#')[0]
		})
		let _this = this
		console.log(this.props)
		//初始化微信sdk
		axios.post(serverIp + '/dianzanbao/wechat/getConfig.do', url).then(res => {
			if (res.data.result_code === '0') {
        console.log(_this.title)
				wx.config({
					debug: false,
					appId: res.data.result_info.appid,
					timestamp: res.data.result_info.timestamp,
					nonceStr: res.data.result_info.noncestr,
					signature: res.data.result_info.signature,
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareWeibo', 'updateAppMessageShareData']
				})

				wx.ready(function() {
          let activeId = _this.props.location.query.activeId
          let parentUserId = window.sessionStorage.getItem('user_id')
          let good_count = _this.props.location.query.good_count
          let name = _this.props.location.query.name
          let dec = _this.props.location.query.dec
          let activeImg = _this.props.location.query.activeImg
          console.log(name)
					wx.updateAppMessageShareData({
						title: name, // 分享标题
						desc: dec, // 分享描述
            link: window.location.href.split('#')[0] + `#/activityInfo?activeId=${activeId}&parentUserId=${parentUserId}&good_count=${good_count}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: activeImg // 分享图标
					})
				})
			}
		})
	}

	componentDidMount() {
		let _this = this
		let menuListUl = document.querySelector('.tabSwitch ul')
		let menuListLis = getChildNode(menuListUl)
		//点击活动切换
		menuListUl.addEventListener('click', function(e) {
			menuListLis.forEach((item, index) => {
				item.classList.remove('tabActive')
			})
			if (e.target.tagName === 'SPAN') {
				e.target.parentNode.classList.add('tabActive')
			} else {
				e.target.classList.add('tabActive')
			}
			if (e.target.textContent === '活动') {
				_this.setState({
					tabFlag: 0
				})
			} else if (e.target.textContent === '评价') {
				_this.setState({
					tabFlag: 1
				})
			} else if (e.target.textContent === '商家') {
				_this.setState({
					tabFlag: 2
				})
			}
		})

		let navListUl = document.querySelector('.activityInfoFooter ul')
		let navListLis = getChildNode(navListUl)
		//点击底部切换样式
		navListUl.addEventListener(
			'click',
			function(e) {
				navListLis.forEach((item, index) => {
					item.classList.remove('pointActive')
				})
				if (e.target.tagName === 'LI') {
					//e.target.classList.add('pointActive')
					if (e.target.textContent === '我要点赞') {
						_this.props.thumpsUpActive(_this.props.location.query.activeId)
						//e.target.firstChild.classList.add('willpointActive')
					} else if (e.target.textContent === '已点赞') {
						//e.target.firstChild.classList.add('mypointActive')
						_this.props.history.push('/index/participate')
					}
				}
				if (e.target.tagName === 'I' || e.target.tagName === 'SPAN') {
					//e.target.parentNode.classList.add('pointActive')
					if (e.target.parentNode.textContent === '我要点赞') {
						_this.props.thumpsUpActive(_this.props.location.query.activeId)
						//e.target.parentNode.firstChild.classList.add('willpointActive')
					} else if (e.target.parentNode.textContent === '已点赞') {
						//e.target.parentNode.firstChild.classList.add('mypointActive')
					}
				}
			},
			false
		)
	}
	switchContent() {
		switch (this.state.tabFlag) {
			case 0:
				return this.props.location.query !== undefined ? (
					<ActivityInfoContent activeId={this.props.location.query.activeId} activeDetail={this.state.activeDetail} />
				) : <ActivityInfoContent activeId={JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId} activeDetail={this.state.activeDetail} />
				break
			case 1:
				return this.props.location.query !== undefined ? (
					<ActivityEvaluate activeId={this.props.location.query.activeId} />
				) : <ActivityEvaluate activeId={JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId} />
				break
			case 2:
				return <ActivityMerchant merchantInfo={this.state.activeInfo.business_info} />
				break
			default:
				return null
				break
		}
	}
	//收藏
	collectClick(e) {
		let _this = this
		if (this.state.have_collection === false) {
			this.props.addCollection('active', this.props.location.query.activeId)
			e.target.classList.remove('uncollection')
			e.target.classList.add('collection')
			// _this.setState({
			//   collectCondition: '已收藏'
			// },()=>{
			//   setTimeout(() => {
			//     collectDom.style.display = 'none'
			//   }, 1500);
			// })
		} else if (this.state.have_collection === true) {
			this.props.removeCollection('active', this.props.location.query.activeId)
			e.target.classList.remove('collection')
			e.target.classList.add('uncollection')
			// _this.setState({
			//   collectCondition: '已取消'
			// },()=>{
			//   setTimeout(() => {
			//     collectDom.style.display = 'none'
			//   }, 1500);
			// })
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!ObjectEquals(nextProps.activeInfo.activeInfo, this.props.activeInfo.activeInfo)) {
      console.log(nextProps)
      this.title = nextProps.activeInfo.activeInfo.name
      let selectActiveInfo = JSON.parse(window.sessionStorage.getItem('selectedActive'))
			this.setState({
				activeInfo: nextProps.activeInfo.activeInfo,
				activeDetail: {
					merchantName: nextProps.activeInfo.activeInfo.business_info.user_info.user_nick_name, //商家名称
					merchantLevel: nextProps.activeInfo.activeInfo.business_info.user_info.business_level,
					activeName: nextProps.activeInfo.activeInfo.name, //活动名称
					have_collection: nextProps.activeInfo.activeInfo.have_collection, //是否已收藏
					starLevel: nextProps.activeInfo.activeInfo.star_level, //活动评分
					distance: selectActiveInfo.distance_format, //距离
					goodNum: selectActiveInfo.good_count, //点赞数量
					startDate: nextProps.activeInfo.activeInfo.start_date, //开始时间
					endDate: nextProps.activeInfo.activeInfo.end_date, //结束时间
					activeDesc: nextProps.activeInfo.activeInfo.desc, //活动描述
					distributeType: nextProps.activeInfo.activeInfo.distribute_type, //0 奖金  1代金券
					bonusType: nextProps.activeInfo.activeInfo.bonus_type, //0排名，1平摊
					bonus: nextProps.activeInfo.activeInfo.bonus, //奖金详情
					activeImg: nextProps.activeInfo.activeInfo.detail_images
				}
			})
		}
		if (nextProps.collection.have_collection != this.props.collection.have_collection) {
			this.setState({
				have_collection: nextProps.collection.have_collection
			})
		}
		if (nextProps.collection.collect_info != this.props.collection.collect_info) {
			if (nextProps.collection.collect_info === '已收藏') {
				this.setState(
					{
						have_collection: true
					},
					() => {
						this.changeCollectionStyle(nextProps.collection.collect_info)
					}
				)
			} else if (nextProps.collection.collect_info === '已取消') {
				this.setState(
					{
						have_collection: false
					},
					() => {
						this.changeCollectionStyle(nextProps.collection.collect_info)
					}
				)
			}
		}
	}
	//收藏取消样式
	changeCollectionStyle(collect_info) {
		let collectDom = document.querySelector('.collectionCondition')
		collectDom.style.display = 'inline-block'
		this.setState(
			{
				collectCondition: collect_info
			},
			() => {
				setTimeout(() => {
					collectDom.style.display = 'none'
				}, 1500)
			}
		)
	}
	componentWillUnmount() {
		this.props.clearInfo()
	}

	//微信分享
	// showActionSheet = () => {
	// 	const BUTTONS = ['微信好友', '微信朋友圈', '取消']
	// 	ActionSheet.showActionSheetWithOptions(
	// 		{
	// 			options: BUTTONS,
	// 			cancelButtonIndex: BUTTONS.length - 1,
	// 			destructiveButtonIndex: BUTTONS.length - 2,
	// 			// title: 'title',
	// 			message: '分享到',
	// 			maskClosable: true,
	// 			'data-seed': 'logId',
	// 			wrapProps
	// 		},
	// 		buttonIndex => {
	// 			// this.setState({ clicked: BUTTONS[buttonIndex] })
	// 			let link = window.location.href.split('#')[0]
	// 			wx.ready(function() {
	// 				if (buttonIndex === 0) {
	// 					setTimeout(() => {
	// 						wx.updateAppMessageShareData({
	// 							title: '点赞宝', // 分享标题
	// 							desc: '点赞宝', // 分享描述
	// 							link: 'https://jizanbao.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	// 							imgUrl: require('../../../images/myInfo/icon_bulb@3x.png'), // 分享图标
	// 							success: function() {
	// 								Toast.info('分享成功', 1)
	// 							},
	// 							fail: function(res) {
	// 								Toast.info('分享失败', 1)
	// 							},
	// 							complete: function() {
	// 								Toast.info('分享完成', 1)
	// 							}
	// 						})
	// 					}, 0)
	// 				} else if (buttonIndex === 1) {
	// 					wx.onMenuShareAppMessage({
	// 						title: 'aa', // 分享标题
	// 						desc: 'aa',
	// 						link: 'https://jizanbao.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	// 						imgUrl: require('../../../images/myInfo/icon_bulb@3x.png'), // 分享图标
	// 						success: function() {
	// 							Toast.info('分享成功', 1)
	// 						},
	// 						fail: function(res) {
	// 							Toast.info('分享失败', 1)
	// 						}
	// 					})
	// 				}
	// 				wx.error(function(res) {
	// 					console.log(res)
	// 				})
	// 			})
	// 		}
	// 	)
	// }
  goback =()=>{
    this.props.history.goBack()
  }
  pay = (e, val) => {
    console.log(e)
    console.log(val)
    payActivity(val)
  }
	render() {
    console.log(this.props.location.query)
		return (
			<div id="ActivityInfo" className="activityInfo">
				<div className="activityInfoContainer">
					<div>
						<div className="carousel">
							{/* 轮播图 */}
							<Carousel autoplay infinite className={'my-carousel'}>
								{this.state.activeDetail.activeImg.map((item, index) => {
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
							<a onClick={this.goback}></a>
              <span />
							<span className="collectionCondition">{this.state.collectCondition}</span>
							{this.state.have_collection === false && this.state.have_collection !== null ?
                (<i className='collectIcon uncollection' onTouchEnd = {(v) => {this.collectClick(v)}}></i>):
                (<i className='collectIcon collection' onTouchEnd = {(v) => {this.collectClick(v)}}></i>)
              }
              {/* <i className='share'></i> */}
							{/* <i
								className="uncollection"
								onTouchEnd={v => {
									this.collectClick(v)
								}}
							/> */}
							{/* <i className="share" onClick={this.showActionSheet.bind(this)} /> */}
						</div>
					</div>
					<div>
						<div>
							<p>
								<span>{this.state.activeDetail.merchantName}</span>
								<span>({this.state.activeDetail.activeName})</span>
							</p>
							<p>
								{createStarLevel(this.state.activeDetail.starLevel, 'orangeStar', 'grayStar')}
								<span>{this.state.activeDetail.starLevel}分</span>
								<span>
									距离你
									{this.state.activeDetail.distance}
								</span>
							</p>
						</div>
            {
              this.props.location.query !== undefined && this.props.location.query.activeStatus === -1 ?
              <div className="willPay"><Button type={'primary'} onClick={(v, val)=>{this.pay(v, this.props.location.query.activeId)}}>待支付</Button></div> : null
            }
						<div>
							{mechantLevel.map((item, index) => {
								if (item.id === this.state.activeDetail.merchantLevel) {
									return (
										<p key={index}>
											<i id="merchant" className={item.classValue} />
											<span>{item.value}</span>
										</p>
									)
								}
							})}
							<p>
								<i id="merchant" />
								<span>{this.state.activeDetail.goodNum}</span>
							</p>
						</div>
					</div>
					<div className="tabSwitch">
						<ul>
							<li className="tabActive">
								<span>活动</span>
							</li>
							<li>
								<span>评价</span>
							</li>
							<li>
								<span>商家</span>
							</li>
						</ul>
					</div>
					{this.switchContent()}
				</div>
				<div className="activityInfoFooter">
					<ul>
						<li>
							<i />
							<span>我要点赞</span>
						</li>
						<li>
							<i />
							<span>已点赞</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

ActivityInfo = connect(
	state => ({
		activeInfo: state.getIndustryInfo,
		collection: state.collection
	}),
	{ getActiveInfo, clearInfo, getIsOrNotCollect, addCollection, removeCollection, thumpsUpActive }
)(ActivityInfo)
export default withRouter(ActivityInfo)
