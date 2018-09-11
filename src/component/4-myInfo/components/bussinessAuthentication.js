import React from 'react'
import { List, InputItem, Picker, DatePicker, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import TopNavBar from './topNavBar'

class BussinessAuthentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: null,
      endTime: null,
      province: null,
      city: null,
      files: [],
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

  handleChange(type, val) {
    if(type === 'positive' || type === 'reverse') {
      this.setState({
        positive: {'background' : 'url(' + val.target.value + ')'}
      })
    }
    console.log(val)
    console.log(val.target.value)
    // this.setState({
    //   [type]: val
    // })
  }

  //图片转base64
  convertToBase64() {
    let fileReader = new FileReader()
    //最大上传2m的图片
    const AllowImgFileSize = 2100000
    let imgUrlBase64;

    imgUrlBase64 = fileReader.readAsDataURL('https://img.alicdn.com/bao/uploaded/TB1qimQIpXXXXXbXFXXSutbFXXX.jpg')
    fileReader.onloadend = function() {
      if (AllowImgFileSize != 0 && AllowImgFileSize < fileReader.result.length) {
        alert( '上传失败，请上传不大于2M的图片！')
        return
      }else{
        console.log(imgUrlBase64)
        //执行上传操作
        console.log(fileReader.result);
      }
    }
  }

  render() {
    const { getFieldProps } = this.props.form
    let positiveStyle = this.state.positive ? this.state.positive : {}
    let reverseStyle = this.state.reverse ? this.state.reverse : {}
    let licenceStyle = this.state.licence ? this.state.licence : {}
    return (
      <div className="bussinessAuthentication bussinessAndStaff">
        <TopNavBar title="商家认证" rightContent={false} />
        <div className="AuthenticationBox">
          <div className="inputs">
            <List>
              <InputItem
                {...getFieldProps('HosterName')}
                clear
                placeholder="商家名称"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
              <InputItem
                {...getFieldProps('CrewId')}
                clear
                type="number"
                placeholder="推荐员工号"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
              <div className="timePick">
                <DatePicker
                  mode="time"
                  minuteStep={2}
                  use12Hours
                  value={this.state.startTime}
                  title="开始营业时间"
                  onChange={time => this.handleChange("startTime", time)}
                  extra="开始营业时间"
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
                <DatePicker
                  mode="time"
                  minuteStep={2}
                  use12Hours
                  value={this.state.endTime}
                  title="结束营业时间"
                  onChange={time => this.handleChange("endTime", time)}
                  extra="结束营业时间"
                >
                  <List.Item arrow="horizontal"></List.Item>
                </DatePicker>
              </div>
              <InputItem
                {...getFieldProps('phone')}
                clear
                type="number"
                placeholder="联系电话"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
              <div className="regionPicker">
                <Picker
                  data={this.state.bankBranchList}
                  cols={this.state.cols}
                  value={this.state.province}
                  onOk={(val) => this.handleChange('province', val)}
                  extra="请选择所在省"
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
                <Picker
                  data={this.state.bankBranchList}
                  cols={this.state.cols}
                  value={this.state.city}
                  onOk={(val) => this.handleChange('city', val)}
                  extra="请选择所在市"
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
              </div>
              <div className="regionPicker">
                <Picker
                  data={this.state.bankBranchList}
                  cols={this.state.cols}
                  value={this.state.province}
                  onOk={(val) => this.handleChange('province', val)}
                  extra="分类一级"
                >
                  <List.Item arrow="horizontal">
                  </List.Item>
                </Picker>
                <Picker
                  data={this.state.bankBranchList}
                  cols={this.state.cols}
                  value={this.state.city}
                  onOk={(val) => this.handleChange('city', val)}
                  extra="分类二级"
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
                <input type="file" onChange={(val) => this.handleChange('positive', val)}/>
                <div className="preview" style={positiveStyle}></div>
              </div>
              <div className="reverse img">
                <input type="file" onChange={(val) => this.handleChange('reverse', val)}/>
                <div className="preview" style={reverseStyle}></div>
              </div>
            </div>
            <div className="bussinessLicence">
              <div className="licence img">
                <input type="file" onChange={(val) => this.handleChange('licence', val)}/>
                <div className="preview" style={licenceStyle}></div>
              </div>
            </div>
          </div>
          <div className="submitBtn">提交</div>
        </div>
      </div>
    )
  }
}

BussinessAuthentication = createForm()(BussinessAuthentication)

export default BussinessAuthentication