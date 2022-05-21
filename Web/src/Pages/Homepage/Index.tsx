import {
  LogoutOutlined,
  SettingFilled,
  HistoryOutlined,
} from "@ant-design/icons";
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
  .btn_group {
    position: absolute;
    top: 1rem;
    right:1rem;
    display: flex;
    z-index: 2;
    button {
      opacity: 0.2;
      margin: 0 0.2rem;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  .logout {
    &:hover {
      color: red;
      border-color: red;
    }
  }
  .setting {
  }
  .mobile_page_entry {
    display: none;
  }
  @media screen and (max-width: 800px) {
    .mobile_page_entry {
      display: unset;
    }
    .search_box {
      width: 30rem;
      max-width: 80%;
      margin: 15vh auto;
      &.forced {
        margin-top: 1vh;
      }
      .search_box_suggest_list {
        max-height: calc(95vh - 6rem);
      }
    }
    .ios {
      &.forced {
        margin-top: 0.5rem;
      }
      .search_box_suggest_list {
        max-height: calc(40vh - 6rem);
      }
    }
  }
  @media screen and (max-width: 500px) {
    .search_box {
      max-width: 90%;
    }
  }
`;
export default function Homepage() {
  const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return (
    <StyledSection>
      <div className="btn_group">
        <Link to={"/mobile"}>
          <Button
            className="mobile_page_entry"
            icon={<HistoryOutlined />}
            shape="circle"
          ></Button>
        </Link>
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
      </div>
      <WallPaper></WallPaper>
      <SearchBox
        className={isIOS ? "ios search_box" : "search_box"}
      ></SearchBox>
    </StyledSection>
  );
}
