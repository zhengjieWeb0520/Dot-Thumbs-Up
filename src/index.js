import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'
import './css/Reset.css';
import './index.css';
import Main from './component/main';
import ChooseBankCard from './component/4-myInfo/components/chooseBankCard'
import NewBackCard from './component/4-myInfo/components/newBankCard'
import { HashRouter, Route, Switch } from 'react-router-dom'
//引入redux
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//异步中间件
import thunk from 'redux-thunk'
//reducer整合
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import './font/iconfont.css'

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
          <Route path={`/chooseBankCard`} exact component={ChooseBankCard}></Route>
          <Route path={`/chooseBankCard/newBankCard`} component={NewBackCard}></Route>
        </Switch>
      </div>
    </HashRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
