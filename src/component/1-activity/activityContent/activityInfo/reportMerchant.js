// 举报商家
import React from 'react'
import { createForm } from 'rc-form'
import { ImagePicker, InputItem, List, Toast } from 'antd-mobile'
import { validatorPhone , serverIp} from '../../../../utils/utils'
import { connect } from 'react-redux'
import axios from 'axios'
import { reportMerchantInfo } from '../../../../redux/1-activiy/reportMerchantRedux'
import TopNavBar from './../../../4-myInfo/components/topNavBar'

class ReportMerchant extends React.Component{
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.uploadFiles = []
    this.state={
      files: []
    }
  }
  //错误信息提示
  onErrorClick(type) {
    if(type === 'phone') {
      Toast.info('请输入11位手机号', 1)
    }
  }
  onImgChange = (files, type, index) => {
    let _this = this
    this.setState({
      files,
    },()=>{
      let fileData = this.state.files.length > 0 ? this.state.files[this.state.files.length - 1] : {}
      if(type === 'add'){
        let data = new FormData()
        data.append('image_file', fileData.file)
        axios.post(
          serverIp + '/dianzanbao/sys/file/saveImg.do',
          data,
          {
            headers: {
              token: window.sessionStorage.getItem('token'),
              user_id: window.sessionStorage.getItem('user_id'),
              //'Content-Type': 'multipart/form-data'
            }
          }
        ).then(res => {
          if(res.data.result_code === "0"){
            _this.uploadFiles.push(res.data.result_info)
          }
        })
      }else if(type === 'remove'){      
        this.uploadFiles.splice(index, 1)
      }
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
      if(!values.reportText) {
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
      let reportPhone = values.phone.replace("%20", "").replace(" ", "").replace(" ", "")
      let img_urls = ""
      this.uploadFiles.forEach((item, index)=>{
        if(index !== this.uploadFiles.length - 1){
          img_urls = img_urls + item + ','
        }else{
          img_urls = img_urls + item
        }
      })
      this.props.reportMerchantInfo(values.reportText, img_urls, values.name, reportPhone, '652158')
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
        <form name="reportMerchant">
          <div className="inputs">
            <div className="textarea">
                <textarea 
                  cols="30" 
                  rows="10"
                  placeholder="请输入举报内容以便我们尽快帮你解决...(必填)"
                  {...getFieldProps('reportText')}
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
        </form>
        <div className="submitBtn" onClick={this.submitForm}>提交</div>
      </div>
    )
  }
}
ReportMerchant = createForm()(ReportMerchant)

ReportMerchant = connect(
	state => ({
    reportMerchant: state.reportMerchant
  }),
	{ reportMerchantInfo }
)(ReportMerchant)

export default ReportMerchant