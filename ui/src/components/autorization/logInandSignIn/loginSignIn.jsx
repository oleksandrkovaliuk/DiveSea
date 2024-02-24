import React, { useContext, useEffect, useState } from "react";
import l from "./logInSignIn.module.scss";
import { Autorization } from "../autorizationForm/autorization";
import { ProfileUser } from "../../../icons/profileUser";
import { LogOut } from "../../../icons/logOut";
import Context from "../../../context";
import { getCookie } from "../../../service/getCookie";
import { MobileMenu } from "../../mobileMenu";
import { Settings } from "../../../icons/settings";
import { useNavigate } from "react-router-dom";
import { SuccesfullyChanged } from "../../succesfullNotification";

export const LogInSignIn = () => {
  const [autorizationMenu, setMenuType] = useState(null);
  const [autoriaztion, showAutorization] = useState(false);
  const [loginIn, setLoginedIn] = useState(false);
  const [userMenu, openUserMenu] = useState(false);
  const [loginedSuccesfully, checkIfLoginedSuccesfully] = useState(false);
  const getDataForUser = useContext(Context);
  const navigation = useNavigate();
  const navigate = (link) => {
    handleCloseUserMenu(true);
    return navigation(link);
  };
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
    checkIfLoginedSuccesfully(true);
    openUserMenu(false);
  };
  const handleLogOut = (link) => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    const checkCookie = getCookie("user");
    if (checkCookie === null) {
      setLoginedIn(false);
      checkIfLoginedSuccesfully(false);
      navigate(link);
    }
  };
  const handleOpeningUserMenu = (event) => {
    openUserMenu(!userMenu);
  };
  const handleCloseUserMenu = () => {
    openUserMenu(false);
  };
  useEffect(() => {
    const checkCookie = getCookie("user");
    if (checkCookie !== null || getDataForUser.userInfo.length > 0) {
      setLoginedIn(true);
    } else {
      console.log("logout");
    }
  }, []);
  return (
    <>
      <SuccesfullyChanged showMessage={loginedSuccesfully}>
        <span>You succesfully loginned</span>
      </SuccesfullyChanged>
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
                <ul className={l.profileMenuNav}>
                  <li
                    type="button"
                    onClick={() => navigate("/userProfilePage")}
                    className={l.profileNavBtn}
                  >
                    <Settings />
                    Settings
                  </li>
                  <li
                    type="button"
                    onClick={() => handleLogOut("/")}
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
    </>
  );
};
