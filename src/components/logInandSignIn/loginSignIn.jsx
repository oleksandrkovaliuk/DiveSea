import React, { useEffect, useState } from "react";
import l from "./logInSignIn.module.scss";
import { Autorization } from "../autorizationForm";

export const LogInSignIn = () => {
  const [autorizationMenu, setMenuType] = useState(null);
  const [autoriaztion, showAutorization] = useState(false);
  const setLogInMenu = () => {
    setMenuType(true);
    showAutorization(true);
  };
  const setSignInMenu = () => {
    setMenuType(false);
    showAutorization(true);
  };
  const handleCloseAutorizationMenu = (event) => {
    event.preventDefault();
    showAutorization(false);
  };
  return (
    <div className={l.logInOrSignInBtn_container}>
      <div className={l.logInSignInBtns}>
        <button
          onClick={() => {
            setLogInMenu();
          }}
        >
          Login In
        </button>
        <button
          onClick={() => {
            setSignInMenu();
          }}
        >
          Sign In
        </button>
      </div>
      {autorizationMenu === true ? (
        <Autorization
          show={autoriaztion === true ? true : false}
          closeMenu={handleCloseAutorizationMenu}
        />
      ) : (
        <Autorization
          show={autoriaztion === true ? true : false}
          signIn
          closeMenu={handleCloseAutorizationMenu}
        />
      )}
    </div>
  );
};
