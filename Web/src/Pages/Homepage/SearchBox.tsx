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
import { last, trim } from "lodash";

const SearchBoxContainer = styled.section`
  width: 20rem;
  transition: width 0.5s, margin-top 0.3s;
  padding: 0.6rem 0px;
  position: relative;
  background: #fff;
  opacity: 0.6;
  z-index: 2;
  border: #d9d9d9 1px solid;
  border-color: #d9d9d9;
  box-shadow: none;
  border-radius: 10px;
  &.forced {
    width: 90%;
    opacity: 1;
    border-color: #97d0ff;
    box-shadow: 0 0 0 2px #188fff16;
  }
`;

const StyledBackgroundLayer = styled.div<{ inputForced: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: background-color 0.3s;
  z-index: ${(props) => (props.inputForced ? 1 : -1)};
  pointer-events: all;
  background-color: ${(props) =>
    props.inputForced ? "rgba(0,0,0,.6)" : "none"}; ;
`;
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
    setCrtActivedItemIdx(0);
    console.log(val);

    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }
    if (trim(val) == "") {
      setSuggestionList([]);
      return;
    }
    timer = setTimeout(function () {
      setLoading(true);
      searchSuggestionService
        .getSuggestion(provider, val)
        .then((res) => {
          timer && setSuggestionList(res);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setSuggestionList([]);
        });
    }, 50);
  }, []);
  // function handleSearch(val: string) {

  // }
  const onItemClicked = useCallback(
    (item: SearchSuggestListItem) => {
      setCrtActivedItemIdx(0);
      setSearchValue("");
      setSuggestionList([]);
      setInputForced(false);
      searchSuggestionService.handleSuggestion(crtSearchProvider, item);
    },
    [crtSearchProvider]
  );
  function onSearchProviderChanged(provider: SearchProvider) {
    setCrtSearchProvider(provider);
    window.localStorage.setItem("latest_used_provider", provider);
  }
  function onKeyDown(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key == "ArrowUp") {
      if (inputForced) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (crtActivedItemIdx > 0) {
          setCrtActivedItemIdx(crtActivedItemIdx - 1);
          let activedItem = suggestionList[crtActivedItemIdx - 1];
          if (activedItem && activedItem.type != "history") {
            setSearchValue(activedItem.title);
          }
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
          let activedItem = suggestionList[crtActivedItemIdx + 1];
          if (activedItem && activedItem.type != "history") {
            setSearchValue(activedItem.title);
          }
        }
      }
      return;
    }
    if (e.key == "Home" || e.key == "PageUp") {
      if (inputForced) {
        e.stopImmediatePropagation();
        e.preventDefault();
        setCrtActivedItemIdx(0);
        let activedItem = suggestionList[0];
        if (activedItem && activedItem.type != "history") {
          setSearchValue(activedItem.title);
        }
      }
      return;
    }
    if (e.key == "End" || e.key == "PageDown") {
      if (inputForced) {
        e.stopImmediatePropagation();
        e.preventDefault();
        setCrtActivedItemIdx(suggestionList.length - 1);
        let activedItem = last(suggestionList);
        if (activedItem && activedItem.type != "history") {
          setSearchValue(activedItem.title);
        }
      }
      return;
    }
    if (e.key == "Enter") {
      e.stopImmediatePropagation();
      e.preventDefault();
      let activedItem = suggestionList[crtActivedItemIdx];
      if (activedItem) {
        onItemClicked(activedItem);
      }
      return;
    }
    if (e.key == "Escape") {
      setCrtActivedItemIdx(0);
      setSuggestionList([]);
      if (searchValue) {
        setSearchValue("");
      } else {
        setInputForced(false);
      }
      return;
    }
    if (e.key == "Tab") {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (inputForced) {
        let providers: Array<SearchProvider> = [
          "Google",
          "Baidu",
          "Bing",
          "BrowserHistory",
        ];
        let crtProviderIdx = providers.indexOf(crtSearchProvider);
        onSearchProviderChanged(
          providers[(crtProviderIdx + 1) % providers.length]
        );
      } else {
        setInputForced(true);
      }
    }
  }
  useEffect(() => {
    inputForced && handleSearch(crtSearchProvider, searchValue);
  }, [crtSearchProvider, inputForced]);
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    const latestUsedProvider = window.localStorage.getItem(
      "latest_used_provider"
    );
    if (latestUsedProvider) {
      onSearchProviderChanged(latestUsedProvider as SearchProvider);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });
  return (
    <>
      <StyledBackgroundLayer
        inputForced={inputForced}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setInputForced(false);
        }}
      />
      <SearchBoxContainer
        className={props.className + (inputForced ? " forced" : "")}
      >
        <SearchBoxInput
          onFocus={onForce}
          isForcused={inputForced}
          searchValue={searchValue}
          onSearchValueChange={(val: string) => {
            setSearchValue(val);
            handleSearch(crtSearchProvider, val);
          }}
          currentSearchProvider={crtSearchProvider}
        />
        {inputForced && (
          <div>
            <SearchBoxSuggestList
              onClick={onItemClicked}
              listData={suggestionList}
              loading={loading}
              activeItemIdx={crtActivedItemIdx}
            />
            <SearchBoxProviderFooter
              currentSearchProvider={crtSearchProvider}
              onSearchProviderChange={onSearchProviderChanged}
            />
          </div>
        )}
      </SearchBoxContainer>
    </>
  );
}
