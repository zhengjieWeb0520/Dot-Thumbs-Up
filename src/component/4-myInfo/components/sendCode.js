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
  }

  setTime = () => {
    let obj = this.refs['sendCodeBtn']
    let _this = this
    if (this.countdown == 0) {
      obj.innerText = "发送验证码"
      this.countdown = 60
      obj.classList.remove("disabled")
      return
    } else {
      obj.classList.add("disabled")
      obj.innerText = "重新发送(" + this.countdown + ")"
      this.countdown--
    }
    this.tiemr = setTimeout(function () {
      _this.setTime(obj)
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.tiemr)
  }

  render() {
    return (
      <div onClick={this.handleClick} ref="sendCodeBtn" className="sendCode">发送验证码</div>
    )
  }
}

export default SendCode