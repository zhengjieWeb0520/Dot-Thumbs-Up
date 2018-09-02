import React from 'react'


// 活动组件
class Activity extends React.Component{
  constructor(props){
    super(props)
    this.loc = ''
    this.state= {
      lon: '',
      address: ''
    }
  }
  componentWillMount(){
    let _this = this  
    window.addEventListener('message', function(event) {
      // 接收位置信息
      _this.loc = event.data
      if(_this.loc != null){
        console.log(_this.loc)
        _this.setState({
          lon: _this.loc.lng,
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
        <div className='activityHeader'>
          <div>{this.state.lon}</div>
          <div>{this.state.address}</div>
        </div>
        <div>       
        </div>
      </div>
    )
  }
}

export default Activity