import React, { useEffect, useState } from "react";
import { cardInfo } from "../../../../components/card/cardInfo";
import s from "./sixthSection.module.scss";
import { Button } from "../../../../components/button";
export const SixthSectione = () => {
  const [randomImg, setRandomImg] = useState([]);
  useEffect(() => {
    const intervalForImg = setInterval(() => {
      const generateRandomNum = Math.floor(Math.random() * 14) + 1;
      const newItem = [cardInfo[generateRandomNum]];
      setRandomImg(newItem);
    }, 4000);
    return () => {
      clearInterval(intervalForImg);
    };
  },[]);
  return (
    <div className={s.sixthSection_container}>
      <div className={s.sixSection_wrap}>
        <div className={s.left_block}>
          <h1 className={s.title}>Create and Sell NFTs</h1>
          <h2 className={s.disc}>World’s Largest NFT Place</h2>
          <div className={s.buttons}>
            <Button filledWhite >Explore More</Button>
            <Button clearWhite >Sell Artwork</Button>
          </div>
        </div>
        <div className={s.img}>
          {randomImg.map((item) => (
            <>
            <img className={s.main_img} src={item.img} alt="mainImg"></img>
            <img className={s.back_img} src={item.img} alt="SecongImg"></img>
          </>
          ))}
        </div>
      </div>
    </div>
  );
};
