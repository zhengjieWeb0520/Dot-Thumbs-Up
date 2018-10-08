import React from 'react';
import ReactDOM from 'react-dom';
import './css/Reset.css';
import './css/index.scss';
import Main from './component/main';
import ChooseBankCard from './component/4-myInfo/components/chooseBankCard'
import NewBackCard from './component/4-myInfo/components/newBankCard'
import Wallet from './component/4-myInfo/components/wallet'
import WithdrawCash from './component/4-myInfo/components/withdrawCash'
import WithdrawRecord from './component/4-myInfo/components/withdrawRecord'
//引入活动相关组件
import ActivityInfo from './component/1-activity/activityContent/activityInfo'
import MerchantPublish from './component/5-merchant/merchantPublish'
import MerchantActivities from './component/5-merchant/merchantActivities'
import SelectBankCard from './component/4-myInfo/components/selectBankCard'
import BussinessAuthentication from './component/4-myInfo/components/bussinessAuthentication'
import StaffAuthentication from './component/4-myInfo/components/staffAuthentication'
import ChangePassword from './component/4-myInfo/components/changePassword'
import AboutUs from './component/4-myInfo/components/aboutUs'
import UserFeedBack from './component/4-myInfo/components/userFeedBack'
import Collection from './component/4-myInfo/components/collection'
import Involve from './component/4-myInfo/components/involve'
import RecentView from './component/4-myInfo/components/recentView'
import Voucher from './component/4-myInfo/components/voucher'
import Setting from './component/4-myInfo/components/setting'
import SettingInput from './component/4-myInfo/components/settingInput'
import { HashRouter, Route, Switch } from 'react-router-dom'
//引入redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//异步中间件
import thunk from 'redux-thunk'
//reducer整合
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import initReactFastclick from 'react-fastclick'
import './font/iconfont.css'
initReactFastclick()

export const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : fn => fn
))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div id = "container">
        <Switch>
          <Route path='/index' component ={Main}></Route>
          <Route path='/merchantPublish' component ={MerchantPublish}></Route>
          <Route path='/merchantActivities' component ={MerchantActivities}></Route>
          <Route path='/collection' component ={Collection}></Route>
          <Route path='/involve' component ={Involve}></Route>
          <Route path='/recentView' component ={RecentView}></Route>
          <Route path={`/chooseBankCard`} exact component={ChooseBankCard}></Route>
          <Route path={`/chooseBankCard/newBankCard`} component={NewBackCard}></Route>
          <Route path={`/wallet`} exact component={Wallet}></Route>
          <Route path={`/wallet/withdraw`} exact component={WithdrawCash}></Route>
          <Route path={`/wallet/withdrawRecord`} component={WithdrawRecord}></Route>
          <Route path={`/activityInfo`} component={ActivityInfo}></Route>
          <Route path={`/wallet/withdraw/selectBankCard`} component={SelectBankCard}></Route>
          <Route path={`/voucher`} component={Voucher}></Route>
          <Route path={`/bussinessAuthentication`} component={BussinessAuthentication}></Route>
          <Route path={`/staffAuthentication`} component={StaffAuthentication}></Route>
          <Route path={`/changePassword`} component={ChangePassword}></Route>
          <Route path={`/aboutUs`} component={AboutUs}></Route>
          <Route path={`/userFeedBack`} component={UserFeedBack}></Route>
          <Route path={`/setting`} exact component={Setting}></Route>
          <Route path={`/setting/:type`} component={SettingInput}></Route>
        </Switch>
        <div className='zhezhao'></div>
      </div>
    </HashRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
