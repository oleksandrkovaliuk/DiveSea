import React from "react";
import classNames from "classnames";
import s from "./card.module.scss";
import { useNavigate } from "react-router-dom";
export const Card = ({ img, children, small, big, id }) => {
  const navigation = useNavigate();
  const classes = classNames(s.card_wrap, {
    [s.small]: small,
    [s.big]: big,
  });
  const navigateToProduct = (link) => navigation(link);
  return (
    <div
      onClick={() => navigateToProduct(`/nftproductIndividual?id=${id}`)}
      className={classes}
    >
      <div className={s.imgs}>
        <img src={img} alt="card_img"></img>
        <h2 className={s.timer}>07h 09m 12s</h2>
      </div>
      {children}
    </div>
  );
};
