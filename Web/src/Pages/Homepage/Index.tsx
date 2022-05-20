import { LogoutOutlined, SettingFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
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
          z-index:2;
          opacity:.1;
          &:hover{
             opacity: .5;
             color:red;
             border-color:red;
          }
        }
        .setting{
          position:absolute;
          top:1rem;
          right: 3.5rem;
          z-index:2;
          opacity:.1;
           &:hover{
             opacity: .5;
          }
        }
      `}
    >
      <Link to={"/admin"}><Button className="setting" icon={<SettingFilled />} shape="circle"></Button></Link>
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
