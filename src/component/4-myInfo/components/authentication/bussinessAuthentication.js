import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { List, InputItem, Picker, DatePicker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import TopNavBar from '../topNavBar'
import { previewImg, validatorPhone, uploadSingleImg, serverIp } from '../../../../utils/utils'
import { districtData } from '../../settingPickerData/data'

class BussinessAuthentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			industry: [], //行业分类总数据
			firstLevel: [], //一级行业分类
			secondLevel: [], //二级行业分类
			cols: 1,
			allRegion: [], //省市区总数据
			province: [], //省数据
			city: [], //市数据
			district: [] //区数据
		}
	}

	componentWillMount() {
		axios
			.post(serverIp + '/dianzanbao/config/getIndustry.do', null, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				//格式化行业分类
				let data = res.data.result_info
				let firstLevel = []
				data.forEach(item => {
					firstLevel.push({
						value: item.key,
						label: item.name
					})
				})

				//格式化省市区数据
				let allRegion = []
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
					allRegion.push(itemLevel1)
				})
				//初始化加载一级、二级行业分类
				this.setState({
					firstLevel,
					industry: data,
					allRegion,
					province: allRegion
				})
			})
	}

	//身份证正反面、营业执照预览图片
	handleChange = (type, val) => {
		let _this = this
		if (type === 'positive') {
			previewImg('positive')
		} else if (type === 'reverse') {
			previewImg('reverse')
		} else if (type === 'licence') {
			let licence = document.forms['bussinessAuth'].licence.files[0]
			previewImg('licence')

			uploadSingleImg(axios, licence, function(imgUrl) {
				_this.licence = imgUrl
			})
		}
	}

	//提交表单
	submitForm = () => {
		const form = this.props.form
		let errors = form.getFieldsError()
		let error = false
		for (let key in errors) {
			if (errors[key]) {
				error = errors[key]
				break
			}
		}

		if (!error) {
			let values = form.getFieldsValue()
			if (!values.HosterName) {
				Toast.info('请填写商家名称', 1)
				return
			}
			// else if (!values.startTime) {
			// 	Toast.info('选择开始时间', 1)
			// 	return
			// } else if (!values.endTime) {
			// 	Toast.info('选择结束时间', 1)
			// 	return
			// }
			else if (!values.phone) {
				Toast.info('填写联系电话', 1)
				return
			} else if (!values.province) {
				Toast.info('选择省份', 1)
				return
			} else if (!values.city) {
				Toast.info('选择城市', 1)
				return
			} else if (!values.district) {
				Toast.info('选择区县', 1)
				return
			} else if (!values.level1) {
				Toast.info('选择分类一级', 1)
				return
			} else if (!values.level2) {
				Toast.info('选择分类二级', 1)
				return
			}

			// let positive = document.forms['bussinessAuth'].positive.files[0]
			// let reverse = document.forms['bussinessAuth'].reverse.files[0]
			let licence = document.forms['bussinessAuth'].licence.files[0]
			// if (!positive) {
			// 	Toast.info('请选择身份证正面', 1)
			// 	return
			// } else if (!reverse) {
			// 	Toast.info('请选择身份证反面', 1)
			// 	return
			// } else
			if (!licence) {
				Toast.info('请选择营业执照', 1)
				return
			}
			let allData = {
				business_name: values.HosterName,
				from_user_id: values.CrewId == 'undefined' ? '' : values.CrewId,
				// startTime: values.startTime,
				// endTime: values.endTime,
				phone: values.phone.replace(/\s+/g, ''),
				province: values.province,
				city: values.city,
				area: values.district,
				dir_one: values.level1,
				dir_two: values.level2
				// positive: positive,
				// reverse: reverse,
			}
			this.businessAuthRequest(allData)
		} else {
			Toast.info(error, 1)
		}
	}

	//发送商家认证请求
	businessAuthRequest(allData) {
		let data = qs.stringify({
			business_name: allData.business_name,
			phone: allData.phone,
			business_license_url: this.licence,
			dir_one: allData.dir_one[0],
			dir_two: allData.dir_two[0],
			province: allData.province[0],
			city: allData.city[0],
			area: allData.area[0],
			x_longitude: 16.111,
			y_dimension: 20.982,
			from_user_id: allData.from_user_id
		})
		axios
      .post(serverIp + '/dianzanbao/userInfo/businessAuth.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {})
	}

	//商家名称验证
	validateHosterName = (rule, value, callback) => {
		if (value) {
			if (value.replace(/\s/g, '').length < 5 || value.replace(/\s/g, '').length > 16) {
				callback(new Error('请输入5到16位字符'))
			} else {
				callback()
			}
		}
	}

	//员工号验证
	validatorCrewId = (rule, value, callback) => {
		if (value) {
			if (value.replace(/\s/g, '').length < 6) {
				callback(new Error('请输入0到6位数字'))
			} else {
				callback()
			}
		}
	}

	//错误信息提示
	onErrorClick(type) {
		if (type === 'HosterName') {
			Toast.info('请输入5到16位字符', 1)
		} else if (type === 'CrewId') {
			Toast.info('请输入0到6位数字', 1)
		} else if (type === 'phone') {
			Toast.info('请输入11位手机号', 1)
		}
	}

	//一级、二级行业联动
	handleSelect = val => {
		this.state.industry.forEach(item => {
			if (item.key === val[0]) {
				let secondLevel = []
				item.subs.forEach(item1 => {
					secondLevel.push({
						value: item1.key,
						label: item1.name
					})
				})
				this.setState({
					secondLevel
				})
			}
		})
	}

	//省市区三级联动
	handleSelectRegion = (type, val) => {
		if (type === 'province') {
			this.state.allRegion.forEach(item => {
				if (item.label === val[0]) {
					this.setState({
						city: item.children,
						district: []
					})
				}
			})
		} else if (type === 'city') {
			this.state.allRegion.forEach(item => {
				if (item.label === this.props.form.getFieldsValue().province[0]) {
					item.children.forEach(item1 => {
						if (item1.label === val[0]) {
							this.setState({
								district: item1.children
							})
						}
					})
				}
			})
		}
	}

	render() {
		const { getFieldProps, getFieldError } = this.props.form
		return (
			<div className="bussinessAuthentication bussinessAndStaff">
				<TopNavBar title="商家认证" rightContent={false} />
				<div className="AuthenticationBox">
					<form name="bussinessAuth">
						<div className="inputs">
							<List>
								<InputItem
									{...getFieldProps('HosterName', {
										rules: [{ validator: this.validateHosterName }]
									})}
									error={!!getFieldError('HosterName')}
									onErrorClick={() => this.onErrorClick('HosterName')}
									clear
									placeholder="商家名称"
								/>
								<InputItem
									{...getFieldProps('CrewId', {
										rules: [{ validator: this.validatorCrewId }]
									})}
									error={!!getFieldError('CrewId')}
									onErrorClick={() => this.onErrorClick('CrewId')}
									clear
									type="number"
									placeholder="推荐员工号"
								/>
								{/* <div className="timePick">
									<DatePicker
										mode="time"
										minuteStep={2}
										use12Hours
										title="开始营业时间"
										onChange={time => this.handleChange('startTime', time)}
										extra="开始营业时间"
										{...getFieldProps('startTime')}
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
										{...getFieldProps('endTime')}
									>
										<List.Item arrow="horizontal" />
									</DatePicker>
								</div> */}
								<InputItem
									{...getFieldProps('phone', {
										rules: [{ validator: validatorPhone }]
									})}
									type="phone"
									error={!!getFieldError('phone')}
									onErrorClick={() => this.onErrorClick('phone')}
									clear
									placeholder="联系电话"
								/>
								<div className="regionPicker">
									<Picker
										data={this.state.province}
										cols={1}
										extra="请选择所在省"
										onOk={val => this.handleSelectRegion('province', val)}
										{...getFieldProps('province')}
									>
										<List.Item arrow="horizontal" />
									</Picker>
									<Picker
										data={this.state.city}
										cols={1}
										extra="请选择所在市"
										onOk={val => this.handleSelectRegion('city', val)}
										{...getFieldProps('city')}
									>
										<List.Item arrow="horizontal" />
									</Picker>
									<Picker data={this.state.district} cols={1} extra="请选择所在区" {...getFieldProps('district')}>
										<List.Item arrow="horizontal" />
									</Picker>
								</div>
								<div className="levelPicker">
									<Picker
										data={this.state.firstLevel}
										cols={1}
										extra="分类一级"
										onOk={val => this.handleSelect(val)}
										{...getFieldProps('level1')}
									>
										<List.Item arrow="horizontal" />
									</Picker>
									<Picker data={this.state.secondLevel} cols={1} extra="分类二级" {...getFieldProps('level2')}>
										<List.Item arrow="horizontal" />
									</Picker>
								</div>
							</List>
						</div>
						<div className="imgs">
							{/* <div className="identity">
								<div className="positive img">
									<input id="positive" type="file" name="positive" onChange={() => this.handleChange('positive')} />
									<img
										className="preview"
										src={require('../../../../images/myInfo/identity_positive@2x.png')}
										alt="身份证正面"
									/>
								</div>
								<div className="reverse img">
									<input id="reverse" type="file" name="reverse" onChange={() => this.handleChange('reverse')} />
									<img
										className="preview"
										src={require('../../../../images/myInfo/identity_reverse@2x.png')}
										alt="身份证反面"
									/>
								</div>
							</div> */}
							<div className="bussinessLicence">
								<div className="licence img">
									<input id="licence" type="file" name="licence" onChange={() => this.handleChange('licence')} />
									<img
										className="preview"
										src={require('../../../../images/myInfo/bussiness_lisence@2x.png')}
										alt="营业执照"
									/>
								</div>
							</div>
						</div>
						<div className="submitBtn" onClick={this.submitForm}>
							提交
						</div>
					</form>
				</div>
			</div>
		)
	}
}

BussinessAuthentication = createForm()(BussinessAuthentication)

export default BussinessAuthentication
