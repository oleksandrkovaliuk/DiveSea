import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { UserContext } from "../context/UserContext";
import { getCookie } from "../service/getCookie";
import { UserProfile } from "../pages/userProfilePage";
import cryptoJs from "crypto-js";
import { loginUser } from "../service/autorization.api";

export const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  const userContextValue = useMemo(
    () => ({
      userInfo,
      setDataForUser: (data) => setUserInfo(data),
    }),
    [userInfo]
  );

  const checkUserLoginned = useCallback(async () => {
    try {
      const userCookie = getCookie("user");
      if (userCookie) {
        const emailFromCookie = cryptoJs.AES.decrypt(
          userCookie,
          process.env.REACT_APP_PASSWORD_FOR_DECRYPT
        ).toString(cryptoJs.enc.Utf8);
        // const res = await workWithAutorization({
        //   reqType: "/loginUser",
        //   sendEmail: false,
        //   emailValue: emailFromCookie,
        // });
        const res = await loginUser({
          sendEmail: false,
          emailValue: emailFromCookie,
        });
        setUserInfo(res.data);
      }
    } catch (error) {
      console.error("failed with getting infoAbout user on loading");
    }
  }, []);

  useEffect(() => {
    checkUserLoginned();
  }, [checkUserLoginned]);

  return (
    <UserContext.Provider value={userContextValue}>
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
    </UserContext.Provider>
  );
};
