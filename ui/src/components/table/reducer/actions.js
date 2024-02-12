import { ActionTypes } from "./consts";

export const setCoins = (value) => ({
  type: ActionTypes.SET_COINS,
  payload: value,
});

export const setLoading = (value) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});

export const showDropDownMenu = (value) => ({
  type: ActionTypes.SHOW_DROP_DOWN_MENU,
  payload: value,
});
export const showDropDownMenuSort = (value) => ({
  type: ActionTypes.SHOW_DROP_DOWN_SORT,
  payload: value,
});
export const showDropDownMenuPos = (value) => ({
  type: ActionTypes.SHOW_DROP_MENU_POS,
  payload: value,
});
export const showDropDownMenuPosSort = (value) => ({
  type: ActionTypes.SHOW_DROP_MENU_POS_SORT,
  payload: value,
});
export const setOrderFilter = (value) => ({
  type: ActionTypes.SET_ORDER_FILTER,
  payload: value,
});
export const setSortFilter = (value) => ({
  type: ActionTypes.SET_SORT_FILTER,
  payload: value,
});
export const setFilterSortType = (value) => ({
  type: ActionTypes.SET_FILTER_SORT_TYPE,
  payload: value,
});
export const setCurrentPages = (value) => ({
	type:ActionTypes.CURENT_POST,
	payload:value,
})
export const setPostsPerPage = (value) => ({
	type:ActionTypes.POST_PER_PAGE,
	payload:value,
})
export const setIsFirstRender = (value) => ({
	type:ActionTypes.IS_FIRST_RENDER,
	payload:value,
})