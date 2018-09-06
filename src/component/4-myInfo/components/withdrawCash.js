import React from 'react'
import TopNavBar from './topNavBar'
import { Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'

class WithdrawCash extends React.Component {
  render() {
    return (
      <div className="withdrawCash">
        <TopNavBar title="提现" rightContent={false} />
        <div className="withdrawInputBox">
          <div className="bankChoose">
            <Link to={`/wallet/withdraw/selectBankCard`}>
              <div className="img">
                <img src={require("../../../images/myInfo/icon_gongshang.png")} alt=""/>
              </div>
              <div className="bankName">中国工商银行（5077）</div>
              <Icon type="right" size="lg" color="#c5c5c5"/>
            </Link>
          </div>

          <div className="withdrawInput">
            <span className="iconRMB">￥</span>
            <input 
              className="input" 
              type="number" 
              maxlength="6" 
              pattern="[0-9]*"  
              name="password" 
              oninput="if(value.length>6)value=value.slice(0,6)"
              placeholder="账户余额 298.00元"
            />
            <span className="withdrawAll">全部提现</span>
          </div>
          <div className="totalAndFee">
            共需支付<span className="total">298.29</span>元
            <span className="tips">（含<span className="percent">1%</span>手续费：<span className="fee">0.29</span>元）</span>
          </div>
        </div>
        <div className="sureWithdraw">确认提现</div>
      </div>
    )
  }
}

export default WithdrawCash