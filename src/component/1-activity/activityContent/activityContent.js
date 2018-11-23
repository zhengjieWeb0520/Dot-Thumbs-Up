import React from 'react'
import BScroll from 'better-scroll'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ObjectEquals , createStarLevel} from '../../../utils/utils'
import { goldConfig } from '../../config'

//活动主内容
class ActivityContent extends React.Component{
  constructor(props){
    super(props)
    this.goldConfig = goldConfig
    this.state = {
      arctiveList: {}   //活动列表
    }
    this.count = 2
  }
  componentDidMount(){
    const wrapper = document.querySelector('.wrapper')
    const topTip = wrapper.querySelector('.top-tip')
		const bottomTip = wrapper.querySelector('.bottom-tip')
		let _this = this
    const scroll = new BScroll(wrapper,{
      click: true,
      probeType: 1,
			pullUpLoad: {
				stop: 50,
				threshold: 0
			}
    })
  }
  	//上拉加载
	pullUpLoadData(fn) {
		let data = {
			pageNo: '1',
			pageSize: String(5 * this.count)
		}
		//this.props.getCollectionActive(data, fn)
	}
  componentWillReceiveProps(nextProps){
    if(!ObjectEquals(nextProps.activeList.activeList, this.props.activeList.activeList)){
      this.setState({
        arctiveList: nextProps.activeList.activeList
      })
    }
  }
  createActiveContent(){
    let content = []
    if(!ObjectEquals(this.state.arctiveList, {})){
      this.state.arctiveList.list.map((item, index)=>{
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
  render(){
    return(
      <div className='activityContent wrapper'>
        <ul id='ActivityContent' className='ActivityContent content'>
        <div className="top-tip">
          <span className="refresh-hook">下拉刷新</span>
        </div>
          {this.createActiveContent()}
        </ul>
      </div>
    )
  }
}
ActivityContent = connect(
	state => ({
    activeList: state.getIndustryInfo
  }),
	{  }
)(ActivityContent)

export default ActivityContent