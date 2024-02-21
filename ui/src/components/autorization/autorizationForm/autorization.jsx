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
  getCodeFromEmail,
  setCodeFromUser,
  showMessageIfInvalidCode,
} from "../reducer/actionsForAuthor";
import Context from "../../../context";
import {
  initialStateForAutor,
  reducerForAutor,
} from "../reducer/reducerForauthor";
export const Autorization = ({ show, signIn, closeMenu, loginInUser }) => {
  const [
    {
      emailvalidation,
      userNamevalidation,
      autrozite,
      registered,
      codeCheck,
      codeFromEmail,
      codefield,
      codeFromUser,
      invalidCode,
    },
    dispatchAction,
  ] = useReducer(reducerForAutor, initialStateForAutor);
  const getDataForUser = useContext(Context);
  const userName = document.querySelector("#username");
  const emailValue = document.querySelector("#email");
  const emailValidation = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const checkIfEmailValid = (event) => {
    if (emailValidation(event.target.value)) {
      dispatchAction(checkEmailValidation(true));
      dispatchAction(checkIfUserAutorized(false));
    } else {
      dispatchAction(checkEmailValidation(false));
    }
  };
  const checkIfUserNameValid = (event) => {
    console.log(event.target.value.length > 3);
    if (event.target.value.length > 3) {
      dispatchAction(checkUserName(true));
    } else {
      dispatchAction(checkUserName(false));
    }
  };
  const reqForSignIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:3003/api/signInUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue.value,
        userName: userName.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          closeMenu(event);
        }
        if (res.status === 401) {
          dispatchAction(checkIfUserAutorized(true));
          dispatchAction(checkEmailValidation(false));
          dispatchAction(checkIfUserAlreadyReg(true));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const reqForLoginIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:3003/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          dispatchAction(sendCodeAfterEmailCheck(true));
          return res.json();
        }
        if (res.status === 401) {
          dispatchAction(checkIfUserAutorized(true));
          dispatchAction(checkEmailValidation(false));
        }
      })
      .then((data) => {
        const code = data.mailOptions.text;
        const findMatch = code.match(/\d+/);
        if (findMatch) {
          const resultCode = parseInt(findMatch[0]);
          dispatchAction(getCodeFromEmail(resultCode));
        }
        getDataForUser.setDataForUser(data.user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
  const checkCodeValidation = (event) => {
    event.preventDefault();
    if (parseInt(codeFromUser.join("")) === codeFromEmail) {
      loginInUser(event);
      closeMenu(event);
      document.cookie = `user=${JSON.stringify(getDataForUser.userInfo)};max-age=${
        7 * 24 * 60 * 60
      }`;
    } else {
      dispatchAction(checkIfcodeField(false));
      dispatchAction(showMessageIfInvalidCode(true));
    }
  };
  const handleResendEmail = (event) => {
    event.preventDefault();
    fetch("http://localhost:3003/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const code = data.mailOptions.text;
        const findMatch = code.match(/\d+/);
        if (findMatch) {
          const resultCode = parseInt(findMatch[0]);
          dispatchAction(getCodeFromEmail(resultCode));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          {autrozite && (
            <p className={a.unAutorize}>
              {registered ? "User" : "This user"}
              {registered ? "with this email already" : "is not"} registered
              {registered ? "" : "not"}
            </p>
          )}
          <p>
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
