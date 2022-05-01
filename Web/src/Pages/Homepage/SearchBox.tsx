import React, {
  FocusEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import search from "../../assets/search.svg";
import enter from "../../assets/enter.svg";
import SearchProviderTag from "./SearchProviderTag";
import { SearchBoxProviderFooter } from "./SearchBoxProviderFooter";

const SearchInput = styled.input`
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

const SearchBoxContainer = styled.section<{ inputForced: boolean }>`
  margin: 8px 16px;
  border: ${(props: any) =>
    props.inputForced ? "1px red solid" : "#d9d9d9 1px solid"};
  /* background-color: ${(props: any) =>
    props.inputForced ? "#efefef" : "none"}; */
  border-radius: 3px;
`;
const SearchInputBox = styled.div`
  position: relative;
  box-sizing: content-box;
  height: 2rem;
  .search_icon {
    position: absolute;
    z-index: 2;
    padding: 0.3rem;
    width: 2rem;
    height: 1.5rem;
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
    width: 1.1rem;
    height: 1.8rem;
    top: 0rem;
    opacity: 0.5;
    visibility: hidden;
  }
`;
const Divider = styled.div`
  margin: 5px;
  height: 1px;
  background-color: #d9d9d9;
`;
export default function SearchBox(props: {
  className?: string;
  onBlur?: () => void;
  onInputForce?: () => void;
}) {
  const [inputForced, setInputForced] = useState(true);

  const onForce = useCallback((e: any) => {
    setInputForced(true);
  }, []);
  const onBlur = useCallback(() => {
    setInputForced(false);
  }, []);

  return (
    <SearchBoxContainer inputForced={inputForced}>
      <SearchInputBox className={props.className}>
        <img className="search_icon" src={search} alt="" />
        <SearchInput
          className="search_input"
          placeholder="Search with google"
          onFocus={onForce}
          onBlur={onBlur}
        />
        <SearchProviderTag
          className="search_tag"
          searchProvider="HistorySync"
        />
        <img
          className="enter_icon"
          src={enter}
          style={{ visibility: inputForced ? "visible" : "hidden" }}
        />
      </SearchInputBox>

      {inputForced && (
        <div>
          <SearchBoxProviderFooter></SearchBoxProviderFooter>
        </div>
      )}
    </SearchBoxContainer>
  );
}
