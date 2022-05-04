import React from "react";

import styled from "styled-components";
import baidu from "../../assets/baidu.ico";
import google from "../../assets/google.ico";
import bing from "../../assets/bing.png";
import historySync from "../../assets/historySync.png";
export type SearchProvider = "Google" | "Bing" | "Baidu" | "BrowserHistory";
const SearchProviderTagContainer = styled.div`
position:relative;
  display: flex;
  width: 2rem;
  height: 1.8rem;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: black;
  img {
    width: 1.2rem;
    height: 1.2rem;
    object-fit: scale-down;
  }
  span {
    font-weight: 500;
  }
`;
export default function SearchProviderTag(props: {
  className?: string;
  searchProvider: SearchProvider;
  title?: string;
  onClick?: (searchProvider: SearchProvider) => void;
}) {
  function getIcon(provider: SearchProvider) {
    switch (provider) {
      case "Baidu": {
        return baidu;
      }
      case "Bing": {
        return bing;
      }
      case "Google": {
        return google;
      }
      case "BrowserHistory": {
        return historySync;
      }
      default: {
        return "Not recogenized";
      }
    }
  }
  function getTitle(provider: SearchProvider) {
    switch (provider) {
      case "Baidu": {
        return "百度搜索";
      }
      case "Bing": {
        return "微软Bing搜索";
      }
      case "Google": {
        return "谷歌搜索";
      }
      case "BrowserHistory": {
        return "浏览器访问记录中搜索";
      }
      default: {
        return "Not recogenized";
      }
    }
  }
  return (
    <SearchProviderTagContainer
      className={props.className}
      title={getTitle(props.searchProvider)}
      onClick={() => { props?.onClick && props?.onClick(props.searchProvider) }}
    >
      <img src={getIcon(props.searchProvider)} />
    </SearchProviderTagContainer>
  );
}
