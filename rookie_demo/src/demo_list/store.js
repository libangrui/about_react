import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

// createStore第二个参数【可选】用于初始化 state
let initalData = undefined;

const store = createStore(reducer, initalData, applyMiddleware(thunk));

export default store;
