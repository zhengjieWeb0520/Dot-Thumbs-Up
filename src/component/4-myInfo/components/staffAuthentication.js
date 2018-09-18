import React from 'react'
import { List, InputItem, Picker, DatePicker, ImagePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import TopNavBar from './topNavBar'
import { previewImg } from '../../../utils/utils'

class StaffAuthentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
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
  render() {
    const { getFieldProps } = this.props.form
    let positiveStyle = this.state.positive ? this.state.positive : {}
    let reverseStyle = this.state.reverse ? this.state.reverse : {}
    return (
      <div className="staffAuthentication bussinessAndStaff">
        <TopNavBar title="员工认证" rightContent={false} />
        <div className="AuthenticationBox">
          <div className="inputs">
            <List>
              <InputItem
                {...getFieldProps('HosterName')}
                clear
                placeholder="姓名"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
              <InputItem
                {...getFieldProps('CrewId')}
                clear
                placeholder="性别"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
              <InputItem
                {...getFieldProps('phone')}
                clear
                type="number"
                placeholder="联系电话"
                ref={el => (this.autoFocusInst = el)}
              >
              </InputItem>
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
          </div>
          <div className="submitBtn">提交</div>
        </div>
      </div>
    )
  }
}

StaffAuthentication = createForm()(StaffAuthentication)

export default StaffAuthentication