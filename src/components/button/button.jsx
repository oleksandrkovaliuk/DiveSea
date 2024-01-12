import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
import { ButtonVariants, ButtonColors, ButtonSizes } from "../../shared/enums";
export const Button = ({ size, variants, colors, children, onClick }) => {
  const classes = classNames(styles.button, {
    [styles.small]: size === ButtonSizes.small,
    [styles.medium]: size === ButtonSizes.medium,
    [styles.large]: size === ButtonSizes.large,
    [styles.fullSize]: size === ButtonSizes.fullSize,
    [styles.outlined]: variants === ButtonVariants.outlined,
    [styles.filled]: variants === ButtonVariants.contained,
    [styles.focus]: colors === ButtonColors.focused,
    [styles.primary]: colors === ButtonColors.primary,
    [styles.secondary]: colors === ButtonColors.secondary,
    [styles.outlinedWhite]: variants === ButtonVariants.outlinedWhite,
    [styles.containedWhite]: variants === ButtonVariants.containedWhite,
  });
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
};
