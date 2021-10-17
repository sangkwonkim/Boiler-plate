import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.less';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers';

const createStroeWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
// 미들웨어를 이용해서 객체 액션만 받는 스토어가 promise와 function를 받을 수 있도록 해준다.
ReactDOM.render(

  <Provider //어플리케이션이랑 리덕스랑 연결을 시킨다.
    store={createStroeWithMiddleware(Reducer, // 포로바이더에 스토어를 넣어준다.
      window.__REDUX_DEVTOOLS_EXTENSION__ && // 데브툴을 이용해서 리덕스를 편하게 이용할 수 있다.
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <App />
  </Provider>
  
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
