import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

function Arrow() {
  return <span className="icon iconfont icon-jiantou1"></span>
}

class LoginNavBar extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }
  onLeftClick = () => {
    this.props.history.push(this.props.linkname)
  }
  render(){
    return (
      <div className="topNavBar">
        <NavBar
          mode="light"
          icon={<Arrow />}
          onLeftClick={this.onLeftClick}
          rightContent={[
            this.props.rightContent ? <span className="sureBtn" key="0" onClick={this.onRightClick}>{this.props.rightContent}</span> : null
          ]}
        >
          {this.props.title}
        </NavBar>
      </div>
    )
  }
}

export default withRouter(LoginNavBar)