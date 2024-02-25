import React, { useContext, useEffect, useReducer, useState } from "react";
import a from "./autorization.module.scss";
import { Logo } from "../../../icons/Logo";
import { Close } from "../../../icons/closeBtn";
import { InputValidationTrue } from "../../../icons/inputvalidationtrue";
import { InputValidationFalse } from "../../../icons/inputvalidationfalse";
import {
  checkEmailValidation,
  checkUserName,
  checkIfUserAutorized,
  checkIfUserAlreadyReg,
  checkIfcodeField,
  sendCodeAfterEmailCheck,
  setCodeFromUser,
  showMessageIfInvalidCode,
} from "../reducer/actionsForAuthor";
import {
  initialStateForAutor,
  reducerForAutor,
} from "../reducer/reducerForauthor";
import { emailValidation } from "../../../service/emailValidation";

import cryptoJs from "crypto-js";
import { workWithAutorization } from "../../../service/autorization.api";
import { UserContext } from "../../../context/UserContext";

export const Autorization = ({ show, signIn, closeMenu, loginInUser }) => {
  const [
    {
      emailvalidation,
      userNamevalidation,
      autrozite,
      codeCheck,
      codefield,
      codeFromUser,
      invalidCode,
    },
    dispatchAction,
  ] = useReducer(reducerForAutor, initialStateForAutor);
  const getDataForUser = useContext(UserContext);
  const [errors, setError] = useState(null);
  const userName = document.querySelector("#username");
  const emailValue = document.querySelector("#email");
  const checkIfEmailValid = (event) => {
    if (emailValidation(event.target.value)) {
      dispatchAction(checkEmailValidation(true));
      dispatchAction(checkIfUserAutorized(false));
    } else {
      dispatchAction(checkEmailValidation(false));
    }
    dispatchAction(sendCodeAfterEmailCheck(false));
  };
  const checkIfUserNameValid = (event) => {
    console.log(event.target.value.length > 3);
    if (event.target.value.length > 3) {
      dispatchAction(checkUserName(true));
    } else {
      dispatchAction(checkUserName(false));
    }
  };
  const reqForSignIn = async (event) => {
    event.preventDefault();
    try {
      await workWithAutorization({
        reqType: "/signInUser",
        emailValue: emailValue.value,
        userName: userName.value,
      });
      closeMenu(event);
    } catch (error) {
      setError(error.toString().split(":").pop());
      dispatchAction(checkIfUserAutorized(true));
      dispatchAction(checkEmailValidation(false));
      dispatchAction(checkIfUserAlreadyReg(true));
    }
  };
  const reqForLoginIn = async (event) => {
    event.preventDefault();
    try {
      await workWithAutorization({
        reqType: "/loginUser",
        emailValue: emailValue.value,
        sendEmail: true,
      });
      dispatchAction(sendCodeAfterEmailCheck(true));
    } catch (error) {
      setError(error.toString().split(":").pop());
      dispatchAction(checkIfUserAutorized(true));
      dispatchAction(checkEmailValidation(false));
    }
  };
  const getInputCodeValue = (event, Inputindex) => {
    const inputElement = event.target;
    if (!isNaN(inputElement.value) || inputElement.value === "0") {
      const elementValue = inputElement.value;
      if (elementValue?.length) {
        console.log(Inputindex, "input number");
        dispatchAction(
          setCodeFromUser((codeFromUser[Inputindex - 1] = elementValue))
        );
        dispatchAction(showMessageIfInvalidCode(false));
      }
      if (elementValue !== "") {
        let nextInputIndex = Inputindex + 1;
        const nextInput = document.getElementById(
          `${nextInputIndex}codedidgit`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (codeFromUser.length >= 4) {
        dispatchAction(checkIfcodeField(true));
      }
      return dispatchAction(setCodeFromUser(codeFromUser));
    } else {
      inputElement.value = "";
    }
  };
  const checkCodeValidation = async (event) => {
    event.preventDefault();
    try {
      // const res = await checkCodeFromUser({
      //   codeFromUser: codeFromUser.join(""),
      //   email: emailValue.value,
      // });
      const res = await workWithAutorization({
        reqType: "/checkCodeFromUser",
        codeFromUser: codeFromUser.join(""),
        emailValue: emailValue.value,
      });
      loginInUser(event);
      closeMenu(event);
      const cypherEmail = cryptoJs.AES.encrypt(
        res.user.email,
        process.env.REACT_APP_PASSWORD_FOR_DECRYPT
      ).toString();
      document.cookie = `user=${cypherEmail};max-age=${7 * 24 * 60 * 60}`;
      getDataForUser.setDataForUser(res.user);
    } catch (error) {
      dispatchAction(checkIfcodeField(false));
      dispatchAction(showMessageIfInvalidCode(true));
      console.error("error with validation user");
    }
  };
  const handleResendEmail = async (event) => {
    event.preventDefault();
    try {
      await workWithAutorization({
        reqType: "/loginUser",
        emailValue: emailValue.value,
        sendEmail: true,
      });
    } catch (error) {
      console.error("Login Error:", error);
    }
    const firstInput = document.getElementById("1codedidgit");
    const secondInput = document.getElementById("2codedidgit");
    const thirdInput = document.getElementById("3codedidgit");
    const fourthInput = document.getElementById("4codedidgit");
    if (event) {
      firstInput.value = "";
      secondInput.value = "";
      thirdInput.value = "";
      fourthInput.value = "";
    }
    dispatchAction(showMessageIfInvalidCode(false));
  };
  useEffect(() => {
    const body = document.body;
    if (show) {
      body.classList.add("disable-scroll-page");
    }

    return () => {
      body.classList.remove("disable-scroll-page");
      if (window.innerWidth > 1080) {
        body.classList.remove("disable-scroll-page");
      }
      dispatchAction(checkIfUserAlreadyReg(false));
      dispatchAction(checkIfUserAutorized(false));
      dispatchAction(sendCodeAfterEmailCheck(false));
      dispatchAction(showMessageIfInvalidCode(false));
    };
  }, [show]);
  return (
    <div
      style={show ? { display: "block" } : { display: "none" }}
      className={a.formAutorizationContainer}
    >
      <div className={a.blurBg}></div>
      <form className={a.autorizationForm}>
        <div className={a.autorizationFormWrap}>
          <div className={a.autorTopSection}>
            <Logo />
            <div className={a.topImg}>
              <img
                src={
                  process.env.PUBLIC_URL + "/images/Ronin597createt77bit.jpg"
                }
                alt="nftTop"
              />
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/9542createdByBoredApevalue95.jpg"
                }
                alt="nftTop"
              />
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/162createdthemonalanavalue0.4.jpg"
                }
                alt="nftTop"
              />
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/clonex16246createdclonexvalue56.jpg"
                }
                alt="nftTop"
              />
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/azuki3790createdbyazukivalue7.2.jpg"
                }
                alt="nftTop"
              />
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/42createdthemonalanvalue0.2.jpg"
                }
                alt="nftTop"
              />
              <button onClick={closeMenu} className={a.closeBtn}>
                <Close />
              </button>
            </div>
          </div>
          <h1 className={a.title}>
            {signIn ? "Connect to DiveSea" : "Log in to DiveSea"}
          </h1>
          {signIn && (
            <div className={a.inputWrap}>
              <input
                placeholder=" "
                type="text"
                id="username"
                name="username"
                className={a.autorizeInput}
                onChange={(event) => checkIfUserNameValid(event)}
              ></input>
              <label htmlFor="username" className={a.autorizeLabel}>
                Username
              </label>
              {userNamevalidation ? (
                <InputValidationTrue />
              ) : (
                <InputValidationFalse />
              )}
            </div>
          )}
          <div className={a.inputWrap}>
            <input
              placeholder=" "
              type="email"
              id="email"
              name="email"
              className={a.autorizeInput}
              onChange={(event) => checkIfEmailValid(event)}
            ></input>
            <label htmlFor="email" className={a.autorizeLabel}>
              Email
            </label>
            {emailvalidation ? (
              <InputValidationTrue />
            ) : (
              <InputValidationFalse />
            )}
          </div>
          {autrozite && <p className={a.unAutorize}>{errors}</p>}
          <p className={a.privacyPoliceText}>
            By continuing you agree to our <span>Terms & Privacy</span> Policy
            and Privy's <span>Terms.</span>
          </p>
          {codeCheck && (
            <div className={a.codeCheck}>
              <h1 className={a.codeCheckTitle}>
                Enter a code witch was sent on your email
              </h1>
              <form className={a.codeCheckForm}>
                <input
                  placeholder=" "
                  type="text"
                  id="1codedidgit"
                  name="firstcodedidgit"
                  maxlength="1"
                  className={a.codeDigits}
                  onChange={(event) => getInputCodeValue(event, 1)}
                ></input>
                <input
                  placeholder=" "
                  type="text"
                  id="2codedidgit"
                  name="secondcodedidgit"
                  maxlength="1"
                  className={a.codeDigits}
                  onChange={(event) => getInputCodeValue(event, 2)}
                ></input>
                <input
                  placeholder=" "
                  type="text"
                  id="3codedidgit"
                  name="thirdcodedidgit"
                  maxlength="1"
                  className={a.codeDigits}
                  onChange={(event) => getInputCodeValue(event, 3)}
                ></input>
                <input
                  placeholder=" "
                  type="text"
                  id="4codedidgit"
                  name="fourthcodedidgit"
                  maxlength="1"
                  className={a.codeDigits}
                  onChange={(event) => getInputCodeValue(event, 4)}
                ></input>
              </form>
              {invalidCode && (
                <div className={a.resendCodeMessage}>
                  <p>
                    Wrong code . <span>Would you like resend the code?</span>
                  </p>
                  <button onClick={(event) => handleResendEmail(event)}>
                    Resend Code
                  </button>
                </div>
              )}
            </div>
          )}
          {codeCheck ? (
            <button
              onClick={(event) => checkCodeValidation(event)}
              className={a.submitAutorization}
              style={
                codefield
                  ? { opacity: "1", pointerEvents: "unset" }
                  : { opacity: "0.4", pointerEvents: "none" }
              }
            >
              Log in
            </button>
          ) : (
            <button
              onClick={
                signIn
                  ? (event) => reqForSignIn(event)
                  : (event) => reqForLoginIn(event)
              }
              className={a.submitAutorization}
              style={
                signIn
                  ? emailvalidation && userNamevalidation
                    ? { opacity: "1", pointerEvents: "unset" }
                    : { opacity: "0.4", pointerEvents: "none" }
                  : emailvalidation
                  ? { opacity: "1", pointerEvents: "unset" }
                  : { opacity: "0.4", pointerEvents: "none" }
              }
            >
              {signIn ? "Register" : "Send code"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
