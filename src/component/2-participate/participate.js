import React from 'react'
import './participaye.scss'
import { getChildNode } from './../../utils/utils'

import ParticipateContent from './component/participateContent'
//参与组件
class Participate extends React.Component{
  componentDidMount(){
    let navListUl = document.querySelector(".participateTab ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('processingActive')
      })
      if(e.target.tagName === 'I' || e.target.tagName === 'P'){
        e.target.parentNode.classList.add('processingActive')
      }else {
        e.target.classList.add('processingActive')
      }
    }, false)
  }
  //组件切换
  render(){
    return(
      <div id="Participate">
        <div className='participateHeader'>   
          <div className='participateTitle'>我&nbsp;的&nbsp;参&nbsp;与</div>
          <div className='participateTab'>
            <ul>
              <li id='processing' className='processingActive'>
                <i></i> 
                <p>进行中</p>              
              </li>
              <li id='haveover'>
                <i></i> 
                <p>已结束</p>               
              </li>
              <li id='havewon'>
                <i></i> 
                <p>已中奖</p>                     
              </li>
              <li id='notwon'>
                <i></i> 
                <p>未中奖</p>  
              </li>
              <li id='allType'>
                <i></i> 
                <p>全部活动</p>  
              </li>
            </ul>
          </div>
        </div>
        <div className='participateContent participateWrapper'>
            <ParticipateContent />
        </div>
      </div>
    )
  }
}

export default Participate