import { Spin } from "antd";
import React, {
  FocusEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyledDivider } from "src/Components/StyledDivider";
import { SearchSuggestListItemMode } from "src/services/searchSuggestionService";
import styled from "styled-components";
import { SearchSuggestListItem } from "./SearchBox";
import search from "../../assets/search.svg";

const SearchListItemStyled = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
 background-color: ${(props) =>
    props.active ? "#efefef" : "none"};
  &:hover{
    background-color: #efefef;
  }
  .active_indicator {
    width: 0.2rem;
    height: 2rem;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-right: .8rem;
    background: ${(props) => props.active ? "#5b95ff" : "unset"};
  }
  .icon {
    width: 1rem;
    height: 1rem;
    img {
      width: 100%;
      height: 100%;
      vertical-align: baseline;
    }
  }
  .title {
    padding: 6px 6px;
    overflow:hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
  }
`;
function SearchListItem(props: { item: SearchSuggestListItem, active: boolean, onClick: (item: SearchSuggestListItem) => void }) {
  return (
    <SearchListItemStyled active={props.active} onClick={() => { props.onClick && props.onClick(props.item) }}>
      <div className="active_indicator" ></div>
      <div className="icon">
        {props.item.type == "history" ? <img src={props.item.iconURL} /> : <img src={search} />}
      </div>
      <div className="title">{props.item.title}</div>
    </SearchListItemStyled>
  );
}
export default function SearchBoxSuggestList(props: {
  loading: boolean;
  listData: Array<SearchSuggestListItem>;
  activeItemIdx: number;
  onClick: (item: SearchSuggestListItem) => void
}) {
  return (
    <div>
      {(props.loading || props.listData.length > 0) && <StyledDivider />}
      {
        props.loading && <div css={`display:flex; justify-content:center; align-items:center; height: 4rem;`}>
          <Spin></Spin>
        </div>
      }
      {props.listData.map((item, idx) => (
        <SearchListItem onClick={props.onClick} key={item.url + " " + idx} item={item} active={props.activeItemIdx == idx} />
      ))}
    </div>
  );
}