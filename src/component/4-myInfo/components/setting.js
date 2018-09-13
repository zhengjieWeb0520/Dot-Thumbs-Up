import React from 'react'
import { PickerView, List, Picker } from 'antd-mobile'
import { districtData } from '../locationData/data'
import TopNavBar from './topNavBar'
const sex = [
  {
    label: '男',
    value: 'male',
  },
  {
    label: '女',
    value: 'female',
  },
]
const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];
class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      cols: 1,
      sValue: ['2013'],
      seasons: [
        [
          {
            label: '2013',
            value: '2013',
          },
          {
            label: '2014',
            value: '2014',
          },
        ],
        [
          {
            label: '春',
            value: '春',
          },
          {
            label: '夏',
            value: '夏',
          },
        ],
      ]
    }
  }
  onPickerViewChange = (value) => {
    console.log(value);
    this.setState({
      value,
    })
  }
  onPickerViewScroll = (value) => {
    console.log(value)
  }
  render() {
    let antdDistrict =[];
    Object.keys(districtData).forEach((index)=>{
        let itemLevel1 ={};
        let itemLevel2 ={};
        itemLevel1.value = districtData[index].code;
        itemLevel1.label = districtData[index].name;
        itemLevel1.children = [];
        let data = districtData[index].cities;
        Object.keys(data).forEach((index)=>{
            itemLevel2.value = data[index].code;
            itemLevel2.label = data[index].name;
            itemLevel2.children = [];
            let data2 = data[index].districts;
            let itemLevel3 ={};
            itemLevel3.children = [];
            Object.keys(data2).forEach((index)=>{
                itemLevel3.value = index;
                itemLevel3.label = data2[index];
                itemLevel2.children.push(itemLevel3);
                itemLevel3 ={};
            });
            itemLevel1.children.push(itemLevel2);
            itemLevel2 ={};
        });
        antdDistrict.push(itemLevel1)
    });
    return (
      <div className="setting">
        <TopNavBar title="设置"/>
        <div className="avatarBox item">
          <div className="title">头像</div>
          <div className="content"><img src={require("../../../images/myInfo/icon_jianshe.png")} alt=""/></div>
          <span className="icon iconfont icon-jiantou1"></span>
        </div>

        <div className="inputs">
          <div className="nickName item">
            <div className="title">昵称</div>
            <div className="content">用户昵称</div>
            <span className="icon iconfont icon-jiantou1"></span>
          </div>
          <div className="nickName item">
            <div className="title">真实姓名</div>
            <div className="content">真实名称</div>
            <span className="icon iconfont icon-jiantou1"></span>
          </div>
          <div className="nickName item">
            <div className="title">性别</div>
            <div className="content">女</div>
            <span className="icon iconfont icon-jiantou1"></span>
          </div>
          <div className="nickName item">
            <div className="title">年龄</div>
            <div className="content">33岁</div>
            <span className="icon iconfont icon-jiantou1"></span>
          </div>
          <div className="nickName item">
            <div className="title">电话</div>
            <div className="content">18655050862</div>
            <span className="icon iconfont icon-jiantou1"></span>
          </div>
          <List>
						<Picker
              title="选择地区"
              extra="请选择(可选)"
              data={antdDistrict}
              value={this.state.pickerValue}
              onChange={v => this.setState({ pickerValue: v })}
              onOk={v => this.setState({ pickerValue: v })}
              onClick={()=>{console.log('xx')}}
						>
							<List.Item arrow="horizontal" onClick={this.onClick}>
                <span className="justifyItem">地区</span>
							</List.Item>
						</Picker>
          </List>
        </div>
      </div>
    )
  }
}

export default Setting