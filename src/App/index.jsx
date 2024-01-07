import React from "react";
import { HomePage } from "../pages/home";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "../components/header";
import { Discover } from "../pages/discover/discover";

export const NotFound = () => {
  return (
    <>
      <h1>Sorry page was not found</h1>
      <Link to="/">go back</Link>
    </>
  );
}


export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
