import React, { useState } from "react";
import s from "./header.module.scss";
import "./burger.scss";
import { Logo } from "../../icons/Logo";
import { Button } from "../button/button";
import { Link } from "react-router-dom";
import { ButtonColors, ButtonSizes, ButtonVariants } from "../../shared/enums";
import { MobileMenu } from "../mobileMenu";
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
      {mobileMenu && <MobileMenu closeMobileMenu={closeMobileMenu} />}
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
              <Link to="/Sell">Sell</Link>
            </li>
            <li className={s.head_nav}>
              <Link to="/Stats">Stats</Link>
            </li>
          </ul>
        </div>
        <div className={s.search_connectWallet}>
          <Button
            size={ButtonSizes.medium}
            colors={ButtonColors.primary}
            variants={ButtonVariants.contained}
          >
            Connect Wallet
          </Button>
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
