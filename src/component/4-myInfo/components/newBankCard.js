import React from 'react'
import TopNavBar from './topNavBar'
import { List, InputItem, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
class NewBankCard extends React.Component {
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
			cols: 1,
			bankBranchValue: [],
			bankValue: []
		}
  }
  
  onClick = () => {
    
  };

  //选择器确定
  onPickerOk(type, value)  {
    this.setState({
      [type]: value
    })
  }

  //点击验证码
  onExtraClick() {
    console.log("aa")
  }

	render() {
		const { getFieldProps } = this.props.form
		return (
			<div className="newBankCard">
				<TopNavBar title="选择银行卡" rightContent={'确认'} />
				<div className="inputsBox">
					<List>
						<InputItem
							{...getFieldProps('HosterName')}
							clear
							placeholder="请输入持卡人姓名"
							ref={el => (this.autoFocusInst = el)}
						>
              <span className="justifyItem">持卡人</span>：
						</InputItem>
						<InputItem
							{...getFieldProps('HosterNumber')}
              clear
              type="number"
							placeholder="请输入持卡人证件号"
							ref={el => (this.inputRef = el)}
						>
              <span className="justifyItem">证件号码</span>：
						</InputItem>
						<InputItem
							{...getFieldProps('HosteTel')}
							clear
							placeholder="请输入该卡与银行绑定的手机号"
							ref={el => (this.inputRef = el)}
						>
							<span className="justifyItem">手机号码</span>：
						</InputItem>
						<InputItem
							{...getFieldProps('HosterCode')}
							clear
							placeholder="请输入收到的验证码"
              ref={el => (this.inputRef = el)}
              extra="发送验证码"
              onExtraClick={() => this.onExtraClick()}
						>
							<span className="justifyItem">验证码</span>：
						</InputItem>
					</List>
					<List>
						<Picker
							data={this.state.bankList}
							cols={this.state.cols}
							value={this.state.bankValue}
							onOk={(val) => this.onPickerOk('bankValue', val)}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
                <span className="justifyItem">银行</span>：
							</List.Item>
						</Picker>
						<Picker
              data={this.state.bankBranchList}
							cols={this.state.cols}
							value={this.state.bankBranchValue}
              onOk={(val) => this.onPickerOk('bankBranchValue', val)}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
              <span className="justifyItem">支行</span>：
							</List.Item>
						</Picker>
						<InputItem
							{...getFieldProps('HosterCardNum')}
							clear
							placeholder="请填写银行卡号"
							ref={el => (this.inputRef = el)}
						>
							<span className="justifyItem">卡号</span>：
						</InputItem>
					</List>
				</div>
			</div>
		)
	}
}
NewBankCard = createForm()(NewBankCard)

export default NewBankCard
