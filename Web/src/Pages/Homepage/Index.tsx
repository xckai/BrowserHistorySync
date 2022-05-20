import { LogoutOutlined, SettingFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { baseAuthAxiosService } from "src/services/baseAuthAxiosService";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import { WallPaper } from "./WallPaper";
const StyledSection = styled.section`
  height: 100vh;
  width: 100vw;
  .search_box {
    max-width: 40rem;
    margin: 20vh auto;
  }
  .logout {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
    opacity: 0.1;
    &:hover {
      opacity: 0.5;
      color: red;
      border-color: red;
    }
  }
  .setting {
    position: absolute;
    top: 1rem;
    right: 3.5rem;
    z-index: 2;
    opacity: 0.1;
    &:hover {
      opacity: 0.5;
    }
  }
  @media screen and (max-width: 800px) {
    .search_box {
      width: 30rem;
      max-width: 80%;
      margin: 20vh auto;
      &.forced {
        margin-top: 10vh;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .search_box {
      max-width: 90%;
    }
  }
  @media screen and (max-height: 450px) {
    .search_box {
      &.forced {
        margin-top: 5vh;
      }
      .search_box_suggest_list {
        max-height: 65vh;
      }
    }
  }
`;
export default function Homepage() {
  return (
    <StyledSection>
      <Link to={"/admin"}>
        <Button
          className="setting"
          icon={<SettingFilled />}
          shape="circle"
        ></Button>
      </Link>
      <Button
        className="logout"
        icon={<LogoutOutlined />}
        onClick={baseAuthAxiosService.logout}
        shape="circle"
      ></Button>
      <WallPaper></WallPaper>
      <SearchBox className="search_box"></SearchBox>
    </StyledSection>
  );
}
