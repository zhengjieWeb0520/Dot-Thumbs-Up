import React from 'react'

import { getChildNode } from './../../../../utils/utils'

class ActivityInfoContent extends React.Component{
  componentDidMount(){

  }
  lookMoreRank(){
    document.querySelector('.zhezhao').style.display = 'block'
  }
  render(){
    return(
      <div className='activityInfoContent'>
        <div>
          <p><span>活动时间：</span><span>2018.09.09-2019.12.12</span></p>
          <p><span>活动简介：</span><span>大苏打实打实大苏打实打实大苏打实打实的撒打算大苏打大撒大撒大撒大撒大大实打实撒旦飒飒大苏打大大大苏打</span></p>
        </div>
        <div>
          <div>
            <div><span></span></div>
            <p><strong>奖金模式</strong></p>
          </div>
          <div>
            <p className='radiuOne'><i></i><span>一等奖:<span>¥&nbsp;500</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuTwo'><i></i><span>二等奖:<span>¥&nbsp;300</span><span className='rmb'>RMB</span></span></p>
            <p className='radiuThree'><i></i><span>三等奖:<span>¥&nbsp;100</span><span className='rmb'>RMB</span></span></p>
          </div>
        </div>
        <div>
          <div>
            <div>
              <i></i>
              <span>集赞排行</span>
            </div>
            <div>
              更新于2018.14 16:00
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    排名
                  </th>
                  <th>
                    用户名
                  </th>
                  <th>
                    点赞数量
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>214</td>
                  <td>吴昊</td>
                  <td>2135</td>
                </tr>
                <tr>
                  <td>No.1</td>
                  <td>张三</td>
                  <td>2125</td>
                </tr>
                <tr>
                  <td>No.2</td>
                  <td>李四</td>
                  <td>235</td>
                </tr>
                <tr>
                  <td>No.3</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>张三</td>
                  <td>2125</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>李四</td>
                  <td>235</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>赵二</td>
                  <td>215</td>
                </tr>
              </tbody>
            </table>
            <div>
              <span onTouchEnd = {(v) => {this.lookMoreRank(v)}}>查看更多排名</span>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityInfoContent