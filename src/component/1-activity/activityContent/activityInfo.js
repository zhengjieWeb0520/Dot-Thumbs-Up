import React from 'react'
import { getChildNode, ObjectEquals, createStarLevel } from './../../../utils/utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ActivityEvaluate from './activityInfo/activityEvaluate'
import ActivityInfoContent from './activityInfo/activityInfoContent'
import ActivityMerchant from './activityInfo/activityMerchant'
import { getActiveInfo } from './../../../redux/1-activiy/activeIndexRedux'

class ActivityInfo extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      tabFlag: 0,             //组件切换标识
      collectCondition: '',   //收藏状态
      activeInfo: {},         //活动详情
      activeDetail: {
        merchantName: '',     //商家名称
        merchantLevel: '',    //商家等级
        activeName: '',       //活动名称
        have_collection: '',  //是否已收藏
        starLevel: '',        //活动评分
        distance: '',         //距离
        goodNum: '',          //点赞数量
        startDate: '',        //开始时间
        endDate: '',          //结束时间
        activeDesc: '',       //活动描述
        distributeType: null, //0 奖金  1代金券
        bonusType: null,      //0排名，1平摊
        bonus:'',             //奖金详情  
        activeImg:[],         //活动图片      
      },
    }
  }
  componentWillMount(){
    if(this.props.location.query == undefined){
      this.props.history.push('/index')
    }else{
      console.log(this.props.location)
      this.props.getActiveInfo(this.props.location.query.activeId)
    }

  }
  componentDidMount(){
    let _this = this
    let menuListUl = document.querySelector('.tabSwitch ul')
    let menuListLis = getChildNode(menuListUl)
    //点击活动切换
    menuListUl.addEventListener('click', function(e){
      menuListLis.forEach((item, index)=>{
        item.classList.remove('tabActive')
      })
      console.log(e)
      if(e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('tabActive')
      }else{
        e.target.classList.add('tabActive')
      }
      if(e.target.textContent === '活动'){
        _this.setState({
          tabFlag: 0
        })
      }else if(e.target.textContent === '评价'){
        _this.setState({
          tabFlag: 1
        })     
      }else if(e.target.textContent === '商家'){
        _this.setState({
          tabFlag: 2
        })  
      }
    })

    let navListUl = document.querySelector(".activityInfoFooter ul")
    let navListLis = getChildNode(navListUl)
    //点击底部切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('pointActive')
      })
      if(e.target.tagName === 'LI'){
        e.target.classList.add('pointActive')
        if(e.target.textContent === '我要点赞'){
          console.log(e.target.firstChild)
          e.target.firstChild.classList.add('willpointActive')
        }else if(e.target.textContent === '我的集赞'){
          e.target.firstChild.classList.add('mypointActive')
          _this.props.history.push('/index/participate');
        }
      }
      if(e.target.tagName === 'I' || e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('pointActive')
        if(e.target.parentNode.textContent === '我要点赞'){
          e.target.parentNode.firstChild.classList.add('willpointActive')
        }else if(e.target.parentNode.textContent === '我的集赞'){
          e.target.parentNode.firstChild.classList.add('mypointActive')
        }      
      }
    }, false)
  }
  switchContent(){
    switch(this.state.tabFlag){
      case 0:
        return (<ActivityInfoContent />)
        break;
      case 1:
        return (<ActivityEvaluate />)
        break;
      case 2:
        return (<ActivityMerchant />)
        break;
      default:
        return null
        break;
    }
  }
  //收藏
  collectClick(e){
    console.log(e)
    let _this = this
    let collectDom = document.querySelector('.collectionCondition')
    collectDom.style.display = 'block'
    if(e.target.className === 'uncollection'){
      e.target.classList.remove('uncollection')
      e.target.classList.add('collection')
      _this.setState({
        collectCondition: '已收藏'
      },()=>{
        setTimeout(() => {
          collectDom.style.display = 'none'
        }, 1500);
      })
    }else if(e.target.className === 'collection'){
      e.target.classList.remove('collection')
      e.target.classList.add('uncollection')
      _this.setState({
        collectCondition: '已取消'
      },()=>{
        setTimeout(() => {
          collectDom.style.display = 'none'
        }, 1500);
      })
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(this.props)
    console.log(nextProps)
    if(!ObjectEquals(nextProps.activeInfo.activeInfo, this.props.activeInfo.activeInfo)){
      this.setState({
        activeInfo: nextProps.activeInfo.activeInfo,
        activeDetail: {
          merchantName: nextProps.activeInfo.activeInfo.business_info.user_info.user_nick_name,     //商家名称
          merchantLevel: nextProps.activeInfo.activeInfo.business_info.user_info.star_level,
          activeName: nextProps.activeInfo.activeInfo.name,       //活动名称
          have_collection: nextProps.activeInfo.activeInfo.have_collection,  //是否已收藏
          starLevel: nextProps.activeInfo.activeInfo.star_level,        //活动评分
          distance:  nextProps.location.query.distance_format,         //距离
          goodNum: nextProps.location.query.good_count,          //点赞数量
          startDate: nextProps.activeInfo.activeInfo.start_date,        //开始时间
          endDate: nextProps.activeInfo.activeInfo.end_date,          //结束时间
          activeDesc: nextProps.activeInfo.activeInfo.desc,       //活动描述
          distributeType: nextProps.activeInfo.activeInfo.distribute_type, //0 奖金  1代金券
          bonusType: nextProps.activeInfo.activeInfo.bonus_type,      //0排名，1平摊
          bonus: nextProps.activeInfo.activeInfo.bonus,            //奖金详情
          activeImg: nextProps.activeInfo.activeInfo.detail_images
        }
      })
    }
  }
  render(){
    console.log(this.state.activeDetail)
    return(
      <div id='ActivityInfo' className='activityInfo'>
        <div>
          <div>
            <div>
              {/* 轮播图 */}
            </div>
            <div>
              <Link to='/index'></Link>
              <span></span>
              <span className='collectionCondition'>{this.state.collectCondition}</span>
              <i className='uncollection' onTouchEnd = {(v) => {this.collectClick(v)}}></i>
              <i className='share'></i>
            </div>
          </div>
          <div>
            <div>
              <p>
                <span>{this.state.activeDetail.merchantName}</span>
                <span>({this.state.activeDetail.activeName})</span>
              </p>
              <p>
                {createStarLevel(this.state.activeDetail.starLevel,'orangeStar','grayStar')}
                {/* <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='orangeStar'></i>
                <i className='grayStar'></i> */}
                <span>{this.state.activeDetail.starLevel}分</span>
                <span>距离你{this.state.activeDetail.distance}</span>
              </p>
            </div>
            <div>
              <p>
                <i id='merchant' className='goldmedal'></i>
                <span>金牌商家</span>
              </p>
              <p>
                <i id='merchant' className='goldmedal'></i>
                <span>12345</span>
              </p>
            </div>
          </div>
          <div className='tabSwitch'>
            <ul>
              <li className='tabActive'><span>活动</span></li>
              <li><span>评价</span></li>
              <li><span>商家</span></li>
            </ul>
          </div>
          {this.switchContent()}
          <div className='activityInfoFooter'>
            <ul>
              <li>
                <i></i>
                <span>我要点赞</span>
              </li>
              <li>
                <i></i>
                <span>我的集赞</span>
              </li>
            </ul>
          </div>          
        </div>
      </div>
    )
  }
}

ActivityInfo = connect(
	state => ({
    activeInfo: state.getIndustryInfo
  }),
	{ getActiveInfo }
)(ActivityInfo)
export default ActivityInfo