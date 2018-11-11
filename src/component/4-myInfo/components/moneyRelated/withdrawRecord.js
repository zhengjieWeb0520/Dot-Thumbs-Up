import React from 'react'
import TopNavBar from '../topNavBar'
import { Popover, NavBar, Icon } from 'antd-mobile'
const Item = Popover.Item;

class WithdrawRecord extends React.Component {
  constructor(props){
    super(props)
    this.state={
      visible: false,
      selected: ''
    }
  }

  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };

	render() {
		return (
			<div className="withdrawRecord">
				<TopNavBar title="提现记录" rightContent={false} />
				<div className="totalAndDate">
					<div className="totalWithdraw">
						总提现：
						<span>
							￥<span>78756</span>
						</span>
					</div>
					<div className="date">
						2018年8月
						<Popover
							mask={false}
							overlayClassName="fortest"
							overlayStyle={{ color: 'currentColor' }}
							visible={this.state.visible}
							overlay={[
								<Item key="1" value="scan" data-seed="logId">
									1月
								</Item>,
								<Item key="2" value="scan" data-seed="logId">
									2月
								</Item>,
								<Item key="3" value="scan" data-seed="logId">
									3月
								</Item>,
								<Item key="4" value="scan" data-seed="logId">
									4月
								</Item>
							]}
							align={{
								overflow: { adjustY: 0, adjustX: 0 },
								offset: [0, 0]
							}}
							onVisibleChange={this.handleVisibleChange}
							onSelect={this.onSelect.bind(this)}
						>
							<div
								style={{
									position: 'absolute',
									right: '5%',
									top: '46%',
									transform: 'translateY(-50%)'
								}}
							>
                <Icon type={'down'} size={'lg'}/>
							</div>
						</Popover>
					</div>
				</div>
        <ul className="withDrawList">
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
            <div className="content">
              <div className="bankInfo">
                <p className="whichBank">提现到 建设银行 <span>8月8日 12:00</span></p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="numberProcess">
                <p className="money"><span>￥</span>400.00</p>
                <p className="process">已处理</p>
              </div>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
            <div className="content">
              <div className="bankInfo">
                <p className="whichBank">提现到 建设银行 <span>8月8日 12:00</span></p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="numberProcess">
                <p className="money"><span>￥</span>400.00</p>
                <p className="process">已处理</p>
              </div>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
            <div className="content">
              <div className="bankInfo">
                <p className="whichBank">提现到 建设银行 <span>8月8日 12:00</span></p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="numberProcess">
                <p className="money"><span>￥</span>400.00</p>
                <p className="process">已处理</p>
              </div>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
            <div className="content">
              <div className="bankInfo">
                <p className="whichBank">提现到 建设银行 <span>8月8日 12:00</span></p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="numberProcess">
                <p className="money"><span>￥</span>400.00</p>
                <p className="process">已处理</p>
              </div>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
            <div className="content">
              <div className="bankInfo">
                <p className="whichBank">提现到 建设银行 <span>8月8日 12:00</span></p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="numberProcess">
                <p className="money"><span>￥</span>400.00</p>
                <p className="process">已处理</p>
              </div>
            </div>
          </li>
        </ul>
			</div>
		)
	}
}

export default WithdrawRecord
