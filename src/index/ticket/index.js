/*
挂载app主键并和store联系起来
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import store from './store';
import './index.css';
import App from './App.jsx';

/*
用Provider把app包裹起来
*/
ReactDOM.render(<Provider store={store}><App/></Provider>,
  document.getElementById('root'));
