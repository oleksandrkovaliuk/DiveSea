import React, { useEffect, useState } from "react";
import f from "./fifthSection.module.scss";
import { userData } from "../../../../shared/userData";
import { VerifiedUser } from "../../../../icons/verifiedUser";
import { Dot } from "../../../../icons/dot";
import { UserInfo } from "../../../../components/userInfo";
import { Viewed } from "../../../../components/recentViewed";
import { Tick } from "../../../../icons/tick";
import { Button } from "../../../../components/button";
import { ArrowRight } from "../../../../icons/arrowRight";
import { Collaps } from "../../../../components/collaps";
import { FollowBtn } from "../../../../components/followBtn";
export const FifthSectione = () => {
  const [filteredData, setFilterData] = useState([]);
  const [exploreMoreBtn, setExploreBtn] = useState(false);
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
  const exploreMoreClickHandler = () => {
    if (exploreMoreBtn !== true) {
      document.querySelector("#fifthSection").style.marginBottom = "600px";
      return setExploreBtn(true);
    }
    document.querySelector("#fifthSection").style.marginBottom = "180px";
    return setExploreBtn(false);
  };
  useEffect(() => {
    const intervalForItem = setInterval(() => {
      const generateRandomIndex = Math.floor(Math.random() * 14) + 1;
      const newItem = [userData[generateRandomIndex]];
      setFilterData(newItem);
    }, 4000);

    return () => clearInterval(intervalForItem);
  }, []);
  return (
    <div className={f.fifthSection_exploreMore}>
      <div id="fifthSection" className={f.fifth_section}>
        <div className={f.fifth_section_wrap}>
          <div className={f.left_block}>
            <h1 className={f.main_title}>
              <h2>Just Unleash -</h2>
              Your Inner Collector
            </h1>
            <ul>
              <li className={f.innerCollector_list}>
                <Tick />
                Best Seller All Around World
              </li>
              <li className={f.innerCollector_list}>
                <Tick />
                $2M+ Transections Every Day
              </li>
              <li className={f.innerCollector_list}>
                <Tick />
                Secure Transactions
              </li>
              <li className={f.innerCollector_list}>
                <Tick />
                Exclusive Collections From Sellers
              </li>
              <li className={f.innerCollector_list}>
                <Tick />
                Easy Buying and Selling
              </li>
              <li className={f.innerCollector_list}>
                <Tick />
                Join Our Community
              </li>
            </ul>
            <Button
              colors={"primary"}
              variants={"contained"}
              size={"medium"}
              onClick={() => exploreMoreClickHandler()}
            >
              Explore More
              <ArrowRight />
            </Button>
          </div>
          <div className={f.right_block}>
            <div className={f.best_seller}>
              <h2 className={f.title}>Best Seller</h2>
              <UserInfo data={userData.slice(0, 6)} cropped>
                <FollowBtn >follow</FollowBtn>
              </UserInfo>
            </div>
            {filteredData.map((item) => (
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
                    <h2>{item.volume} ETH</h2>
                    <h3 className={f.date}>{formatDate(new Date())}</h3>
                  </div>
                </div>
                <img className={f.nft_img} src={item.img} alt="nftImg"></img>
              </div>
            ))}
            <Viewed bestSellPos />
            <img className={f.dots} src="/images/Dots.png" alt="img" />
          </div>
        </div>
      </div>
      {exploreMoreBtn && (
        <div className={f.exploreMore_wrap}>
          <div className={f.joinCommunity_container}>
            <div className={f.smaller_Eclipse}>
              <div className={f.eclipse}>
                <img src="/images/SmallestEclipse.png" alt="smalEclips"></img>
                {userData.slice(0, 4).map((item, index) => (
                  <img
                    className={f.profile}
                    data-profile-number={index + 1}
                    src={item.img}
                    alt="profile1"
                  ></img>
                ))}
              </div>
            </div>
            <div className={f.bigger_Eclipse}>
              <div className={f.eclipse}>
                <img src="/images/BiggestEclipse.png" alt="bigEclips"></img>
                {userData.slice(0, 5).map((item, index) => (
                  <img
                    className={f.profile}
                    data-profile-number={index + 1}
                    src={item.img}
                    alt="profile1"
                  ></img>
                ))}
              </div>
            </div>
            <h1 className={f.joinCommunity_title}>
              <h2>Join The</h2>
              Community
            </h1>
            <p className={f.joinCommunity_discrib}>
              Our vibrant community is full of collectors, artists, and
              enthusiasts who share a passion for one-of-a-kind digital.
            </p>
            <Button colors={"primary"} size={"medium"} variants={"contained"}>
              Join Our Community
            </Button>
          </div>
          <div className={f.frequently_asked_container}>
            <h1 className={f.frequentlyAsked_title}>
              <h2>Frequently Asked</h2>
              Questions
            </h1>
            <ul>
              <Collaps title={"What is an NFT?"}>
                A non-fungible token is a unique digital identifier that is
                recorded on a blockchain, and is used to certify ownership and
                authenticity. It cannot be copied, substituted, or subdivided.
                The ownership of an NFT is recorded in the blockchain and can be
                transferred by the owner, allowing NFTs to be sold and traded
              </Collaps>
              <Collaps title={"What can I use NFTs for?"}>
                NFTs are best known for signifying ownership of digital
                collectibles like graphic art and gaming assets. The creator of
                a digital collectible can “tokenize” the asset by minting an
                NFT—that is, using a blockchain platform to create a unique
                token associated with the asset.
              </Collaps>
              <Collaps
                title={
                  "What is the difference between an NFT and cryptocurrency?"
                }
              >
                There are several differences between the two, including the
                following:The main difference is that every NFT is unique, which
                sets it apart from fungible tokens, such as cryptocurrency, that
                can be traded or exchanged for one another with no loss of
                value. Target use. NFTs are fundamentally a type of digital
                collectable item, much like art or wine. Cryptocurrency can also
                be collected, though the purpose is not as a collectible, but
                rather as a form of payment..
              </Collaps>
              <Collaps title={"How much is an NFT worth?"}>
                Some answer text here...
              </Collaps>
              <Collaps title={"How do I purchase an NFT on your platform ?"}>
                Some answer text here...
              </Collaps>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
