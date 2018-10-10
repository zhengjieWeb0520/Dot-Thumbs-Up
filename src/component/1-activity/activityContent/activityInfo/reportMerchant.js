// 举报商家
import React from 'react'
import { createForm } from 'rc-form'
import { ImagePicker, InputItem, List, Toast } from 'antd-mobile'
import { validatorPhone } from '../../../../utils/utils'
import TopNavBar from './../../../4-myInfo/components/topNavBar'

class ReportMerchant extends React.Component{
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.state={
      files: []
    }
  }
  //错误信息提示
  onErrorClick(type) {
    if(type === 'phone') {
      Toast.info('请输入11位手机号', 1)
    }else if(type === 'code') {
      Toast.info('请输入6位验证码', 1)
    }else if(type === 'password' || type === 'repeatPassword') {
      Toast.info('密码需要大于6位', 1)
    }
  }
  onImgChange = (files, type, index) => {
    this.setState({
      files,
    })
  }
  submitForm =()=>{
    const form = this.props.form
    let errors = form.getFieldsError()
    let values = form.getFieldsValue()
    let error = ''
    let files = []
    for(let key in errors) {
      if(errors[key]) {
        error = errors[key]
        break
      }
    }

    if(!error) {
      if(!values.feedBackText) {
        Toast.info('请输入反馈内容', 1)
        return
      }else if(!values.phone) {
        Toast.info('请输入手机号', 1)
        return
      }
      if(this.state.files.length > 0) {
        this.state.files.forEach((item) => {
          files.push(item.file)
        })
      }
      console.log(files)
      console.log(values)
    }else {
      Toast.info(error, 1)
    }
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return(
      <div id='ReportMerchant' className='reportMerchant userFeedBack'>
        <TopNavBar title="举报商家"/>
        <div className="merchantInfo">
            <span>商家名称</span>
            <span>重庆烤鱼</span>
        </div>
        <div className="inputs">
          <div className="textarea">
              <textarea 
                cols="30" 
                rows="10"
                placeholder="请输入举报内容以便我们尽快帮你解决...(必填)"
                {...getFieldProps('feedBackText')}
              ></textarea>
          </div>
          <div className="imagePick">
            <ImagePicker
              files={this.state.files}
              onChange={this.onImgChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 3}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />
          </div>
        </div>
        <div className="phone">
          <List>
            <InputItem
              clear
              type="name"
              placeholder="便于我们联系你"
              {...getFieldProps('name')}
            >
              <span className="justifyItem">联系人</span>：
            </InputItem>
            <InputItem
              clear
              type="phone"
              placeholder="便于我们联系你"
              error={!!getFieldError('phone')}
              onErrorClick={() =>this.onErrorClick('phone')}
              {...getFieldProps('phone', {
                rules: [
                  {validator: validatorPhone}
                ]
              })}
            >
              <span className="justifyItem">联系电话</span>：
            </InputItem>
          </List>
        </div>
        <div className="submitBtn" onClick={this.submitForm}>提交</div>
      </div>
    )
  }
}
ReportMerchant = createForm()(ReportMerchant)
export default ReportMerchant