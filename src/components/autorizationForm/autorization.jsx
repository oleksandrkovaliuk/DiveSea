import React, { useEffect } from "react";
import a from "./autorization.module.scss";
import { Logo } from "../../icons/Logo";
import { Close } from "../../icons/closeBtn";

export const Autorization = ({ show, signIn, closeMenu }) => {
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
              ></input>
              <label htmlFor="username" className={a.autorizeLabel}>
                Username
              </label>
            </div>
          )}
          <div className={a.inputWrap}>
            <input
              placeholder=" "
              type="email"
              id="email"
              name="email"
              className={a.autorizeInput}
            ></input>
            <label htmlFor="email" className={a.autorizeLabel}>
              Email
            </label>
            <p>
              By continuing you agree to our <span>Terms & Privacy</span> Policy
              and Privy's <span>Terms.</span>
            </p>
          </div>
          <button className={a.submitAutorization}>
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
