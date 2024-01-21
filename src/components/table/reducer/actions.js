import { ActionTypes } from "./consts";

export const setCoins = (value) => ({
	type: ActionTypes.SET_COINS,
	payload: value,
});

export const setLoading = (value) => ({
	type: ActionTypes.SET_LOADING,
	payload: value,
});