import React from "react";
import m from "./mainpage.module.scss";
import { Switcher } from "../LeftRightSwitcher";
export const MainPage = () => {
  return (
    <div className={m.mainpage_wrap}>
      <div className={m.left_information}>
        <h2 className={m.main_text}>Discover And Create NFTs</h2>
        <p className={m.discription}>
          Discover, Create and Sell NFTs On Our NFT Marketplace With Over
          Thousands Of NFTs And Get a<span> $20 bonus.</span>
        </p>
        <div className={m.explore_more}>
          <button>Explore More</button>
          <button className={m.create_nft}>create NFT</button>
        </div>
        <div className={m.achivments}>
          <div className={m.achive}>
            <h2 className={m.achive_text}>430K+</h2>
            <h3 className={m.achive_discription}>Art Works</h3>
          </div>
          <div className={m.achive}>
            <h2 className={m.achive_text}>159K+</h2>
            <h3 className={m.achive_discription}>Creators</h3>
          </div>
          <div className={m.achive}>
            <h2 className={m.achive_text}>87K+</h2>
            <h3 className={m.achive_discription}>Collections</h3>
          </div>
        </div>
      </div>
      <Switcher />
    </div>
  );
};
