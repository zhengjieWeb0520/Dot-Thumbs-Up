import React from 'react'
import BScroll from 'better-scroll'
import { getChildNode } from './../../../../utils/utils'
import yhHeader from './../../../../images/activity/evaluate/header.png'
import evaluateImg1 from './../../../../images/activity/evaluate/evaluateImg1.png'
import evaluateImg2 from './../../../../images/activity/evaluate/evaluateImg2.png'

class ActivityEvaluate extends React.Component{
  componentDidMount(){
    const wrapper = document.querySelector('.activityEvaluateWraper')
    const scroll = new BScroll(wrapper,{click: true})
    
    let navListUl = document.querySelector(".selectTab ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('evaluateActive')
        item.classList.remove('evaluateGray')
      })
      console.log(e)
      if(e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('evaluateActive')
        if(e.target.parentNode.getAttribute("name") === 'selectTab4'){
          e.target.parentNode.classList.add('evaluateGray')
        }
      }else {
        e.target.classList.add('evaluateActive')
        if(e.target.getAttribute("name") === 'selectTab4'){
          e.target.classList.add('evaluateGray')
        }
      }
    }, false)
  }
  render(){
    return(
      <div className='activityEvaluate activityEvaluateWraper'>
        <ul className='content'>
          <div>
            <div>4.7</div>
            <div>
              <p>商家评分</p>
              <p>
                <i className='evaluateAllStar'></i>
                <i className='evaluateAllStar'></i>
                <i className='evaluateAllStar'></i>
                <i className='evaluateAllStar'></i>
                <i className='evaluateHalfStar'></i>
              </p>
            </div>
          </div>
          <div className = 'selectTab'>
            <ul>
              <li name={'selectTab1'} className = 'evaluateActive'><span>全部</span></li>
              <li name={'selectTab2'}><span>最新</span></li>
              <li name={'selectTab3'}><span>好评&nbsp;{212}</span></li>
              <li name={'selectTab4'}><span>差评&nbsp;{65}</span></li>
              <li name={'selectTab5'}><span>味道好&nbsp;{12}</span></li>
            </ul>
          </div>
          <div className='evaluateContent'>
            <div className='evaluateItem'>
              <div>
                <img src={yhHeader} alt=""/>
              </div>
              <div>
                <div><span>用户名</span><span>2018-09-01</span></div>
                <div>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <span>超棒</span>
                </div>
                <div>活动很棒，很好玩，哈哈哈哈,活动很棒，很好玩，哈哈哈哈活动很棒，很好玩，哈哈哈哈，活动很棒，很好玩，哈哈哈哈，活动很棒，很好玩，哈哈哈哈</div>
                <div>
                  <img src={evaluateImg1} alt=""/>
                  <img src={evaluateImg2} alt=""/>
                </div>
              </div>
            </div>
            <div className='evaluateItem'>
              <div>
                <img src={yhHeader} alt=""/>
              </div>
              <div>
                <div><span>用户名</span><span>2018-09-01</span></div>
                <div>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <i className='evaluateAllStar'></i>
                  <span>超棒</span>
                </div>
                <div>活动很棒，很好玩，哈哈哈哈,活动很棒，很好玩，哈哈哈哈活动很棒，很好玩，哈哈哈哈，活动很棒，很好玩，哈哈哈哈，活动很棒，很好玩，哈哈哈哈</div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    )
  }
}

export default ActivityEvaluate