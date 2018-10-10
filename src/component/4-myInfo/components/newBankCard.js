import React from 'react'
import { connect } from 'react-redux'
import { createForm } from 'rc-form'
import { List, InputItem, Picker, Toast } from 'antd-mobile'
import { validatorCode, validatorPhone } from '../../../utils/utils'
import SendCode from './sendCode'
import TopNavBar from './topNavBar'
import { addBankCard } from '../../../redux/4-myinfo/backCardRedux'

class NewBankCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			bankList: [
				{
					value: '中国农业银行',
					label: '中国农业银行'
				},
				{
					value: '中国工商银行',
					label: '中国工商银行'
				},
				{
					value: '中国招商银行',
					label: '中国招商银行'
				},
				{
					value: '南京银行',
					label: '南京银行'
				}
			],
			bankBranchList: [
				{
					value: '雨花台支行',
					label: '雨花台支行'
				},
				{
					value: '建邺支行',
					label: '建邺支行'
				},
				{
					value: '玄武支行',
					label: '玄武支行'
				},
				{
					value: '栖霞支行',
					label: '栖霞支行'
				}
			],
			cols: 1,
			bankBranchValue: [],
			bankValue: []
		}
	}

	onClick = () => {}

	//选择器确定
	onPickerOk(type, value) {
		this.setState({
			[type]: value
		})
	}

	//身份证验证
	validatoridNumber = (rule, value, callback) => {
		//18位身份证正则
		let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		if (value) {
			if (!reg.test(value)) {
				callback(new Error('请输入正确的18位身份证号'))
			} else {
				callback()
			}
		}
	}

	//银行卡验证
	validatorCardNum = (rule, value, callback) => {
		//银行卡正则
		let reg = /^([1-9]{1})(\d{15}|\d{18})$/
		if (value) {
			if (!reg.test(value.replace(/\s/g, ''))) {
				callback(new Error('请输入正确的银行卡号'))
			} else {
				callback()
			}
		}
	}

	//提交新银行卡表单
	submitForm = () => {
		this.props.addBankCard()
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
			if (!values.HosterName) {
				Toast.info('请输入持卡人姓名', 1)
				return
			} else if (!values.HosterNumber) {
				Toast.info('请输入持卡人证件号', 1)
				return
			} else if (!values.HosteTel) {
				Toast.info('请输入该卡与银行绑定的手机号', 1)
				return
			} else if (!values.HosterCode) {
				Toast.info('请输入验证码', 1)
				return
			} else if (!values.bankValue) {
				Toast.info('请选择银行', 1)
				return
      } 
      // else if (!values.bankBranchValue) {
			// 	Toast.info('请选择支行', 1)
			// 	return
      // } 
      else if (!values.HosterCardNum) {
				Toast.info('请输入银行卡号', 1)
				return
			}
			console.log(values)
		} else {
			Toast.info(error, 1)
		}
	}

	//错误信息提示
	onErrorClick(type) {
		if (type === 'HosteTel') {
			Toast.info('请输入11位手机号', 1)
		} else if (type === 'HosterCode') {
			Toast.info('请输入6位验证码', 1)
		} else if (type === 'HosterNumber') {
			Toast.info('请输入正确的18位身份证号', 1)
		} else if (type === 'HosterCardNum') {
			Toast.info('请输入正确的银行卡号', 1)
		}
	}

	render() {
		const { getFieldProps, getFieldError } = this.props.form
		return (
			<div className="newBankCard">
				<TopNavBar title="选择银行卡" rightContent={'确认'} submitForm={this.submitForm} />
				<div className="inputsBox">
					<List>
						<InputItem {...getFieldProps('HosterName')} clear placeholder="请输入持卡人姓名">
							<span className="justifyItem">持卡人</span>：
						</InputItem>
						<InputItem
							clear
							maxLength="18"
							placeholder="请输入持卡人证件号"
							error={!!getFieldError('HosterNumber')}
							onErrorClick={() => this.onErrorClick('HosterNumber')}
							{...getFieldProps('HosterNumber', {
								rules: [{ validator: this.validatoridNumber }]
							})}
						>
							<span className="justifyItem">证件号码</span>：
						</InputItem>
						<InputItem
							clear
							type="phone"
							placeholder="请输入该卡与银行绑定的手机号"
							error={!!getFieldError('HosteTel')}
							onErrorClick={() => this.onErrorClick('HosteTel')}
							{...getFieldProps('HosteTel', {
								rules: [{ validator: validatorPhone }]
							})}
						>
							<span className="justifyItem">手机号码</span>：
						</InputItem>
						<InputItem
							clear
							placeholder="请输入收到的验证码"
							maxLength="6"
							type="number"
							error={!!getFieldError('HosterCode')}
							onErrorClick={() => this.onErrorClick('HosterCode')}
							{...getFieldProps('HosterCode', {
								rules: [{ validator: validatorCode }]
							})}
							extra={<SendCode phone={this.props.form.getFieldsValue().HosteTel} type={'add_bank_card'} />}
						>
							<span className="justifyItem">验证码</span>：
						</InputItem>
					</List>
					<List>
						<Picker
							data={this.state.bankList}
							cols={this.state.cols}
							value={this.state.bankValue}
							onOk={val => this.onPickerOk('bankValue', val)}
							{...getFieldProps('bankValue')}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
								<span className="justifyItem">银行</span>：
							</List.Item>
						</Picker>
						{/* <Picker
							data={this.state.bankBranchList}
							cols={this.state.cols}
							value={this.state.bankBranchValue}
							onOk={val => this.onPickerOk('bankBranchValue', val)}
							{...getFieldProps('bankBranchValue')}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
								<span className="justifyItem">支行</span>：
							</List.Item>
						</Picker> */}
						<InputItem
							clear
							type="bankCard"
							maxLength="23"
							placeholder="请填写银行卡号"
							error={!!getFieldError('HosterCardNum')}
							onErrorClick={() => this.onErrorClick('HosterCardNum')}
							{...getFieldProps('HosterCardNum', {
								rules: [{ validator: this.validatorCardNum }]
							})}
						>
							<span className="justifyItem">卡号</span>：
						</InputItem>
					</List>
				</div>
			</div>
		)
	}
}
NewBankCard = createForm()(NewBankCard)

NewBankCard = connect(
	state => state.backCard,
	{ addBankCard }
)(NewBankCard)

export default NewBankCard
