import React, { useEffect, useState } from "react";
import l from "./logInSignIn.module.scss";
import { Autorization } from "../autorizationForm";
import { ProfileUser } from "../../icons/profileUser";
import { LogOut } from "../../icons/logOut";

export const LogInSignIn = () => {
  const [autorizationMenu, setMenuType] = useState(null);
  const [autoriaztion, showAutorization] = useState(false);
  const [loginIn, setLoginedIn] = useState(false);
  const [userEmail, getUserEmail] = useState("");
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
  const getCookie = (name) => {
    console.log(document.cookie);
    const cookies = document.cookie.split(";");
    console.log(cookies, "first value");
    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim().split("=");
      console.log(c, "second value");
      if (c[0] === name) {
        console.log(c[0], "third value");
        console.log(c[1], "fourth value");
        return decodeURIComponent(c[1]);
      }
    }
    return null;
  };
  const handleLoginIn = () => {
    setLoginedIn(true);
    getUserEmail(getCookie("userEmail"));
  };
  const handleLogOut = () => {
    console.log("click");
    document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    const checkCookie = getCookie("userEmail");
    if (checkCookie === null) {
      setLoginedIn(false);
      console.log("true");
    }
  };
  useEffect(() => {
    const checkCookie = getCookie("userEmail");
    if (checkCookie !== null) {
      handleLoginIn();
    }
  }, []);
  return (
    <div className={l.logInOrSignInBtn_container}>
      {loginIn && userEmail ? (
        <div className={l.loginnedUser}>
          <span className={l.user}>{userEmail}</span>
          <ProfileUser />
          <LogOut handleLogOut={handleLogOut} />
        </div>
      ) : (
        <>
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
              closeMenu={(event) => handleCloseAutorizationMenu(event)}
              loginInUser={handleLoginIn}
            />
          ) : (
            <Autorization
              show={autoriaztion === true ? true : false}
              signIn
              closeMenu={(event) => handleCloseAutorizationMenu(event)}
            />
          )}
        </>
      )}
    </div>
  );
};
