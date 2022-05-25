import React from "react";

import styled from "styled-components";
import SearchProviderTag, { SearchProvider } from "./SearchProviderTag";
const Divider = styled.div`
  margin: 5px;
  height: 1px;
  background-color: #d9d9d9;
`;
const Container = styled.div`
  height: 2.5rem;
  padding-bottom: 0.5rem;
  .search_tag {
    margin: 4px;
    background: none;
    &:hover {
      background: #0000002f;
    }
  }
`;
export function SearchBoxProviderFooter(props: {
  onSearchProviderChange: (searchProvider: SearchProvider) => void;
  currentSearchProvider: SearchProvider;
}) {
  return (
    <Container>
      <Divider />
      <div
        css={`
          display: flex;
          align-items: center;
          span {
            padding: 5px 8px;
          }
          .search_tag {
            &.active {
              &::after {
                position: absolute;
                content: " ";
                height: 2px;
                bottom: 0;
                width: 1rem;
                border-radius: 1px;
                background: #40a9ff;
              }
            }
          }
        `}
      >
        <span> 搜索引擎: </span>
        <SearchProviderTag
          className={
            props.currentSearchProvider == "Google"
              ? "search_tag active"
              : "search_tag"
          }
          searchProvider="Google"
          onClick={props?.onSearchProviderChange}
        />
        <SearchProviderTag
          className={
            props.currentSearchProvider == "Baidu"
              ? "search_tag active"
              : "search_tag"
          }
          searchProvider="Baidu"
          onClick={props?.onSearchProviderChange}
        />
        <SearchProviderTag
          className={
            props.currentSearchProvider == "Bing"
              ? "search_tag active"
              : "search_tag"
          }
          searchProvider="Bing"
          onClick={props?.onSearchProviderChange}
        />
        <SearchProviderTag
          className={
            props.currentSearchProvider == "BrowserHistory"
              ? "search_tag active"
              : "search_tag"
          }
          searchProvider="BrowserHistory"
          onClick={props?.onSearchProviderChange}
        />
      </div>
    </Container>
  );
}
