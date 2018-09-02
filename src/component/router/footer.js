import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getChildNode } from './../../common/common'

import activityImg from './../../images/icon/acticity@2x.png'
import participateImg from './../../images/icon/participate@2x.png'
import myInfoImg from './../../images/icon/myinfo@2x.png'
import activityActiveImg from './../../images/icon/acticity-active@2x.png'
import participateActiveImg from './../../images/icon/participate-active@2x.png'
import myInfoActiveImg from './../../images/icon/myinfo-active@2x.png'

class Footer extends Component{
  componentDidMount(){
    let navListUl = document.querySelector("footer ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('menuActive')
      })
      if(e.target.tagName === 'a'){
        e.target.parentNode.classList.add('menuActive')
      }else {
        e.target.parentNode.parentNode.classList.add('menuActive')
      }
    }, false)
  }
  render(){
    const url = this.props.match.url
    return(
      <footer>
        <nav>
          <ul>
            <li id='menuActivity' className='menuActive'>
              <Link to={`${url}`}>
                <span className='img'></span>
                <p>活动</p>
              </Link>
            </li>
            <li id='menuParticipate'>
              <Link to={`${url}/participate`}>
                <span className='img'></span>
                <p>参与</p>
              </Link>
            </li>
            <li id='menuMyInfo'>
              <Link to={`${url}/myInfo`}>
                <span className='img'></span>
                <p>我的</p>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    )
  }
}
export default withRouter(Footer)