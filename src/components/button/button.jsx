import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";
export const Button = ({
  filled,
  fullSize,
  onClick,
  category,
  children,
}) => {
  const classes = classNames(styles.button, {
    [styles.filled]: filled,
    [styles.fullSize]: fullSize,
    [styles.category]: category,
  });
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
};
