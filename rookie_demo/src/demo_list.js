import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import List from './demo_list/app'

import store from './demo_list/store'
import 'isomorphic-fetch';

console.log("初始状态:", store.getState(), store);

render(
	<Provider store={store}>
		<List />
	</Provider>,
	document.querySelector("#app")
);
