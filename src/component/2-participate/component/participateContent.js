import React from 'react'
import BScroll from 'better-scroll'

class ParticipateContent extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    const wrapper = document.querySelector('.participateWrapper')
    const scroll = new BScroll(wrapper,{click: true})
  }
  render(){
    return(
      <div id='ParticipateContent' className='ParticipateContent content'>
        <div className='participateItem'>
          <div className='participateItemHeader'>
            <div>
              <span></span>
              <span>福州沙县小吃<i></i></span>             
            </div>
            <div>
              未中奖
            </div>
          </div>
          <div className='participateItemContent'>
            <div>
              <span>活动名称</span>
              <span>2018.09.12-2018.10.12</span>
            </div>
            <div>简介内容简介内容简介内容简介内容简介内容简介内容</div>
            <div><i></i><span>一等奖:500RMB</span><span>二等奖:300RMB</span><span>三等奖:100RMB</span></div>
          </div>
        </div>
        <div className='participateItem'>
          <div className='participateItemHeader'>
            <div>
              <span></span>
              <span>福州沙县小吃<i></i></span>             
            </div>
            <div>
              未中奖
            </div>
          </div>
          <div className='participateItemContent'>
            <div>
              <span>活动名称</span>
              <span>2018.09.12-2018.10.12</span>
            </div>
            <div>简介内容简介内容简介内容简介内容简介内容简介内容</div>
            <div><i></i><span>一等奖:500RMB</span><span>二等奖:300RMB</span><span>三等奖:100RMB</span></div>
          </div>
        </div>
        <div className='participateItem'>
          <div className='participateItemHeader'>
            <div>
              <span></span>
              <span>福州沙县小吃<i></i></span>             
            </div>
            <div>
              未中奖
            </div>
          </div>
          <div className='participateItemContent'>
            <div>
              <span>活动名称</span>
              <span>2018.09.12-2018.10.12</span>
            </div>
            <div>简介内容简介内容简介内容简介内容简介内容简介内容</div>
            <div><i></i><span>奖金平分</span></div>
          </div>
        </div>
        <div className='participateItem'>
          <div className='participateItemHeader'>
            <div>
              <span></span>
              <span>福州沙县小吃<i></i></span>             
            </div>
            <div>
              未中奖
            </div>
          </div>
          <div className='participateItemContent'>
            <div>
              <span>活动名称</span>
              <span>2018.09.12-2018.10.12</span>
            </div>
            <div>简介内容简介内容简介内容简介内容简介内容简介内容</div>
            <div><i></i><span>奖金平分</span></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ParticipateContent