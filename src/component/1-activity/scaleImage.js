import React from 'react'
import ReactDOM from 'react-dom'
import { bbimg } from './../../utils/utils'

class ScaleImages extends React.Component{
  constructor(props){
    super(props)
    this.params = {
      zoomVal:1,
      left: 0,
      top: 0,
      currentX: 0,
      currentY: 0,
      flag: false
    }
  }
  closeScaleImage =()=>{
    ReactDOM.unmountComponentAtNode(document.querySelector('#zhezhao'))
    document.querySelector('.zhezhao').style.display = 'none'
  }
  handleScroll = (e)=>{
    let parentContainer = document.querySelector("#proImg");
    bbimg(parentContainer, e.nativeEvent.wheelDelta, this.params);
  }
  render(){
    return(
      <div className="productImg" onTouchEnd={this.closeScaleImage}>
        <div id="productImg" onWheel={e => this.handleScroll(e)}>
          <img id="proImg" src={this.props.imgurl} alt=""/>
        </div>
      </div>
    )
  }
}
export default ScaleImages