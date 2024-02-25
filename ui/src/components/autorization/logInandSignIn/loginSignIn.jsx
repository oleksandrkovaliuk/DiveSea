import React, { useContext, useEffect, useState } from "react";
import l from "./logInSignIn.module.scss";
import { Autorization } from "../autorizationForm/autorization";
import { ProfileUser } from "../../../icons/profileUser";
import { LogOut } from "../../../icons/logOut";
import { getCookie } from "../../../service/getCookie";
import { MobileMenu } from "../../mobileMenu";
import { Settings } from "../../../icons/settings";
import { useNavigate } from "react-router-dom";
import { SuccesfullyChanged } from "../../succesfullNotification";
import { UserContext } from "../../../context/UserContext";

export const LogInSignIn = () => {
  const [autorizationMenu, setMenuType] = useState(null);
  const [autoriaztion, showAutorization] = useState(false);
  const [loginIn, setLoginedIn] = useState(false);
  const [userMenu, openUserMenu] = useState(false);
  const [loginedSuccesfully, checkIfLoginedSuccesfully] = useState(false);
  const { userInfo } = useContext(UserContext);
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
    const userCookie = getCookie("user");
    if (userCookie === null) {
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
    const userCookie = getCookie("user");
    if (userCookie !== null || userInfo) {
      setLoginedIn(true);
    } else {
      console.log("logout");
    }
  }, [userInfo]);
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
                  <span>{userInfo.username}</span>
                  <span>{userInfo.email}</span>
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
