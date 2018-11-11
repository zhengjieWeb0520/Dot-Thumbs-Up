import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { List, Picker, Modal, DatePicker, ImagePicker } from 'antd-mobile'
import { districtData, sex, ages } from './settingPickerData/data'
import TopNavBar from '../4-myInfo/components/topNavBar'
import { uploadSingleImg, serverIp } from '../../utils/utils'

const prompt = Modal.prompt

class MechantModify extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
			sexValue: [],
			ageValue: [],
			regionValue: ['110000', '110000', '110101'],
			files: []
		}
	}
	onPickerOk = (type, value) => {
		console.log(value)
		this.setState(
			{
				[type]: value
			},
			() => {
				console.log(this.state)
				if (type === 'ageValue') {
					//年龄只显示岁数，不显示区间
					let ageContanier = document.querySelector('.agePick .am-list-extra')
					ageContanier.innerText = ageContanier.innerText.split(',')[1]
				}
			}
		)
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
			_this.merchantAvatar = imgUrl
		})
	}

	//输入弹出框
	modalPrompt(type, key) {
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
							this.setState({
								[key]: value
							})
							resolve()
						})
				}
			],
			'default',
			null,
			[`请输入${type}`]
		)
	}

	//商家详情图片上传
	onImgChange = (files, type, index) => {
		let _this = this
		this.setState(
			{
				files
			},
			() => {
				let fileData = this.state.files.length > 0 ? this.state.files[this.state.files.length - 1] : {}
				// console.log(files)
				// console.log(type)
				console.log(index)
				console.log(fileData)
				if (type === 'add') {
					let data = new FormData()
					data.append('image_file', fileData.file)
					console.log(data)
					axios
						.post(serverIp + '/dianzanbao/sys/file/saveImg.do', data, {
							headers: {
								token: window.sessionStorage.getItem('token'),
								user_id: window.sessionStorage.getItem('user_id')
								//'Content-Type': 'multipart/form-data'
							}
						})
						.then(res => {
							console.log(res)
							if (res.data.result_code === '0') {
								_this.uploadFiles.push(res.data.result_info)
							}
						})
				} else if (type === 'remove') {
					this.uploadFiles.splice(index, 1)
				}
			}
		)
	}

	render() {
    console.log(this.props)
		//格式化省市区
		let antdDistrict = []
		Object.keys(districtData).forEach(index => {
			let itemLevel1 = {}
			let itemLevel2 = {}
			itemLevel1.value = districtData[index].code
			itemLevel1.label = districtData[index].name
			itemLevel1.children = []
			let data = districtData[index].cities
			Object.keys(data).forEach(index => {
				itemLevel2.value = data[index].code
				itemLevel2.label = data[index].name
				itemLevel2.children = []
				let data2 = data[index].districts
				let itemLevel3 = {}
				itemLevel3.children = []
				Object.keys(data2).forEach(index => {
					itemLevel3.value = index
					itemLevel3.label = data2[index]
					itemLevel2.children.push(itemLevel3)
					itemLevel3 = {}
				})
				itemLevel1.children.push(itemLevel2)
				itemLevel2 = {}
			})
			antdDistrict.push(itemLevel1)
		})
		return (
			<div className="setting" id="merchantSetting">
				<TopNavBar title="设置" />
				<form name="merchantSetting">
					<div className="avatarBox item">
						<div className="title">头像</div>
						<div className="content">
							<img src={require('../../images/myInfo/icon_jianshe.png')} alt="" id="showAvatar" />
						</div>
						<span className="icon iconfont icon-jiantou1" />
						<input type="file" id="avatarUpload" name="merchantAvatar" onChange={() => this.onAvatarChange()} />
					</div>

					<div className="inputs">
						<List>
							<div className="nickName item" onClick={this.modalPrompt.bind(this, '昵称', 'user_nick_name')}>
								<div className="title">昵称</div>
								<div className="content">用户昵称</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
							<div className="realName item">
								<div className="title">真实姓名</div>
								<div className="content">真实名称</div>
							</div>
							<div className="phone item">
								<div className="title">性别</div>
								<div className="content">男</div>
							</div>
							<div className="phone item" onClick={this.modalPrompt.bind(this, '邮箱', 'user_mail')}>
								<div className="title">邮箱</div>
								<div className="content">1111@qq.com</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
							<div className="longitude item" onClick={this.modalPrompt.bind(this, '经度', 'x_longitude')}>
								<div className="title">经度</div>
								<div className="content">22.22</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
							<div className="dimension item" onClick={this.modalPrompt.bind(this, '纬度', 'y_dimension')}>
								<div className="title">纬度</div>
								<div className="content">11.11</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
							<div className="phone item">
								<div className="title">电话</div>
								<div className="content">18655050862</div>
							</div>
							<Picker
								title="选择地区"
								extra="请选择"
								data={antdDistrict}
								value={this.state.regionValue}
								onOk={v => this.onPickerOk('regionValue', v)}
							>
								<List.Item arrow="horizontal" onClick={this.onClick}>
									<span className="justifyItem">地区</span>
								</List.Item>
							</Picker>
							<div className="address item" onClick={this.modalPrompt.bind(this, '详细地址', 'user_address')}>
								<div className="title">详细地址</div>
								<div className="content">长白街12号</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
							<div className="timePick">
								<DatePicker
									mode="time"
									minuteStep={2}
									use12Hours
									title="开始营业时间"
									onChange={time => this.handleChange('startTime', time)}
									extra="开始营业时间"
								>
									<List.Item arrow="horizontal" />
								</DatePicker>
								<DatePicker
									mode="time"
									minuteStep={2}
									use12Hours
									// value={this.state.endTime}
									title="结束营业时间"
									onChange={time => this.handleChange('endTime', time)}
									extra="结束营业时间"
								>
									<List.Item arrow="horizontal" />
								</DatePicker>
							</div>
							<div className="imagePick">
								<div className="imagePickTitle">商家详情图片：</div>
								<ImagePicker
									files={this.state.files}
									onChange={this.onImgChange}
									onImageClick={(index, fs) => console.log(index, fs)}
									selectable={this.state.files.length < 3}
									accept="image/gif,image/jpeg,image/jpg,image/png"
								/>
							</div>
						</List>
					</div>
				</form>
			</div>
		)
	}
}

MechantModify = connect(
	state => state.userInfo,
	{}
)(MechantModify)

export default MechantModify
