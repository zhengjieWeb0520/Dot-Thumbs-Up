import React from 'react'
import TopNavBar from './topNavBar'

class AboutUs extends React.Component {
  render() {
    return (
      <div className="aboutUs">
        <TopNavBar title="关于我们"/>
        <div className="logo"></div>
        <div className="desc">点赞宝</div>
        <span className="edition">v1.0.0</span>
        <div className="copyRight">
          <p>xxx网络科技有限公司</p>
          <p>Copyright ©2018 xx Netword Technology Co., Ltd.</p>
        </div>
      </div>
    )
  }
}

export default AboutUs