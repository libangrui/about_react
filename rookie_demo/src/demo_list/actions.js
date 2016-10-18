import { extend, param } from 'jquery'
import fetch from 'isomorphic-fetch'

export const Status_init = 'Status_init';
export const Status_refresh = 'Status_refresh';

export const Status_list_xhr_get = 'Status_list_xhr_get';
export const Status_list_xhr_loading = 'Status_list_xhr_loading';
export const Status_list_xhr_complete = 'Status_list_xhr_complete';
export const Status_list_item_add = "Status_list_item_add";
export const Status_list_item_add_complete = "Status_list_item_add_complete";
export const Status_list_item_del = "Status_list_item_del";
export const Status_list_item_del_complete = "Status_list_item_del_complete";

export const Status_pageBean_go = "Status_pageBean_go";

export function list_xhr_get(data) {
	let pd = extend({
		current: 1
	}, data);

	return (dispatch) => {

		dispatch({
			type: Status_list_xhr_get
		});

		fetch("http://f2e.dxy.net/tools/json/299.json?page="+pd.current,{
			method: "GET"
		}).then(
			(response)=> response.json()
		).then(function(json){
			console.log("list数据:", json);
			return dispatch({
				type: Status_list_xhr_complete,
				pageBean: json.pageBean,
				items: json.items
			});
		});
	}
}

export function list_item_add(data) {
	return {
		type: Status_list_item_add,
		name: data
	};
}

export function list_item_add_xhr(data) {
	let pd = extend({
		name: ''
	}, data);

	return (dispatch) => {
		fetch("http://f2e.dxy.net/tools/json/278.json", {
			method: "POST",
			body: param(pd)
		}).then(
			(response) => response.json()
		).then(function(json){
			console.log("新增数据接口:", json);
			if(json.success){
				return dispatch({
					type: Status_list_item_add_complete,
					id: Date.now(),
					job: "工程师"
				});
			}
		});
	}
}

export function list_item_del(id){
	return {
		type: Status_list_item_del,
		id: id
	};
}

export function list_item_del_xhr(data) {
	return (dispatch) => {
		fetch("http://f2e.dxy.net/tools/json/278.json", {
			method: "POST",
			body: param(data)
		}).then(
			(response) => response.json()
		).then(function(json){
			console.log("删除数据接口:", json);
			if(json.success){
				return dispatch({
					type: Status_list_item_del_complete,
					id: data.id
				});
			}
		});
	}
}

export function pageBean_go(op) {
	return {
		type: Status_pageBean_go,
		op
	};
}