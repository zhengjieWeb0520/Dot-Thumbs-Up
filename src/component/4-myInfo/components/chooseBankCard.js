import React from 'react'
import TopNavBar from './topNavBar'
import { SwipeAction, List } from 'antd-mobile'
import { Link } from 'react-router-dom'
const Item = List.Item
const Brief = Item.Brief

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
		let _this = this
		let container = document.querySelectorAll('.chooseBankCard .card .swipeAction li span')
		for (var i = 0; i < container.length; i++) {
			var x, X
			container[i].addEventListener('touchstart', function(event) {
        //记录初始触控点横坐标
				x = event.changedTouches[0].pageX
      })
      
			container[i].addEventListener('touchmove', function(event) {
        //记录当前触控点横坐标
				X = event.changedTouches[0].pageX
				if (_this.expansion) {
					//判断是否展开，如果展开则收起
					_this.expansion.className = ''
        }
        
				if (X - x > 10) {
					//右滑
					this.className = '' //右滑收起
				}
				if (x - X > 10) {
					//左滑
					this.className = 'swipeleft' //左滑展开
					_this.expansion = this
				}
			})
    }
    
    window.addEventListener('click', this.listRecovery)
	}

  componentWillUnmount() {
    window.removeEventListener('click', this.listRecovery)
  }

  //列表恢复
  listRecovery = () => {
    if(this.expansion) {
      this.expansion.className = ''
    }
  }

  //侧滑删除当前项
	handleDelete = id => {
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
										<span>
                      <div className="content">
                        <div className="img"><img src={require("../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
                        <div className="bankInfo">
                          <p className="bankName">{item.bankName}</p>
                          <p className="cardNum">{item.cardNum}</p>
                        </div>
                        <div className="bankBranch">
                          {item.bankBranch}
                        </div>
                      </div>
											<i onClick={() => this.handleDelete(item.id)}></i>
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
