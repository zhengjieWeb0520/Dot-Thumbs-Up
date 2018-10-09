import React from 'react'
import TopNavBar from './topNavBar'
import { Index, getParents } from '../../../utils/utils'
import { Link } from 'react-router-dom'
import $ from 'zepto'

class ChooseBankCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{
					id: 1,
					imgUrl: '../../../images/myInfo/icon_gongshang.png',
					bankName: '中国工商银行',
					cardNum: '6222****5077',
					bankBranch: '浦口支行'
				},
				{
					id: 2,
					imgUrl: '../../../images/myInfo/icon_jianshe.png',
					bankName: '中国建设银行',
					cardNum: '6222****5077',
					bankBranch: '青浦支行'
				}
			]
		}
	}

	componentDidMount() {
    let x, X
    let _this =this
		$('.chooseBankCard .card .swipeAction').on('touchstart', 'span', function(e) {
      //记录初始触控点横坐标
      x = e.changedTouches[0].pageX
    })
    
    $('.chooseBankCard .card .swipeAction').on('touchmove', 'span', function(e) {
      //记录当前触控点横坐标
      X = e.changedTouches[0].pageX
      //判断是否展开，如果展开则收起
      if(_this.expansion) {
        _this.expansion.className = ''
      }

      if(x - X > 10) {
        // 左滑展开
        this.className = 'swipeleft'
        _this.expansion = this
      }

      if(X - x > 10) {
        //右滑收起
        this.className = ""
        _this.expansion = null
      }
		})

		$(window).on('touchstart', this.listRecovery)
	}

	componentWillUnmount() {
    $(window).off('touchstart', this.listRecovery)
	}

	//列表恢复
	listRecovery = () => {
		if (this.expansion) {
			this.expansion.className = ''
		}
	}

	//侧滑删除当前项
	handleDelete = (e, id) => {
    e.stopPropagation()
		console.log(id)
	}

	render() {
		return (
			<div className="chooseBankCard">
				<TopNavBar title="选择银行卡" rightContent={false} />
				<div className="cardBox">
					<div className="addCard">
						<Link to={`/chooseBankCard/newBankCard`}>新增银行卡</Link>
					</div>
					<div className="card">
						<ul className="swipeAction">
							{this.state.data.map(item => {
								return (
									<li key={item.id}>
										<span className="wrapper">
											<div className="content">
												<div className="img">
													<img src={require('../../../images/myInfo/icon_jianshe.png')} alt="" />
												</div>
												<div className="bankInfo">
													<p className="bankName">{item.bankName}</p>
													<p className="cardNum">{item.cardNum}</p>
												</div>
												<div className="bankBranch">{item.bankBranch}</div>
											</div>
											<i onClick={(e) => this.handleDelete(e, item.id)} />
										</span>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="addCard">
						<Link to={`/chooseBankCard/newBankCard`}>新增银行卡</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default ChooseBankCard
