import React from "react";
import p from "./pagination.module.scss";
export const Pagination = ({ allPost, postPerPage,   children , setPage, currentPage }) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(allPost / postPerPage); i++) {
    page.push(i);
  }
  return (
    <div className={p.pagination_wrap}>
      {children}
      {page.map((item, index) => (
        <button
          key={index}
          style={
            item === currentPage
              ? { backgroundColor: "#000", color: "var(--color-neutrals8)" }
              : null
          }
          className={p.pagination_buttons}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
