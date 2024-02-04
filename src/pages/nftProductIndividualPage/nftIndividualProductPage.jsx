import React, { useEffect } from "react";
import i from "./nftIndividualProductPage.module.scss";
import { useSearchParams } from "react-router-dom";
import { cardInfo } from "../../shared/cardInfo";
import { Ethereum } from "../../icons/ethereum";
import { Like } from "../../icons/like";
import { Footer } from "../../components/footer";
import { Verified } from "../../icons/verified";
import { Kidness } from "../../icons/kidness";

export const NftIndividualPage = () => {
  const [searchParams] = useSearchParams();
  const currentItemId = searchParams.get("id");
  const selectedItem = cardInfo.find(
    (item) => item.id === parseInt(currentItemId)
  );
  const currencyInfo = JSON.parse(localStorage.getItem("cryptoHistoryFull"));
  const currentEthPrice = currencyInfo.find(
    (item) => item.name === "Ethereum"
  ).rate;
  const convertedValue =
    "$" + (selectedItem.value * currentEthPrice).toFixed(2);
  const checkPach = window.location.pathname === "/nftproductIndividual";
  if (checkPach) {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <div className={i.individualProductBlock}>
        <div className={i.infoAboutProduct}>
          <div className={i.imgWithProduct}>
            <div className={i.imgTopBar}>
              <Ethereum />
              <div className={i.productLike}>
                <span>{selectedItem.like}</span>
                <Like />
              </div>
            </div>
            <img src={selectedItem.img} alt="productImg" />
          </div>
          <div className={i.productDiscription}>
            <div className={i.mainInfo}>
              <span className={i.creatorName}>
                {selectedItem.creatorName}
                <Verified />
              </span>
              <p className={i.productName}>{selectedItem.title}</p>
            </div>
            <div className={i.priceBlock}>
              <h2 className={i.currentPrice}>Current price</h2>
              <div className={i.productValue}>
                <span>{selectedItem.value} ETH</span>
                <span className={i.dollarValue}>{convertedValue}</span>
              </div>
              <div className={i.buttons}>
                <button className={i.BuyNow}>Buy Now</button>
              </div>
              <div className={i.supportCreator}>
                <Kidness />
                <p>
                  <span>Supports creator</span> This listing is paying the
                  collection creator their suggested creator earnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
