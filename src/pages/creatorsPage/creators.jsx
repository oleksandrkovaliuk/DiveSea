import React, { useEffect, useState } from "react";
import c from "./creatore.module.scss";
import { creators } from "../../shared/creators";
import { TopBottomFilterArrow } from "../../icons/topBottomFIlterArrow";
import { Verified } from "../../icons/verified";
import { Footer } from "../../components/footer";
import { BackArrow } from "../../icons/backArrow";
import { DownSvg } from "../../icons/downSvg";
export const Creators = () => {
  const [creatorsList, setCreatorsList] = useState([] || 0);
  const [filterCreatorsInfoBy, setFilterCreatorInfo] = useState(null);
  const setDefaultCreators = () => {
    const defaultArr = creators.sort((a, b) => {
      return parseFloat(a.volume) - parseFloat(b.volume);
    });
    setCreatorsList(defaultArr);
  };

  const sortByVolume = () => {
    if (filterCreatorsInfoBy) {
      const sortedCreatorsLowToHight = creators.sort((a, b) => {
        return parseFloat(b.volume) - parseFloat(a.volume);
      });
      setCreatorsList(sortedCreatorsLowToHight);
      setFilterCreatorInfo(false);
    } else {
      const sortedCreatorsHightToLow = creators.sort((a, b) => {
        return parseFloat(a.volume) - parseFloat(b.volume);
      });
      setCreatorsList(sortedCreatorsHightToLow);
      setFilterCreatorInfo(true);
    }
  };
  useEffect(() => {
    setDefaultCreators();
  }, []);
  return (
    <>
      {" "}
      <div className={c.creators_container}>
        <h1 className={c.main_text}>Creators</h1>
        <table className={c.table_wrap}>
          <thead>
            <tr>
              <th>#</th>
              <th className={c.collection}>Colletion</th>
              <th>
                <div
                  onClick={(event) => sortByVolume(event, "Volume")}
                  className={
                    filterCreatorsInfoBy ? c.th_with_svg_active : c.th_with_svg
                  }
                >
                  <span>Volume</span>
                  {filterCreatorsInfoBy === null ? (
                    <TopBottomFilterArrow />
                  ) : "" || filterCreatorsInfoBy ? (
                    <BackArrow />
                  ) : "" || !filterCreatorsInfoBy ? (
                    <DownSvg />
                  ) : (
                    ""
                  )}
                </div>
              </th>
              <th>
                <div className={c.th_with_svg}>
                  <span>Floor Price</span> <TopBottomFilterArrow />
                </div>
              </th>
              <th>
                <div className={c.th_with_svg}>
                  <span>Best Offer</span> <TopBottomFilterArrow />
                </div>
              </th>
              <th>
                <div className={c.th_with_svg}>
                  <span>Owners</span> <TopBottomFilterArrow />
                </div>
              </th>
              <th>
                <div className={c.th_with_svg}>
                  <span>% Listed</span> <TopBottomFilterArrow />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {creatorsList.map((item, index) => {
              return (
                <tr className={c.creators_fields}>
                  <td>
                    <span>{[index + 1]}</span>
                  </td>
                  <td className={c.creator_name}>
                    <span>
                      {item.name}
                      {item.verified ? <Verified /> : ""}
                    </span>
                  </td>
                  <td>
                    <span>{item.volume} ETH</span>
                  </td>
                  <td>
                    <span>{item.floorPrice} ETH</span>
                  </td>
                  <td>
                    <span>{item.bestOffer} WETH</span>
                  </td>
                  <td>
                    <span>{item.Owners}</span>
                  </td>
                  <td>
                    <span>{item.listed}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
