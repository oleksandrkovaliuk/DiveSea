import React, { useEffect } from "react";
import m from "./mobileMenu.module.scss";
import { Link, Route } from "react-router-dom";
import { SearchInput } from "../searchInput";

export const MobileMenu = ({ closeMobileMenu }) => {
  useEffect(() => {
    const body = document.body;

    body.classList.add("disable-scroll-page");
    return () => {
      body.classList.remove("disable-scroll-page");
    };
  }, []);
  return (
    <>
      <div className={m.mobile_menu_background} onClick={closeMobileMenu}/>
      <div className={m.mobile_menu_wrap}>
        <ul className={m.mobile_menu}>
          <li onClick={closeMobileMenu}>
            <Link to="/discover">Discover</Link>
          </li>
          <li onClick={closeMobileMenu}>
          <Link to="/Creators">Creators</Link>
          </li>
          <li onClick={closeMobileMenu}>
          <Link to="/Sell">Sell</Link>
          </li>
          <li onClick={closeMobileMenu}>
          <Link to="/Stats">Stats</Link>
          </li>
          
        </ul>
        <SearchInput mobile/>
        <Link to="/">Connect wallet</Link>
      </div>
    </>
  );
};