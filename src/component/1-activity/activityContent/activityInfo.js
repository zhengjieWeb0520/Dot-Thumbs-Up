import React from 'react'
import { getChildNode } from './../../../utils/utils'

import ActivityEvaluate from './activityInfo/activityEvaluate'
import ActivityInfoContent from './activityInfo/activityInfoContent'
import ActivityMerchant from './activityInfo/activityMerchant'

class ActivityInfo extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      tabFlag: 0
    }
  }
  componentDidMount(){
    let _this = this
    let menuListUl = document.querySelector('.tabSwitch ul')
    let menuListLis = getChildNode(menuListUl)
    //点击活动切换
    menuListUl.addEventListener('click', function(e){
      menuListLis.forEach((item, index)=>{
        item.classList.remove('tabActive')
      })
      console.log(e)
      if(e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('tabActive')
      }else{
        e.target.classList.add('tabActive')
      }
      if(e.target.textContent === '活动'){
        _this.setState({
          tabFlag: 0
        })
      }else if(e.target.textContent === '评价'){
        _this.setState({
          tabFlag: 1
        })     
      }else if(e.target.textContent === '商家'){
        _this.setState({
          tabFlag: 2
        })  
      }
    })
  }
  switchContent(){
    switch(this.state.tabFlag){
      case 0:
        return (<ActivityInfoContent />)
        break;
      case 1:
        return (<ActivityEvaluate />)
        break;
      case 2:
        return (<ActivityMerchant />)
        break;
      default:
        return null
        break;
    }
  }
  render(){
    return(
      <div id='ActivityInfo' className='activityInfo'>
        <div>
          <div></div>
          <div>
            <div>
              <p>
                <span>商家名称</span>
                <span>(活动名称活动名称)</span>
              </p>
              <p>
                <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='grayStar'></i>
                <span>4.0分</span>
                <span>距离你433m</span>
              </p>
            </div>
            <div>
              <p>
                <i id='merchant' className='goldmedal'></i>
                <span>金牌商家</span>
              </p>
              <p>
                <i id='merchant' className='goldmedal'></i>
                <span>12345</span>
              </p>
            </div>
          </div>
          <div className='tabSwitch'>
            <ul>
              <li className='tabActive'><span>活动</span></li>
              <li><span>评价</span></li>
              <li><span>商家</span></li>
            </ul>
          </div>
          {this.switchContent()}
          <div className='activityInfoFooter'>
            <ul>
              <li>
                <i></i>
                <span>我要点赞</span>
              </li>
              <li>
                <i></i>
                <span>我的集赞</span>
              </li>
            </ul>
          </div>          
        </div>
      </div>
    )
  }
}

export default ActivityInfo