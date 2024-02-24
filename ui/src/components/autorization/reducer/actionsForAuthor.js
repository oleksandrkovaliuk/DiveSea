import { ActionsForAutor } from "./constsForAuthor";

export const checkEmailValidation = (value) => ({
  type: ActionsForAutor.CHECK_EMAIL_VALIDATION,
  payload: value,
});
export const checkUserName = (value) => ({
  type: ActionsForAutor.CHECK_USER_NAME,
  payload: value,
});
export const checkIfUserAutorized = (value) => ({
  type: ActionsForAutor.CHECK_IF_USER_AUTORIZED,
  payload: value,
});
export const checkIfUserAlreadyReg = (value) => ({
  type: ActionsForAutor.CHECK_IF_USER_ALREADY_REGISTERED,
  payload: value,
});
export const sendCodeAfterEmailCheck = (value) => ({
  type: ActionsForAutor.SEND_CODE_AFTER_EMAIL_CHECK,
  payload: value,
});
export const getCodeFromEmail = (value) => ({
  type: ActionsForAutor.GET_CODE_FROM_EMAIL,
  payload: value,
});
export const checkIfcodeField = (value) => ({
  type: ActionsForAutor.CHECK_IF_CODE_FIELD,
  payload: value,
});
export const setCodeFromUser = (value) => ({
  type: ActionsForAutor.SET_CODE_FROM_USER,
  payload: value,
});
export const showMessageIfInvalidCode = (value) => ({
  type: ActionsForAutor.SHOW_MESSAGE_IF_INVALID_CODE,
  payload: value,
});