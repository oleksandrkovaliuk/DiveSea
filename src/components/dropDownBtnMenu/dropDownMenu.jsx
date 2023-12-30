import React, { useEffect, useState } from "react";
import d from "./dropdownmenu.module.scss";

export const DropMenu = ({
  data,
  left,
  top,
  selectFilter,
  closeDropDownMenu,
}) => {
  const [menuHeight, setMenuHeight] = useState(0);

  const style = {
    left: `${left}px`,
    top: `calc(${top}px - ${menuHeight}px`,
  };

  useEffect(() => {
    const h = document
      .querySelector("#dropDown")
      ?.getBoundingClientRect()?.height;

    setMenuHeight(h);
    const body = document.body;

    body.classList.add("disable-scroll-page");

    return () => {
      body.classList.remove("disable-scroll-page");
    };
  }, []);

  return (
    <>
      <div className={d.backBlock} onClick={closeDropDownMenu} />
      <div id="dropDown" className={d.dropmenu_wrap} style={style}>
        <ul className={d.list_menu}>
          {data.map((value) => {
            return (
              <li key={value}>
                <button onClick={() => selectFilter(value)}>{value}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
