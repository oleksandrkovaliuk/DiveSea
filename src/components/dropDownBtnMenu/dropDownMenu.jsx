import React from "react";
import d from "./dropdownmenu.module.scss";

export const DropMenu = ({ data, categoryKind }) => {

  const uniqValue = new Set(data.map((item) => item[categoryKind]));

  const uniqValueArr = Array.from(uniqValue)
  return (
    <div className={d.dropmenu_wrap}>
      <ul className={d.list_menu}>
        {uniqValueArr.map((value) => {
          return  <li>{value}</li>
        })}
      </ul>
    </div>
  );
};
