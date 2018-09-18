import React from 'react'
import BScroll from 'better-scroll'
import { Link } from 'react-router-dom'
import activities1 from './../../../images/activity/activities/item1.png'
import activities2 from './../../../images/activity/activities/item2.png'
import activities3 from './../../../images/activity/activities/item3.png'


class ActivityContent extends React.Component{
  componentDidMount(){
    const wrapper = document.querySelector('.wrapper')
    const scroll = new BScroll(wrapper,{click: true})
  }
  render(){
    return(
      <ul id='ActivityContent' className='ActivityContent content'>
        <Link to='/activityInfo' className='activityItem'>
          <div>
            <img src={activities1} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div>
            <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
          <div>
            <img src={activities2} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div>
            <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
          <div>
            <img src={activities3} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div className='bonusequal'>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
        <div>
            <img src={activities3} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div className='bonusequal'>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
        <div>
            <img src={activities3} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div className='bonusequal'>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
        <div>
            <img src={activities3} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div className='bonusequal'>
          </div>
        </Link>
        <Link to='/activityInfo' className='activityItem'>
        <div>
            <img src={activities3} alt=""/>
          </div>
          <div>
            <p>商家名称</p>
            <p>活动名称活动名称</p>
            <p>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='orangeStar'></i>
              <i className='grayStar'></i>
              <span>4.0分</span>
            </p>
            <p><span><i></i><span>4365</span></span><span><span>433m</span></span></p>
          </div>
          <div className='bonusequal'>
          </div>
        </Link>
      </ul>
    )
  }
}

export default ActivityContent