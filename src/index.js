import React from 'react'
import ReactDOM from 'react-dom'
//引入redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//异步中间件
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
//引入异步加载组件
import asyncComponent from './asyncComponent'
import Main from './component/main'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './css/Reset.css'
import './css/index.scss'
//reducer整合
import reducers from './reducers'
import './font/iconfont.css'

const ChooseBankCard = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/chooseBankCard')})
const NewBackCard = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/newBankCard')})
const Wallet = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/wallet')})
const WithdrawCash = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/withdrawCash')})
const WithdrawRecord = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/withdrawRecord')})
//引入活动相关组件
const ActivityInfo = asyncComponent(()=>{return import('./component/1-activity/activityContent/activityInfo')})
const MerchantPublish = asyncComponent(()=>{return import('./component/5-merchant/merchantPublish')})
const MerchantActivities = asyncComponent(()=>{return import('./component/5-merchant/merchantActivities')})
const ReportMerchant = asyncComponent(()=>{return import('./component/1-activity/activityContent/activityInfo/reportMerchant')})
const PublishActivity = asyncComponent(()=>{return import('./component/3-publish/publish')})
const EditePublish = asyncComponent(()=>{return import('./component/3-publish/editePublish')})
const MechantModify = asyncComponent(()=>{return import('./component/5-merchant/merchantModify')})
const SelectBankCard = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/selectBankCard')})
const MoreRank = asyncComponent(()=>{return import('./component/1-activity/activityContent/activityInfo/moreRank')})
//员工和商家认证
const BussinessAuthentication = asyncComponent(()=>{return import('./component/4-myInfo/components/authentication/bussinessAuthentication')})
const StaffAuthentication = asyncComponent(()=>{return import('./component/4-myInfo/components/authentication/staffAuthentication')})
//登录注册
const Login = asyncComponent(()=>{return import('./component/6-login/login')})
const VerificatLogin = asyncComponent(()=>{return import('./component/6-login/verificatLogin')})
const Regist = asyncComponent(()=>{return import('./component/6-login/regist')})
const ForgetPassword = asyncComponent(()=>{return import('./component/6-login/forgetPassword')})
//修改密码
const TypeOfChangePassword = asyncComponent(()=>{return import('./component/4-myInfo/components/changePassword/typeOfChangePassword')})
const ChangePasswordByPassword = asyncComponent(()=>{return import('./component/4-myInfo/components/changePassword/changePasswordByPassword')})
const ChangePasswordByCode = asyncComponent(()=>{return import('./component/4-myInfo/components/changePassword/changePasswordByCode')})
const AboutUs = asyncComponent(()=>{return import('./component/4-myInfo/components/aboutUs')})

const UserFeedBack = asyncComponent(()=>{return import('./component/4-myInfo/components/userFeedBack')})
const Collection = asyncComponent(()=>{return import('./component/4-myInfo/components/collection')})
const RecentView = asyncComponent(()=>{return import('./component/4-myInfo/components/recentView')})
const Voucher = asyncComponent(()=>{return import('./component/4-myInfo/components/moneyRelated/voucher')})

const Setting = asyncComponent(()=>{return import('./component/4-myInfo/components/setting')})
const SettingInput = asyncComponent(()=>{return import('./component/4-myInfo/components/settingInput')})

export const store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : fn => fn
	)
)

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<div id="container">
				<Switch>
					<Route path="/index" component={Main} />
          <Route path='/login' component={Login}/> 
          <Route path='/verificatLogin' component={VerificatLogin}/>           
          <Route path='/regiter' component={Regist}/>          
          <Route path='/forgetPassword' component={ForgetPassword}/>            
					<Route path="/merchantPublish" component={MerchantPublish} />
					<Route path="/merchantActivities" component={MerchantActivities} />
					<Route path="/reportMerchant" component={ReportMerchant} />
					<Route path="/publish/" exact component={PublishActivity} />
          <Route path={`/editePublish`} exact component={EditePublish} />
          <Route path="/publish/setting" component={MechantModify} />
					<Route path="/collection" component={Collection} />
					<Route path="/recentView" component={RecentView} />				
          <Route path={`/moreRank`} exact component={MoreRank} />
          <Route path={`/chooseBankCard`} exact component={ChooseBankCard} />
					<Route path={`/chooseBankCard/newBankCard`} component={NewBackCard} />
					<Route path={`/wallet`} exact component={Wallet} />
					<Route path={`/wallet/withdraw`} exact component={WithdrawCash} />
					<Route path={`/wallet/withdrawRecord`} component={WithdrawRecord} />
					<Route path={`/activityInfo`} component={ActivityInfo} />
					<Route path={`/wallet/withdraw/selectBankCard`} component={SelectBankCard} />
					<Route path={`/voucher`} component={Voucher} />
					<Route path={`/bussinessAuthentication`} component={BussinessAuthentication} />
					<Route path={`/staffAuthentication`} component={StaffAuthentication} />
					<Route path={`/changePassword`} exact component={TypeOfChangePassword} />
					<Route path={`/changePassword/bypassword`} component={ChangePasswordByPassword} />
					<Route path={`/changePassword/bycode`} component={ChangePasswordByCode} />
					<Route path={`/aboutUs`} component={AboutUs} />
					<Route path={`/userFeedBack`} component={UserFeedBack} />
					<Route path={`/setting`} exact component={Setting} />
					<Route path={`/setting/:type`} component={SettingInput} />
				</Switch>
				<div className="zhezhao" id='zhezhao'/>
			</div>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
//registerServiceWorker()
