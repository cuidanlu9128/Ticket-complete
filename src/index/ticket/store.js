
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

/*
thunk是用来支持异步action的中间件
*/

import reducers from './reducers';
import thunk from 'redux-thunk'

/*
创建store并且作为默认倒出
*/

export default createStore(
    //传入reducers
    combineReducers(reducers),
    {

    },
    applyMiddleware(thunk)
);
