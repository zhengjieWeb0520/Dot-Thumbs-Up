import React from 'react'
import './../../css/activity.css'
import { SearchBar } from 'antd-mobile'
import positionInfo from './../../images/icon/position@2x.png'
import lollipop from './../../images/icon/lollipop@2x.png'
import bicycle from './../../images/icon/bicycle@2x.png'
import babyball from './../../images/icon/babyball@2x.png'
import hotail from './../../images/icon/hotail@2x.png'
import aerospace from './../../images/icon/aerospace@2x.png'

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
         // 获取地理位置
    // fetch("http://restapi.amap.com/v3/ip?key=4edfca722186816775170b7f8915eb5e").then((res)=>{
    //   if(res.ok){
    //     res.text().then((data)=>{
    //       const detail=JSON.parse(data)
    //       console.log(detail)
    //     })
    //   }
    // }).catch((res)=>{
    //   console.log(res.status);
    // });
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
          <div className='activityHeader'>
            <div><img src={positionInfo} alt=""/><span>{this.state.address}</span></div>
            <div><SearchBar placeholder="输入商家或活动关键字" maxLength={8} /></div>
          </div>
          <div className='activityLevel'>
            <div className='activityLevel1'>
              <ul>
                <li>
                  <img src={lollipop} /> 
                  <p>享美食</p>
                </li>
                <li>
                  <img src={bicycle} />
                  <p>惠生活</p>
                </li>
                <li>
                  <img src={babyball} />
                  <p>爱玩乐</p>                 
                </li>
                <li>
                  <img src={hotail} />
                  <p>住酒店</p>   
                </li>
                <li>
                  <img src={aerospace} />
                  <p>全部</p>   
                </li>
              </ul>
            </div>
            <div className='activityLevel2'>

            </div>
          </div>   
        </div>
        <div className='activityContent'>
          <div>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>    
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          <p style={{marginTop: '20px'}}>
            段时间看大叔将搭建了圣诞节爱上了
          </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Activity