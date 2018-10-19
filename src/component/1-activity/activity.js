import React from 'react'
import './activity.scss'
import './common.scss'
import { SearchBar, Popover } from 'antd-mobile'
import { getChildNode } from './../../utils/utils'
import goldmedal from './../../images/activity/goldmedal@2x.png'
import ActivityContent from './../1-activity/activityContent/activityContent'

const Item = Popover.Item;
// 活动组件
class Activity extends React.Component{
  constructor(props){
    super(props)
    this.loc = ''
    this.state= {
      visible: false, //显隐状态
      merchantVisible: false, //显隐状态
      TmapFlag: true, //只获取一次 
      rankSelect: '综合排序', //综合排序
      merchantSelect: '金牌商家', //商家
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
  componentDidMount(){
    let navListUl = document.querySelector(".activityLevel1 ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('level1Active')
      })
      console.log(e)
      if(e.target.tagName === 'I' || e.target.tagName === 'P'){
        e.target.parentNode.classList.add('level1Active')
      }else {
        e.target.classList.add('level1Active')
      }
    }, false)
  }
  //排序选择
  onSelect(node){
    this.setState({
      visible: false,
      rankSelect: node.props.children
    })
  }
  //商家选择
  onMerchantSelect(node){
    let iconDom = document.querySelector('#merchant')
    iconDom.classList.remove(iconDom.className)
    iconDom.classList.add(node.props.value)
    this.setState({
      merchantVisible: false,
      merchantSelect: node.props.children
    })
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
      <div id='Activity' className='acticityCommon'>
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
                <li id='foodLevel' className='level1Active'>
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
                    {this.state.rankSelect}
                    <Popover
                    mask={false}
                    overlayClassName="fortest"
                    overlayStyle={{color: 'currentColor'}}
                    visible={this.state.visible}
                    overlay={[
                      (<Item key="1" value="scan" data-seed="logId">综合排序</Item>),
                      (<Item key="2" value="scan" data-seed="logId">好评优先</Item>),
                      (<Item key="3" value="scan" data-seed="logId">销量最高</Item>),
                      (<Item key="4" value="scan" data-seed="logId">点赞最多</Item>),
                    ]}
                    align={{
                      overflow: {adjustY: 0, adjustX: 0},
                      offset: [0, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect.bind(this)}
                  >
                    <div style={{
                      position: 'absolute',
                      right: '5%',
                      top: '46%',
                      transform: 'translateY(-50%)'
                    }}
                    >
                      
                      <i className='downArrow'></i>
                    </div>
                  </Popover>
                </li>
                <li>
                  <span>距离最近</span>
                </li>
                <li>
                  <i id='merchant' className='goldmedal'></i>
                {this.state.merchantSelect}
                    <Popover
                    mask={false}
                    overlayClassName="fortest"
                    overlayStyle={{color: 'currentColor'}}
                    visible={this.state.merchantVisible}
                    overlay={[
                      (<Item key="6" className='goldmedal' value="goldmedal" icon={<img src={goldmedal}/>} data-seed="logId">金牌商家</Item>),
                      (<Item key="7" className='silvermedal' value="silvermedal" icon={<img src={goldmedal}/>} data-seed="logId">银牌商家</Item>),
                      (<Item key="8" className='bronzemedal' value="bronzemedal" icon={<img src={goldmedal}/>} data-seed="logId">铜牌商家</Item>),
                    ]}
                    align={{
                      overflow: {adjustY: 0, adjustX: 0},
                      offset: [0, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onMerchantSelect.bind(this)}
                  >
                    <div style={{
                      position: 'absolute',
                      right: '20%',
                      top: '46%',
                      transform: 'translateY(-50%)'
                    }}
                    >
                      
                      <i className='downArrow'></i>
                    </div>
                  </Popover>
                </li>
              </ul>
            </div>
          </div>   
        </div>
        <div className='activityContent wrapper'>
           <ActivityContent />  
        </div>
      </div>
    )
  }
}

export default Activity