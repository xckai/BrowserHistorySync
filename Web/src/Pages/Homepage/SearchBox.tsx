import React, {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import SearchProviderTag, { SearchProvider } from "./SearchProviderTag";
import { SearchBoxProviderFooter } from "./SearchBoxProviderFooter";
import SearchBoxSuggestList from "./SearchBoxSuggestList";
import {
  searchSuggestionService,
  SearchSuggestListItemMode,
} from "src/services/searchSuggestionService";
import { SearchBoxInput } from "./SearchBoxInput";
import { trim } from "lodash";


const SearchBoxContainer = styled.section<{ inputForced: boolean }>`
  padding: .6rem 0px;
  position:relative;
  background: #fff;
  opacity:${(props=>props.inputForced? 1 : 0.5)};
  z-index:2;
  border: #d9d9d9 1px solid;
  border-color: ${(props: any) =>
    props.inputForced ? "#97d0ff " : "#d9d9d9"};
   box-shadow: ${(props) => props.inputForced ? "0 0 0 2px #188fff16" : " "};
  border-radius: 10px;
`;

const Divider = styled.div`
  margin: 5px;
  height: 1px;
  background-color: #d9d9d9;
`;
const StyledBackgroundLayer = styled.div<{ inputForced: boolean }>`
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  transition: background-color .3s ;
  z-index: ${(props) => props.inputForced ? 1 : -1};
  pointer-events:all;
  background-color:  ${(props) => props.inputForced ? "rgba(0,0,0,.6)" : "none"};;

`
export type SearchSuggestListItem = SearchSuggestListItemMode & {
  isAcitved?: boolean;
};
let timer: any = 0;
export default function SearchBox(props: {
  className?: string;
  onBlur?: () => void;
  onForce?: () => void;
}) {
  const [inputForced, setInputForced] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [crtActivedItemIdx, setCrtActivedItemIdx] = useState(0);
  const [crtSearchProvider, setCrtSearchProvider] = useState(
    "BrowserHistory" as SearchProvider
  );
  const [suggestionList, setSuggestionList] = useState(
    [] as Array<SearchSuggestListItem>
  );
  const onForce = useCallback(() => {
    setInputForced(true);
  }, []);
  const handleSearch = useCallback((provider: SearchProvider, val: string) => {
    setSuggestionList([]);
    setCrtActivedItemIdx(0);
    if (trim(val) == "") {
      return;
    }
    setLoading(true);
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    timer = setTimeout(function () {
      console.log(provider, val)
      searchSuggestionService
        .getSuggestion(provider, val)
        .then((res) => {
          setSuggestionList(res);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false)
        });
    }, 300);
  }, [])
  // function handleSearch(val: string) {

  // }
  const onItemClicked = useCallback((item: SearchSuggestListItem) => {
    setCrtActivedItemIdx(0);
    setSearchValue("")
    setSuggestionList([]);
    setInputForced(false);
    searchSuggestionService.handleSuggestion(crtSearchProvider, item)
  }, [crtSearchProvider])
  function onKeyDown(e: KeyboardEvent) {
    console.log(e.key)
    if (e.key == "ArrowUp") {
      if (inputForced) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (crtActivedItemIdx > 0) {
          setCrtActivedItemIdx(crtActivedItemIdx - 1);
        }
      }
      return;
    }
    if (e.key == "ArrowDown") {
      if (inputForced) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (crtActivedItemIdx < suggestionList.length - 1) {
          setCrtActivedItemIdx(crtActivedItemIdx + 1);
        }
      }
      return;
    }
    if (e.key == "Enter") {
      e.stopImmediatePropagation();
      e.preventDefault();
      let activedItem = suggestionList[crtActivedItemIdx];
      if (activedItem) {
        onItemClicked(activedItem)
      }
      return;
    }
    if (e.key == "Escape") {
      setCrtActivedItemIdx(0);
      setSuggestionList([]);
      if (searchValue) {
        setSearchValue("")
      } else {
        setInputForced(false);
      }
      return;
    }
    if (e.key == 'Tab') {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (inputForced) {
        let providers: Array<SearchProvider> = ["Google", "Baidu", "Bing", "BrowserHistory"]
        let crtProviderIdx = providers.indexOf(crtSearchProvider);
        setCrtSearchProvider(providers[(crtProviderIdx + 1) % providers.length]);
      } else {
        setInputForced(true);
      }
    }
  }
  useEffect(() => {
    inputForced && handleSearch(crtSearchProvider, searchValue)

  }, [crtSearchProvider, inputForced])
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  })
  return (
    <>

      <StyledBackgroundLayer inputForced={inputForced} onClick={(e) => { e.stopPropagation(); e.preventDefault(); setInputForced(false) }} />
      <SearchBoxContainer inputForced={inputForced} className={props.className}>
        <SearchBoxInput onFocus={onForce} isForcused={inputForced} searchValue={searchValue} onSearchValueChange={(val: string) => {
          setSearchValue(val);
          handleSearch(crtSearchProvider, val)
        }} currentSearchProvider={crtSearchProvider} />
        {inputForced && (
          <div>
            <SearchBoxSuggestList onClick={onItemClicked} listData={suggestionList} loading={loading} activeItemIdx={crtActivedItemIdx} />
            <SearchBoxProviderFooter
              currentSearchProvider={crtSearchProvider}
              onSearchProviderChange={(p) => setCrtSearchProvider(p)}
            />
          </div>
        )}
      </SearchBoxContainer>
    </>

  );
}
