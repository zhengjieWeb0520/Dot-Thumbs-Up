import React from 'react'
import ReactDOM from 'react-dom'
//引入redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//异步中间件
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import Main from './component/main'
import ChooseBankCard from './component/4-myInfo/components/moneyRelated/chooseBankCard'
import NewBackCard from './component/4-myInfo/components/moneyRelated/newBankCard'
import Wallet from './component/4-myInfo/components/moneyRelated/wallet'
import WithdrawCash from './component/4-myInfo/components/moneyRelated/withdrawCash'
import WithdrawRecord from './component/4-myInfo/components/moneyRelated/withdrawRecord'
//引入活动相关组件
import ActivityInfo from './component/1-activity/activityContent/activityInfo'
import MerchantPublish from './component/5-merchant/merchantPublish'
import MerchantActivities from './component/5-merchant/merchantActivities'
import ReportMerchant from './component/1-activity/activityContent/activityInfo/reportMerchant'
import PublishActivity from './component/3-publish/publish'
import SelectBankCard from './component/4-myInfo/components/moneyRelated/selectBankCard'
//员工和商家认证
import BussinessAuthentication from './component/4-myInfo/components/authentication/bussinessAuthentication'
import StaffAuthentication from './component/4-myInfo/components/authentication/staffAuthentication'
//修改密码
import TypeOfChangePassword from './component/4-myInfo/components/changePassword/typeOfChangePassword'
import ChangePasswordByPassword from './component/4-myInfo/components/changePassword/changePasswordByPassword'
import ChangePasswordByCode from './component/4-myInfo/components/changePassword/changePasswordByCode'
import AboutUs from './component/4-myInfo/components/aboutUs'
import UserFeedBack from './component/4-myInfo/components/userFeedBack'
import Collection from './component/4-myInfo/components/collection'
import RecentView from './component/4-myInfo/components/recentView'
import Voucher from './component/4-myInfo/components/moneyRelated/voucher'
import Setting from './component/4-myInfo/components/setting'
import SettingInput from './component/4-myInfo/components/settingInput'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './css/Reset.css'
import './css/index.scss'
//reducer整合
import reducers from './reducers'
import './font/iconfont.css'

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
					<Route path="/merchantPublish" component={MerchantPublish} />
					<Route path="/merchantActivities" component={MerchantActivities} />
					<Route path="/reportMerchant" component={ReportMerchant} />
					<Route path="/publish" component={PublishActivity} />
					<Route path="/collection" component={Collection} />
					<Route path="/recentView" component={RecentView} />
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
				<div className="zhezhao" />
			</div>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
