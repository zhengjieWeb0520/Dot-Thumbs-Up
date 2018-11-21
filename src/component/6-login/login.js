import React from 'react'
import { Link } from 'react-router-dom'
import {WingBlank, Button} from 'antd-mobile'
import './login.scss'
class Login extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className='login'>
        <div className='login-logo'>
        </div>
        <div className='login-select'>

        </div>
      </div>
    )
  }
}
export default Login