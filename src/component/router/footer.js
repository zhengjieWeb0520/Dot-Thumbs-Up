import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getChildNode, ObjectEquals} from './../../utils/utils'

class Footer extends Component{
  constructor(props){
    super(props)
    this.state={
      user_role_id : 0,
      user_images: []
    }
  }
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
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(!ObjectEquals({}, nextProps.userInfo)){
      this.setState({
        user_role_id: nextProps.userInfo.userInfo.user_info.role_id,
        user_images: nextProps.userInfo.userInfo.img_data.imgs
      }, ()=>{
        window.sessionStorage.setItem('user_role_id', this.state.user_role_id)
      })
    }
  }
  render(){
    console.log(this.state.user_role_id)
    let user_id = window.sessionStorage.getItem('user_role_id')
    let publishDom = null
    let path = {
      pathname: `/merchantActivities`,
      query: {
        user_images: this.state.user_images
      }
    }
    if(this.state.user_role_id === 2){
      publishDom = (<li id='menuParticipate'>
      <Link to={path}>
        <span className='img'></span>
        <p>发布</p>
      </Link>
    </li>)
    }
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
            {publishDom}
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
Footer = connect(
  state => ({
    userInfo : state.getUserInfo
  }),
  { }
)(Footer)
export default withRouter(Footer)