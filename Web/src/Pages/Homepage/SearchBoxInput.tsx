import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import search from "../../assets/search.svg";
import enter from "../../assets/enter.svg";
import SearchProviderTag, { SearchProvider } from "./SearchProviderTag";
const StyledInput = styled.input`
  width: 100%;
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  height: 2rem;
  font-size: 110%;
  text-indent: 5rem;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  &:focus {
    border: none;
    /* background-color: #fff;
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px #1890ff33;
    border-right-width: 1px; */
    outline: 0;
  }
`;
const StyledSearchInput = styled.div`
  position: relative;
  box-sizing: content-box;
  padding:0 .5rem;
  height: 2rem;
  .search_icon {
    position: absolute;
    z-index: 2;
    padding: 0.3rem;
    width: 2rem;
    height:2rem;
  }
  .search_tag {
    position: absolute;
    top: 0.1rem;
    left: 2.4rem;
  }
  .enter_icon {
    position: absolute;
    z-index: 2;
    padding: 0.3rem;
    right: 0;
    width: 1.8rem;
    height: 1.8rem;
    top: 0.2rem;
    opacity: 0.5;
    visibility: hidden;
  }
`;
export function SearchBoxInput(props: {
  className?: string, searchValue: string,
  onSearchValueChange: (val: string) => void,
  onFocus: () => void;
  currentSearchProvider: SearchProvider,
  isForcused: boolean,
}) {
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (props.isForcused) {
      inputRef?.current?.focus();
    }
  }, [props.isForcused, props.currentSearchProvider])
  return <StyledSearchInput className={props.className}>
    <img className="search_icon" src={search} alt="" />
    <StyledInput
      className="search_input"
      placeholder={`Search With ${props.currentSearchProvider}`}
      value={props.searchValue}
      onChange={(e) => {
        props.onSearchValueChange(e.target.value)
      }}
      ref={inputRef}
      onFocusCapture={props.onFocus}
      autoFocus={false}
      autoComplete={"off"}
      onBeforeInput={props.onFocus}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault()
        props.onFocus();
      }}
    />
    <SearchProviderTag
      className="search_tag"
      searchProvider={props.currentSearchProvider}
    />
    <img
      className="enter_icon"
      src={enter}
      style={{ visibility: props.isForcused ? "visible" : "hidden" }}
    />
  </StyledSearchInput>
}