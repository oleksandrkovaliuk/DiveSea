import React, { useRef } from "react";

import Slider from "react-slick";
import s from "./simpleslider.module.scss";
import "./customSlider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cardInfo } from "../../shared/cardInfo";
import { BigCard } from "../card/BigCard";
import { Switcher } from "../leftRightSwitcher";

export const SimpleSLider = () => {
  const sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
  };

  return (
    <div className="simpleSlider">
      <Slider ref={sliderRef} {...settings}>
        {cardInfo.map((card) => (
          <div className={s.slides}>
            <BigCard key={card.id} card={card} />
          </div>
        ))}
      </Slider>
      <div className={s.switcher_wrap}>
        <Switcher prev={previous} next={next} />
      </div>
    </div>
  );
};
