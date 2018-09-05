import React from 'react'
import './activity.scss'
import { SearchBar } from 'antd-mobile'
import { Select } from 'antd'
const Option = Select.Option;

// 活动组件
class Activity extends React.Component{
  constructor(props){
    super(props)
    this.loc = ''
    this.state= {
      TmapFlag: true, //只获取一次 
      address: ''
    }
  }
  componentWillMount(){
    let _this = this  
    window.addEventListener('message', function(event) {
      // 接收位置信息
      _this.loc = event.data
      if(_this.loc != null && _this.state.TmapFlag === true){
        console.log(_this.loc)
        _this.setState({
          TmapFlag: false,
          address: _this.loc.addr
        })
      }
      
     }, false);
  }
  render(){
    let iframeStyle = {
      width: '0',
      height: '0',
      frameBorder : '0',
      display: 'none',
      scrolling: 'no'
    }
    return(
      <div id='Activity'>
        <iframe id="geoPage" style={iframeStyle}
          src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp">
        </iframe>
        <div className='activityCondition'>
          <div className='activityKb'></div>
          <div className='activityHeader'>
            <div><i className='positionIcon'></i><span>{this.state.address}</span></div>
            <div><SearchBar placeholder="输入商家或活动关键字" maxLength={8} /></div>
          </div>
          <div className='activityLevel'>
            <div className='activityLevel1'>
              <ul>
                <li id='foodLevel'>
                  <i></i> 
                  <p>享美食</p>
                </li>
                <li id='lifeLevel'>
                  <i></i>
                  <p>惠生活</p>
                </li>
                <li id='enjoyLevel'>
                  <i></i>
                  <p>爱玩乐</p>                 
                </li>
                <li id='HotelLevel'>
                  <i></i>
                  <p>住酒店</p>   
                </li>
                <li id='allLevel'>
                  <i></i>
                  <p>全部</p>   
                </li>
              </ul>
            </div>
            <div className='activityLevel2'>
              <div>
                <span>
                  热门
                </span>
                <span>
                  小吃快餐
                </span>
                <span>
                  甜点饮品
                </span>
                <span>
                  火锅烧烤
                </span>
                <span>
                  日韩料理
                </span>
                <span>
                  炸鸡可乐
                </span>
              </div>
            </div>
            <div className='activityKbGray'>
            </div>
            <div className='activityLevel3'>
              <ul>
                <li>
                  <select>
                    <option>综合排序</option>
                    <option>好评优先</option>
                    <option>销量最高</option>
                    <option>点赞最多</option>
                  </select>
                </li>
                <li>
                  <span>距离最近</span>
                </li>
                <li>
                  <select>
                    <option>金牌商家</option>
                    <option>银牌商家</option>
                    <option>铜牌商家</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>   
        </div>
        <div className='activityContent'>
          <div>

          </div>
        </div>
      </div>
    )
  }
}

export default Activity