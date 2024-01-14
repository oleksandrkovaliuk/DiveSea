import React from "react";
import { cardInfo } from "../../../../shared/cardInfo";
import { Button } from "../../../../components/button";

import s from "./sixthSection.module.scss";
import {
  ButtonColors,
  ButtonSizes,
  ButtonVariants,
} from "../../../../shared/enums";
import { RandomImg } from "../../../../components/randomImgForSixSect";
export const SixthSectione = () => {
  return (
    <div className={s.sixthSection_container}>
      <div className={s.sixSection_wrap}>
        <div className={s.left_block}>
          <h1 className={s.title}>Create and Sell NFTs</h1>
          <h2 className={s.disc}>World’s Largest NFT Place</h2>
          <div className={s.buttons}>
            <Button
              size={ButtonSizes.large}
              colors={ButtonColors.secondary}
              variants={ButtonVariants.containedWhite}
            >
              Explore More
            </Button>
            <Button
              size={ButtonSizes.large}
              colors={ButtonColors.primary}
              variants={ButtonVariants.outlinedWhite}
            >
              Sell Artwork
            </Button>
          </div>
        </div>
        <RandomImg />
      </div>
    </div>
  );
};
