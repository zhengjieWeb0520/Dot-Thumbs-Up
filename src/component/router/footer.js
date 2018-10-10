import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getChildNode } from './../../utils/utils'

class Footer extends Component{
  componentDidMount(){
    let navListUl = document.querySelector(".footers ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('touchend', function(e){
      console.log(e)
      navListLis.forEach((item, index)=>{
        item.classList.remove('menuActive')
      })
      if(e.target.tagName === 'A'){
        e.target.parentNode.classList.add('menuActive')
      }else if(e.target.tagName === 'li'){
        e.target.classList.add('menuActive')
      }else {
        e.target.parentNode.parentNode.classList.add('menuActive')
      }
    }, false)
  }
  render(){
    const url = this.props.match.url
    return(
      <footer className="footers">
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
            <li id='menuParticipate'>
              <Link to={`/publish`}>
                <span className='img'></span>
                <p>发布</p>
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