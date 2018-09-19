import React from 'react'
import TopNavBar from './topNavBar'
import SendCode from './sendCode'
import { List, InputItem, Toast } from 'antd-mobile'

//昵称输入框
class NickName extends React.Component {
	constructor(props) {
		super(props)
		this.props.transData('nickName', null)
	}

	handleChange(val) {
		this.props.transData('nickName', { nickName: val })
	}

	render() {
		return (
			<div>
				<List>
					<InputItem clear placeholder="请输入昵称" onChange={val => this.handleChange(val)} />
				</List>
			</div>
		)
	}
}

//真实姓名输入框
class RealName extends React.Component {
	constructor(props) {
		super(props)
		this.props.transData('realName', null)
	}

	handleChange(val) {
		this.props.transData('realName', { realName: val })
	}

	render() {
		return (
			<div>
				<List>
					<InputItem clear placeholder="请输入真实姓名" onChange={val => this.handleChange(val)} />
				</List>
			</div>
		)
	}
}

//手机号输入框
class PhoneChange extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			phone: '',
			code: '',
			hasError: false
		}
		this.props.transData('modifyPhone', null)
	}

	onErrorClick = () => {
		if (this.state.hasError) {
			Toast.info('请输入11位手机号', 1)
		}
	}

	handleChange = (type, value) => {
		if (type === 'phone') {
			if (value.replace(/\s/g, '').length < 11) {
				this.setState({
					hasError: true
				})
			} else {
				this.setState({
					hasError: false
				})
			}
		}
		this.setState(
			{
				[type]: value
			},
			() => {
				this.props.transData('modifyPhone', { phone: this.state.phone, code: this.state.code })
			}
		)
	}

	render() {
		return (
			<div>
				<List>
					<InputItem
						clear
						placeholder="请输入新手机号码"
						type="phone"
						error={this.state.hasError}
						onErrorClick={this.onErrorClick}
						onChange={val => this.handleChange('phone', val)}
						value={this.state.phone}
					/>
					<InputItem
						clear
						type="number"
						placeholder="请输入6位的验证码"
            extra={<SendCode />}
            maxLength="6"
						onChange={val => this.handleChange('code', val)}
						value={this.state.code}
					/>
				</List>
				<div className="tips">温馨提示：修改后新的手机号将作为您的登陆号</div>
			</div>
		)
	}
}

class SettingInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			type: '',
			data: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//提交
	handleSubmit() {
		if (this.state.dataType === 'modifyPhone') {
			if (!this.state.data || !this.state.data.phone) {
				Toast.info('请输入手机号', 1)
				return
			} else if (this.state.data.phone.replace(/\s/g, '').length < 11) {
				Toast.info('请输入11位手机号', 1)
				return
			} else if (!this.state.data.code) {
				Toast.info('请输入验证码', 1)
				return
			} else if (this.state.data.code.replace(/\s/g, '').length < 6) {
				Toast.info('请输入6位验证码', 1)
				return
			}
		} else if (this.state.dataType === 'nickName') {
			if (!this.state.data || !this.state.data.nickName) {
				Toast.info('请输入昵称', 1)
				return
			} else if (this.state.data.nickName.replace(/\s/g, '').length < 4 || this.state.data.nickName.replace(/\s/g, '').length > 16) {
				Toast.info('请输入4到16位字符', 1)
				return
			}
		}else if(this.state.dataType === 'realName') {
      if (!this.state.data || !this.state.data.realName) {
				Toast.info('请输入真实姓名', 1)
				return
			} else if (this.state.data.realName.replace(/\s/g, '').length < 2 || this.state.data.realName.replace(/\s/g, '').length > 5) {
				Toast.info('请输入2到5位字符', 1)
				return
			}
    }
    alert("提交成功")
		console.log(this.state.data)
	}

	//初始化标题和type
	componentDidMount() {
		let title
		switch (this.props.match.params.type) {
			case 'nickName':
				title = '请输入昵称'
				break
			case 'realName':
				title = '请输入真实姓名'
				break
			case 'phone':
				title = '请输入电话'
				break
			default:
				title = ''
		}
		this.setState({
			title,
			type: this.props.match.params.type
		})
	}

	//自组件传值给父组件
	transData = (dataType, data) => {
		this.setState({
			dataType,
			data
		})
	}

	render() {
		return (
			<div className="settingInput">
				<TopNavBar title={this.state.title} />
				<div className="inputs">
					{this.state.type === 'nickName' ? (
						<NickName transData={this.transData} />
					) : this.state.type === 'realName' ? (
						<RealName transData={this.transData} />
					) : (
						<PhoneChange transData={this.transData} />
					)}
				</div>
				<div className="submitBtn" onClick={this.handleSubmit}>
					提交
				</div>
			</div>
		)
	}
}

export default SettingInput
