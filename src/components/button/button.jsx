import React, { useState } from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import {
  ButtonVariants,
  ButtonColors,
  ButtonSizes,
  SpecificButton,
} from "../../shared/enums";
export const Button = ({
  size,
  variants,
  colors,
  specific,
  focus,
  children,
  onClick,
}) => {
  const [isActive, setActive] = useState(false);
  const classes = classNames(styles.button, {
    [styles.focus]: focus,
    [styles.small]: size === ButtonSizes.small,
    [styles.medium]: size === ButtonSizes.medium,
    [styles.large]: size === ButtonSizes.large,
    [styles.fullSize]: size === ButtonSizes.fullSize,
    [styles.outlined]: variants === ButtonVariants.outlined,
    [styles.filled]: variants === ButtonVariants.contained,
    [styles.withSvg]: specific === SpecificButton.withSvg,
    [styles.primary]: colors === ButtonColors.primary,
    [styles.secondary]: colors === ButtonColors.secondary,
    [styles.outlinedWhite]: variants === ButtonVariants.outlinedWhite,
    [styles.containedWhite]: variants === ButtonVariants.containedWhite,
    [styles.specificClassFollow]: specific === SpecificButton.follow,
  });
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (specific === "follow") {
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
    }
  };
  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
};
