import { ActionTypes } from "./consts";

export const initialState = {
  coins: [],
  loading: false,
  dropMenu: false,
  dropMenuSort: false,
  dropMenuPos: null,
  dropMenuPosSort: null,
  sortFilter: "rank",
  orderFilter: "ascending",
  filterSortType: ["ascending"],
  postPerPage:10,
  currentPage:1,
  isFirstRender: true,
};

export const reducer = (state, action) => {
  if (action.type === ActionTypes.SET_COINS) {
    return {
      ...state,
      coins: action.payload,
    };
  }
  if (action.type === ActionTypes.SET_LOADING) {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === ActionTypes.SHOW_DROP_DOWN_MENU) {
    return {
      ...state,
      dropMenu: action.payload,
    };
  }
  if (action.type === ActionTypes.SHOW_DROP_DOWN_SORT) {
    return {
      ...state,
      dropMenuSort: action.payload,
    };
  }
  if (action.type === ActionTypes.SHOW_DROP_MENU_POS) {
    return {
      ...state,
      dropMenuPos: action.payload,
    };
  }
  if (action.type === ActionTypes.SHOW_DROP_MENU_POS_SORT) {
    return {
      ...state,
      dropMenuPosSort: action.payload,
    };
  }
  if (action.type === ActionTypes.SET_SORT_FILTER) {
    return {
      ...state,
      sortFilter: action.payload,
    };
  }
  if (action.type === ActionTypes.SET_ORDER_FILTER) {
    return {
      ...state,
      orderFilter: action.payload,
    };
  }
  if (action.type === ActionTypes.SET_FILTER_SORT_TYPE) {
    return {
      ...state,
      filterSortType: action.payload,
    };
  }
  if(action.type === ActionTypes.CURENT_POST){
    return{
      ...state,
      currentPage:action.payload,
    }
  }
  if(action.type === ActionTypes.POST_PER_PAGE){
    return{
      ...state,
      postPerPage:action.payload,
    }
  }
  if(action.type === ActionTypes.IS_FIRST_RENDER){
    return{
      ...state,
      isFirstRender:action.payload,
    }
  }
  throw Error("Unknown action.");
};
