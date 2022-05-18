import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { baseAuthAxiosService } from "src/services/baseAuthAxiosService";
import SearchBox from "./SearchBox";
import { WallPaper } from "./WallPaper";

export default function Homepage() {
  return (
    <section
      css={`
        height: 100vh;
        width: 100vw;
        .logout{
          position:absolute;
          top:1rem;
          right:1rem;
        }
      `}
    >
      <Button className="logout" icon={<LogoutOutlined />} onClick={baseAuthAxiosService.logout} shape="circle"></Button>
      <WallPaper></WallPaper>
      <SearchBox
        css={`
          max-width: 40rem;
          margin: 0px 30%;
          margin-top: 20vh;
        `}
      ></SearchBox>
    </section>
  );
}
