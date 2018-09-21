import React from 'react'
import { getChildNode } from './../../../utils/utils'
import { Link } from 'react-router-dom'
import ActivityEvaluate from './activityInfo/activityEvaluate'
import ActivityInfoContent from './activityInfo/activityInfoContent'
import ActivityMerchant from './activityInfo/activityMerchant'

class ActivityInfo extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      tabFlag: 0,
      collectCondition: ''
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
  //收藏
  collectClick(e){
    console.log(e)
    let _this = this
    let collectDom = document.querySelector('.collectionCondition')
    collectDom.style.display = 'block'
    if(e.target.className === 'uncollection'){
      e.target.classList.remove('uncollection')
      e.target.classList.add('collection')
      _this.setState({
        collectCondition: '已收藏'
      },()=>{
        setTimeout(() => {
          collectDom.style.display = 'none'
        }, 1500);
      })
    }else if(e.target.className === 'collection'){
      e.target.classList.remove('collection')
      e.target.classList.add('uncollection')
      _this.setState({
        collectCondition: '已取消'
      },()=>{
        setTimeout(() => {
          collectDom.style.display = 'none'
        }, 1500);
      })
    }
  }
  render(){
    return(
      <div id='ActivityInfo' className='activityInfo'>
        <div>
          <div>
            <div>
              {/* 轮播图 */}
            </div>
            <div>
              <Link to='/index'></Link>
              <span></span>
              <span className='collectionCondition'>{this.state.collectCondition}</span>
              <i className='uncollection' onTouchEnd = {(v) => {this.collectClick(v)}}></i>
              <i className='share'></i>
            </div>
          </div>
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