import React, { useState } from "react";
import d from "./discover.module.scss";
import { Footer } from "../../components/footer";
import { CryptoCurrency } from "../../icons/cryptoCurrency";
import { CollectionIcon } from "../../icons/collectionNft";
import { Table } from "../../components/table";
import { FourthSectione } from "../home/sections/forthSection";

export const Discover = () => {
  const [discover, setDiscoverKind] = useState("crypto");
  const handleDiscoverFilter = (event, discoverKind) => {
    if (discoverKind === "crypto") {
      setDiscoverKind("crypto");
    } else {
      setDiscoverKind("nft");
    }
  };
  return (
    <>
      <div className={d.discoverProduct}>
        <h1 className={d.main_text}>Discover Products</h1>
        <div className={d.discoverNavBar}>
          <button className={discover === "crypto" ? d.focused : ""}onClick={(event) => handleDiscoverFilter(event, "crypto")}>
            <CryptoCurrency /> Crypto
          </button>
          <button className={discover === "nft" ? d.focused : ""} onClick={(event) => handleDiscoverFilter(event, "nft")}>
            <CollectionIcon /> Nft
          </button>
        </div>
      </div>
      <div className={d.discoverResult}>
      {discover === "crypto" ? <Table /> : <FourthSectione full />}
      </div>
      <Footer />
    </>
  );
};
