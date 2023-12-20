import React from "react";
import s from "./header.module.scss";
import { Logo } from "../../icons/Logo";
import { Button } from "../button/button";
import { SearchIcon } from "../../icons/search";

export const Header = () => {
  return (
    <div className={s.header_wrap}>
      <div className={s.logo_nav_wrap}>
        <a href="/">
          <Logo className={s.logo} />
        </a>
        <ul>
          <li className={s.head_nav}>Discover</li>
          <li className={s.head_nav}>Creators</li>
          <li className={s.head_nav}>Sell</li>
          <li className={s.head_nav}>Stats</li>
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
