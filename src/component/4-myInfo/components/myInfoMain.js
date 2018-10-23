import React from 'react'
import { connect } from 'react-redux'
import defaultUserAvatar from '../../../images/myInfo/userImage.png'
import { Link } from 'react-router-dom'

class MyInfoMain extends React.Component {
	render() {
		const url = this.props.match.url
		let data = Object.keys(this.props.userInfoData).length === 0 ? false : this.props.userInfoData.user_info
		//头像（没有头像时，加载默认头像）
		let userAvatar = data ? (data.user_head ? data.user_head : defaultUserAvatar) : ''
		return (
			<div className="myInfoMain">
				<div className="userInfo">
					<div className="userAvatar">
						<div className="img">
							<img src={userAvatar} alt="" />
						</div>
						<p className="userName">用户名称</p>
					</div>
					<div className="userAction">
						<ul>
							<li className="collection">
								<Link to={`/collection`}>
									<span className="icon" />
									<p>收藏</p>
								</Link>
							</li>
							<li className="involve">
								<Link to={`/involve`}>
									<span className="icon" />
									<p>参与</p>
								</Link>
							</li>
							<li className="recentView">
								<Link to={`/recentView`}>
									<span className="icon" />
									<p>最近浏览</p>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="money_related">
					<ul>
						<li className="bankCard">
							<Link to={`/chooseBankCard`}>
								<span className="icon" />
								<p className="title">银行卡</p>
								<p className="count">1张</p>
							</Link>
						</li>
						<li className="wallet">
							<Link to={`/wallet`}>
								<span className="icon" />
								<p className="title">钱包</p>
								<p className="count">
									<b>¥</b>
									122.00
								</p>
							</Link>
						</li>
						<li className="voucher">
							<Link to={`/voucher`}>
								<span className="icon" />
								<p className="title">卡劵</p>
								<p className="count">6张</p>
							</Link>
						</li>
					</ul>
				</div>
				<div className="certification">
					<ul>
						<li>
							<Link to={`/bussinessAuthentication`}>
								商家认证
								<span className="icon iconfont icon-jiantou1" />
							</Link>
						</li>
						<li>
							<Link to={`/staffAuthentication`}>
								员工认证
								<span className="icon iconfont icon-jiantou1" />
							</Link>
						</li>
					</ul>
				</div>
				<div className="otherOperate">
					<ul>
						<li>
							<Link to={`/changePassword`}>
								修改密码
								<span className="icon iconfont icon-jiantou1" />
							</Link>
						</li>
						<li>
							<Link to={`/aboutUs`}>
								关于我们
								<span className="icon iconfont icon-jiantou1" />
							</Link>
						</li>
						<li>
							<Link to={`/userFeedBack`}>
								用户反馈
								<span className="icon iconfont icon-jiantou1" />
							</Link>
						</li>
					</ul>
				</div>
				<div className="signOut">退出登陆</div>
				<Link to={'/setting'}>
					<div className="setting">设置</div>
				</Link>
			</div>
		)
	}
}

MyInfoMain = connect(
	state => state.userInfo,
	{}
)(MyInfoMain)

export default MyInfoMain
