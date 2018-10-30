import React from 'react'
import './activity.scss'
import './common.scss'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { SearchBar, Popover } from 'antd-mobile'
import { getChildNode, ObjectEquals } from './../../utils/utils'
import goldmedal from './../../images/activity/goldmedal@2x.png'
import ActivityContent from './../1-activity/activityContent/activityContent'
import { getIndustry, getActiveList, clearInfo } from './../../redux/1-activiy/activeIndexRedux'
const AMap = window.AMap;
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
      levelState : 'XMS', //主类型状态 
      level2State : '' ,  //二级行业KEY
      rankSelect: '综合排序', //综合排序
      merchantSelect: '金牌商家', //商家
      industryInfo: {},   //类型
      activeList: {},     //活动列表
      address: ''
    }
  }
  componentWillMount(){
    let _this = this

    //this.props.getIndustry()
    //this.props.getActiveList()     


     AMap.plugin('AMap.Geolocation', function() {
      // 初始化定位插件
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      // 把定位插件加入地图实例
      //map.addControl(geolocation);

      // 添加地图全局定位事件
      AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
      function onComplete (data) {
        let activeParam = {
          dir_one: _this.state.levelState,
          dir_two: _this.state.level2State,
          by_user_id: '',
          key_word: '',
          order: 'comprehensive',
          distance_lately: 1,
          current_user_lon: 118.746916,
          current_user_dim: 32.033717,
          business_level: 0,
          pageNo: 1,
          pageSize: 5
        }
        console.log(data)
 
        //alert(data.formattedAddress)
        _this.setState({
          address: data.formattedAddress
        },()=>{
          _this.props.getIndustry()
          _this.props.getActiveList(activeParam)
        })
      }
    
      function onError (data) {
        console.log(data)
      }
      // 调用定位
      geolocation.getCurrentPosition();
    });
  }
  componentDidMount(){
    let _this = this
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
        _this.setState({
          levelState: e.target.parentNode.id
        }, ()=>{
          console.log(_this.state.levelState)
        })
      }else {
        e.target.classList.add('level1Active')
        _this.setState({
          levelState: e.target.id
        }, ()=>{
          console.log(_this.state.levelState)
        })
      }
    }, false)
  }
  componentDidUpdate(){
    let activeTypeDOM = document.querySelector('.activeType')
    let activeType = document.querySelectorAll('.activeType li')
    let width = 0
    console.log(activeType.length)
    for(let i = 0; i< activeType.length; i++){
      width = width + activeType[i].offsetWidth + 30
    }
    width = width + 40
    console.log(width)
    activeTypeDOM.style.width = width + 'px'
    const wrapper = document.querySelector('.activityLevel2')
    const scroll = new BScroll(wrapper,{
      click: true,
      scrollX: true,
      scrollY: false,
    })
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
  //获取相应的二级分级
  createActiveType(){

  }
  componentWillReceiveProps(nextProps){
    console.log(this.props)
    console.log(nextProps)
    //二级分类内容
    if(!ObjectEquals(this.props.industryInfo.industryInfo, nextProps.industryInfo.industryInfo)){
      this.setState({
        industryInfo: nextProps.industryInfo.industryInfo
      })
    }
    //活动列表
    if(!ObjectEquals(this.props.industryInfo.activeList, nextProps.industryInfo.activeList)){
      this.setState({
        activeList: nextProps.industryInfo.activeList.list
      })
    }
  }
  componentWillUnmount(){
    this.props.clearInfo()
  }
  render(){
    let industyInfo = {}
    if(!ObjectEquals(this.state.industryInfo, {})){
      this.state.industryInfo.forEach((item, index)=>{
        if(item.key === this.state.levelState){
          industyInfo = item.subs
        }
      })
    }
    console.log(industyInfo)
    console.log(this.state.activeList)
    let address = window.sessionStorage.getItem('user_addr')
    return(
      <div id='Activity' className='acticityCommon'>
        <div className='activityCondition'>
          <div className='activityKb'></div>
          <div className='activityHeader'>
            <div><i className='positionIcon'></i><span>{this.state.address}</span></div>
            <div><SearchBar placeholder="输入商家或活动关键字" maxLength={8} /></div>
          </div>
          <div className='activityLevel'>
            <div className='activityLevel1'>
              <ul>
                <li id='XMS' key='XMS' className='level1Active'>
                  <i></i> 
                  <p>享美食</p>
                </li>
                <li id='HSH' key='HSH'>
                  <i></i>
                  <p>惠生活</p>
                </li>
                <li id='AWL' key='AWL'>
                  <i></i>
                  <p>爱玩乐</p>                 
                </li>
                <li id='ZJD' key='ZJD'>
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
            <ul className ='activeType'>
                {/* <li>热门</li>
                <li>小吃快餐</li>
                <li>甜点饮品</li>
                <li>火锅烧烤</li>
                <li>日韩料理</li>
                <li>炸鸡可乐</li>
                <li>炸鸡可乐</li>
                <li>炸鸡可乐</li> */}
                {   
                  !ObjectEquals(industyInfo, {}) ? 
                  industyInfo.map((item, index)=>{
                    return <li key={item.key} >{item.name}</li>
                  }) : null                 
                }
              </ul>
              
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

Activity = connect(
	state => ({
    industryInfo: state.getIndustryInfo
  }),
	{ getIndustry, getActiveList, clearInfo }
)(Activity)


export default Activity