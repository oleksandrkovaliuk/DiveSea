import React from "react";
import m from "./firstSection.module.scss";
import { Button } from "../../../../components/button/button";
import { SliderComponent } from "../../../../components/firstSectionSlider";
export const FirstSectione = () => {
  return (
    <div className={m.homepage_wrap}>
      <div className={m.firstsection_wrap}>
        <div className={m.left_information}>
          <h2 className={m.main_text}>Discover And Create NFTs</h2>
          <p className={m.discription}>
            Discover, Create and Sell NFTs On Our NFT Marketplace With Over
            Thousands Of NFTs And Get a<span> $20 bonus.</span>
          </p>
          <div className={m.explore_more}>
            <Button colors={"primary"} size={'medium'} variants={"container"}>Explore More</Button>

            <Button colors={"secondary"} variants={"outlined"} size={'medium'}>create NFT</Button>
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
        <SliderComponent/>
      </div>
    </div>
  );
};
