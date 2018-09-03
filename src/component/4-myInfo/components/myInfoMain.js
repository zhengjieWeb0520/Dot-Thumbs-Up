import React from 'react'
import userAvatar from '../../../images/myInfo/userImage.png'
import { Link } from 'react-router-dom'

class MyInfoMain extends React.Component {
  render() {
    const url = this.props.match.url
    return (
      <div className="myInfoMain">
        <div className="userInfo">
          <div className="userAvatar">
            <div className="img">
              <img src={userAvatar} alt=""/>
            </div>
            <p className="userName">用户名称</p>
          </div>
          <div className="userAction">
            <ul>
              <li className="collection">
                <span className="icon"></span>
                <p>收藏</p>
              </li>
              <li className="involve">
                <span className="icon"></span>
                <p>参与</p>
              </li>
              <li className="recentView">
                <span className="icon"></span>
                <p>最近浏览</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="money_related">
          <ul>
            <li className="bankCard">
              <Link to={`${url}/chooseBankCard`}>
                <span className="icon"></span>
                <p className="title">银行卡</p>
                <p className="count">1张</p>
              </Link>
            </li>
            <li className="wallet">
              <span className="icon"></span>
              <p className="title">钱包</p>
              <p className="count"><b>¥</b>122.00</p>
            </li>
            <li className="voucher">
              <span className="icon"></span>
              <p className="title">卡劵</p>
              <p className="count">6张</p>
            </li>
          </ul>
        </div>
        <div className="certification">
          <ul>
            <li>商家认证<span className="icon iconfont icon-jiantou1"></span></li>
            <li>员工认证<span className="icon iconfont icon-jiantou1"></span></li>
          </ul>
        </div>
        <div className="otherOperate">
          <ul>
            <li>修改密码<span className="icon iconfont icon-jiantou1"></span></li>
            <li>关于我们<span className="icon iconfont icon-jiantou1"></span></li>
            <li>用户反馈<span className="icon iconfont icon-jiantou1"></span></li>
          </ul>
        </div>
        <div className="signOut">退出登陆</div>
      </div>
    )
  }
}

export default MyInfoMain