import React from 'react'
import TopNavBar from './topNavBar'
import { ImagePicker, InputItem, List } from 'antd-mobile'

class UserFeedBack extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onImgChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  render() {
    return (
      <div className="userFeedBack">
        <TopNavBar title="用户反馈"/>
        <div className="inputs">
          <div className="textarea">
            <textarea cols="30" rows="10"></textarea>
          </div>
          <div className="imagePick">
            <ImagePicker
              files={this.state.files}
              onChange={this.onImgChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 3}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />

            {this.state.files.length > 0 ? null : <span className="tips">添加图片说明</span>}
          </div>
        </div>

        <div className="phone">
          <List>
            <InputItem
              clear
              type="phone"
              placeholder="便于我们联系你"
              ref={el => (this.inputRef = el)}
            >
              <span className="justifyItem">联系电话</span>：
            </InputItem>
          </List>
        </div>
        <div className="submitBtn">提交</div>
      </div>
    )
  }
}

export default UserFeedBack