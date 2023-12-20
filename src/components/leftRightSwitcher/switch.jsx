import React from "react";
import sw from "./switcher.module.scss";

export const Switcher = () => {
  return (
    <div className={sw.switcher}>
      <button class={sw.left_arrow}>
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icons/Arrow Left 2/Line">
            <path
              id="vector (Stroke)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.2397 8.38963C10.8023 7.98584 10.1203 8.01311 9.71654 8.45055L6.23402 12.2232C5.85287 12.6361 5.85287 13.2726 6.23401 13.6855L9.71653 17.4583C10.1203 17.8957 10.8023 17.923 11.2397 17.5192C11.6772 17.1154 11.7045 16.4335 11.3007 15.996L9.48802 14.0323L19.9611 14.0323C20.5565 14.0323 21.0391 13.5497 21.0391 12.9544C21.0391 12.3591 20.5565 11.8765 19.9611 11.8765L9.48805 11.8765L11.3007 9.91283C11.7044 9.47539 11.6772 8.79343 11.2397 8.38963Z"
            />
          </g>
        </svg>
      </button>
      <button class={sw.right_arrow}>
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icons/Arrow Right 2/Line">
            <path
              id="vector (Stroke)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.7603 8.38963C16.1977 7.98584 16.8797 8.01311 17.2835 8.45055L20.766 12.2232C21.1471 12.6361 21.1471 13.2726 20.766 13.6855L17.2835 17.4583C16.8797 17.8957 16.1977 17.923 15.7603 17.5192C15.3228 17.1154 15.2955 16.4335 15.6993 15.996L17.512 14.0323L7.03886 14.0323C6.44354 14.0323 5.96094 13.5497 5.96094 12.9544C5.96094 12.3591 6.44354 11.8765 7.03886 11.8765L17.5119 11.8765L15.6993 9.91283C15.2956 9.47539 15.3228 8.79343 15.7603 8.38963Z"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};
