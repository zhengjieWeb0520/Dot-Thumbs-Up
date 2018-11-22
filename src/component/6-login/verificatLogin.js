import React from 'react'
import { Link } from 'react-router-dom'
import { InputItem, List, Toast} from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import './login.scss'
import SendCode from './../4-myInfo/components/sendCode'
import LoginNavBar from './loginNavBar'
import { validatorPhone, validatorCode, serverIp } from './../../utils/utils'

class VerificatLogin extends React.Component{
  constructor(props){
    super(props)
  }
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
  //登录
  submitForm = ()=>{
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
    if(!error){
      if (!values.phone) {
				Toast.info('请输入手机号', 1)
				return
			}else if (!values.code){
				Toast.info('请填写验证码', 1)
				return
      }
      let data = {
        user_phone : values.phone.replace(/\s+/g, ''),
        login_method: 'code',
        code: values.code
      }
      console.log(data)
      this.userLogin(data, function(_this){
        form.resetFields()
        Toast.info('登录成功', 1)
        _this.props.history.push('/index?aaaa')
      })
    }else{
      Toast.info(error, 1)
    }
  }
  userLogin(data, fn){
    data = qs.stringify(data)
    axios.post(serverIp + '/dianzanbao/user/login.do', data).then(res => {
      if (res.data.result_code === '0') {
				fn(this)
			}else if(res.data.result_code === '-1'){
        Toast.info(res.data.err_msg, 1)
      }
    })
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className='login'>
      <LoginNavBar title='密码登录' linkname='/login'/>
      <div className='login-logo' />
      <div className='login-content'>  
        <form name="verifiactLogin" >
          <List>
            <InputItem
              clear
              type="phone"
              error={!!getFieldError('phone')}
							onErrorClick={() => this.onErrorClick('phone')}
              placeholder="请输入手机号码"
							{...getFieldProps('phone', {
								rules: [{ validator: validatorPhone }]
							})}
            >      
            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />       
            </InputItem>
            <InputItem
              clear
              type="number"
							placeholder="请输入6位的验证码"
							extra={<SendCode phone={this.props.form.getFieldsValue().phone} type={'register_user'} />}
							maxLength="6"
							error={!!getFieldError('code')}
							onErrorClick={() => this.onErrorClick('code')}
							{...getFieldProps('code', {
								rules: [{ validator: validatorCode }]
							})}
            >
            <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
            </InputItem>
          </List>
        </form>
      </div>
      <div className="submitBtn" onClick={this.submitForm}>登录</div>
      <div className='quickRegist'>还没有账号？<Link to={'/regiter'}>快速注册</Link></div>
    </div>
    )
  }
}

VerificatLogin = createForm()(VerificatLogin)
export default VerificatLogin