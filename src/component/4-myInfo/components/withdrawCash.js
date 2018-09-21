import React from 'react'
import TopNavBar from './topNavBar'
import { Icon, InputItem, List } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { createForm } from 'rc-form'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let moneyKeyboardWrapProps
if (isIPhone) {
	moneyKeyboardWrapProps = {
		onTouchStart: e => e.preventDefault(),
	}
}

class WithdrawCash extends React.Component {
	render() {
		const { getFieldProps } = this.props.form
		return (
			<div className="withdrawCash">
				<TopNavBar title="提现" rightContent={false} />
				<div className="withdrawInputBox">
					<div className="bankChoose">
						<Link to={`/wallet/withdraw/selectBankCard`}>
							<div className="img">
								<img src={require('../../../images/myInfo/icon_gongshang.png')} alt="" />
							</div>
							<div className="bankName">中国工商银行（5077）</div>
							<Icon type="right" size="lg" color="#c5c5c5" />
						</Link>
					</div>

					<div className="withdrawInput">
						<span className="iconRMB">￥</span>
						<div className="input">
							<List>
								<InputItem
									{...getFieldProps('money')}
									type="money"
									clear
									moneyKeyboardAlign="left"
									moneyKeyboardWrapProps={moneyKeyboardWrapProps}
								/>
							</List>
						</div>
						<span className="withdrawAll">全部提现</span>
					</div>
					<div className="totalAndFee">
						共需支付
						<span className="total">298.29</span>元
						<span className="tips">
							（含
							<span className="percent">1%</span>
							手续费：
							<span className="fee">0.29</span>
							元）
						</span>
					</div>
				</div>
				<div className="sureWithdraw">确认提现</div>
			</div>
		)
	}
}

WithdrawCash = createForm()(WithdrawCash)

export default WithdrawCash
