import React from 'react'
import TopNavBar from './topNavBar'
import { List, InputItem, Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
class NewBankCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      data: [{
        value: 'zj-nb',
        label: '宁波',
      }, {
        value: 'zj-hz',
        label: '杭州',
      }],
      cols: 1,
      pickerValue: [],
      asyncValue: [],
      sValue: ['2013', '春'],
      visible: false,
      colorValue: ['#00FF00'],
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="newBankCard">
        <TopNavBar title="选择银行卡" rightContent={true}/>
        <div className="inputsBox">
          <List>
            <InputItem
              {...getFieldProps('autofocus')}
              clear
              placeholder="auto focus"
              ref={el => this.autoFocusInst = el}
            >持卡人：</InputItem>
            <InputItem
              {...getFieldProps('focus')}
              clear
              placeholder="click the button below to focus"
              ref={el => this.inputRef = el}
            >证件号码：</InputItem>
            <InputItem
              {...getFieldProps('focus')}
              clear
              placeholder="click the button below to focus"
              ref={el => this.inputRef = el}
            >手机号码：</InputItem>
            <InputItem
              {...getFieldProps('focus')}
              clear
              placeholder="click the button below to focus"
              ref={el => this.inputRef = el}
            >验证码：<span>发送验证码</span></InputItem>
          </List>
          <List>
          <Picker
            data={this.state.data}
            cols={this.state.cols}
            value={this.state.asyncValue}
            onPickerChange={this.onPickerChange}
            onOk={v => console.log(v)}
          >
            <List.Item arrow="horizontal" onClick={this.onClick}>银行</List.Item>
          </Picker>
          <Picker
            data={this.state.data}
            cols={this.state.cols}
            value={this.state.asyncValue}
            onPickerChange={this.onPickerChange}
            onOk={v => console.log(v)}
          >
            <List.Item arrow="horizontal" onClick={this.onClick}>支行</List.Item>
          </Picker>
            <InputItem
              {...getFieldProps('focus')}
              clear
              placeholder="click the button below to focus"
              ref={el => this.inputRef = el}
            >卡号：</InputItem>
          </List>
        </div>
      </div>
    )
  }
}
NewBankCard = createForm()(NewBankCard)

export default NewBankCard