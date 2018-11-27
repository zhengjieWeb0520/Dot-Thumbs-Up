import React from 'react'
import TopNavBar from '../../4-myInfo/components/topNavBar'
import { Rate } from 'antd'
import { ImagePicker, InputItem, List, Toast } from 'antd-mobile'
import { validatorPhone, serverIp } from '../../../utils/utils'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { feedBackInfo } from '../../../redux/1-activiy/reportMerchantRedux'

class Comment extends React.Component {
	constructor(props) {
		super(props)
		this.submitForm = this.submitForm.bind(this)
		this.uploadFiles = []
		this.state = {
			files: [],
			imgs: [],
			content: '',
			star_level: 0
		}
	}

	onImgChange = (files, type, index) => {
		let _this = this
		this.setState(
			{
				files
			},
			() => {
				let fileData = this.state.files.length > 0 ? this.state.files[this.state.files.length - 1] : {}
				if (type === 'add') {
					let data = new FormData()
					data.append('image_file', fileData.file)
					axios
						.post(serverIp + '/dianzanbao/sys/file/saveImg.do', data, {
							headers: {
								token: window.sessionStorage.getItem('token'),
								user_id: window.sessionStorage.getItem('user_id')
								//'Content-Type': 'multipart/form-data'
							}
						})
						.then(res => {
							if (res.data.result_code === '0') {
								_this.setState({
									imgs: _this.state.imgs.concat([res.data.result_info])
								})
							}
						})
				} else if (type === 'remove') {
					this.uploadFiles.splice(index, 1)
				}
			}
		)
	}

	//活动评分改变
	handleChangeRate = value => {
		this.setState({ star_level: value })
	}

	//文本框内容改变
	handleChangeComment = value => {
		this.setState({ content: value.target.value })
	}

	submitForm = () => {
		let _this = this
		if (this.state.content === '') {
			Toast.info('请填写评价内容', 1)
		} else if (this.state.star_level === 0) {
			Toast.info('请选择评价评分', 1)
		}
		let data = qs.stringify({
			active_id: this.props.location.query.activeId,
			star_level: this.state.star_level,
			content: this.state.content,
			imgs: this.state.imgs.join(',')
		})
		axios
			.post('/dianzanbao/active/comment.do', data, {
				headers: {
					token: window.sessionStorage.getItem('token'),
					user_id: window.sessionStorage.getItem('user_id')
				}
			})
			.then(res => {
				if (res.data.result_code === '0') {
					Toast.info('评论成功', 1)
					_this.setState({
						imgs: [],
						content: '',
						star_level: 0,
						files: []
					})
				}
			})
	}

	render() {
		return (
			<div className="userFeedBack activityComment">
				<TopNavBar title="活动评价 " />
				<div className="inputs">
					<div className="textarea">
						<textarea cols="30" rows="10" onChange={this.handleChangeComment} value={this.state.content} />
					</div>
					<div className="imagePick">
						<ImagePicker
							files={this.state.files}
							onChange={this.onImgChange}
							// onImageClick={(index, fs) => console.log(index, fs)}
							selectable={this.state.files.length < 3}
							accept="image/gif,image/jpeg,image/jpg,image/png"
						/>
						{this.state.files.length > 0 ? null : <span className="tips">添加图片说明</span>}
					</div>
				</div>
				<div className="activityRate">
					<span className="title">活动评分</span>
					<span className="Rate">
						<Rate onChange={this.handleChangeRate} value={this.state.star_level} />
					</span>
				</div>
				<div className="submitBtn" onClick={this.submitForm}>
					提交
				</div>
			</div>
		)
	}
}

Comment = connect(
	state => ({
		reportMerchant: state.reportMerchant
	}),
	{ feedBackInfo }
)(Comment)

export default Comment
