import React from 'react'
import { List, InputItem, Toast, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
import TopNavBar from './topNavBar'
import axios from 'axios'
import qs from 'qs'
import { serverIp } from '../../../utils/utils'
import { previewImg } from '../../../utils/utils'
import { sex } from '../settingPickerData/data'

class StaffAuthentication extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			files: [],
			cols: 1
		}
	}

	onPickerOk = (type, value) => {
		this.setState({
			sexValue: value
		})
	}

	//身份证正反面预览图片
	handleChange = (type, val) => {
		if (type === 'positive') {
			console.log('change')
			previewImg('positive')
			// let data = qs.stringify({
			// 	image_file: document.forms['staffAuth'].positive.files[0]
			// })
			let data = new FormData()
      data.append('image_file', document.forms['staffAuth'].positive.files[0])
      console.log(document.forms['staffAuth'].positive.files[0])
			axios
				.post(serverIp + '/dianzanbao/sys/file/saveImg.do', data, {
					headers: {
						token: window.sessionStorage.getItem('token'),
						user_id: window.sessionStorage.getItem('user_id')
					}
				})
				.then(res => {
					console.log(res)
				})
		} else if (type === 'reverse') {
			previewImg('reverse')
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

	//手机号验证
	validatorPhone = (rule, value, callback) => {
		if (value) {
			if (value.replace(/\s/g, '').length < 11) {
				callback(new Error('请输入11位手机号'))
			} else {
				callback()
			}
		}
	}

	//员工认证提交
	submitForm = () => {
		const form = this.props.form
		let errors = form.getFieldsError()
		let error = ''
		for (let key in errors) {
			if (errors[key]) {
				error = errors[key]
				break
			}
		}

		if (!error) {
			let values = form.getFieldsValue()
			console.log(values)
			if (!values.userName) {
				Toast.info('请填写员工姓名', 1)
				return
			} else if (!values.sexValue) {
				Toast.info('请选择员工性别', 1)
				return
			} else if (!values.phone) {
				Toast.info('填写联系电话', 1)
				return
			}

			let positive = document.forms['staffAuth'].positive.files[0]
			let reverse = document.forms['staffAuth'].reverse.files[0]
			if (!positive) {
				Toast.info('请选择身份证正面', 1)
				return
			} else if (!reverse) {
				Toast.info('请选择身份证反面', 1)
				return
			}
			let data = new FormData()
			let allData = {
				userName: values.userName,
				userSex: values.sexValue,
				phone: values.phone,
				positive: positive,
				reverse: reverse
			}

			for (let key in allData) {
				data.append(key, allData[key])
			}
			console.log(data)
		} else {
			Toast.info(error, 1)
		}
	}

	render() {
		const { getFieldProps, getFieldError } = this.props.form
		return (
			<div className="staffAuthentication bussinessAndStaff">
				<TopNavBar title="员工认证" rightContent={false} />
				<div className="AuthenticationBox">
					<form name="staffAuth">
						<div className="inputs">
							<List>
								<InputItem {...getFieldProps('userName')} clear placeholder="姓名" />
								<Picker title="选择性别" extra="性别" data={sex} cols={1} {...getFieldProps('sexValue')}>
									<List.Item onClick={this.onClick}>
										<span className="justifyItem">性别</span>
									</List.Item>
								</Picker>
								<InputItem
									{...getFieldProps('phone', {
										rules: [{ validator: this.validatorPhone }]
									})}
									clear
									type="phone"
									error={!!getFieldError('phone')}
									placeholder="联系电话"
									onErrorClick={() => this.onErrorClick('phone')}
								/>
							</List>
						</div>
						<div className="imgs">
							<div className="identity">
								<div className="positive img">
									<input id="positive" type="file" name="positive" onChange={() => this.handleChange('positive')} />
									<img
										className="preview"
										src={require('../../../images/myInfo/identity_positive@2x.png')}
										alt="身份证正面"
									/>
								</div>
								<div className="reverse img">
									<input id="reverse" type="file" name="reverse" onChange={() => this.handleChange('reverse')} />
									<img
										className="preview"
										src={require('../../../images/myInfo/identity_reverse@2x.png')}
										alt="身份证正面"
									/>
								</div>
							</div>
						</div>
					</form>
					<div className="submitBtn" onClick={this.submitForm}>
						提交
					</div>
				</div>
			</div>
		)
	}
}

StaffAuthentication = createForm()(StaffAuthentication)

export default StaffAuthentication
