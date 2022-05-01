import React from "react";

import styled from "styled-components";
import SearchProviderTag from "./SearchProviderTag";
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
export function SearchBoxProviderFooter() {
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
        `}
      >
        <span> Search with: </span>
        <SearchProviderTag className="search_tag" searchProvider="Google" />
        <SearchProviderTag className="search_tag" searchProvider="Baidu" />
        <SearchProviderTag className="search_tag" searchProvider="Bing" />
        <SearchProviderTag
          className="search_tag"
          searchProvider="HistorySync"
        />
      </div>
    </Container>
  );
}
