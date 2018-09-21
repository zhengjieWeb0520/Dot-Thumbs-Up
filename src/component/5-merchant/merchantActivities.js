import React from 'react'
import BScroll from 'better-scroll'
import { Link } from 'react-router-dom'
import './merchant.scss'

class MerchantActivities extends React.Component{
  componentDidMount(){   
    const wrapper = document.querySelector('.merchantContent')
    const scroll = new BScroll(wrapper,{click: true})
  }
  render(){
    return(
      <div id='merchantActivities' className='merchantActivities'>
        <div>
          <div>
            <div>
              {/* 轮播图 */}
            </div>
            <div>
              <Link to='/index'></Link>
            </div>
          </div>
          <div>
            <div>
              <p>
                <span>商家名称</span>
                <span></span>
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
              </p>
            </div>
          </div>      
        </div>
        <div className='merchantContent'>
          <div className = 'merchantItemContent'>
            <Link to= '/index'className = 'merchantItem'>
              <div>
                <p>活动名称活动名称</p>
                <p>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='grayStar'></i>
                  <span>4.0分</span>
                </p>
                <p>
                  <i></i>
                  <span>4365/4365</span>
                </p>
                <p>发起时间：2018-09-09</p>
              </div>
              <div>
                <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
                <p>状态：{'已结束'}</p>
              </div>
            </Link>
            <Link to='/index' className = 'merchantItem'>
            <div>
                <p>活动名称活动名称</p>
                <p>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='grayStar'></i>
                  <span>4.0分</span>
                </p>
                <p>
                  <i></i>
                  <span>4365/4365</span>
                </p>
                <p>发起时间：2018-09-09</p>
              </div>
              <div>
                <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
                <p>状态：{'已结束'}</p>
              </div>           
            </Link>
            <Link to='/index' className = 'merchantItem'>
            <div>
                <p>活动名称活动名称</p>
                <p>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='grayStar'></i>
                  <span>4.0分</span>
                </p>
                <p>
                  <i></i>
                  <span>4365/4365</span>
                </p>
                <p>发起时间：2018-09-09</p>
              </div>
              <div>
                <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
                <p>状态：{'已结束'}</p>
              </div>           
            </Link>
            <Link to='/index' className = 'merchantItem'>
            <div>
                <p>活动名称活动名称</p>
                <p>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='orangeStar'></i>
                  <i className='grayStar'></i>
                  <span>4.0分</span>
                </p>
                <p>
                  <i></i>
                  <span>4365/4365</span>
                </p>
                <p>发起时间：2018-09-09</p>
              </div>
              <div>
                <p className='radiuOne'><i></i><span>一等奖:<span>¥500</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuTwo'><i></i><span>二等奖:<span>¥300</span><span className='rmb'>RMB</span></span></p>
                <p className='radiuThree'><i></i><span>三等奖:<span>¥100</span><span className='rmb'>RMB</span></span></p>
                <p>状态：{'已结束'}</p>
              </div>           
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default MerchantActivities