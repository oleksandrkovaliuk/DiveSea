import React, { useState } from "react";
import f from "./followBtn.module.scss";

export const FollowBtn = ({ children }) => {
  const [followBtnActive, setActive] = useState(false);

  const handleOnClick = (event) => {
    const btn = event.target;
    if (!followBtnActive) {
      btn.textContent = "followed";
      btn.style.backgroundColor = "var(--color-neutrals6)";
      setActive(!followBtnActive);
    } else {
      btn.textContent = "follow";
      btn.style.backgroundColor = "transparent";
      setActive(!followBtnActive);
    }
  };
  return <button className={f.followBtn} onClick={handleOnClick}>{children}</button>;
};
