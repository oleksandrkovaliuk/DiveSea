import React, { useContext, useEffect, useState } from "react";
import l from "./logInSignIn.module.scss";
import { Autorization } from "../autorizationForm/autorization";
import { ProfileUser } from "../../../icons/profileUser";
import { LogOut } from "../../../icons/logOut";
import Context from "../../../context";
import { getCookie } from "../../../service/getCookie";
import { MobileMenu } from "../../mobileMenu";
import { Settings } from "../../../icons/settings";

export const LogInSignIn = () => {
  const [autorizationMenu, setMenuType] = useState(null);
  const [autoriaztion, showAutorization] = useState(false);
  const [loginIn, setLoginedIn] = useState(false);
  const [userMenu, openUserMenu] = useState(false);
  const getDataForUser = useContext(Context);
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
  const handleLoginIn = (event) => {
    setLoginedIn(true);
    openUserMenu(false);
  };
  const handleLogOut = () => {
    console.log("click");
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    const checkCookie = getCookie("userEmail");
    if (checkCookie === null) {
      setLoginedIn(false);
      console.log("true");
    }
  };
  const handleOpeningUserMenu = (event) => {
    openUserMenu(!userMenu);
  };
  const handleCloseUserMenu = () => {
    openUserMenu(false);
  };
  useEffect(() => {
    if (getDataForUser.userInfo !== null) {
      setLoginedIn(true);
    }
  }, []);
  return (
    <div className={l.logInOrSignInBtn_container}>
      {loginIn ? (
        <div className={l.loginnedUser}>
          <button onClick={handleOpeningUserMenu} className={l.user}>
            <ProfileUser />
          </button>
          {userMenu && (
            <MobileMenu userMenu closeMobileMenu={handleCloseUserMenu}>
              <div className={l.user_info}>
                <span>{getDataForUser.userInfo.username}</span>
                <span>{getDataForUser.userInfo.email}</span>
              </div>
              <ul
                className={l.profileMenuNav}
              >
                <li className={l.profileNavBtn}>
                  <Settings />
                  Settings
                </li>
                <li
                  type="button"
                  onClick={handleLogOut}
                  className={l.profileNavBtn}
                >
                  <LogOut />
                  Log out
                </li>
              </ul>
            </MobileMenu>
          )}
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
              loginInUser={(event) => handleLoginIn(event)}
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
