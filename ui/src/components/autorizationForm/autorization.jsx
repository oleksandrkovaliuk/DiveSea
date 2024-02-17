import React, { useEffect, useState } from "react";
import a from "./autorization.module.scss";
import { Logo } from "../../icons/Logo";
import { Close } from "../../icons/closeBtn";
import { InputValidationTrue } from "../../icons/inputvalidationtrue";
import { InputValidationFalse } from "../../icons/inputvalidationfalse";
export const Autorization = ({ show, signIn, closeMenu, loginInUser }) => {
  const [emailvalidation, checkEmailValidation] = useState(null);
  const [userNamevalidation, checkUserName] = useState(null);
  const userName = document.querySelector("#username");
  const emailValue = document.querySelector("#email");
  const emailValidation = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const checkIfEmailValid = (event) => {
    if (emailValidation(event.target.value)) {
      checkEmailValidation(true);
    } else {
      checkEmailValidation(false);
    }
  };
  const checkIfUserNameValid = (event) => {
    console.log(event.target.value.length > 3);
    if (event.target.value.length > 3) {
      checkUserName(true);
    } else {
      checkUserName(false);
    }
  };
  const reqForSignIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:3003/users/SignInUser", {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const reqForLoginIn = (event) => {
    event.preventDefault();
    fetch("http://localhost:3003/users/loginUser", {
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
          closeMenu(event);
          document.cookie = `userEmail=${emailValue.value};max-age=${
            7 * 24 * 60 * 60
          }`;
          loginInUser();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const body = document.body;
    if (show) {
      body.classList.add("disable-scroll-page");
    }

    return () => {
      body.classList.remove("disable-scroll-page");
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
          <p>
            By continuing you agree to our <span>Terms & Privacy</span> Policy
            and Privy's <span>Terms.</span>
          </p>
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
            {signIn ? "Register" : "Log In"}
          </button>
          {/* <div className={a.autorizationWithGoggleOrFacebook}>
              <span>Or</span>
              <div className={a.googleFacebookBtn}>
                  <button>

                  </button>
                  <button>
                      
                      </button>
              </div>
            </div> */}
        </div>
      </form>
    </div>
  );
};
