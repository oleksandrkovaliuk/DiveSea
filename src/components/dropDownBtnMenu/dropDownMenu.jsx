import React from "react";
import d from "./dropdownmenu.module.scss";

export const DropMenu = ({ data, categoryKind, onClick }) => {
  const uniqValue = new Set(data.map((item) => item[categoryKind]));

  const uniqValueArr = Array.from(uniqValue);
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={d.dropmenu_wrap}>
      <ul className={d.list_menu}>
        {uniqValueArr.map((value) => {
          return <li onClick={clickHandler}>{value}</li>;
        })}
      </ul>
    </div>
  );
};
