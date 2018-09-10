import React from 'react'
import TopNavBar from './topNavBar'
import { SwipeAction, List } from 'antd-mobile'
import { Link } from 'react-router-dom'
const Item = List.Item;
const Brief = Item.Brief;

class ChooseBankCard extends React.Component {
  render() {
    return (
      <div className="chooseBankCard">
        <TopNavBar title="选择银行卡" rightContent={false}/>
        <div className="cardBox">
          {/* <div className="addCard">
            <Link to={`/chooseBankCard/newBankCard`}>
              新增银行卡
            </Link>
          </div> */}
          <div className="card">
            <List>
              <SwipeAction
                right={[
                  {
                    text: 'delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#fff', color: 'red' },
                  },
                ]}
                onOpen={() => console.log('global open')}
                onClose={() => console.log('global close')}
              >
                <Item
                  thumb={require("../../../images/myInfo/icon_gongshang.png")}
                  multipleLine
                  onClick={() => {}}
                >
                  中国工商银行
                  <Brief>6222****5077</Brief>
                  <span className="bankBranch">浦口支行</span>
                </Item>
              </SwipeAction>
              <SwipeAction
                right={[
                  {
                    text: 'delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: '#fff', color: 'red' },
                  },
                ]}
                onOpen={() => console.log('global open')}
                onClose={() => console.log('global close')}
              >
                <Item
                  thumb={require("../../../images/myInfo/icon_jianshe.png")}
                  multipleLine
                  onClick={() => {}}
                >
                  中国建设银行
                  <Brief>6222****5077</Brief>
                  <span className="bankBranch">青浦支行</span>
                </Item>
              </SwipeAction>
            </List>
          </div>
          <div className="addCard">
            <Link to={`/chooseBankCard/newBankCard`}>
              新增银行卡
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ChooseBankCard