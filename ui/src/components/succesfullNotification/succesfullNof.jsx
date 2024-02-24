import React from "react";
import p from "./succesfull.module.scss";
export const SuccesfullyChanged = ({ showMessage, children }) => {
  return (
    showMessage && <div className={p.alertIfSuccesfullyChanged}>{children}</div>
  );
};
