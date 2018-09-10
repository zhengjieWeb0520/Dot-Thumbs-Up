import React from 'react'
import TopNavBar from './topNavBar'

class BussinessAuthentication extends React.Component {
  render() {
    return (
      <div className="bussinessAuthentication">
        <TopNavBar title="商家认证" rightContent={false} />
        <div className="AuthenticationBox">
          <div className="inputs"></div>
          <div className="imgs"></div>
          <div className="submitBtn">提交</div>
        </div>
      </div>
    )
  }
}

export default BussinessAuthentication