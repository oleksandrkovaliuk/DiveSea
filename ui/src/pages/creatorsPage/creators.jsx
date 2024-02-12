import React, { useEffect, useState } from "react";
import c from "./creatore.module.scss";
import { creators } from "../../shared/creators";
import { TopBottomFilterArrow } from "../../icons/topBottomFIlterArrow";
import { Verified } from "../../icons/verified";
import { Footer } from "../../components/footer";
import { TopSvg } from "../../icons/topSvg";
import { PreviewNftMenu } from "../../components/priviewNftMenu/previewMenu";
import { useNavigate } from "react-router-dom";
export const Creators = () => {
  const [creatorsList, setCreatorsList] = useState([]);
  const [categoryKind, setKategoryKind] = useState("volume");
  const [clicked, setClick] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [infoForCreatorMenu, setInfoForCreatorMenu] = useState(null);
  const [closeMenu, setCloseMenu] = useState(true);
  const navigateTo = useNavigate();
  const setDefaultCreators = () => {
    const defaultArr = creators.sort((a, b) => {
      return parseFloat(a.volume) - parseFloat(b.volume);
    });
    setCreatorsList(defaultArr);
  };

  const sortBy = (category) => {
    if (
      category === "volume" ||
      category === "floorPrice" ||
      category === "bestOffer" ||
      category === "owners" ||
      category === "listed"
    ) {
      setKategoryKind(category);
      setActiveFilter(true);
    } else {
      setKategoryKind(null);
      setClick(false);
      setActiveFilter(false);
    }
    if (category === "floorPrice" && !clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(b.floorPrice) - parseFloat(a.floorPrice);
      });
      setCreatorsList(sortedByNumber);
      setClick(true);
    } else if (category === "floorPrice" && clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(a.floorPrice) - parseFloat(b.floorPrice);
      });
      setCreatorsList(sortedByNumber);
      setClick(false);
    }
    if (category === "volume" && !clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(b.volume) - parseFloat(a.volume);
      });
      setCreatorsList(sortedByNumber);
      setClick(true);
    } else if (category === "volume" && clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(a.volume) - parseFloat(b.volume);
      });
      setCreatorsList(sortedByNumber);
      setClick(false);
    }
    if (category === "bestOffer" && !clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(b.bestOffer) - parseFloat(a.bestOffer);
      });
      setCreatorsList(sortedByNumber);
      setClick(true);
    } else if (category === "bestOffer" && clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(a.bestOffer) - parseFloat(b.bestOffer);
      });
      setCreatorsList(sortedByNumber);
      setClick(false);
    }
    if (category === "owners" && !clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(b.Owners) - parseFloat(a.Owners);
      });
      setCreatorsList(sortedByNumber);
      setClick(true);
    } else if (category === "owners" && clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(a.Owners) - parseFloat(b.Owners);
      });
      setCreatorsList(sortedByNumber);
      setClick(false);
    }
    if (category === "listed" && !clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(b.listed) - parseFloat(a.listed);
      });
      setCreatorsList(sortedByNumber);
      setClick(true);
    } else if (category === "listed" && clicked) {
      const sortedByNumber = creatorsList.sort((a, b) => {
        return parseFloat(a.listed) - parseFloat(b.listed);
      });
      setCreatorsList(sortedByNumber);
      setClick(false);
    }
  };
  const getInfoOnMouseOver = (event, name) => {
    const currentCreator = event.target.getBoundingClientRect();
    const top = currentCreator.top;
    const left = currentCreator.left;
    const height = currentCreator.height;
    setInfoForCreatorMenu({ top, left, height, name });
    setCloseMenu(false);
  };
  const handleMouseOut = () => {
    setCloseMenu(true);
  };
  const navigateToCreator = (link) => navigateTo(link);
  useEffect(() => {
    setDefaultCreators();
    window.addEventListener("scroll", handleMouseOut);
    return () => window.removeEventListener("scroll", handleMouseOut);
  }, []);
  return (
    <>
      {infoForCreatorMenu?.left && !closeMenu && (
        <PreviewNftMenu
          left={infoForCreatorMenu.left}
          top={infoForCreatorMenu.top}
          height={infoForCreatorMenu.height}
          creator={infoForCreatorMenu.name}
          closeMenu={handleMouseOut}
        />
      )}
      <div className={c.creators_container}>
        <h1 className={c.main_text}>Creators</h1>
        <div className={c.table_wrap}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className={c.collection}>Colletion</th>
              <th>
                <div
                  onClick={() => sortBy("volume")}
                  className={
                    categoryKind === "volume"
                      ? c.th_with_svg_active
                      : c.th_with_svg
                  }
                >
                  <span>Volume</span>
                  <TopBottomFilterArrow
                    className={activeFilter ? c.hide : c.hide}
                  />

                  {(activeFilter && categoryKind === "volume") ||
                  categoryKind === "volume" ? (
                    clicked ? (
                      <TopSvg style={{ rotate: "180deg" }} />
                    ) : (
                      <TopSvg />
                    )
                  ) : null}
                </div>
              </th>
              <th>
                <div
                  onClick={() => sortBy("floorPrice")}
                  className={
                    categoryKind === "floorPrice"
                      ? c.th_with_svg_active
                      : c.th_with_svg
                  }
                >
                  <span>Floor Price</span>
                  <TopBottomFilterArrow
                    className={activeFilter ? c.hide : c.hide}
                  />
                  {(activeFilter && categoryKind === "floorPrice") ||
                  categoryKind === "floorPrice" ? (
                    clicked ? (
                      <TopSvg style={{ rotate: "180deg" }} />
                    ) : (
                      <TopSvg />
                    )
                  ) : null}
                </div>
              </th>
              <th>
                <div
                  onClick={() => sortBy("bestOffer")}
                  className={
                    categoryKind === "bestOffer"
                      ? c.th_with_svg_active
                      : c.th_with_svg
                  }
                >
                  <span>Best Offer</span>{" "}
                  <TopBottomFilterArrow
                    className={activeFilter ? c.hide : c.hide}
                  />
                  {(activeFilter && categoryKind === "bestOffer") ||
                  categoryKind === "bestOffer" ? (
                    clicked ? (
                      <TopSvg style={{ rotate: "180deg" }} />
                    ) : (
                      <TopSvg />
                    )
                  ) : null}
                </div>
              </th>
              <th>
                <div
                  onClick={() => sortBy("owners")}
                  className={
                    categoryKind === "owners"
                      ? c.th_with_svg_active
                      : c.th_with_svg
                  }
                >
                  <span>Owners</span>{" "}
                  <TopBottomFilterArrow
                    className={activeFilter ? c.hide : c.hide}
                  />
                  {(activeFilter && categoryKind === "owners") ||
                  categoryKind === "owners" ? (
                    clicked ? (
                      <TopSvg style={{ rotate: "180deg" }} />
                    ) : (
                      <TopSvg />
                    )
                  ) : null}
                </div>
              </th>
              <th>
                <div
                  onClick={() => sortBy("listed")}
                  className={
                    categoryKind === "listed"
                      ? c.th_with_svg_active
                      : c.th_with_svg
                  }
                >
                  <span>% Listed</span>{" "}
                  <TopBottomFilterArrow
                    className={activeFilter ? c.hide : c.hide}
                  />
                  {activeFilter &&
                  (categoryKind === "listed") | (categoryKind === "listed") ? (
                    clicked ? (
                      <TopSvg style={{ rotate: "180deg" }} />
                    ) : (
                      <TopSvg />
                    )
                  ) : null}
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
                  <td
                    onMouseOver={(event) =>
                      getInfoOnMouseOver(event, item.name)
                    }
                    className={c.creator_name}
                    onClick={() =>
                      navigateToCreator(
                        `/creatorIndividualPage?name=${item.name}`
                      )
                    }
                  >
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
                    <span>
                      {item.Owners.length >= 4
                        ? `${item.Owners.replace(/\d/, "$&.")}`
                        : `${item.Owners}`}
                    </span>
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
      </div>
      <Footer />
    </>
  );
};
