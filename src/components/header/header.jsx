import React from "react";
import s from "./header.module.scss";
import { Logo } from "../../icons/Logo";
import { Button } from "../button/button";
import { SearchIcon } from "../../icons/search";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
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
        <div className={s.searching}>
          <input
            placeholder=" "
            type="text"
            id="search"
            name="search"
            className={s.search_input}
          ></input>
          <label htmlFor="search" className={s.search_label}>
            <SearchIcon />
            Search Art Work / Creator
          </label>
        </div>
        <Button filled>Connect Wallet</Button>
      </div>
    </div>
  );
};
