import React, { useEffect } from "react";
import m from "./mobileMenu.module.scss";
import classNames from "classnames";

export const MobileMenu = ({ closeMobileMenu, children, userMenu}) => {
  const classes = classNames(m.mobile_menu_wrap, {
    [m.userMenu]: userMenu,
  });
  useEffect(() => {
    const body = document.body;
    body.classList.add("disable-scroll-page");
    return () => {
      body.classList.remove("disable-scroll-page");
    };
  }, []);
  return (
    <>
      <div className={m.mobile_menu_background} onClick={closeMobileMenu} />
      <div className={classes}>{children}</div>
    </>
  );
};
