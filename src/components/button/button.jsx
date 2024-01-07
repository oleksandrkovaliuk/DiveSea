import React, { useState } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

import { ButtonVariants, ButtonColors, ButtonSizes } from "../../shared/enums";

export const Button = ({
  variant,
  size,
  color,
  filled,
  fullSize,
  category,
  children,
  exploreMore,
  onClick,
  focus,
  follow,
  filledWhite,
  clearWhite,
}) => {
  const buttonVariant = variant || ButtonVariants.contained;
  const buttonSize = size || ButtonSizes.medium;
  const buttonColor = color || ButtonColors.primary;

  const [isActive, setActive] = useState(false);

  const classes = classNames(styles.button, {
    [styles.filled]: filled,
    [styles.fullSize]: fullSize,
    [styles.category]: category,
    [styles.focus]: focus,
    [styles.exploreMore]: exploreMore,
    [styles.follow]: follow,
    [styles.filledWhite]: filledWhite,
    [styles.clearWhite]: clearWhite,
  });
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };
  const handleFollow = (event) => {
    const btn = event.target;
    if (!isActive) {
      btn.textContent = "followed";
      btn.style.backgroundColor = "var(--color-neutrals6)";
      setActive(!isActive);
    } else {
      btn.textContent = "follow";
      btn.style.backgroundColor = "transparent";
      setActive(!isActive);
    }
  };
  return (
    <button className={classes} onClick={follow ? handleFollow : handleClick}>
      {children}
    </button>
  );
};
