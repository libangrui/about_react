import { extend } from 'jquery'
import * as Actions from './actions'

const initD = {
	type: Actions.Status_init,
	list: {
		step: 'init',
		items: [],
		pd: {},
		pageBean: {
			current: 1,
			total: 1,
			count: 0,
			size: 10
		},
		add: {
			id: 0,
			name: "",
			job: ""
		},
		del: {
			id: 0
		}
	}
};

export default function reducer(state = initD, action){
	console.log("状态、行为", state, action);

	switch(action.type){
		
		case Actions.Status_list_xhr_get:
			return extend(true, {}, state, {
				list: {
					step: 'loading'
				}
			});

		case Actions.Status_list_xhr_complete:
			let _state = extend(true, {}, state, {
				type: Actions.Status_list_xhr_complete,
				list: {
					step: "complete",
					pageBean: action.pageBean
				}
			});
			_state.list.items = action.items;

			return _state;

		case Actions.Status_list_item_add:
			return extend(true, {}, state, {
				list: {
					step: 'add',
					add: {
						name: action.name
					}
				}
			});

		case Actions.Status_list_item_add_complete:
			return extend(true, {}, state, {
				list: {
					step: 'add_complete',
					items: [
						...state.list.items,
						{id: action.id, name: state.list.add.name, job: action.job}
					]
				}
			});

		case Actions.Status_list_item_del:
			return extend(true, {}, state, {
				list: {
					step: 'del',
					del: {
						id: action.id
					}
				}
			});

		case Actions.Status_list_item_del_complete:
			let del_after_state = extend(true, {}, state, {
				list: {
					step: 'del_complete'
				}
			});
			del_after_state.list.items = del_after_state.list.items.filter( it => it.id!==action.id );

			return del_after_state;

		case Actions.Status_pageBean_go:
			let t_cur, pbD = state.list.pageBean;

			if( action.op==="prev" ){
				if( pbD.current === 1 ){
					return state;
				}
				t_cur = pbD.current - 1;
			}

			if( action.op==="next" ){
				if( pbD.current === pbD.total ){
					return state;
				}
				t_cur = pbD.current + 1;
			}

			t_cur = t_cur<1?1:t_cur;
			t_cur = t_cur>pbD.total?pbD.total:t_cur;

			return extend(true, {}, state, {
				list: {
					step: "send",
					pageBean: {
						current: t_cur
					}
				}
			})

		default:
			return state;
	}
};