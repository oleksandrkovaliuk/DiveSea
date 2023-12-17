import React, { Fragment } from "react";
import { Header } from "../Header";
import { MainPage } from "../Sections/mainPage";

export const App = () => {
  return (
    <Fragment>
      <div className="main-page">
      <Header />
      <MainPage />
      </div>
    </Fragment>
  );
};
