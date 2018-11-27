import React from 'react'
import { goldConfig } from './../component/config'
//三个数字加一个逗号
export function toThousands(num) {
	let result = [],
		counter = 0
	num = (num || 0).toString().split('')
	for (let i = num.length - 1; i >= 0; i--) {
		counter++
		result.unshift(num[i])
		if (!(counter % 3) && i !== 0) {
			result.unshift(',')
		}
	}
	return result.join('')
}

//获取节点子元素
export function getChildNode(dom) {
	let nodes = []
	let childrens = dom.childNodes
	for (let i = 0; i < childrens.length; i++) {
		if (childrens[i].nodeType === 1) {
			nodes.push(childrens[i])
		}
	}
	return nodes
}
/**
 * 获取相邻元素
 * @param ele 参考物元素
 * @param type 类型，上一个(1)or下一个(0)
 * @return 返回查找到的元素Dom对象，无则返回null
 */
export function getNearEle(ele, type) {
	type = type === 1 ? 'previousSibling' : 'nextSibling'
	var nearEle = ele[type]
	while (nearEle) {
		if (nearEle.nodeType === 1) {
			return nearEle
		}
		nearEle = nearEle[type]
		if (!nearEle) {
			break
		}
	}
	return null
}

//判断两个对象是否相等
export function ObjectEquals(object1, object2) {
	for (let propName in object1) {
		if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
			return false
		} else if (typeof object1[propName] !== typeof object2[propName]) {
			return false
		}
	}
	for (let propName in object2) {
		if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
			return false
		} else if (typeof object1[propName] !== typeof object2[propName]) {
			return false
		}
		if (!object1.hasOwnProperty(propName)) continue

		if (object1[propName] instanceof Array && object2[propName] instanceof Array) {
			if (!ObjectEquals(object1[propName], object2[propName])) return false
		} else if (object1[propName] instanceof Object && object2[propName] instanceof Object) {
			if (!ObjectEquals(object1[propName], object2[propName])) return false
		} else if (object1[propName] !== object2[propName]) {
			return false
		}
	}
	return true
}

//小数转换百分比并且保留小数点后两位
export function PercentNum(num) {
	let Nnum = Number(num * 100).toFixed(2)
	Nnum += '%'
	return Nnum
}

//获取元素样式兼容性写法
export function getStyle(obj, style) {
	return obj.currentStyle ? obj.currentStyle[style] : getComputedStyle(obj, false)[style]
}

//模仿jq animate效果
export function animate(obj, styleJson, callback) {
	clearInterval(obj.timer)
	// 开启定时器
	obj.timer = setInterval(function() {
		//假设所有动作都已完成成立。
		var flag = true
		for (var styleName in styleJson) {
			//1.取当前属性值
			var iMov = 0
			// 透明度是小数，所以得单独处理
			iMov =
				styleName === 'opacity'
					? Math.round(parseFloat(getStyle(obj, styleName)) * 100)
					: parseInt(getStyle(obj, styleName), 10)
			//2.计算速度
			var speed = 0
			//缓冲处理，这边也可以是固定值
			speed = (styleJson[styleName] - iMov) / 8
			//区分透明度及小数点，向上取整，向下取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			//3.判断是否到达预定值
			if (Number.parseInt(styleJson[styleName], 10) !== iMov) {
				flag = false
				//判断结果是否为透明度
				if (styleName === 'opacity') {
					obj.style[styleName] = (iMov + speed) / 100
					obj.style.filter = 'alpha(opacity:' + (iMov + speed) + ')'
				} else {
					obj.style[styleName] = iMov + speed + 'px'
				}
			}
		}
		//到达设定值，停止定时器，执行回调
		if (flag) {
			clearInterval(obj.timer)
			if (callback) {
				callback()
			}
		}
	}, 40)
}

//文字滚动构造函数,父级ID、ul父元素
export function TextScrollTop(fatherId, rollWrapClass, gap = 0, size = 2) {
	let domSize = {},
		domValue = {},
		// animateTime = 300,
		scrollTime = 3000,
		autoScroll
	//获取dom元素，最外层
	domSize.moduleId = document.getElementById(fatherId)
	domSize.rollWrap = domSize.moduleId.querySelector('.' + rollWrapClass)
	domSize.rollWrapUl = getChildNode(domSize.rollWrap)[0]
	domSize.rollWrapLis = getChildNode(domSize.rollWrapUl)

	if (domSize.rollWrapLis[0]) {
		domValue.liNums = domSize.rollWrapLis.length
		domValue.ulHeight = domSize.rollWrapUl.offsetHeight
		domValue.liHeight = domSize.rollWrapLis[0].offsetHeight

		this.init = function() {
			autoPlay()
			pausePlay()
		}
	} else {
		this.init = () => {}
	}

	function play() {
		if (size === 1) {
			animate(domSize.rollWrapUl, { 'margin-top': '-' + (domValue.liHeight + gap) }, function() {
				domSize.rollWrapUl.style.marginTop = 0
				domSize.rollWrapUl.appendChild(getChildNode(domSize.rollWrapUl)[0])
			})
		} else {
			animate(domSize.rollWrapUl, { 'margin-top': '-' + (domValue.liHeight + gap) }, function() {
				domSize.rollWrapUl.style.marginTop = 0
				domSize.rollWrapUl.appendChild(getChildNode(domSize.rollWrapUl)[0])
				domSize.rollWrapUl.appendChild(getChildNode(domSize.rollWrapUl)[0])
			})
		}
	}

	function autoPlay() {
		if (domValue.liHeight * domValue.liNums > domValue.ulHeight) {
			autoScroll = setInterval(function() {
				play()
			}, scrollTime)
		}
	}

	function pausePlay() {
		domSize.rollWrapUl.onmouseenter = function() {
			clearInterval(autoScroll)
		}

		domSize.rollWrapUl.onmouseleave = function() {
			autoPlay()
		}
	}
}

/*
获取元素索引值
@params
father    父级dom元素
children  获取索引的元素
*/
export function Index(father, children) {
	let childrens = getChildNode(father)
	return childrens.indexOf(children)
}

/*
获取文件名包括后缀
@params
filepath  文件路径
*/
export function GetFileName(filepath) {
	if (filepath !== '') {
		let filePath = filepath
		let names = filePath.split('\\')
		let fileName = names[names.length - 1]
		return fileName
	}
}

/*
获取文件后缀
@params
filepath  文件路径
*/
export function GetFileExt(filepath) {
	if (filepath !== '') {
		let ext = '.' + filepath.replace(/.+\./, '')
		return ext
	}
}

/*
获取文件名不包括后缀
@params
filepath  文件路径
*/
export function GetFileNameNoExt(filepath) {
	if (filepath !== '') {
		let filename = GetFileName(filepath)
		let filename1 = filename.split('.')
		return filename1[0]
	}
}

/*
字符串逆转
@params
str     逆转前字符串
*/
export function StrTurn(str) {
	if (str !== '') {
		var str1 = ''
		for (var i = str.length - 1; i >= 0; i--) {
			str1 += str.charAt(i)
		}
		return str1
	}
}

/*
日期格式化
@params
data    new Date()对象
fmt     yyyy-MM-dd hh:mm:ss
*/
export function dataFormat(date, fmt) {
	var o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return fmt
}

/*
经纬度转墨卡托
@params
lonlat     转换前经纬度坐标的对象
*/
export function lonlat2mercator(lonlat) {
	var mercator = {
		x: 0,
		y: 0
	}
	var x = (lonlat.x * 20037508.34) / 180
	var y = Math.log(Math.tan(((90 + lonlat.y) * Math.PI) / 360)) / (Math.PI / 180)
	y = (y * 20037508.34) / 180
	mercator.x = x
	mercator.y = y
	return mercator
}

/*
墨卡托转经纬度
@params
lonlat     转换前墨卡托坐标的对象
*/
export function mercator2lonlat(mercator) {
	var lonlat = {
		x: 0,
		y: 0
	}
	var x = (mercator.x / 20037508.34) * 180
	var y = (mercator.y / 20037508.34) * 180
	y = (180 / Math.PI) * (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2)
	lonlat.x = x
	lonlat.y = y
	return lonlat
}
/*
经纬度小数点转度分秒
@params
coordinate     转换前的坐标的对象
*/
export function formatDegree(coordinate) {
	var degreeCoor = {
		x: '',
		y: ''
	}
	var x_value = coordinate.x
	var y_value = coordinate.y
	x_value = Math.abs(x_value)
	var x_v1 = Math.floor(x_value) //度
	var x_v2 = Math.floor((x_value - x_v1) * 60) //分
	var x_v3 = Math.round(((x_value - x_v1) * 3600) % 60) //秒
	var x = x_v1 + '°' + x_v2 + "'" + x_v3 + '"'

	y_value = Math.abs(y_value)
	var y_v1 = Math.floor(y_value) //度
	var y_v2 = Math.floor((y_value - y_v1) * 60) //分
	var y_v3 = Math.round(((y_value - y_v1) * 3600) % 60) //秒
	var y = y_v1 + '°' + y_v2 + "'" + y_v3 + '"'

	degreeCoor.x = x
	degreeCoor.y = y
	return degreeCoor
}

/*
提示弹出，封装antd
@params
message     antd的message组件
str     提示文字
*/
export function toast(message, str) {
	if (str !== '') {
		message.destroy()
		message.config({
			top: document.documentElement.clientHeight - 200,
			duration: 1
		})
		message.info(str)
	}
}

/*
loading，封装antd
@params
message     antd的message组件
str         提示文字
duration    持续时间
onClose     关闭后的回调函数
*/
export function Loading(message, str, duration, onClose) {
	if (str !== '') {
		message.destroy()
		message.config({
			top: document.documentElement.clientHeight / 2
		})
		message.loading(str, duration, onClose)
	}
}

/*
默认点击事件
@params
dom     需要点击的节点
*/
export function imitateClick(dom) {
	if (dom) {
		let e = document.createEvent('MouseEvents')
		e.initEvent('click', true, true)
		dom.dispatchEvent(e)
	}
}

//初始开始时间(当前时间减一周)
export function initTime() {
	let date = new Date()
	let startDate = date.getDate() - 7
	let getMonth = date.getMonth()
	let startYear = date.getFullYear()
	if (startDate <= 0) {
		if (getMonth === 1) {
			startDate = 28 + startDate
		}
		startDate = 30 + startDate
		getMonth = getMonth - 1
		date.setMonth(getMonth)
	}
	if (getMonth <= 0) {
		getMonth = 11
		startYear = startYear - 1
		date.setMonth(getMonth)
		date.setYear(startYear)
	}
	date.setDate(startDate)
	return date
}

/*
预览图片
@params
inputId     input[file]的id
*/
export function previewImg(inputId) {
	const inputFiles = document.getElementById(inputId)
	const imgBox = getNearEle(inputFiles, 0)
	let imgUrl
	if (inputFiles.files.item(0)) {
		imgUrl = window.URL.createObjectURL(inputFiles.files.item(0))
		imgBox.src = imgUrl
	}
}

//表单手机号验证
export const validatorPhone = (rule, value, callback) => {
	if (value) {
		if (value.replace(/\s/g, '').length < 11) {
			callback(new Error('请输入11位手机号'))
		} else {
			callback()
		}
	}
}

//表单验证码验证
export const validatorCode = (rule, value, callback) => {
	if (value) {
		if (value.replace(/\s/g, '').length < 6) {
			callback(new Error('请输入6位验证码'))
		} else {
			callback()
		}
	}
}

//上传单张图片
export function uploadSingleImg(axios, img, callback) {
	let data = new FormData()
	data.append('image_file', img)
	axios
		.post(serverIp + '/dianzanbao/sys/file/saveImg.do', data, {
			headers: {
				token: window.sessionStorage.getItem('token'),
				user_id: window.sessionStorage.getItem('user_id')
			}
		})
		.then(res => {
      callback(res.data.result_info)
		})
}

//五角星绘制
export function createStarLevel(starLevel, selectStar, defaultStar){
  let content = []
  for(let i = 1; i <= 5; i++){
    let column
    if(i <= starLevel){
      column = <i className={selectStar} key={i}></i>
    }else{
      column = <i className={defaultStar} key={i}></i>
    }
    content.push(column)
  }
  return content
}

//奖金模式
export function createBonusItem(bonus){
  let content = []
  bonus.forEach((item ,index) => {
    let column
    let bonusValue = Number(item)
    let goldValue
    goldConfig.forEach((item2, index2)=>{
      if(index === item2.id){
        goldValue = item2.value
      }
    })
    column = <p key={index} className={`radiu_${index + 1}`}><i></i><span>{goldValue}:<span>¥{bonusValue}</span><span className='rmb'>RMB</span></span></p>
    content.push(column)
  });
  return content
}

/*
服务器本地ip切换

*/
  // export const serverIp = 'https://jizanbao.com'
 export const serverIp = ''
