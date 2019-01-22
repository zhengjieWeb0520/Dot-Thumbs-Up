import React from 'react'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

function Arrow() {
  return <span className="icon iconfont icon-jiantou1"></span>
}

class TopNavBar extends React.Component {
  componentDidMount(){
  }
  onLeftClick = () => {
    if(this.props.activeId){
      let data = {
        activeId: this.props.activeId,
        goto: '/index'
      }
      let path = {
        pathname : '/activityInfo',
        query: data
      }
      this.props.history.push(path)
    }else{
      this.props.history.goBack()
    }
    
  }

  onRightClick = () => {
    if(this.props.match.url === '/chooseBankCard/newBankCard') {
      this.props.submitForm()
    }
  }

  render() {
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

export default withRouter(TopNavBar)
