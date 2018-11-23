import React from 'react'
import axios from 'axios'
import { createForm } from 'rc-form'
import { connect } from 'react-redux'
import { InputItem, List, Toast , ImagePicker} from 'antd-mobile'
import { getChildNode, serverIp, ObjectEquals } from './../../utils/utils'
import TopNavBar from './../4-myInfo/components/topNavBar'
import { getActiveInfo } from './../../redux/1-activiy/activeIndexRedux'
import { editeActive } from './../../redux/3-publish/createActiceRedux'
//编辑活动
class EditePublish extends React.Component{
  constructor(props){
    super(props)
    this.uploadFiles = []  //活动图片的参数
    this.state={
      activeName: '',
      activeAsc: '',
      files: []
    }
    this.props.getActiveInfo(this.props.location.query.id)
  }

  onImgChange =(files, type, index)=>{
    let _this = this
    this.setState({
      files,
    }, ()=>{
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
  componentWillReceiveProps(nextProps){
    if(!ObjectEquals(nextProps.activeInfo.activeInfo, this.props.activeInfo.activeInfo)){
      let filesArray = []
      this.uploadFiles = []
      nextProps.activeInfo.activeInfo.detail_images.forEach((item, index) => {
        let data = {
          url: item.img_url,
          id: item.id
        }
        filesArray.push(data)
        this.uploadFiles.push(item.img_url)
      });
      this.setState({
        activeName: nextProps.activeInfo.activeInfo.name,
        activeAsc: nextProps.activeInfo.activeInfo.desc,
        files: filesArray
      })
    }
  }
  submitForm =()=>{
    const form = this.props.form
    let errors = form.getFieldError()
    let error = ''
    let values = form.getFieldsValue()
    for(let key in errors) {
      if(errors[key]) {
        error = errors[key]
        break
      }
    }
    let img_urls = ""
    this.uploadFiles.forEach((item, index)=>{
      if(index !== this.uploadFiles.length - 1){
        img_urls = img_urls + item + ','
      }else{
        img_urls = img_urls + item
      }
    })

    let data = {
      id: this.props.location.query.id,
      active_name: values.activityName,
      active_desc: values.activityInfo,
      active_images: img_urls 
    }
    this.props.editeActive(data)
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div id='eDitePublish' className='publishActivity userFeedBack'>
        <TopNavBar title='编辑活动' />
        <div className='publishActivityWrapper'>
          <div>
            <form name="publishActivity" >
              <div className="inputs">
                <div className="phone">
                  <List>
                    <InputItem
                      clear
                      type="name"
                      {...getFieldProps('activityName', {
                        initialValue: this.state.activeName
                      })}
                    >
                    </InputItem>
                    <InputItem
                      clear
                      type="name"
                      {...getFieldProps('activityInfo', {
                        initialValue: this.state.activeAsc
                      })}
                    >
                    </InputItem>
                    <div className="imagePick">
                      <ImagePicker
                        files={this.state.files}
                        onChange={this.onImgChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={this.state.files.length < 3}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                      />
                      {this.state.files.length > 0 ? null : <span className="tips">添加活动图片(最多9张)</span>}
                    </div>
                  </List>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="submitBtn" onClick={this.submitForm}>提交</div>
      </div>
    )
  }
}

EditePublish = createForm()(EditePublish)

EditePublish = connect(
	state => ({
    activeInfo: state.getIndustryInfo
  }),
	{ getActiveInfo, editeActive }
)(EditePublish)
export default EditePublish