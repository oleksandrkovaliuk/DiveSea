import React, { useEffect } from "react";
import d from "./dropdownmenu.module.scss";
import classNames from "classnames";
export const DropMenu = ({
  data,
  left,
  top,
  width,
  height,
  selectFilter,
  closeDropDownMenu,
  typeWhite,
}) => {
  const classes = classNames(d.dropmenu_wrap, {
    [d.typeWhite]: typeWhite,
  });
  let style = {
    left: `${left}px`,
    top: `calc(${top}px + ${height}px - 11px)`,
    maxWidth: `${width}px`,
  };
  useEffect(() => {
    const body = document.body;
    body.classList.add("disable-scroll-page");

    return () => {
      body.classList.remove("disable-scroll-page");
    };
  }, []);
  return (
    <>
      <div className={d.back_block} onClick={closeDropDownMenu} />
      <div id="dropDown" className={classes} style={style}>
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
