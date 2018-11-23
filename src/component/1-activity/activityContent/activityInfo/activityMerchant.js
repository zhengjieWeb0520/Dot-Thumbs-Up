import React from 'react'
import BScroll from 'better-scroll'
import { Link } from 'react-router-dom'

// 商家信息
class ActivityMerchant extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const wrapper = document.querySelector('.merchantImg')
    const scroll = new BScroll(wrapper,{
      click: true,
      scrollX: true,
      scrollY: false,
    })
  }
  componentDidUpdate(){

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
            <div className='merchantImg'>
              <div>
                {this.props.merchantInfo.img_data.imgs.map((item, index)=>{
                  return (
                    <img key={index} src={item.img_url} alt=""/>
                  )
                })}
              </div>
            </div>
          </div>
          <p><span>商家名称</span><span>{this.props.merchantInfo.user_info.user_name}</span></p>
          <p><span>商家品类</span><span>盖浇饭/地方小吃</span></p>
          <p><span>商家地址</span><span>{this.props.merchantInfo.user_info.city + this.props.merchantInfo.user_info.area + this.props.merchantInfo.user_info.user_address}</span></p>
          <p><span>商家电话</span><span>{this.props.merchantInfo.user_info.user_phone}</span></p>
        </div>
      </div>
    )
  }
}

export default ActivityMerchant