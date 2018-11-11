import React from 'react'
import axios from 'axios'
import qs from 'qs'
import TopNavBar from '../topNavBar'
import { createForm } from 'rc-form'
import { List, InputItem, Toast } from 'antd-mobile'
import { validatorPhone, serverIp } from '../../../../utils/utils'

class ChangePassword extends React.Component {
	//表单密码验证
	validatorPassword = (rule, value, callback) => {
		if (value) {
			if (value.replace(/\s/g, '').length < 6) {
				callback(new Error('密码需要大于6位'))
			} else {
				callback()
			}
		}
	}

	//错误信息提示
	onErrorClick(type) {
		if (type === 'phone') {
			Toast.info('请输入11位手机号', 1)
		} else if (type === 'password' || type === 'repeatPassword' || type === 'oldPassword') {
			Toast.info('密码需要大于6位', 1)
		}
	}

	//提交修改密码表单
	submitForm = () => {
		const form = this.props.form
		let errors = form.getFieldsError()
		let values = form.getFieldsValue()
		let error = ''
		for (let key in errors) {
			if (errors[key]) {
				error = errors[key]
				break
			}
		}

		if (!error) {
			if (!values.phone) {
				Toast.info('请输入手机号', 1)
				return
			} else if (!values.oldPassword) {
				Toast.info('请输入原密码', 1)
				return
			} else if (!values.password) {
				Toast.info('请输入新密码', 1)
				return
			} else if (!values.repeatPassword) {
				Toast.info('请输入确认密码', 1)
				return
			} else if (values.password != values.repeatPassword) {
				Toast.info('两次输入的密码不一致', 1)
				return
			}

			let data = {
				user_phone: values.phone.replace(/\s+/g, ''),
				upd_method: 'password',
				old_pwd: values.oldPassword,
				new_pwd: values.password
			}

			this.changePasswordBypassword(data, function() {
				form.resetFields()
				Toast.info('修改成功', 1)
			})
		} else {
			Toast.info(error, 1)
		}
	}

	//通过密码修改密码
	changePasswordBypassword(data, fn) {
		data = qs.stringify(data)
		axios
			.post(serverIp + '/dianzanbao/user/upd_password.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					fn()
				}
			})
	}

	render() {
		const { getFieldProps, getFieldError } = this.props.form
		return (
			<div className="changePassword">
				<TopNavBar title="通过密码修改" />
				<div className="inputsBox">
					<List>
						<InputItem
							clear
							type="phone"
							error={!!getFieldError('phone')}
							onErrorClick={() => this.onErrorClick('phone')}
							placeholder="请输入手机号"
							{...getFieldProps('phone', {
								rules: [{ validator: validatorPhone }]
							})}
						/>
						<InputItem
							clear
							type="password"
							placeholder="请输入原密码"
							error={!!getFieldError('oldPassword')}
							onErrorClick={() => this.onErrorClick('oldPassword')}
							{...getFieldProps('oldPassword', {
								rules: [{ validator: this.validatorPassword }]
							})}
						/>
						<InputItem
							clear
							type="password"
							placeholder="请输入新密码"
							error={!!getFieldError('password')}
							onErrorClick={() => this.onErrorClick('password')}
							{...getFieldProps('password', {
								rules: [{ validator: this.validatorPassword }]
							})}
						/>
						<InputItem
							clear
							type="password"
							placeholder="请确认新密码"
							error={!!getFieldError('repeatPassword')}
							onErrorClick={() => this.onErrorClick('repeatPassword')}
							{...getFieldProps('repeatPassword', {
								rules: [{ validator: this.validatorPassword }]
							})}
						/>
					</List>
				</div>
				<div className="submitBtn" onClick={this.submitForm}>
					提交
				</div>
			</div>
		)
	}
}

ChangePassword = createForm()(ChangePassword)

export default ChangePassword
