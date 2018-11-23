import React from 'react'
import { Link } from 'react-router-dom'
import { List, Picker } from 'antd-mobile'
import { districtData, sex, ages } from '../settingPickerData/data'
import TopNavBar from './topNavBar'

class Setting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: null,
			sexValue: [],
			ageValue: [],
      regionValue: ["110000", "110000", "110101"]
		}
	}
	onPickerOk = (type, value) => {
		this.setState(
			{
				[type]: value
			},
			() => {
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
	}

	render() {
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
			<div className="setting">
				<TopNavBar title="设置" />
				<div className="avatarBox item">
					<div className="title">头像</div>
					<div className="content">
						<img src={require('../../../images/myInfo/icon_jianshe.png')} alt="" id="showAvatar" />
					</div>
					<span className="icon iconfont icon-jiantou1" />
					<input type="file" id="avatarUpload" onChange={() => this.onAvatarChange()} />
				</div>

				<div className="inputs">
					<List>
						<Link to="/setting/nickName">
							<div className="nickName item">
								<div className="title">昵称</div>
								<div className="content">用户昵称</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
						</Link>
						<Link to="/setting/realName">
							<div className="realName item">
								<div className="title">真实姓名</div>
								<div className="content">真实名称</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
						</Link>
						<Picker
							title="选择性别"
							extra="请选择"
							data={sex}
							cols={1}
							value={this.state.sexValue}
							onOk={v => this.onPickerOk('sexValue', v)}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
								<span className="justifyItem">性别</span>
							</List.Item>
						</Picker>
						<div className="agePick">
							<Picker
								title="选择年龄"
								extra="请选择"
								data={ages}
								cols={2}
								value={this.state.ageValue}
								onOk={v => this.onPickerOk('ageValue', v)}
							>
								<List.Item arrow="horizontal" onClick={this.onClick}>
									<span className="justifyItem">年龄</span>
								</List.Item>
							</Picker>
						</div>
						<Link to="/setting/phone">
							<div className="phone item">
								<div className="title">电话</div>
								<div className="content">18655050862</div>
								<span className="icon iconfont icon-jiantou1" />
							</div>
						</Link>
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
					</List>
				</div>
			</div>
		)
	}
}

export default Setting
