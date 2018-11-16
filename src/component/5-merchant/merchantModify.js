import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { List, Picker, Modal, DatePicker, ImagePicker } from 'antd-mobile'
import { districtData, sex, ages } from './settingPickerData/data'
import TopNavBar from '../4-myInfo/components/topNavBar'
import { uploadSingleImg, serverIp, ObjectEquals, dataFormat } from '../../utils/utils'
import {
	modifyUserInfo,
	getUserInfoPort,
	addMerchentImg,
	removeMerchentImg
} from '../../redux/1-activiy/getUserInfoRedux'
import defaultUserAvatar from '../../images/myInfo/userImage.png'

const prompt = Modal.prompt

class MechantModify extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			files: [],
			userInfo: ''
		}
	}

	//地区选择
	onPickerOk = (type, value) => {
		this.props.modifyUserInfo('region', value, this.refreshUserInfo)
	}

	//头像上传input Change事件
	onAvatarChange = () => {
		const avatarUpload = document.getElementById('avatarUpload')
		const showAvatar = document.getElementById('showAvatar')
		const imgUrl = window.URL.createObjectURL(avatarUpload.files.item(0))
		showAvatar.src = imgUrl
		let merchantSetting = document.forms['merchantSetting'].merchantAvatar.files[0]
		let _this = this

		uploadSingleImg(axios, merchantSetting, function(imgUrl) {
			_this.props.modifyUserInfo('user_head', imgUrl, _this.refreshUserInfo)
		})
	}

	//刷新个人信息
	refreshUserInfo = () => {
		let tokenStr = '9539'
		let user_id = '652159'
		window.sessionStorage.setItem('token', tokenStr)
		window.sessionStorage.setItem('user_id', user_id)
		this.props.getUserInfoPort(tokenStr, user_id)
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

	//修改营业时间
	timeChange(type, time) {
		let Hour = time.getHours()
		let Minutes = time.getMinutes()
		let workTime =
			this.state.userInfo.user_info.work_time !== '' ? this.state.userInfo.user_info.work_time.split('-') : ''
		let Time

		if (type === 'startTime') {
			let otherSideTime = workTime !== '' ? workTime[1] : ''
			Time = Hour + ':' + Minutes + '-' + otherSideTime
			this.props.modifyUserInfo('work_time', Time, this.refreshUserInfo)
		} else {
			let otherSideTime = workTime !== '' ? workTime[0] : ''
			Time = otherSideTime + '-' + Hour + ':' + Minutes
			this.props.modifyUserInfo('work_time', Time, this.refreshUserInfo)
		}
	}

	//商家详情图片上传
	onImgChange = (files, type, index) => {
		let _this = this
		if (type === 'add') {
			uploadSingleImg(axios, files[files.length - 1].file, function(imgUrl) {
				_this.props.addMerchentImg(imgUrl, _this.refreshUserInfo)
			})
		} else if (type === 'remove') {
			let imgs = this.state.userInfo.img_data.imgs
			this.props.removeMerchentImg(imgs[index].id, _this.refreshUserInfo)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!ObjectEquals(nextProps.userInfo, this.props.userInfo)) {
			this.setState({
				userInfo: nextProps.userInfo
			})
		}
	}

	componentDidMount() {
		this.setState({
			userInfo: this.props.userInfo
		})
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

		let data = this.state.userInfo
		let userAvatar = data !== '' ? (data.user_info.user_head !== '' ? data.user_info.user_head : defaultUserAvatar) : ''
		let regionValue = data !== '' ? [data.user_info.province, data.user_info.city, data.user_info.area] : ''
		let workTime = data !== '' ? data.user_info.work_time : ''
		let now = dataFormat(new Date(), 'yyyy-MM-dd')
		let startTime = workTime !== '' ? new Date(now + ' ' + workTime.split('-')[0]) : ''
		let endTime = workTime !== '' ? new Date(now + ' ' + workTime.split('-')[1]) : ''
		let imgFiles = []
		if (data !== '') {
			data.img_data.imgs.forEach(item => {
				imgFiles.push({
					url: item.img_url,
					id: item.id
				})
			})
		}
		return (
			<div className="setting" id="merchantSetting">
				<TopNavBar title="设置" />
				{data !== '' ? (
					<form name="merchantSetting">
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
									<div className="content">{data.user_info.user_nick_name}</div>
									<span className="icon iconfont icon-jiantou1" />
								</div>
								<div className="realName item">
									<div className="title">真实姓名</div>
									<div className="content">{data.user_info.user_name}</div>
								</div>
								<div className="phone item">
									<div className="title">性别</div>
									<div className="content">{data.user_info.sex === 0 ? '男' : '女'}</div>
								</div>
								<div className="phone item" onClick={this.modalPrompt.bind(this, '邮箱', 'user_mail')}>
									<div className="title">邮箱</div>
									<div className="content">{data.user_info.user_mail}</div>
									<span className="icon iconfont icon-jiantou1" />
								</div>
								<div className="longitude item" onClick={this.modalPrompt.bind(this, '经度', 'x_longitude')}>
									<div className="title">经度</div>
									<div className="content">{data.user_info.x_longitude}</div>
									<span className="icon iconfont icon-jiantou1" />
								</div>
								<div className="dimension item" onClick={this.modalPrompt.bind(this, '纬度', 'y_dimension')}>
									<div className="title">纬度</div>
									<div className="content">{data.user_info.y_dimension}</div>
									<span className="icon iconfont icon-jiantou1" />
								</div>
								<div className="phone item">
									<div className="title">电话</div>
									<div className="content">{data.user_info.fix_phone}</div>
								</div>
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
								<div className="address item" onClick={this.modalPrompt.bind(this, '详细地址', 'user_address')}>
									<div className="title">详细地址</div>
									<div className="content">{data.user_info.user_address}</div>
									<span className="icon iconfont icon-jiantou1" />
								</div>
								<div className="timePick">
									<div>
										<span>开始营业时间</span>
										<DatePicker
											mode="time"
											minuteStep={2}
											use12Hours={false}
											title="开始营业时间"
											onChange={time => this.timeChange('startTime', time)}
											extra="开始营业时间"
											value={startTime}
										>
											<List.Item arrow="horizontal" />
										</DatePicker>
									</div>
									<div>
										<span>结束营业时间</span>
										<DatePicker
											mode="time"
											minuteStep={2}
											use12Hours={false}
											title="结束营业时间"
											onChange={time => this.timeChange('endTime', time)}
											extra="结束营业时间"
											value={endTime}
										>
											<List.Item arrow="horizontal" />
										</DatePicker>
									</div>
								</div>
								<div className="imagePick">
									<div className="imagePickTitle">商家详情图片：</div>
									<ImagePicker
										files={imgFiles}
										onChange={this.onImgChange}
										onImageClick={(index, fs) => console.log(index, fs)}
										selectable={imgFiles.length < 4}
										accept="image/gif,image/jpeg,image/jpg,image/png"
									/>
								</div>
							</List>
						</div>
					</form>
				) : null}
			</div>
		)
	}
}

MechantModify = connect(
	state => state.getUserInfo,
	{ getUserInfoPort, modifyUserInfo, addMerchentImg, removeMerchentImg }
)(MechantModify)

export default MechantModify
