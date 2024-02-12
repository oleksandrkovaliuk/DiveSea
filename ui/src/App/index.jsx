import React from "react";
import { HomePage } from "../pages/home";
import { Routes, Route } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/ifNotFound/notFound";
import { ProductPage } from "../pages/productPage";
import { NftProductPage } from "../pages/nftProductPageFull";
import { NftIndividualPage } from "../pages/nftProductIndividualPage";
import { Discover } from "../pages/discoverProducts";
import { Creators } from "../pages/creatorsPage";
import { CreatorIndividualPage } from "../pages/creatorsIndividualPage";
export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/nftproductfull" element={<NftProductPage />} />
        <Route path="/creators" element={<Creators />}></Route>
        <Route path="/nftproductIndividual" element={<NftIndividualPage />} />
        <Route
          path="/creatorIndividualPage"
          element={<CreatorIndividualPage />}
        />
      </Routes>
    </>
  );
};
