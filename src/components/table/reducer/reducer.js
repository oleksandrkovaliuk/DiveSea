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
  filterSortType: [],
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
  throw Error("Unknown action.");
};
