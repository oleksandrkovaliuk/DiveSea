import React, { useEffect } from "react";
import m from "./firstSection.module.scss";
import { Button } from "../../../../components/button/button";
import { SliderComponent } from "../../../../components/firstSectionSlider";
import {
  ButtonColors,
  ButtonSizes,
  ButtonVariants,
} from "../../../../shared/enums";
import { TrustPilot } from "../../../../icons/trustPillot";
import { Stars } from "../../../../icons/strars";
export const FirstSectione = () => {

  return (
    <div className={m.homepage_wrap}>
      <div className={m.firstsection_wrap}>
        <div className={m.left_information}>
          <div className={m.top_text_line}>
            <div className={m.line}></div>
            <span>OVER 1M CREATORS</span>
          </div>
          <h2 className={m.main_text}>Discover And Create NFTs</h2>
          <p className={m.discription}>
            Discover, Create and Sell NFTs On Our NFT Marketplace With Over
            Thousands Of NFTs And Get a<span> $20 bonus.</span>
          </p>
          <div className={m.explore_more}>
            <Button
              colors={ButtonColors.primary}
              size={ButtonSizes.medium}
              variants={ButtonVariants.contained}
            >
              Explore More
            </Button>

            <Button
              colors={ButtonColors.secondary}
              variants={ButtonVariants.outlined}
              size={ButtonSizes.medium}
            >
              create NFT
            </Button>
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
          <div className={m.trustPilot}>
            <TrustPilot />
            <div className={m.starts_review}>
              <Stars />
              <span className={m.review}>+4900</span>
            </div>
          </div>
        </div>
        <SliderComponent />
      </div>
    </div>
  );
};
