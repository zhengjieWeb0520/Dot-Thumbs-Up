import React from 'react'
import axios from 'axios'
import { createForm } from 'rc-form'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { InputItem, List, Toast, DatePicker , ImagePicker} from 'antd-mobile'
import { Radio } from 'antd'
import { getChildNode, serverIp, dataFormat } from './../../utils/utils'
import TopNavBar from './../4-myInfo/components/topNavBar'
import { publishActive } from './../../redux/3-publish/createActiceRedux'
import './publish.scss'

// 发布活动
const RadioGroup = Radio.Group;
class PublishActivity extends React.Component{
  constructor(props){
    super(props)
    this.uploadFiles = []  //活动图片的参数
    this.state={
      startDate: '',
      endDate: '',
      menuState: 0, //主菜单切换 0 奖金  1代金券
      radioType: 0, //0排名  1平摊
      files: [],
      rankingData: [
        {
          id: 1,
          name: '第1名'
        },
        {
          id: 2,
          name: '第2名'
        }
      ]
    }
  }
  handleChange(type, e) {
    this.setState({
      radioType: e.target.value,
    });
  }
  componentDidMount(){
     const wrapper = document.querySelector('.publishActivityWrapper')
     const scroll = new BScroll(wrapper,{click: true})

    let navListUl = document.querySelector(".inputsMenu ul")
    let navListLis = getChildNode(navListUl)
    let _this = this
    //点击menu切换样式
    navListUl.addEventListener('click', function(e){    
      navListLis.forEach((item, index)=>{
        item.classList.remove('inputsMenuActive')
      })
      if(e.target.tagName === 'SPAN'){
        e.target.parentNode.classList.add('inputsMenuActive')
      }else if(e.target.tagName === 'P'){
        e.target.parentNode.parentNode.classList.add('inputsMenuActive')
      }else if(e.target.tagName === 'I'){
        e.target.parentNode.parentNode.parentNode.classList.add('inputsMenuActive')
      }else {
        e.target.classList.add('inputsMenuActive')
      }
      if(e.target.outerText === '奖金' || e.target.parentNode.children[0].innerText === '奖金'){
        _this.setState({
          menuState: 0,         
        },()=>{
          _this.setState({
            radioType: 0,
            rankingData:  [
              {
                id: 1,
                name: '第1名'
              },
              {
                id: 2,
                name: '第2名'
              }
            ]
          })
        })
      }else if(e.target.outerText === '代金券' || e.target.parentNode.children[0].innerText === '代金券'){
        _this.setState({
          menuState: 1
        },()=>{
          _this.setState({
            radioType: 0,
            rankingData:  [
              {
                id: 1,
                name: '第1名'
              },
              {
                id: 2,
                name: '第2名'
              }
            ]
          })
        })
      }
    }, false)
  }
  //奖金、代金券切换
  createContent(){
    let content
    if(this.state.menuState === 0){
      content = (
        <div className='inputsContent inputs bonus'>
          <div className='inputsContentRadio'>
            <RadioGroup onChange={v => {this.handleChange('bonus', v)}} value={this.state.radioType}>
              <Radio value={0}>排行</Radio>
              <Radio value={1}>平摊</Radio>
            </RadioGroup> 
          </div>
          <div className='inputsContentInfo'>
            {this.createInputContent()}
          </div>
        </div>)
    }else if(this.state.menuState === 1){
      content = (
        <div className='inputsContent inputs voucher'>
          <div className='inputsContentRadio'>
            <RadioGroup onChange={v => {this.handleChange('voucher', v)}} value={this.state.radioType}>
              <Radio value={0}>排行</Radio>
              <Radio value={1}>平摊</Radio>
            </RadioGroup> 
          </div>
          <div className='inputsContentInfo'>
            {this.createInputContent()}
          </div>
        </div>
      )
    }
    return content
  }
  handeleFocus(){
    document.querySelector('.inputsContent').scrollIntoView()
  }
  //排行、平摊切换
  createInputContent(){
    //排行
    if(this.state.radioType === 0){
      return(
        <div className="ranking">
          <List>
            {this.state.rankingData.map((item, index)=>{
              if(index === 0){
                return (
                  <InputItem
                    key={item.id}
                    clear
                    type="name"
                    placeholder="请设置金额"
                    onFocus = {(v)=>{this.handeleFocus()}}
                    {...this.props.form.getFieldProps(`bonus_${item.id}`)} 
                  >
                    <span className="justifyItem">{item.name}</span>
                  </InputItem>
                )
              }else{
                return (
                  <InputItem
                    key={item.id}
                    clear
                    type="name"
                    placeholder="请设置金额"
                    onFocus = {(v)=>{this.handeleFocus()}}
                    extra="×"
                    onExtraClick={v=>{this.removeRanking(v)}}
                    {...this.props.form.getFieldProps(`bonus_${item.id}`)} 
                  >
                    <span className="justifyItem">{item.name}</span>
                  </InputItem>
                )
              }
            })}
          </List>
          <div className="addRanking" onTouchEnd={v=>{this.addRanking(v)}}><i></i><span>添加排行</span></div>
        </div>
      )
    }else if(this.state.radioType === 1){
      return(
        <div className="ranking">
          <List>
            <InputItem
              clear
              type="name"
              placeholder="请输入金额"
              onFocus = {(v)=>{this.handeleFocus()}}
              {...this.props.form.getFieldProps(`flatAmount`)} 
            >
            </InputItem>
          </List>
        </div>
      )
    }
  }
  //添加排名
  addRanking(){
    let rankingLength = this.state.rankingData.length
    let rankingData = this.state.rankingData
    if(rankingLength <= 2){
      let newObj = {
        id: rankingLength + 1,
        name: `第${rankingLength + 1}名`
      }
      rankingData.push(newObj)
      this.setState({
        rankingData: rankingData
      })
    }else{
      Toast.info('注意:最多只能设置前3名', 2)
    }
  }
  //删除排名
  removeRanking(){
    let rankingLength = this.state.rankingData.length
    let rankingData = this.state.rankingData
    rankingData.splice(rankingLength-1, 1)
    this.setState({
      rankingData: rankingData
    })
  }
  //上传图片
  onImgChange = (files, type, index) => {
    let _this = this
    this.setState({
      files,
    }, ()=>{
      let fileData = this.state.files.length > 0 ? this.state.files[this.state.files.length - 1] : {}
      if(type === 'add'){
        let data = new FormData()
        data.append('image_file', fileData.file)
        axios.post(
          serverIp + '/dianzanbao/sys/file/saveImg.do',
          data,
          {
            headers: {
              token: window.sessionStorage.getItem('token'),
              user_id: window.sessionStorage.getItem('user_id'),
            }            
          }
        ).then(res => {
          if(res.data.result_code === "0"){
            console.log(res.data.result_info)
            _this.uploadFiles.push(res.data.result_info)
          }
        })
      }else if(type === 'remove'){
        this.uploadFiles.splice(index, 1)
      }
    })
  }
  submitForm =()=>{
    let _this = this
    const form = this.props.form
    let errors = form.getFieldsError()
    let error = ''
    let  values = form.getFieldsValue()
    for(let key in errors) {
      if(errors[key]) {
        error = errors[key]
        break
      }
    }

    let bonus = ''
    if(this.state.radioType === 0){
      for(let i = this.state.rankingData.length - 1; i>= 0; i--){
        if(i === 0)
          bonus = bonus + values[`bonus_${i+1}`]
        else
          bonus = bonus + values[`bonus_${i+1}`] + ','
      }
    }else if(this.state.radioType === 1){
      bonus = values.flatAmount
    }
    let img_urls = ""
    this.uploadFiles.forEach((item, index)=>{
      if(index !== this.uploadFiles.length - 1){
        img_urls = img_urls + item + ','
      }else{
        img_urls = img_urls + item
      }
    })
    if(!error){
      if(!values.activityName){ 
        Toast.info('请输入活动名称', 1)
        return
      }else if(!values.activityInfo){
        Toast.info('请输入活动描述', 1)
        return
      }else if(!values.startDate){
        Toast.info('请输入开始时间', 1)
        return
      }else if(!values.endDate){
        Toast.info('请输入结束时间', 1)
        return
      }else if(!values.bonus_1 && this.state.radioType === 0){
        Toast.info('请输入金额', 1)
        return
      }
      else if(!values.flatAmount && this.state.radioType === 1){
        Toast.info('请输入金额', 1)
        return
      }
      let data = {
        active_name: values.activityName,
        active_start_date: dataFormat(values.startDate, 'yyyy-MM-dd hh:mm'),
        active_end_date: dataFormat(values.endDate, 'yyyy-MM-dd hh:mm'),
        active_desc: values.activityInfo,
        bonus_type : this.state.menuState,
        distribute_type: this.state.radioType,
        bonus: bonus,
        active_images: img_urls 
      }
      this.props.publishActive(data, function(){
        _this.props.form.resetFields()
        //_this.props
      })  
    }else{
      Toast.info(error, 1)
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.publishState !== ''){
      Toast.success(nextProps.publishState,3, this.onClose, true);
    }
  }
  onClose =()=>{
    
  }
  render(){
    const { getFieldProps, getFieldError } = this.props.form
    return(
      <div id='PublishActivity' className='publishActivity userFeedBack'> 
        <TopNavBar title="发起活动"/>
        <div className='publishActivityWrapper'>
        <div>
        <form name="publishActivity" >
          <div className="inputs">
            <div className="phone">
              <List>
                <InputItem
                  clear
                  type="name"
                  placeholder="请输入活动名称"
                  {...getFieldProps('activityName')}
                >
                </InputItem>
                <InputItem
                  clear
                  type="name"
                  placeholder="请输入活动简介"
                  {...getFieldProps('activityInfo')}
                >
                </InputItem>
                <div className="imagePick">
                  <ImagePicker
                    files={this.state.files}
                    onChange={this.onImgChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 3}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                  />
                  {this.state.files.length > 0 ? null : <span className="tips">添加活动图片(最多9张)</span>}
                </div>
                <DatePicker
                  title="选择开始时间"
                  //value={this.state.startDate}
                  //onChange={startDate => this.setState({ startDate })}
                  {...getFieldProps('startDate')}
                  >
                  <List.Item arrow="horizontal">请选择开始时间</List.Item>
                </DatePicker>
                <DatePicker
                  title="选择结束时间"
                  //value={this.state.endDate}
                  //onChange={endDate => this.setState({ endDate })}
                  {...getFieldProps('endDate')}
                  >
                  <List.Item arrow="horizontal">请选择结束时间</List.Item>
                </DatePicker>
              </List>     
            </div>
          </div>
          <p>奖金模式(活动奖金分配模式一旦创建后不允许编辑)</p>
          <div className='inputs'>
            <div className='inputsMenu'>
              <ul>
                <li className='inputsMenuActive'>
                  <span>
                    <p>奖金</p>
                    <p><i></i></p>
                  </span>
                </li>
                <li>
                  <span>
                    <p>代金券</p>
                    <p><i></i></p>
                  </span>
                </li>
              </ul>
            </div>
          </div>          
          {this.createContent()}
        </form>
        </div>
        </div>
        <div className="submitBtn" onClick={this.submitForm}>提交</div>
      </div>
    )
  }
}

PublishActivity = createForm()(PublishActivity)

PublishActivity = connect(
	state => 
    state.createActivity,

	{ publishActive }
)(PublishActivity)

export default PublishActivity