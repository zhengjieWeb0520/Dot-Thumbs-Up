import React from 'react'
import { Link } from 'react-router-dom'

class ActivityMerchant extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='activityMerchant'>
        <div>
          <div>
            <div>
              <div>
                <i></i>
                <span>商家信息</span>
              </div>
              <Link to={'/reportMerchant'}>
                <i></i>
                <span>举报</span>
              </Link>
            </div>
            <div>
              
            </div>
          </div>
          <p><span>商家名称</span><span>臭臭工坊</span></p>
          <p><span>商家品类</span><span>盖浇饭/地方小吃</span></p>
          <p><span>商家地址</span><span>南京市江宁区长白街道</span></p>
          <p><span>商家电话</span><span>000-400-4101</span></p>
          <p><span>营业时间</span><span>9:00-21:00</span></p>
        </div>
      </div>
    )
  }
}

export default ActivityMerchant