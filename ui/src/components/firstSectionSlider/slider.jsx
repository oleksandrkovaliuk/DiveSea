import React, { useRef, useState } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import s from "./slider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Switcher } from "../leftRightSwitcher";
import { cardInfo } from "../../shared/cardInfo";

import "./custom-styles-slider.scss";
import { SliderArrow } from "../../icons/sliderArrow";
import { SliderDots } from "../../icons/sliderDots";
import { useNavigate } from "react-router-dom";

export const SliderComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const navigation = useNavigate();
  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const handleBeforeChange = (newIndex) => {
    setCurrentSlide(newIndex);
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: handleBeforeChange,
  };
  const navigateToProduct = (link) => navigation(link);
  return (
    <div className={`${s.slider_container} custom-slider-container`}>
      <SliderDots className={s.slider_dots} />
      <SliderArrow className={s.arrow} />
      <Slider ref={sliderRef} {...settings}>
        {cardInfo.map((item, index) => {
          const sliderClassNames = classNames(s.slides, "slides", {
            [s.activeSlide]: currentSlide === index,
          });
          return (
            <div className={s.slid_wrap} key={item.id}>
              <div className={sliderClassNames}>
                <div
                  onClick={() =>
                    navigateToProduct(`/nftproductIndividual?id=${item.id}`)
                  }
                  className="imgs"
                >
                  <img src={item.img} className="main-img" alt="img of slide" />
                  <img src={item.img} className="bloor" alt="img of slide" />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className={s.switcher_wrap}>
        <Switcher prev={previous} next={next} />
      </div>
    </div>
  );
};
