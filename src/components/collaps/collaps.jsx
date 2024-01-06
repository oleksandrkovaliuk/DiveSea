import React, { useState } from "react";
import c from "./collaps.module.scss";
import { Plus } from "../plus/plus";

export const Collaps = ({ title, children }) => {
  const [isActive, setActive] = useState(false);
  const handleCollapseActive = () => {
    setActive(!isActive);
  };
  return (
    <li className={c.questions_list}>
      <div className={c.question_btn}>
        <span className={c.question}>{title}</span>
        <button onClick={handleCollapseActive}>
          <Plus setActive={isActive ? true : false} />
        </button>
      </div>
      <p className={isActive ? `${c.par}` : ""}>{children}</p>
    </li>
  );
};
