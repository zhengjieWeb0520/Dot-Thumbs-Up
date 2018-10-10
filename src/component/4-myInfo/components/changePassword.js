import React from 'react'
import TopNavBar from './topNavBar'
import SendCode from './sendCode'
import { createForm } from 'rc-form'
import { List, InputItem, Toast } from 'antd-mobile'
import { validatorPhone, validatorCode } from '../../../utils/utils'

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
		} else if (type === 'code') {
			Toast.info('请输入6位验证码', 1)
		} else if (type === 'password' || type === 'repeatPassword') {
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
			} else if (!values.code) {
				Toast.info('请输入验证码', 1)
				return
			} else if (!values.password) {
				Toast.info('请填写密码', 1)
				return
			} else if (!values.repeatPassword) {
				Toast.info('请输入确认密码', 1)
				return
			} else if (values.password != values.repeatPassword) {
				Toast.info('两次输入的密码不一致', 1)
				return
			}

			console.log(values)
		} else {
			Toast.info(error, 1)
		}
	}

	render() {
		const { getFieldProps, getFieldError } = this.props.form
		return (
			<div className="changePassword">
				<TopNavBar title="修改密码" />
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
							type="number"
							placeholder="请输入6位的验证码"
							extra={
                <SendCode 
                  phone={this.props.form.getFieldsValue().phone}
                  type={'reset_password'}
                />
              }
							maxLength="6"
							error={!!getFieldError('code')}
							onErrorClick={() => this.onErrorClick('code')}
							{...getFieldProps('code', {
								rules: [{ validator: validatorCode }]
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
