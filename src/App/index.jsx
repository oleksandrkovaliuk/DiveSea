import React from "react";
import { HomePage } from "../pages/home";
import { Routes, Route } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/ifNotFound/notFound";
import { ProductPage } from "../pages/productPage";
import { NftProductPage } from "../pages/nftProductPageFull";
import { NftIndividualPage } from "../pages/nftProductIndividualPage";
export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/product" element={<ProductPage />}></Route>
        <Route path="/nftproductfull" element={<NftProductPage />}></Route>
        <Route
          path="/nftproductIndividual"
          element={<NftIndividualPage />}
        ></Route>
      </Routes>
    </>
  );
};
