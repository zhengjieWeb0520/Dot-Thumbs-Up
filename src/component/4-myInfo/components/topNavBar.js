import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
function Arrow() {
  return <span className="icon iconfont icon-jiantou1"></span>
}

class TopNavBar extends React.Component {
  onLeftClick() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="topNavBar">
        <NavBar
          mode="light"
          icon={<Arrow />}
          onLeftClick={this.onLeftClick.bind(this)}
          rightContent={[
            this.props.rightContent ? <span className="sureBtn">确认</span> : null
          ]}
        >
          {this.props.title}
        </NavBar>
      </div>
    )
  }
}

export default withRouter(TopNavBar)
