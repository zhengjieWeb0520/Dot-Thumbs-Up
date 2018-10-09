import React from 'react'

//发送验证码
class SendCode extends React.Component {
	constructor(props) {
		super(props)
		this.countdown = 60
		this.tiemr = null
	}

	handleClick = () => {
    this.setTime()
    let _this = this
    this.tiemr = setInterval(function() {
			_this.setTime()
		}, 1000)
	}

	setTime = () => {
		let obj = this.refs['sendCodeBtn']
		if (this.countdown == 0) {
			obj.innerText = '发送验证码'
			this.countdown = 60
			obj.classList.remove('disabled')
			clearInterval(this.tiemr)
		} else {
			obj.classList.add('disabled')
			obj.innerText = '重新发送(' + this.countdown + ')'
			this.countdown--
		}
	}

	componentWillUnmount() {
		clearInterval(this.tiemr)
	}

	render() {
		return (
			<div onClick={this.handleClick} ref="sendCodeBtn" className="sendCode">
				发送验证码
			</div>
		)
	}
}

export default SendCode
