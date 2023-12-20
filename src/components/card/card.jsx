import React from "react";
import classNames from "classnames";
import s from "./card.module.scss";
export const Card = ({ img, children, small, big }) => {
  const classes = classNames(s.card_wrap, {
    [s.small]: small,
    [s.big]: big,
  });
  return (
    <div className={classes}>
      <div className={s.imgs}>
        <img src={img} alt="card_img"></img>
        <h2 className={s.timer}>07h 09m 12s</h2>
      </div>
      {children}
    </div>
  );
};
