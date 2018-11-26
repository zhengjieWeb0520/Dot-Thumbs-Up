import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { InputItem, List, Checkbox, Toast} from 'antd-mobile'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import './login.scss'
import LoginNavBar from './loginNavBar'
import SendCode from './../4-myInfo/components/sendCode'
import { validatorPhone, validatorCode, serverIp } from './../../utils/utils'

const AgreeItem = Checkbox.AgreeItem;

class Regist extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checkFlag :false
    }
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
  handleChange = (e) =>{
    console.log(e)
    this.setState({
      checkFlag: e.target.checked
    })
  }
  submitForm = () =>{
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
      }else if (this.state.checkFlag === false)(
        Toast.info('请同意用户协议', 1)
      )
      let data= {
        user_phone: values.phone.replace(/\s+/g, ''),
        user_pwd: values.password,
				code: values.code,
				role_id : '0'
      }
      this.registerUser (data, function(_this){
        form.resetFields()
        Toast.info('注册成功', 1)
        _this.props.history.push('/login')
      })
    }else {
      Toast.info(error, 1)
    }
  }
  registerUser(data, fn){
    data = qs.stringify(data)
    axios.post(serverIp + '/dianzanbao/user/register.do', data).then(res => {
      if(res.data.result_code === '0'){
        fn(this)
      }
    })
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className='login regist'>
      <LoginNavBar title='密码登录' linkname='/login'/>
      <div className='login-logo' />
      <div className='login-content'>  
        <form name="regist" >
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
							placeholder="请输入的验证码"
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
              <InputItem
                clear
                type="password"
                placeholder="请确认密码"
                error={!!getFieldError('repeatPassword')}
                onErrorClick={() => this.onErrorClick('repeatPassword')}
                {...getFieldProps('repeatPassword', {
                  rules: [{ validator: this.validatorPassword }]
                })}
              >
              <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
          </List>
        </form>
      </div>
      <div className='regulation'>
        <AgreeItem data-seed="logId" onChange={this.handleChange}>
            &nbsp;同意 <a onClick={(e) => { e.preventDefault(); alert('agree it'); }}>《用户服务协议》</a>
        </AgreeItem>
      </div>
      <div className="submitBtn" onClick={this.submitForm}>注册</div>
    </div>
    )
  }
}

Regist = createForm()(Regist)
export default withRouter(Regist)
