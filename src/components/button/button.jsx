import React from "react";
import classNames from "classnames";

import styles from "./button.module.scss";

export const Button = ({ filled, fullSize, action, children }) => {
  const classes = classNames(styles.button, {
    [styles.filled]: filled,
    [styles.fullSize]: fullSize,
  });

  return (
    <button className={classes} onClick={action}>
      {children}
    </button>
  );
};
