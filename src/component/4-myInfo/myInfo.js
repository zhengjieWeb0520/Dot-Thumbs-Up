import React from 'react'
import { WhiteSpace } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import ChooseBankCard from './components/chooseBankCard'
import MyInfoMain from './components/myInfoMain'
import './myInfo.scss'

//我的组件
class MyInfo extends React.Component{
  render(){
    const url = this.props.match.url
    return(
      <div className="myContainer">
        <Switch>
          <Route path={`${url}`} exact component={MyInfoMain}></Route>
          <Route path={`${url}/chooseBankCard`} component={ChooseBankCard}></Route>
        </Switch>
      </div>
    )
  }
}

export default MyInfo