import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { List, Picker, Modal } from 'antd-mobile'
import { getUserInfoPort, modifyUserInfo } from '../../../redux/1-activiy/getUserInfoRedux'
import { districtData, sex, ages } from '../settingPickerData/data'
import defaultUserAvatar from '../../../images/myInfo/userImage.png'
import { uploadSingleImg } from '../../../utils/utils'
import TopNavBar from './topNavBar'

const prompt = Modal.prompt

class Setting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sexValue: '',
			regionValue: ''
		}
	}

	//输入弹出框
	modalPrompt(type, key) {
		let _this = this
		prompt(
			type,
			`请输入${type}`,
			[
				{
					text: '关闭',
					onPress: value =>
						new Promise(resolve => {
							resolve()
						})
				},
				{
					text: '确定',
					onPress: value =>
						new Promise(resolve => {
							_this.props.modifyUserInfo(key, value, _this.refreshUserInfo)
							resolve()
						})
				}
			],
			'default',
			null,
			[`请输入${type}`]
		)
	}

	//刷新个人信息
	refreshUserInfo = () => {
		let tokenStr = window.sessionStorage.getItem('token')
		let user_id = window.sessionStorage.getItem('user_id')
		this.props.getUserInfoPort(tokenStr, user_id)
	}

	//头像上传input Change事件
	onAvatarChange = () => {
		const avatarUpload = document.getElementById('avatarUpload')
		const showAvatar = document.getElementById('showAvatar')
		const imgUrl = window.URL.createObjectURL(avatarUpload.files.item(0))
		showAvatar.src = imgUrl
		let userSetting = document.forms['UserSetting'].merchantAvatar.files[0]
		let _this = this

		uploadSingleImg(axios, userSetting, function(imgUrl) {
			_this.props.modifyUserInfo('user_head', imgUrl, _this.refreshUserInfo)
		})
	}

  //地区选择
  onPickerOk = (type, value) => {
    this.props.modifyUserInfo('region', value, this.refreshUserInfo)
  }

	render() {
		//格式化省市区
		let antdDistrict = []
		Object.keys(districtData).forEach(index => {
			let itemLevel1 = {}
			let itemLevel2 = {}
			itemLevel1.value = districtData[index].name
			itemLevel1.label = districtData[index].name
			itemLevel1.children = []
			let data = districtData[index].cities
			Object.keys(data).forEach(index => {
				itemLevel2.value = data[index].name
				itemLevel2.label = data[index].name
				itemLevel2.children = []
				let data2 = data[index].districts
				let itemLevel3 = {}
				itemLevel3.children = []
				Object.keys(data2).forEach(index => {
					itemLevel3.value = data2[index]
					itemLevel3.label = data2[index]
					itemLevel2.children.push(itemLevel3)
					itemLevel3 = {}
				})
				itemLevel1.children.push(itemLevel2)
				itemLevel2 = {}
			})
			antdDistrict.push(itemLevel1)
		})

		let data = Object.keys(this.props.userInfo).length === 0 ? false : this.props.userInfo.user_info
		//地区拼接
		let location = data ? data.province + ',' + data.city + ',' + data.area : ''
		let regionValue = data ? [data.province, data.city, data.area] : ''
		//头像（没有头像时，加载默认头像）
		let userAvatar = data ? (data.user_head ? data.user_head : defaultUserAvatar) : ''
		return (
			<div className="setting">
				<TopNavBar title="设置" />
				<form name="UserSetting">
					<div className="avatarBox item">
						<div className="title">头像</div>
						<div className="content">
							<img src={userAvatar} alt="" id="showAvatar" />
						</div>
						<span className="icon iconfont icon-jiantou1" />
						<input type="file" id="avatarUpload" name="merchantAvatar" onChange={() => this.onAvatarChange()} />
					</div>

					<div className="inputs">
						<List>
							<div className="nickName item" onClick={this.modalPrompt.bind(this, '昵称', 'user_nick_name')}>
								<div className="title">昵称</div>
								<div className="content">{data.user_nick_name}</div>
								<span className="icon iconfont icon-jiantou1" />
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
							{/* <div className="area item">
								<div className="title">地区</div>
								<div className="content">{location}</div>
							</div> */}
							<Picker
								title="选择地区"
								extra="请选择"
								data={antdDistrict}
								value={regionValue}
								onOk={v => this.onPickerOk('regionValue', v)}
							>
								<List.Item arrow="horizontal" onClick={this.onClick}>
									<span className="justifyItem">地区</span>
								</List.Item>
							</Picker>
						</List>
					</div>
				</form>
			</div>
		)
	}
}

Setting = connect(
	state => state.getUserInfo,
	{ getUserInfoPort, modifyUserInfo }
)(Setting)

export default Setting
