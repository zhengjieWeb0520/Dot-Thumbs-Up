import React from 'react'
import ReactDOM from 'react-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { getChildNode, ObjectEquals, createStarLevel } from './../../../../utils/utils'
import yhHeader from './../../../../images/activity/evaluate/header.png'
import evaluateImg1 from './../../../../images/activity/evaluate/evaluateImg1.png'
import evaluateImg2 from './../../../../images/activity/evaluate/evaluateImg2.png'
import { getCommentsStatistics, getActiveEvaluate } from './../../../../redux/1-activiy/activeEvaluateRedux'
import ScaleImage from './../../scaleImage'
import { Toast} from 'antd-mobile'
class ActivityEvaluate extends React.Component{
  constructor(props){
    super(props)
    this.count = 2
    this.state = {
      evaluateInfo : [],
      filter:'',
      commentsStatistics: {},
    }
  }
  componentWillMount(){
    this.getFirstPageData('first')
  }
  componentDidMount(){
    let _this = this
    const wrapper = document.querySelector('.activityEvaluateWraper')
    const topTip = wrapper.querySelector('.top-tip')
		const bottomTip = wrapper.querySelector('.bottom-tip')
    this.scroll = new BScroll(wrapper, {
			click: true,
			probeType: 1,
			pullUpLoad: {
				stop: 50,
				threshold: 0
			}
		})
    
    let navListUl = document.querySelector(".selectTab ul")
    let navListLis = getChildNode(navListUl)
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){
      navListLis.forEach((item, index)=>{
        item.classList.remove('evaluateActive')
        item.classList.remove('evaluateGray')
      })
      if(e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('evaluateActive')
        if(e.target.parentNode.getAttribute("name") === 'selectTab4'){
          e.target.parentNode.classList.add('evaluateGray')
        }
      }else {
        e.target.classList.add('evaluateActive')
        if(e.target.getAttribute("name") === 'selectTab4'){
          e.target.classList.add('evaluateGray')
        }
      }
    }, false)

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
					_this.getFirstPageData('refresh', function() {
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
						if (ObjectEquals(data.list, _this.state.evaluateInfo)) {
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
  componentWillReceiveProps(nextProps){
    if(!ObjectEquals(nextProps.evaluateInfo.commentsStatistics, {})){
      this.setState({
        commentsStatistics: nextProps.evaluateInfo.commentsStatistics
      })
    }
    if(!ObjectEquals(nextProps.evaluateInfo.activeEvaluate, {})){   
      this.setState({
        evaluateInfo: nextProps.evaluateInfo.activeEvaluate.list
      })
    }
  }
  //请求第一页数据（页面刚加载和下拉刷新）
  getFirstPageData(type, fn){
    let data ={
      active_id: this.props.activeId,
      filter: this.state.filter,
      pageNo: '1',
      pageSize: '5'
    }
    if(type === 'first'){
      this.props.getActiveEvaluate(data)
      this.props.getCommentsStatistics(data.active_id)
    }else{
      this.props.getActiveEvaluate(data, fn)
    }
  }
  	//上拉加载
	pullUpLoadData(fn) {
		let data = {
      active_id: this.props.activeId,
      filter: this.state.filter,
			pageNo: '1',
			pageSize: String(5 * this.count)
		}
		this.props.getActiveEvaluate(data, fn)
  }
  displayImage =(e, value)=>{
    ReactDOM.render(<ScaleImage imgurl={value}/>, document.querySelector('#zhezhao'))
    document.querySelector('.zhezhao').style.display = 'block'
  }
  createEvaluateContent(){
    let content = []
    if(JSON.stringify(this.state.evaluateInfo) !== '[]'){
      this.state.evaluateInfo.map((item, index)=>{
        let column = null
        column= 
          <div className='evaluateItem' key = {index}>
              <div>
                  {/* <img src={item.user_head} alt=""/> */}
                  <img src={yhHeader} alt=""/>
              </div>
              <div>
                  <div><span>{item.user_name}</span><span>{item.create_date}</span></div>
                  <div>
                    {createStarLevel(item.star_level, 'evaluateAllStar', 'evaluateHalfStar')}
                    {/* <span>超棒</span> */}
                  </div>
                  <div>{item.content}</div>
                  <div>
                    {
                      item.detail_images.map((item2, index2)=>{
                        return <img key={item2.id} src={item2.img_url} onTouchEnd={(v, url)=>this.displayImage(v, item2.img_url)} alt=""/>
                      })
                    }
                  </div>
              </div>
          </div>
          content.push(column)
      })
      return content
    }else{
      return null
    }
  }
  goodClick = ()=>{
    this.setState({
      filter: 'good'
    },()=>{
      this.getFirstPageData('first')
    })
  }
  badClick = ()=>{
    this.setState({
      filter: 'bad'
    },()=>{
      this.getFirstPageData('first')
    })
  }
  allClick = ()=>{
    this.setState({
      filter: ''
    },()=>{
      this.getFirstPageData('first')
    })
  }
  render(){
    return(
      <div className='activityEvaluate activityEvaluateWraper wraper'>
        <ul className='content'>
          <div className="top-tip">
							<span className="refresh-hook">下拉刷新</span>
					</div>
          <div className='content-header'>
            <div>{this.state.commentsStatistics.business_star_level}</div>
            <div>
              <p>商家评分</p>
              <p>
                {createStarLevel(this.state.commentsStatistics.business_star_level, 'evaluateAllStar','evaluateHalfStar')}
              </p>
            </div>
          </div>
          <div className = 'selectTab'>
            <ul>
              <li name={'selectTab1'} onClick={this.allClick} className = 'evaluateActive'><span>全部</span></li>
              <li name={'selectTab3'} onClick={this.goodClick}><span>好评&nbsp;{this.state.commentsStatistics.good_count}</span></li>
              <li name={'selectTab4'} onClick={this.badClick}><span>差评&nbsp;{this.state.commentsStatistics.bad_count}</span></li>
            </ul>
          </div>
          <div className='evaluateContent'>
            {this.createEvaluateContent()}
          </div>
          <div className="bottom-tip">
							<span className="loading-hook">查看更多</span>
					</div>
        </ul>
      </div>
    )
  }
}

ActivityEvaluate = connect(
	state => ({
		evaluateInfo: state.activeEvaluate,
	}),
	{ getCommentsStatistics, getActiveEvaluate }
)(ActivityEvaluate)
export default ActivityEvaluate