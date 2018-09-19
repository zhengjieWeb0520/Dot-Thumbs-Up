import React from 'react'
import { List, InputItem, Picker, DatePicker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import TopNavBar from './topNavBar'
import { previewImg } from '../../../utils/utils'
import axios from 'axios'
import qs from 'qs'

class BussinessAuthentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bankList: [
				{
					value: '中国农业银行',
					label: '中国农业银行'
				},
				{
					value: '中国工商银行',
					label: '中国工商银行'
        },
        {
					value: '中国招商银行',
					label: '中国招商银行'
        },
        {
					value: '南京银行',
					label: '南京银行'
				}
      ],
      bankBranchList: [
				{
					value: '雨花台支行',
					label: '雨花台支行'
				},
				{
					value: '建邺支行',
					label: '建邺支行'
        },
        {
					value: '玄武支行',
					label: '玄武支行'
        },
        {
					value: '栖霞支行',
					label: '栖霞支行'
        }
      ],
      cols: 1
    }
  }

  //身份证正反面、营业执照预览图片
  handleChange = (type, val) => {
    if(type === 'positive') {
      previewImg("positive")
    }else if(type === 'reverse') {
      previewImg("reverse")
    }else if(type === 'licence') {
      previewImg("licence")
    }
  }

  //提交表单
  submitForm = () => {
    let abc = document.forms['fileinfo']
    console.log(abc)
    const form = this.props.form
    let errors = form.getFieldsError()
    let error = false
    for(let key in errors) {
      if(errors[key]) {
        error = true
      }
    }

    if(!error) {
      let values = form.getFieldsValue()
      console.log(values)
      if(!values.HosterName) {
        Toast.info('请填写商家名称', 1)
        return
      }else if(!values.startTime) {
        Toast.info('选择开始时间', 1)
        return
      }else if(!values.endTime) {
        Toast.info('选择结束时间', 1)
        return
      }else if(!values.phone) {
        Toast.info('填写联系电话', 1)
        return
      }else if(!values.province) {
        Toast.info('选择省份', 1)
        return
      }else if(!values.city) {
        Toast.info('选择城市', 1)
        return
      }else if(!values.level1) {
        Toast.info('选择分类一级', 1)
        return
      }else if(!values.level2) {
        Toast.info('选择分类二级', 1)
        return
      }
      
      let positive = document.forms['fileinfo'].positive.files[0]
      let reverse = document.forms['fileinfo'].reverse.files[0]
      let licence = document.forms['fileinfo'].licence.files[0]
      console.log(positive)
      if(!positive) {
        Toast.info('请选择身份证正面', 1)
        return
      }else if(!reverse) {
        Toast.info('请选择身份证反面', 1)
        return
      }else if(!reverse) {
        Toast.info('请选择营业执照', 1)
        return
      }
      let data = new FormData()
      let allData = {
        'HosterName': values.HosterName,
        'CrewId': values.CrewId == 'undefined' ? '' : values.CrewId,
        'startTime': values.startTime,
        'endTime': values.endTime,
        'phone': values.phone,
        'province': values.province,
        'city': values.city,
        'level1': values.level1,
        'level2': values.level2,
        'positive': positive,
        'reverse': reverse,
        'licence': licence
      }

      for(let key in allData) {
        data.append(key, allData[key])
      }
      axios.post("/index/data", data)
        .then((res) => {
          console.log(res)
        })
    }else {
      Toast.info('填写有误', 1)
    }
    
  }

  //商家名称验证
  validateHosterName = (rule, value, callback) => {
    if(value) {
      if (value.replace(/\s/g, '').length < 5 || value.replace(/\s/g, '').length > 16) {
        callback(new Error('请输入5到16位字符'));
      }else {
        callback()
      }
    }
  }

  //员工号验证
  validatorCrewId = (rule, value, callback) => {
    if(value) {
      if (value.replace(/\s/g, '').length < 6) {
        callback(new Error('请输入0到6位数字'));
      }else {
        callback()
      }
    }
  }

  //手机号验证
  validatorPhone = (rule, value, callback) => {
    if(value) {
      if (value.replace(/\s/g, '').length < 11) {
        callback(new Error('请输入11位手机号'));
      }else {
        callback()
      }
    }
  }

  
  //错误信息提示
  onErrorClick(type) {
    if(type === 'HosterName') {
      Toast.info('请输入5到16位字符', 1)
    }else if(type === 'CrewId') {
      Toast.info('请输入0到6位数字', 1)
    }else if(type === 'phone') {
      Toast.info('请输入11位手机号', 1)
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className="bussinessAuthentication bussinessAndStaff">
        <TopNavBar title="商家认证" rightContent={false} />
        <div className="AuthenticationBox">
          <form name="fileinfo">
          <div className="inputs">
            <List>
              <InputItem
                {...getFieldProps('HosterName', {
                  rules: [
                    { validator: this.validateHosterName
                    }
                  ]
                })}
                error={!!getFieldError('HosterName')}
                onErrorClick={() =>this.onErrorClick('HosterName')}
                clear
                placeholder="商家名称"
              >
              </InputItem>
              <InputItem
                {...getFieldProps('CrewId', {
                  rules: [
                    { validator: this.validatorCrewId
                    }
                  ]
                })}
                error={!!getFieldError('CrewId')}
                onErrorClick={() =>this.onErrorClick('CrewId')}
                clear
                type="number"
                placeholder="推荐员工号"
              >
              </InputItem>
              <div className="timePick">
                <DatePicker
                  mode="time"
                  minuteStep={2}
                  use12Hours
                  title="开始营业时间"
                  onChange={time => this.handleChange("startTime", time)}
                  extra="开始营业时间"
                  {...getFieldProps('startTime')}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
                <DatePicker
                  mode="time"
                  minuteStep={2}
                  use12Hours
                  // value={this.state.endTime}
                  title="结束营业时间"
                  onChange={time => this.handleChange("endTime", time)}
                  extra="结束营业时间"
                  {...getFieldProps('endTime')}
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
              </div>
              <InputItem
                {...getFieldProps('phone', {
                  rules: [
                    {validator: this.validatorPhone}
                  ]
                })}
                error={!!getFieldError('phone')}
                onErrorClick={() =>this.onErrorClick('phone')}
                clear
                type="phone"
                placeholder="联系电话"
              >
              </InputItem>
              <div className="regionPicker">
                <Picker
                  data={this.state.bankBranchList}
                  cols={1}
                  // value={this.state.province}
                  extra="请选择所在省"
                  {...getFieldProps('province')}
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
                <Picker
                  data={this.state.bankBranchList}
                  cols={1}
                  // value={this.state.city}
                  extra="请选择所在市"
                  {...getFieldProps('city')}
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
              </div>
              <div className="regionPicker">
                <Picker
                  data={this.state.bankBranchList}
                  cols={1}
                  // value={this.state.province}
                  extra="分类一级"
                  {...getFieldProps('level1')}
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
                <Picker
                  data={this.state.bankBranchList}
                  cols={1}
                  value={this.state.city}
                  extra="分类二级"
                  {...getFieldProps('level2')}
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
              </div>
            </List>
          </div>
          <div className="imgs">
            <div className="identity">
              <div className="positive img">
                <input id="positive" type="file" name="positive" onChange={() => this.handleChange('positive')}/>
                <img className="preview" src={require("../../../images/myInfo/identity_positive@2x.png")} alt="身份证正面"/>
              </div>
              <div className="reverse img">
                <input id="reverse" type="file" name="reverse" onChange={() => this.handleChange('reverse')}/>
                <img className="preview" src={require("../../../images/myInfo/identity_reverse@2x.png")} alt="身份证反面"/>
              </div>
            </div>
            <div className="bussinessLicence">
              <div className="licence img">
                <input id="licence" type="file" name="licence" onChange={() => this.handleChange('licence')}/>
                <img className="preview" src={require("../../../images/myInfo/bussiness_lisence@2x.png")} alt="营业执照"/>
              </div>
            </div>
          </div>
          <div className="submitBtn" onClick={this.submitForm}>提交</div>
          </form>
        </div>
      </div>
    )
  }
}

BussinessAuthentication = createForm()(BussinessAuthentication)

export default BussinessAuthentication