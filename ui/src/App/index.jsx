import React, { useEffect, useState } from "react";
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
import Context from "../context";
import { getCookie } from "../service/getCookie";
import { UserProfile } from "../pages/userProfilePage";
export const App = () => {
  const [userInfo, setUserInfo] = useState([]);

  const setDataForUser = (userInfo) => setUserInfo(userInfo);

  const getDataForUser = {
    userInfo,
    setDataForUser,
  };
  useEffect(() => {
    const checkCookie = getCookie("user");
    if (checkCookie !== null) {
      getDataForUser.setDataForUser(JSON.parse(checkCookie));
    }
  }, []);
  return (
    <Context.Provider value={getDataForUser}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/nftproductfull" element={<NftProductPage />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/nftproductIndividual" element={<NftIndividualPage />} />
        <Route
          path="/creatorIndividualPage"
          element={<CreatorIndividualPage />}
        />
        <Route path="/userProfilePage" element={<UserProfile />} />
      </Routes>
    </Context.Provider>
  );
};
