import React from "react";
import { FourthSectione } from "../home/sections/forthSection/fourthSection";
import { Footer } from "../../components/footer";

export const NftProductPage = () => {
  const location = window.location.pathname === "/nftproductfull";
  if (location) {
    window.scrollTo(0, 0);
  }
  return <>
  <FourthSectione full />
  <Footer/>
  </>;
};
