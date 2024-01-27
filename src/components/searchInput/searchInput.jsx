import React from "react";
import i from "./searchInput.module.scss";
import { SearchIcon } from "../../icons/search";
import classNames from "classnames";
export const SearchInput = ({mobile}) => {
    const classes = classNames(i.searching , {
        [i.mobile]: mobile
    })
  return (
    <div className={classes}>
      <input
        placeholder=" "
        type="text"
        id="search"
        name="search"
        className={i.search_input}
      ></input>
      <label htmlFor="search" className={i.search_label}>
        <SearchIcon />
        Search Art Work / Creator
      </label>
    </div>
  );
};
