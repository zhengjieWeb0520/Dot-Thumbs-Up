import React from 'react'
import './activity.scss'
import './common.scss'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { Link , withRouter} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import { SearchBar, Popover, Toast } from 'antd-mobile'
import { getChildNode, ObjectEquals, createStarLevel , serverIp} from './../../utils/utils'
import goldmedal from './../../images/activity/goldmedal@2x.png'
import ActivityContent from './../1-activity/activityContent/activityContent'
import { getIndustry, getActiveList, clearInfo } from './../../redux/1-activiy/activeIndexRedux'
import { goldConfig } from '../config'
const AMap = window.AMap;
const Item = Popover.Item;
// 活动组件(主)
class Activity extends React.Component{
  constructor(props){
    super(props)
    this.loc = ''
    this.goldConfig = goldConfig
    this.count = 2
    this.level2Flag = true
    this.user_lon = window.sessionStorage.getItem('user_lon')         //商家经度
    this.user_lat = window.sessionStorage.getItem('user_lat')         //商家纬度
    this.state= {
      visible: false, //显隐状态
      merchantVisible: false, //显隐状态
      keyWord: '',
      TmapFlag: true, //只获取一次
      levelState : 'XMS', //主类型状态
      level2State : '' ,  //二级行业KEY
      rankSelect: '综合排序', //综合排序
      rankSelectValue: 'comprehensive',   //综合排序value
      merchantSelect: '金牌商家', //商家
      industryInfo: {},   //类型
      activeList: {},     //活动列表
      address: '',        //商家地址
      business_level: '0'  //商家等级
    }
  }
  componentWillMount(){
    let _this = this
    let passActiveId  = window.sessionStorage.getItem('activeId')
    let goodCount = window.sessionStorage.getItem('goodCount')
    AMap.plugin('AMap.Geolocation', function() {
      // 初始化定位插件
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 5000, //超过10秒后停止定位，默认：无穷大
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
      // 调用定位
      geolocation.getCurrentPosition();
      // 添加地图全局定位事件
      AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
      AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
      function onComplete (data) {
        window.sessionStorage.setItem('user_lon', data.position.lng)
        window.sessionStorage.setItem('user_lat', data.position.lat)
        if(passActiveId != undefined){
          let data2 = qs.stringify({
            id: passActiveId,
            with_business_info: 1,
            with_rankings: 10
          })
          axios
          .post(
            serverIp + '/dianzanbao/active/getActiveDetail.do', 
            data2,
            {
              headers: {
                token: window.sessionStorage.getItem('token'),
                user_id: window.sessionStorage.getItem('user_id')
              }
            }
          ).then(res => {
            if(res.data.result_code === '0'){
              let merchantLon = Number(res.data.result_info.business_info.user_info.x_longitude)
              let merchantLat = Number(res.data.result_info.business_info.user_info.y_dimension)
              let p1 = [merchantLon, merchantLat]
              let p2 = [Number(data.position.lng), Number(data.position.lat)]
              let dis = AMap.GeometryUtil.distance(p1, p2)
              let dis_fromat
              
              if(dis < 1000){
                dis_fromat = dis + '米'
              }else{
                dis_fromat = (dis / 1000).toFixed(2) + '千米'
              }
              let data3 = {
                activeId: passActiveId,
                distance_format: dis_fromat,
                good_count: goodCount
              }
              let path = {
                pathname: `/activityInfo`,
                query: data3
              }
              window.sessionStorage.removeItem('activeId')
              _this.props.history.push(path)
            }
          })
        }else{
          _this.setState({
            address: data.addressComponent.township + data.addressComponent.street
          },()=>{
            _this.props.getIndustry()
            _this.getFirstActiveList('first')
          })
        }
      }

      function onError (data) {
        window.sessionStorage.setItem('user_lon', 118.746916)
        window.sessionStorage.setItem('user_lat', 32.033717)
        _this.setState({
          address: '测试地址'
        },()=>{
          _this.props.getIndustry()
          _this.getFirstActiveList('first')
        })
      }
    })
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
      if(e.target.tagName === 'I' || e.target.tagName === 'P'){
        e.target.parentNode.classList.add('level1Active')
        _this.setState({
          levelState: e.target.parentNode.id
        }, ()=>{
          let activeParam = {
            dir_one: _this.state.levelState,
            dir_two: _this.state.level2State,
            by_user_id: '',
            key_word: _this.state.keyWord,
            order: _this.state.rankSelectValue,
            current_user_lon: _this.user_lon,
            current_user_dim: _this.user_lat,
            business_level: _this.state.business_level,
            pageNo: '1',
            pageSize: '5'
          }
          _this.props.getActiveList(activeParam)
        })
      }else {
        e.target.classList.add('level1Active')
        _this.setState({
          levelState: e.target.id
        }, ()=>{
          let activeParam = {
            dir_one: _this.state.levelState,
            dir_two: _this.state.level2State,
            by_user_id: '',
            key_word: _this.state.keyWord,
            order: _this.state.rankSelectValue,
            current_user_lon: _this.user_lon,
            current_user_dim: _this.user_lat,
            business_level: _this.state.business_level,
            pageNo: '1',
            pageSize: '5'
          }
          _this.props.getActiveList(activeParam)
        })
      }
    }, false)

    //上拉刷新，下拉加载
    const wrapper = document.querySelector('.wrapper')
    const topTip = wrapper.querySelector('.top-tip')
		let bottomTip = wrapper.querySelector('.bottom-tip')
    this.scroll = new BScroll(wrapper,{
      click: true,
      probeType: 1,
			pullUpLoad: {
				stop: 50,
				threshold: 0
			}
    })
    		//滑动监听
		this.scroll.on('scroll', function(pos) {
			if (pos.y > 30) {
				topTip.innerText = '释放立即刷新'
			}
		})

		// 滑动结束
		this.scroll.on('touchEnd', function(position) {
			_this.scroll.off('scroll', function() {})
			if (position.y > 40) {
				setTimeout(function() {
					_this.getFirstActiveList('refresh', function() {
						// 恢复文本值
						topTip.innerText = '下拉刷新'
						// 刷新成功后的提示
						Toast.info('刷新成功', 1)
						_this.count = 2
					})
					// 刷新列表后,重新计算滚动区域高度
					_this.scroll.refresh()
				}, 1000)
			} else if (position.y < this.maxScrollY - 40) {
				bottomTip.innerText = '加载中...'
				setTimeout(function() {
					_this.pullUpLoadData(function(data) {
						if (ObjectEquals(data.list, _this.state.activeList.list)) {
							// 恢复文本值
							bottomTip.innerText = '没有更多数据'
						} else {
							// 恢复文本值
							bottomTip.innerText = '查看更多'
							_this.count++
						}
					})
					// 加载更多后,重新计算滚动区域高度
					_this.scroll.refresh()
				}, 1000)
			}
		})
  }
  //请求第一页数据（页面刚加载和下拉刷新）
  getFirstActiveList(type, fn){
    let activeParam = {
      dir_one: this.state.levelState,
      dir_two: this.state.level2State,
      by_user_id: '',
      key_word: this.state.keyWord,
      order: this.state.rankSelectValue,
      current_user_lon: this.user_lon,
      current_user_dim: this.user_lat,
      business_level: this.state.business_level,
      pageNo: '1',
      pageSize: '5'
    }
    if(type === 'first'){
      this.props.getActiveList(activeParam)
    } else {
      this.props.getActiveList(activeParam, fn)
    }
  }
  //上拉加载
	pullUpLoadData(fn) {
    let activeParam = {
      dir_one: this.state.levelState,
      dir_two: this.state.level2State,
      by_user_id: '',
      key_word: this.state.keyWord,
      order: this.state.rankSelectValue,
      current_user_lon: this.user_lon,
      current_user_dim: this.user_lat,
      business_level: this.state.business_level,
      pageNo: '1',
      pageSize: String(5 * this.count)
    }
    this.props.getActiveList(activeParam, fn)
	}
  componentDidUpdate(prevProps){
    let activeTypeDOM = document.querySelector('.activeType')
    let activeType = document.querySelectorAll('.activeType li')
    let width = 0
    for(let i = 0; i< activeType.length + 1; i++){
      if(i < activeType.length)
        width = width + activeType[i].offsetWidth + 16
      if(i === activeType.length){
        width = width + 16 + 30
      }
    }
    width = width + 40
    activeTypeDOM.style.width = width + 'px'
    const wrapper = document.querySelector('.activityLevel2')
    const scroll = new BScroll(wrapper,{
      click: true,
      scrollX: true,
      scrollY: false,
    })
    //level2点击事件
    //if(JSON.stringify(prevProps.industryInfo.industryInfo) !== '[]'){
      let activityLevel2Ul = document.querySelector('.activityLevel2 ul')
      let activityLevel2UlLi = activityLevel2Ul.getElementsByTagName('li')
      let _this = this
      activityLevel2Ul.addEventListener('click', function(e){
        if(_this.level2Flag === true){
          _this.level2Flag = false
          _this.setState({
            level2State : e.target.getAttribute('name')
          },()=>{
            let activeParam = {
              dir_one: _this.state.levelState,
              dir_two: _this.state.level2State,
              by_user_id: '',
              key_word: _this.state.keyWord,
              order: _this.state.rankSelectValue,
              current_user_lon: _this.user_lon,
              current_user_dim: _this.user_lat,
              business_level: _this.state.business_level,
              pageNo: '1',
              pageSize: '5'
            }
            _this.props.getActiveList(activeParam)
          })
          for(let i = 0; i< activityLevel2UlLi.length; i++){
            activityLevel2UlLi[i].classList.remove('level2Active')
          }
          e.target.classList.add('level2Active')
          setTimeout(() => {
            _this.level2Flag = true
          }, 1000);
        }

      })
    //}
    console.log(prevProps)
    console.log(this.props)
  }
  //排序选择
  onSelect(node){
    let _this = this
    this.setState({
      visible: false,
      rankSelect: node.props.children,
      rankSelectValue: node.props.value
    },()=>{
      let activeParam = {
        dir_one: _this.state.levelState,
        dir_two: _this.state.level2State,
        by_user_id: '',
        key_word: _this.state.keyWord,
        order: _this.state.rankSelectValue,
        current_user_lon: _this.user_lon,
        current_user_dim: _this.user_lat,
        business_level: _this.state.business_level,
        pageNo: '1',
        pageSize: '5'
      }
      _this.props.getActiveList(activeParam)
    })
  }
  //商家选择
  onMerchantSelect(node){
    let _this = this
    let iconDom = document.querySelector('#merchant')
    iconDom.classList.remove(iconDom.className)
    iconDom.classList.add(node.props.className)
    this.setState({
      merchantVisible: false,
      merchantSelect: node.props.children,
      business_level: node.props.value
    },()=>{
      let activeParam = {
        dir_one: _this.state.levelState,
        dir_two: _this.state.level2State,
        by_user_id: '',
        key_word: _this.state.keyWord,
        order: _this.state.rankSelectValue,
        current_user_lon: _this.user_lon,
        current_user_dim: _this.user_lat,
        business_level: _this.state.business_level,
        pageNo: '1',
        pageSize: '5'
      }
      _this.props.getActiveList(activeParam)
    })
  }
  componentWillReceiveProps(nextProps){
    //二级分类内容
    if(!ObjectEquals(this.props.industryInfo.industryInfo, nextProps.industryInfo.industryInfo)){
      this.setState({
        industryInfo: nextProps.industryInfo.industryInfo
      })
    }
    //活动列表
    if(!ObjectEquals(this.props.industryInfo.activeList, nextProps.industryInfo.activeList)){
      this.setState({
        activeList: nextProps.industryInfo.activeList
      })
    }
  }
  componentWillUnmount(){
    this.props.clearInfo()
  }
  createActiveContent(){
    let content = []
    if(!ObjectEquals(this.state.activeList, {})){
      this.state.activeList.list.map((item, index)=>{
        let column = null
        let data = {
          activeId: item.id,
          distance_format: item.distance_format,
          good_count: item.good_count
        }
        let path = {
          pathname: `/activityInfo`,
          query: data
        }
        let distribute_Content
        if(item.distribute_type === 0){
          let bonus = item.bonus.split(',').reverse()
          distribute_Content = <div>{this.createBonusItem(bonus)}</div>
        }else{
          distribute_Content = <div className='bonusequal'></div>
        }
        column =
          <Link to={path} className='activityItem' key={item.id}>
            <div>
              <img src={item.img_url} alt=""/>
            </div>
            <div>
              <p>{item.user_name}</p>
              <p>{item.name}</p>
              <p>{createStarLevel(item.star_level, 'orangeStar', 'grayStar')}<span>{`${item.star_level.toFixed(1)}分`}</span></p>
              <p><span><i></i><span>{item.good_count}</span></span><span><span>{item.distance_format}</span></span></p>
            </div>
            {distribute_Content}
          </Link>
          content.push(column)
      })
      return  content
    }else{
      return null
    }
  }
  //奖金模式
  createBonusItem(bonus){
    let content = []
    bonus.forEach((item ,index) => {
      let column
      let bonusValue = Number(item)
      let goldValue
      this.goldConfig.forEach((item2, index2)=>{
        if(index === item2.id){
          goldValue = item2.value
        }
      })
      column = <p key={index} className={`radiu_${index + 1}`}><i></i><span>{goldValue}:<span>¥{bonusValue}</span><span className='rmb'>RMB</span></span></p>
      content.push(column)
    });
    return content
  }
  //输入关键字
  keyWordSearch(val){
    let _this = this
    this.setState({
      keyWord: val
    },()=>{
      let activeParam = {
        dir_one: _this.state.levelState,
        dir_two: _this.state.level2State,
        by_user_id: '',
        key_word: _this.state.keyWord,
        order: _this.state.rankSelectValue,
        current_user_lon: _this.user_lon,
        current_user_dim: _this.user_lat,
        business_level: _this.state.business_level,
        pageNo: '1',
        pageSize: '5'
      }
      _this.props.getActiveList(activeParam)
    })
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
    let address = window.sessionStorage.getItem('user_addr')
    return(
      <div id='Activity' className='acticityCommon'>
        <div className='activityCondition'>
          {/* <div className='activityKb'></div> */}
          <div className='activityHeader'>
            <div><i className='positionIcon'></i><span>{this.state.address}</span></div>
            <div><SearchBar placeholder="输入商家或活动关键字" onSubmit={(val)=>{this.keyWordSearch(val)}} maxLength={8} /></div>
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
                <li key={''} name='' >{'全部'}</li>
                {
                  !ObjectEquals(industyInfo, {}) ?
                  industyInfo.map((item, index)=>{
                    return <li key={item.key} name={item.key}>{item.name}</li>
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
                      (<Item key="Popover1" value="comprehensive" data-seed="logId">综合排序</Item>),
                      (<Item key="Popover2" value="bonus_asc" data-seed="logId">奖金升序</Item>),
                      (<Item key="Popover3" value="bonus_desc" data-seed="logId">奖金降序</Item>),
                      (<Item key="Popover4" value="publish_asc" data-seed="logId">日期升序</Item>),
                      (<Item key="Popover5" value="publish_desc" data-seed="logId">日期降序</Item>),
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
                      (<Item key="10" className='goldmedal' value="" icon={<img src={goldmedal}/>} data-seed="logId">全部商家</Item>),
                      (<Item key="6" className='goldmedal' value="3" icon={<img src={goldmedal}/>} data-seed="logId">金牌商家</Item>),
                      (<Item key="7" className='silvermedal' value="2" icon={<img src={goldmedal}/>} data-seed="logId">银牌商家</Item>),
                      (<Item key="8" className='bronzemedal' value="1" icon={<img src={goldmedal}/>} data-seed="logId">铜牌商家</Item>),
                      (<Item key="9" className='bronzemedal' value="0" icon={<img src={goldmedal}/>} data-seed="logId">普通商家</Item>),
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
          <ul id='ActivityContent' className='ActivityContent content'>
            <div className="top-tip">
              <span className="refresh-hook">下拉刷新</span>
            </div>
            {this.createActiveContent()}
            <div className="bottom-tip">
						<span className="loading-hook">查看更多</span>
				  	</div>
          </ul>
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


export default withRouter(Activity)
