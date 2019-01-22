import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import {Toast} from 'antd-mobile'
import { ObjectEquals } from './../../../../utils/utils'
import TopNavBar from './../../../4-myInfo/components/topNavBar'
import { getUserRanking, clearData } from './../../../../redux/1-activiy/activeRangeRedux'
class MoreRank extends React.Component {
	constructor(props) {
    super(props)
    this.count = 2
		this.state = {
			updataTime: '',
			myRank: [],
			rankingData: []
		}
	}
	componentWillMount() {
		if (this.props.history.location.query !== undefined) {
			let data = {
				id: this.props.history.location.query.activeId,
				pageNo: '1',
				pageSize: '15'
			}
			this.getFirstPageData('first')
		} else {
      let data = {
				id: JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId,
				pageNo: '1',
				pageSize: '15'
			}
			this.getFirstPageData('first')
		}
	}
	componentDidMount() {
    let _this =this
		const wrapper = document.querySelector('.activityInfoContent')
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
            if (ObjectEquals(data.list, _this.state.rankingData)) {
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
	componentWillReceiveProps(nextProps) {
		if (!ObjectEquals(nextProps.userRanking.userRankings, {})) {
			this.setState({
				updataTime: nextProps.userRanking.updateTime,
				myRank: nextProps.userRanking.userRankings.my,
				rankingData: nextProps.userRanking.userRankings.list
			})
		}
	}
	//请求第一页数据（页面刚加载和下拉刷新）
	getFirstPageData(type, fn) {
		let data = {
			id: JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId,
			pageNo: '1',
			pageSize: '15'
		}
		if (type === 'first') {
			this.props.getUserRanking(data)
		} else {
			this.props.getUserRanking(data, fn)
		}
  }
  //上拉加载
	pullUpLoadData(fn) {
		let data = {
      id: JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId,
			pageNo: '1',
			pageSize: String(15 * this.count)
		}
		this.props.getUserRanking(data, fn)
  }
	createRankingContent() {
		if (JSON.stringify(this.state.rankingData) !== '[]') {
			let rankingData = this.state.rankingData
			let myRank = this.state.myRank
			rankingData.unshift(myRank)
			let rankingData2 = [...new Set(rankingData)]
			return (
				<tbody>
					{rankingData2.map((item, index) => {
						if (item.index === 1 || item.index === 2 || item.index === 3) {
							return (
								<tr key={`${item.user_name}_${item.index}${this.randomFrom(1,900)}`}>
									<td>{`No.${item.index}`}</td>
									<td>{item.user_name}</td>
									<td>{item.num}</td>
								</tr>
							)
						} else {
							return (
								<tr key={`${item.user_name}_${item.index}${this.randomFrom(1,900)}`}>
									<td>{item.index}</td>
									<td>{item.user_name}</td>
									<td>{item.num}</td>
								</tr>
							)
						}
					})}
				</tbody>
			)
		}
  }
  randomFrom(lowerValue,upperValue){
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  }
	render() {
		return (
			<div id="moreRanking" className="moreRanking">
				<TopNavBar title="更多排名" activeId={JSON.parse(window.sessionStorage.getItem('selectedActive')).activeId} />
				<div className="moreRankingWaper activityInfoContent">
					<div>
						<div className="top-tip">
							<span className="refresh-hook">下拉刷新</span>
						</div>
						<div className='activityInfoContentTitle'>
							<div>
								<i />
								<span>集赞排行</span>
							</div>
							<div>
								更新于
								{this.state.updataTime}
							</div>
						</div>
						<div className='activityInfoContentContainer'>
							<table>
								<thead>
									<tr>
										<th>排名</th>
										<th>用户名</th>
										<th>集赞数量</th>
									</tr>
								</thead>
								{this.createRankingContent()}
							</table>
							<div />
						</div>
            <div className="bottom-tip">
						    <span className="loading-hook">查看更多</span>
              </div>
					</div>
				</div>
			</div>
		)
	}
}
MoreRank = connect(
	state => ({
		userRanking: state.userRanking
	}),
	{ getUserRanking, clearData }
)(MoreRank)

export default withRouter(MoreRank)
