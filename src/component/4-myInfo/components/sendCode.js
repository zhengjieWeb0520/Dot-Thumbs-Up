import React from 'react'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import qs from 'qs'
import { serverIp } from '../../../utils/utils'

//发送验证码
class SendCode extends React.Component {
	constructor(props) {
		super(props)
		this.countdown = 60
		this.tiemr = null
	}

  sendCodeRequest() {
    let phone = this.props.phone.replace(/\s/g, '')
    let data = qs.stringify({
      phone: phone,
      type: this.props.type
    })
    axios.post(serverIp + '/dianzanbao/shortMessage/sendShortMessage.do', data)
      .then((res) => {
      })
  }

	handleClick = () => {
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    if(this.props.phone) {
      if(reg.test(this.props.phone.replace(/\s/g, ''))) {
        this.sendCodeRequest()
        clearInterval(this.timer)
        this.setTime()
        let _this = this
        this.tiemr = setInterval(function() {
          _this.setTime()
        }, 1000)
      }else {
        Toast.info('请输入正确的11位手机号', 1)
      }
    }else {
      Toast.info('请输入手机号', 1)
    }
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
