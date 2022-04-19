import { css, cx } from "@emotion/css";

import React, { PureComponent, version } from "react";
import logo from "src/assets/logo.png";
export function Logo() {
  return (
    <div
      className={css`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `}
    >
      <img
        src={logo}
        className={css`
          margin: 3px 1rem;
        `}
      ></img>
    </div>
  );
}
