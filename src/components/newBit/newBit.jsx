import React, { useEffect, useState } from "react";
import f from "./newBig.module.scss";
import { VerifiedUser } from "../../icons/verifiedUser";
import { Dot } from "../../icons/dot";
import { userData } from "../../shared/userData";
import { cardInfo } from "../../shared/cardInfo";
export const NewBit = () => {
  const [filteredUserData, setFilterUserData] = useState([userData[1]]);
  const [filteredNftInfo, setNftInfo] = useState([cardInfo[1]]);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // назва місяця
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedTime;
  };
  useEffect(() => {
    const intervalForItem = setInterval(() => {
      const generateRandomIndex = Math.floor(Math.random() * 14) + 1;
      const newItem = [userData[generateRandomIndex]];
      const newImg = [cardInfo[generateRandomIndex]];
      setFilterUserData(newItem);
      setNftInfo(newImg);
    }, 4000);

    return () => clearInterval(intervalForItem);
  }, []);
  return filteredUserData.map((item) => (
    <div key={item.id} className={f.new_bit}>
      <div className={f.user_bit_wrap}>
        <div className={f.user_img_wrap}>
          <Dot />
          <div className={f.img}>
            <img src={item.img} alt="userWhoDidBit"></img>
            <VerifiedUser className={f.verifiedUser} />
          </div>
        </div>
        <div className={f.info_about_bit}>
          <div className={f.top_info}>
            <span>New Bid</span>
            <span className={f.rotation}>Rotation</span>
          </div>
          {filteredNftInfo.map((item) => (
            <h2>{item.value} ETH</h2>
          ))}
          <h3 className={f.date}>{formatDate(new Date())}</h3>
        </div>
      </div>
      {filteredNftInfo.map((item) => (
        <img className={f.nft_img} src={item.img} alt="nftImg" />
      ))}
    </div>
  ));
};
