import React, { useEffect, useState } from "react";
import s from "./header.module.scss";
import "./burger.scss";
import { Logo } from "../../icons/Logo";
import { Link } from "react-router-dom";
import { MobileMenu } from "../mobileMenu";
import { LogInSignIn } from "../autorization/logInandSignIn/loginSignIn";
export const Header = () => {
  const [mobileMenu, showMobileMenu] = useState(false);
  const openMobileMenu = () => {
    showMobileMenu(!mobileMenu);
  };
  const closeMobileMenu = () => {
    showMobileMenu(false);
  };
  return (
    <>
      {mobileMenu && (
        <MobileMenu closeMobileMenu={closeMobileMenu}>
          <>
            <ul className={s.mobile_menu}>
              <li onClick={closeMobileMenu}>
                <Link to="/discover">Discover</Link>
              </li>
              <li onClick={closeMobileMenu}>
                <Link to="/Creators">Creators</Link>
              </li>
              <li onClick={closeMobileMenu}>
                <Link to="/Create">Create NFT</Link>
              </li>
            </ul>
          </>
        </MobileMenu>
      )}
      <div className={s.header_wrap}>
        <div className={s.logo_nav_wrap}>
          <Link to="/">
            <Logo className={s.logo} />
          </Link>
          <ul>
            <li className={s.head_nav}>
              <Link to="/discover">Discover</Link>
            </li>
            <li className={s.head_nav}>
              <Link to="/Creators">Creators</Link>
            </li>
            <li className={s.head_nav}>
              <Link to="/Create">Create nft</Link>
            </li>
          </ul>
        </div>
          <div className={s.search_connectWallet}>
          {!mobileMenu && (
            <div className={s.login}>
              <LogInSignIn />
            </div>
          )}
            <button
              onClick={() => openMobileMenu()}
              className={mobileMenu ? "burger active" : "burger"}
            >
              <span className="burger_line"></span>
            </button>
          </div>
        </div>
    </>
  );
};
