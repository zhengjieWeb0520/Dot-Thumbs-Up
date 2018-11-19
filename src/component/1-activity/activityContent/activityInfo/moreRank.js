import React from 'react'
import TopNavBar from './../../../4-myInfo/components/topNavBar'
class MoreRank extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      updataTime: ''
    }
  }
  componentWillMount(){
    console.log(this.props)
  }
  render(){
    return (
      <div id='moreRanking' className='moreRanking'>
        <TopNavBar title="更多排名"/>
        <div className = 'moreRankingWaper activityInfoContent'>
          <div>
            <div>
              <i></i>
              <span>集赞排行</span>
            </div>
            <div>
                更新于{this.state.updataTime}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoreRank