import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getChildNode , createBonusItem, ObjectEquals} from './../../../../utils/utils'
import { getUserRanking , clearData} from '../../../../redux/1-activiy/activeRangeRedux'
class ActivityInfoContent extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      updataTime: '',
      myRank:[],
      rankingData: []
    }
  }
  componentWillMount(){
    let data = {
      id: this.props.activeId,
      pageNo: '1',
      pageSize: '9'
    }
    this.props.getUserRanking(data)
  }
  componentDidMount(){

  }
  lookMoreRank(){
    console.log(this.props)
    let data = {
      activeId : this.props.activeId
    }
    let path = {
      pathname: '/moreRank',
      query: data
    }
    this.props.history.push(path)
    //document.querySelector('.zhezhao').style.display = 'block'
  }
  componentWillReceiveProps(nextProps){
     console.log(this.props)
     console.log(nextProps)
     if(!ObjectEquals(nextProps.userRanking.userRankings, this.props.userRanking.userRankings)){
      this.setState({
        updataTime: nextProps.userRanking.updateTime,
        myRank: nextProps.userRanking.userRankings.my,
        rankingData: nextProps.userRanking.userRankings.list
      })
     }
  }
  createBonusContent(){
    let distribute_Content
    console.log(this.props.activeDetail.distributeType)
    console.log(this.props.activeDetail.bonus)
    if(this.props.activeDetail.distributeType === 0){
      let bonus = this.props.activeDetail.bonus.split(',').reverse()
      distribute_Content = <div>{createBonusItem(bonus)}</div>
    }else{
      distribute_Content = <div className='bonusequal'></div>
    }
    console.log(distribute_Content)
    return distribute_Content
    
  }
  createRankingContent(){
    if(JSON.stringify(this.state.rankingData) !== '[]'){
      let rankingData = this.state.rankingData
      let myRank =  this.state.myRank
      console.log(rankingData)
      rankingData.unshift(myRank)
      let rankingData2 = [...new Set(rankingData)]
      console.log(rankingData2)
      return(
        <tbody>
          {
            rankingData2.map((item, index)=>{
              if(item.index === 1 || item.index === 2 || item.index === 3){
                return(
                  <tr key ={`${item.user_name}_${item.index}`}>
                    <td>{`No.${item.index}`}</td>
                    <td>{item.user_name}</td>
                    <td>{item.num}</td>
                  </tr>
                )
              }else{
                return(
                  <tr key ={`${item.user_name}_${item.index}`}>
                  <td>{item.index}</td>
                  <td>{item.user_name}</td>
                  <td>{item.num}</td>
                </tr>         
                )
              }
            })
          }
        </tbody>
      )
    }
  }
  componentWillUnmount(){
    this.props.clearData()
  }
  render(){
    console.log(this.props.activeDetail)
    console.log('----render----')
    return(
      <div className='activityInfoContent'>
        <div>
          <p><span>活动时间：</span><span>{this.props.activeDetail.startDate} - {this.props.activeDetail.endDate}</span></p>
          <p><span>活动简介：</span><span>{this.props.activeDetail.activeDesc}</span></p>
        </div>
        <div>
          <div>
            <div><span></span></div>
            <p><strong>奖金模式</strong></p>
          </div>
          {this.createBonusContent()}
        </div>
        <div>
          <div>
            <div>
              <i></i>
              <span>集赞排行</span>
            </div>
            <div>
              更新于{this.state.updataTime}
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    排名
                  </th>
                  <th>
                    用户名
                  </th>
                  <th>
                    点赞数量
                  </th>
                </tr>
              </thead>
              {this.createRankingContent()}
            </table>
            <div>
              <span onTouchEnd = {(v) => {this.lookMoreRank(v)}}>查看更多排名</span>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ActivityInfoContent = connect(
	state => ({
    activeInfo: state.getIndustryInfo,
    userRanking: state.userRanking
  }),
	{ getUserRanking, clearData }
)(ActivityInfoContent)
export default withRouter(ActivityInfoContent)