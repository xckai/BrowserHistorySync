
import React, { PureComponent, version } from "react";
import logo from "src/assets/icon128.png";
export function Logo() {
  return (
    <div
      css={`
        margin-top:.3rem;
        width: 100%;
        height: 2.5rem;
        display: flex;
        align-items:center;
        border-bottom: 1px #ddd solid;
      `}
    >
      <img
        src={logo}
        css={`
          margin: 0 .5rem;
          height:1.8rem;
        `}
      ></img>
      <span css={`
        font-size:90%;
        font-weight: bold;
        letter-spacing: 0.0625em;
        color: #5b5b5b;
      `}>BrowserHistorySync</span>
    </div>
  );
}
