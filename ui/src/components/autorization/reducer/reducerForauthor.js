import { ActionsForAutor } from "./constsForAuthor";

export const initialStateForAutor = {
  emailvalidation: null,
  userNamevalidation: null,
  autrozite: false,
  registered: false,
  codeCheck: false,
  codeFromEmail: 0,
  codefield: false,
  codeFromUser: [],
  invalidCode: false,
  setCookie: false,
};

export const reducerForAutor = (state, action) => {
  if (action.type === ActionsForAutor.CHECK_EMAIL_VALIDATION) {
    return {
      ...state,
      emailvalidation: action.payload,
    };
  }
  if (action.type === ActionsForAutor.CHECK_USER_NAME) {
    return {
      ...state,
      userNamevalidation: action.payload,
    };
  }
  if (action.type === ActionsForAutor.CHECK_IF_USER_AUTORIZED) {
    return {
      ...state,
      autrozite: action.payload,
    };
  }
  if (action.type === ActionsForAutor.CHECK_IF_USER_ALREADY_REGISTERED) {
    return {
      ...state,
      registered: action.payload,
    };
  }
  if (action.type === ActionsForAutor.SEND_CODE_AFTER_EMAIL_CHECK) {
    return {
      ...state,
      codeCheck: action.payload,
    };
  }
  if (action.type === ActionsForAutor.GET_CODE_FROM_EMAIL) {
    return {
      ...state,
      codeFromEmail: action.payload,
    };
  }
  if (action.type === ActionsForAutor.CHECK_IF_CODE_FIELD) {
    return {
      ...state,
      codefield: action.payload,
    };
  }
  if (action.type === ActionsForAutor.SET_CODE_FROM_USER) {
    return {
      ...state,
      codeFromUser: action.payload,
    };
  }
  if (action.type === ActionsForAutor.SHOW_MESSAGE_IF_INVALID_CODE) {
    return {
      ...state,
      invalidCode: action.payload,
    };
  }
};
