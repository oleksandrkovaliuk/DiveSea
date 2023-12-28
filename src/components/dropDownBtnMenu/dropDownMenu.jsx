import React from "react";
import d from "./dropdownmenu.module.scss";
import classNames from "classnames";

export const DropMenu = ({ hide, data, categoryKind }) => {
  const classes = classNames(d.dropmenu_wrap, {
    [d.hide]: hide,
  });

  return (
    <div className={classes}>
      <ul className={d.list_menu}>
        {data.map((item) => {
          return <li>{item[categoryKind]}</li>;
        })}
      </ul>
    </div>
  );
};
