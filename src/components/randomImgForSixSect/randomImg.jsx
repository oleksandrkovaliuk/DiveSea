import React, { Fragment, useEffect, useState } from "react";
import s from "./randomImg.module.scss";
import { cardInfo } from "../../shared/cardInfo";
export const RandomImg = () => {
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
  return randomImg.map((item) => (
    <div key={item.id} className={s.img}>
      <img className={s.main_img} src={item.img} alt="mainImg"></img>
      <img className={s.back_img} src={item.img} alt="SecongImg"></img>
    </div>
  ));
};
