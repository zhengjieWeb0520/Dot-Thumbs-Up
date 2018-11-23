import React from 'react'
import { Link, withRouter} from 'react-router-dom'
import { InputItem, List, Toast} from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import './login.scss'
import LoginNavBar from './loginNavBar'
import { validatorPhone, validatorCode, serverIp } from './../../utils/utils'

class Login extends React.Component{
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
			}else if (!values.password){
				Toast.info('请填写密码', 1)
				return
      }

      let data = {
        user_phone : values.phone.replace(/\s+/g, ''),
        login_method: 'password',
        user_pwd: values.password
      }
      this.userLogin(data, function(_this, result_info){
        form.resetFields()
        Toast.info('登录成功', 1)
        window.sessionStorage.setItem('token', result_info.token)
        window.sessionStorage.setItem('user_id', result_info.user_id)
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2514283f85a9e278&redirect_uri=http%3a%2f%2fjizanbao.com%2fgetWxCode.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
        // if(wxCode !== undefined){
        //   alert(wxCode)
        //   let data = qs.stringify({code: wxCode})
        //   axios.post(serverIp + '/dianzanbao/user/getWxOpenId.do', data).then(res =>{
        //     alert(res.data.result_code)
        //     alert(res.data.err_msg)
        //     if (res.data.result_code === '0') {           
        //       let wx_open_id = res.data.result_info
        //       let data = qs({wx_open_id: wx_open_id})
        //       axios.post(
        //         serverIp + '/dianzanbao/userInfo/relationUser.do',             
        //         data,
        //         {
        //           headers: {
        //             token: window.sessionStorage.getItem('token'),
        //             user_id: window.sessionStorage.getItem('user_id')
        //           }
        //         }
        //         ).then(res =>{
        //           if(res.data.result_code === '0'){
        //             alert(res.data.result_info)
        //           }
        //       })
        //     }
        //   })
        // }else{
        //   _this.props.history.push('/index?aaaa')
        // }     
      })
    }else {
      Toast.info(error, 1)
    }
  }
  userLogin(data, fn){
    data = qs.stringify(data)
    axios.post(serverIp + '/dianzanbao/user/login.do', data).then(res => {
      if (res.data.result_code === '0') {
				fn(this, res.data.result_info)
			}else if(res.data.result_code === '-1'){
        Toast.info(res.data.err_msg, 1)
      }
    })
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className='login'>
        <LoginNavBar title='验证码登录' linkname='/verificatLogin'/>
        <div className='login-logo' />
        <div className='login-content'>       
          <form name="login" >
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
                type="password"
                placeholder="请输入密码"
                error={!!getFieldError('password')}
                onErrorClick={() => this.onErrorClick('password')}
                {...getFieldProps('password', {
                  rules: [{ validator: this.validatorPassword }]
                })}
              >
              <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
            </List>
          </form>
        </div>
        <div className='forgetPassword'><Link to={'/forgetPassword'}>忘记密码？</Link></div>
        <div className="submitBtn" onClick={this.submitForm}>登录</div>
        <div className='quickRegist'>还没有账号？<Link to={'/regiter'}>快速注册</Link></div>
      </div>
    )
  }
}
Login = createForm()(Login)
export default withRouter(Login)