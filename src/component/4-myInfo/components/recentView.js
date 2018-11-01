import React from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { Toast } from 'antd-mobile'
import TopNavBar from './topNavBar'
import { Link } from 'react-router-dom'
import { getCollectionActive, clearCollectionActive } from '../../../redux/4-myinfo/collectionRedux'
import '../../1-activity/common.scss'
import { ObjectEquals } from '../../../utils/utils'

//评分亮星
function OrangeStar(props) {
  var res = []
  for (let i = 0; i < props.length; i++) {
    res.push(<i className="orangeStar" key={i} />)
  }
  return res
}

//评分灰星
function GaryStar(props) {
  var res = []
  for (let i = 0; i < props.length; i++) {
    res.push(<i className="grayStar" key={i} />)
  }
  return res
}

//活动列表
class ActiveList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: null
    }

    this.count = 2
  }

  componentWillMount() {
    this.getFirstPageData('first')
  }

  //请求第一页数据(页面刚加载和下拉刷新)
  getFirstPageData(type, fn) {
    let data = {
      pageNo: '1',
      pageSize: '5'
    }

    if (type === 'first') {
      this.props.getCollectionActive(data)
    } else {
      this.props.getCollectionActive(data, fn)
    }
  }

  //上拉加载
  pullUpLoadData(fn) {
    let data = {
      pageNo: '1',
      pageSize: String(5 * this.count)
    }
    this.props.getCollectionActive(data, fn)
  }

  componentDidMount() {
    const wrapper = document.querySelector('.wrapper')
    const topTip = wrapper.querySelector('.top-tip')
    const bottomTip = wrapper.querySelector('.bottom-tip')
    let _this = this
    this.scroll = new BScroll(wrapper, {
      click: true,
      probeType: 1,
      pullUpLoad: {
        stop: 50,
        threshold: 0
      }
    })

    //滑动监听
    this.scroll.on('scroll', function (pos) {
      if (pos.y > 30) {
        topTip.innerText = '释放立即刷新'
      }
    })

    // 滑动结束
    this.scroll.on('touchEnd', function (position) {
      _this.scroll.off('scroll', function () { })
      if (position.y > 40) {
        setTimeout(function () {
          _this.getFirstPageData('refresh', function () {
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
        setTimeout(function () {
          _this.pullUpLoadData(function (data) {
            if (ObjectEquals(data.list, _this.state.active.list)) {
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
    if (!ObjectEquals(nextProps.active, this.props.active)) {
      this.setState({
        active: nextProps.active
      })
    }
  }

  componentWillUnmount() {
    this.props.clearCollectionActive()
  }

  render() {
    console.log(this.state)
    return (
      <div className="activityContent wrapper">
        <div>
          <div className="top-tip">
            <span className="refresh-hook">下拉刷新</span>
          </div>
          <ul id="ActivityContent" className="ActivityContent content">
            {this.state.active !== null
              ? this.state.active.list.map(item => {
                let path = {
                  pathname: '/activityInfo',
                  query: {
                    id: item.id
                  }
                }
                return (
                  <Link to={path} className="activityItem" key={item.id}>
                    <div>
                      <img src={item.img_url} alt="" />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>{item.desc}</p>
                      <p>
                        <OrangeStar length={item.star_level} />
                        <GaryStar length={5 - item.star_level} />
                        <span>{item.star_level}分</span>
                      </p>
                      <p>
                        <span>
                          <i />
                          <span>4365</span>
                        </span>
                        <span>
                          <span>433m</span>
                        </span>
                      </p>
                    </div>
                    {item.distribute_type === 0 ? (
                      <div>
                        <p className="radiu_1">
                          <i />
                          <span>
                            一等奖:
															<span>¥{item.bonus.split(',')[2]}</span>
                            <span className="rmb">RMB</span>
                          </span>
                        </p>
                        <p className="radiu_2">
                          <i />
                          <span>
                            二等奖:
															<span>¥{item.bonus.split(',')[1]}</span>
                            <span className="rmb">RMB</span>
                          </span>
                        </p>
                        <p className="radiu_3">
                          <i />
                          <span>
                            三等奖:
															<span>¥{item.bonus.split(',')[0]}</span>
                            <span className="rmb">RMB</span>
                          </span>
                        </p>
                      </div>
                    ) : (
                        <div className="bonusequal" />
                      )}
                  </Link>
                )
              })
              : null}
          </ul>
          <div className="bottom-tip">
            <span className="loading-hook">查看更多</span>
          </div>
        </div>
      </div>
    )
  }
}

ActiveList = connect(
  state => state.collection,
  { getCollectionActive, clearCollectionActive }
)(ActiveList)

//商家列表
class BusinessList extends React.Component {
  render() {
    return <div className="businessList">商家列表</div>
  }
}

class Collection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  componentDidMount() {
    let container = document.querySelector('.collection .topNav')
    let items = container.querySelectorAll('span')
    let _this = this
    container.addEventListener(
      'click',
      function (e) {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove('select')
        }
        if (e.target.className.indexOf('active') !== -1) {
          _this.setState({
            index: 0
          })
        } else {
          _this.setState({
            index: 1
          })
        }
        e.target.classList.add('select')
      },
      false
    )
  }

  render() {
    return (
      <div className="collection">
        <TopNavBar title="收藏" />
        <div className="topNav">
          <span className="active select">活动</span>
          <span className="business">商家</span>
        </div>

        <div className="contentList">{this.state.index === 0 ? <ActiveList /> : <BusinessList />}</div>
      </div>
    )
  }
}

export default Collection
