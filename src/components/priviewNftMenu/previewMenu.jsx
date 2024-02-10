import React from "react";
import p from "./previewNftMenu.module.scss";
import { cardInfo } from "../../shared/cardInfo";
import { useNavigate } from "react-router-dom";

export const PreviewNftMenu = ({ top, left, creator, closeMenu }) => {
  const navigateTo = useNavigate();
  const findCreatorsProduct = cardInfo.filter(
    (item) => item.creatorName === creator
  );
  let style = { left: `${left}px`, top: `calc(${top}px - 71px)` };
  // let ds = { left: `calc(${left}px - 10px)`, top: `calc(${top}px + 45px)` };
  const navigateToProduct = (link) => navigateTo(link);
  return (
    <>
      <div className={p.b}>
        <div style={style} className={p.backgroud} onMouseOut={closeMenu} />
        <ul style={style} className={p.creatorProduct}>
          {findCreatorsProduct?.slice(0, 3).map((item) => (
            <li className={p.products}>
              <img
                onClick={() =>
                  navigateToProduct(`/nftproductIndividual?id=${item.id}`)
                }
                src={item.img}
                alt={"creatorProducts"}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
