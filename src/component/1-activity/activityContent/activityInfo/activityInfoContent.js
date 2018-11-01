import React from 'react'
import { connect } from 'react-redux'
import { getChildNode , createBonusItem} from './../../../../utils/utils'

class ActivityInfoContent extends React.Component{
  componentDidMount(){

  }
  lookMoreRank(){
    document.querySelector('.zhezhao').style.display = 'block'
  }
  componentWillReceiveProps(nextProps){
    // console.log(this.props)
    // console.log(nextProps)
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
              更新于2018.14 16:00
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
              <tbody>
                <tr>
                  <td>214</td>
                  <td>吴昊</td>
                  <td>2135</td>
                </tr>
                <tr>
                  <td>No.1</td>
                  <td>张三</td>
                  <td>2125</td>
                </tr>
                <tr>
                  <td>No.2</td>
                  <td>李四</td>
                  <td>235</td>
                </tr>
                <tr>
                  <td>No.3</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>张三</td>
                  <td>2125</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>李四</td>
                  <td>235</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
              </tbody>
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
    activeInfo: state.getIndustryInfo
  }),
	{  }
)(ActivityInfoContent)
export default ActivityInfoContent