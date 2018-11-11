import React from 'react'
import { connect } from 'react-redux'
import TopNavBar from '../topNavBar'
import { Index, getParents } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import $ from 'zepto'
import { getBankCardList, deleteBankCard } from '../../../../redux/4-myinfo/backCardRedux'

class ChooseBankCard extends React.Component {
	componentWillMount() {
		this.props.getBankCardList()
	}

	componentDidMount() {
		let x, X
		let _this = this
		$('.chooseBankCard .card .swipeAction').on('touchstart', 'span', function(e) {
			//记录初始触控点横坐标
			x = e.changedTouches[0].pageX
		})

		$('.chooseBankCard .card .swipeAction').on('touchmove', 'span', function(e) {
			//记录当前触控点横坐标
			X = e.changedTouches[0].pageX
			//判断是否展开，如果展开则收起
			if (_this.expansion) {
				_this.expansion.className = ''
			}

			if (x - X > 10) {
				// 左滑展开
				this.className = 'swipeleft'
				_this.expansion = this
			}

			if (X - x > 10) {
				//右滑收起
				this.className = ''
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
    let _this = this
		e.stopPropagation()
		this.props.deleteBankCard(id, function() {
			_this.props.getBankCardList()
		})
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
							{this.props.cardList.length !== 0
								? this.props.cardList.map(item => {
										return (
											<li key={item.card_id}>
												<span className="wrapper">
													<div className="content">
														<div className="img">
															<img src={item.bank_icon} alt="" />
														</div>
														<div className="bankInfo">
															<p className="bankName">{item.bank_name}</p>
															<p className="cardNum">{item.card_id}</p>
														</div>
														<div className="bankBranch">{item.bank_address}</div>
													</div>
													<i onClick={e => this.handleDelete(e, item.id)} />
												</span>
											</li>
										)
								  })
								: null}
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

ChooseBankCard = connect(
	state => state.backCard,
	{ getBankCardList, deleteBankCard }
)(ChooseBankCard)

export default ChooseBankCard
