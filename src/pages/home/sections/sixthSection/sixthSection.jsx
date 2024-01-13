import React, { Fragment, useEffect, useState } from "react";
import { cardInfo } from "../../../../shared/cardInfo";
import { Button } from "../../../../components/button";

import s from "./sixthSection.module.scss";
import {
  ButtonColors,
  ButtonSizes,
  ButtonVariants,
} from "../../../../shared/enums";
export const SixthSectione = () => {
  const [randomImg, setRandomImg] = useState([cardInfo[1]]);
  useEffect(() => {
    const intervalForImg = setInterval(() => {
      const generateRandomNum = Math.floor(Math.random() * 14) + 1;
      const newItem = [cardInfo[generateRandomNum]];
      setRandomImg(newItem);
    }, 4000);
    return () => {
      clearInterval(intervalForImg);
    };
  }, []);
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
        <div className={s.img}>
          {randomImg.map((item) => (
            <Fragment key={item.id}>
              <img className={s.main_img} src={item.img} alt="mainImg"></img>
              <img className={s.back_img} src={item.img} alt="SecongImg"></img>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
