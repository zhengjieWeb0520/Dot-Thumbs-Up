import React from 'react'
import { Link } from 'react-router-dom'

class Wallet extends React.Component {
  onLeftClick() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="walletContainer">
        <div className="walletTop">
          <div className="nav">
            <span className="icon iconfont icon-jiantou1" onClick={this.onLeftClick.bind(this)}></span>
            <span className="walletTitle">钱包</span>
            <span className="withdrawRecord">
              <Link to={`/wallet/withdrawRecord`}>
                提现记录
              </Link>
            </span>
          </div>
          <div className="remainCash"><i></i><span>钱包余额</span></div>
          <div className="cashNumber">13212.00 <span>RMB</span></div>
        </div>
        <div className="withdrawBtn">
          <Link to={`/wallet/withdraw`}>
            提现
          </Link>
        </div>
        <div className="incomeRecord">收入记录</div>
        <ul className="recordList">
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
          <li>
            <div className="img"><img src={require("../../../../images/myInfo/icon_merchant.png")} alt=""/></div>
            <div className="merchantName">
              <p className="merchant">商家名称</p>
              <p className="activity">活动名称</p>
            </div>
            <div className="numberDate">
              <p className="money"><span>￥</span>300.00</p>
              <p className="date">17-06-29 09:43</p>
            </div>
          </li>
        </ul>
        <div className="withdrawBtn">
          <Link to={`/wallet/withdraw`}>
            提现
          </Link>
        </div>
      </div>
    )
  }
}

export default Wallet
