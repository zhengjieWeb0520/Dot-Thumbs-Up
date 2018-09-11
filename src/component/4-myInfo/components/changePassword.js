import React from 'react'
import TopNavBar from './topNavBar'
import { List, InputItem } from 'antd-mobile'

class ChangePassword extends React.Component {
  render() {
    return (
      <div className="changePassword">
        <TopNavBar title="修改密码"/>
        <div className="inputsBox">
          <List>
            <InputItem
              clear
              type="number"
              placeholder="请输入手机号"
              ref={el => (this.autoFocusInst = el)}
            >
            </InputItem>
            <InputItem
                clear
                placeholder="请输入收到的验证码"
                ref={el => (this.inputRef = el)}
                extra="发送验证码"
                onExtraClick={() => this.onExtraClick()}
              >
              </InputItem>
            <InputItem
              clear
              type="password"
              placeholder="请输入新密码"
              ref={el => (this.autoFocusInst = el)}
            >
            </InputItem>
            <InputItem
              clear
              type="password"
              placeholder="请确认新密码"
              ref={el => (this.autoFocusInst = el)}
            >
            </InputItem>
          </List>
        </div>
        <div className="submitBtn">确认修改</div>
      </div>
    )
  }
}

export default ChangePassword