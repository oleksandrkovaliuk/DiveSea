import React from "react";
import { Link } from "react-router-dom";
import n from "./notfound.module.scss"
export const NotFound = () => {
    return (
      <div className={n.noFound}>
        <h1 className={n.main_text}>Sorry page was not found</h1>
        <Link to="/">Go back to Home Page</Link>
      </div>
    );
  }