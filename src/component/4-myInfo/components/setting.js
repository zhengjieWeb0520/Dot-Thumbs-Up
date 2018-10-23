import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Picker } from 'antd-mobile'
import { districtData, sex, ages } from '../settingPickerData/data'
import defaultUserAvatar from '../../../images/myInfo/userImage.png'
import TopNavBar from './topNavBar'

class Setting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sexValue: '',
			regionValue: ''
		}
	}

	render() {
		let data = Object.keys(this.props.userInfoData).length === 0 ? false : this.props.userInfoData.user_info
		//地区拼接
		let location = data ? data.province + ',' + data.city + ',' + data.area : ''
		//头像（没有头像时，加载默认头像）
    let userAvatar = data ? (data.user_head ? data.user_head : defaultUserAvatar) : ''
		return (
			<div className="setting">
				<TopNavBar title="设置" />
				<div className="avatarBox item">
					<div className="title">头像</div>
					<div className="content">
            <img src={userAvatar} alt="" id="showAvatar" />
					</div>
				</div>

				<div className="inputs">
					<List>
						<div className="nickName item">
							<div className="title">昵称</div>
							<div className="content">{data.user_nick_name}</div>
						</div>
						<div className="realName item">
							<div className="title">真实姓名</div>
							<div className="content">{data.user_name}</div>
						</div>
						<div className="realName item">
							<div className="title">性别</div>
							<div className="content">{data.sex === 0 ? '男' : data.sex === 1 ? '女' : ''}</div>
						</div>
						<div className="phone item">
							<div className="title">电话</div>
							<div className="content">{data.user_phone}</div>
						</div>
						<div className="area item">
							<div className="title">地区</div>
							<div className="content">{location}</div>
						</div>
					</List>
				</div>
			</div>
		)
	}
}

Setting = connect(
	state => state.userInfo,
	{}
)(Setting)

export default Setting
