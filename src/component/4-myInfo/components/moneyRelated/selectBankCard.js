import React from 'react'
import TopNavBar from '../topNavBar'

class SelectBankCard extends React.Component {
  componentDidMount(){
    let cardBox = document.querySelector(".selectBankCard .cardBox ul")
    cardBox.addEventListener("click", function(e) {
      console.log(e.target.tagName)
      let li = e.target.tagName === 'LI' ? e.target : (e.target.tagName === 'DIV' ? e.target.parentNode : e.target.parentNode.parentNode)

      if(!li.className.includes('active')) {
        let lis = document.querySelectorAll(".selectBankCard .cardBox ul li")
        lis.forEach((item) => {
          item.classList.remove('active')
        })
        li.classList.add('active')
      }
    }, false)
  }
	render() {
		return (
			<div className="selectBankCard">
				<TopNavBar title="选择银行卡" rightContent={false} />
				<div className="cardBox">
					<ul>
						<li className="active">
							<div className="img">
                <img src={require('../../../../images/myInfo/icon_jianshe.png')} alt="" />
              </div>
              <div className="bankInfo">
                <p className="bankName">
                  中国建设银行
                </p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="onSelect"></div>
						</li>
            <li>
							<div className="img">
								<img src={require('../../../../images/myInfo/icon_jianshe.png')} alt="" />
							</div>
              <div className="bankInfo">
                <p className="bankName">
                  中国建设银行
                </p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="onSelect"></div>
						</li>
            <li>
							<div className="img">
								<img src={require('../../../../images/myInfo/icon_jianshe.png')} alt="" />
							</div>
              <div className="bankInfo">
                <p className="bankName">
                  中国建设银行
                </p>
                <p className="cardNumber">**** **** **** 7654</p>
              </div>
              <div className="onSelect"></div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default SelectBankCard
