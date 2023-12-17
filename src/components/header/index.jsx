import React from "react";
import s from "./header.module.scss";
import { Logo } from "../../icons/Logo";
import { Button } from "../button/button";

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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group 427320327">
                <path
                  id="stroke"
                  d="M9.94976 17.7296C14.5695 17.7296 18.3146 13.9845 18.3146 9.3648C18.3146 4.74505 14.5695 1 9.94976 1C5.33001 1 1.58496 4.74505 1.58496 9.3648C1.58496 13.9845 5.33001 17.7296 9.94976 17.7296Z"
                  stroke="#9D9D9D"
                  strokeWidth="1.79246"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="stroke_2"
                  d="M15.9248 15.3394L23.0946 22.5092"
                  stroke="#9D9D9D"
                  strokeWidth="1.79246"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            Search Art Work / Creator
          </label>
        </div>
        {/* <button className={s.connect_wallet}></button> */}
        <Button filled>Connect Wallet</Button>
      </div>
    </div>
  );
};
