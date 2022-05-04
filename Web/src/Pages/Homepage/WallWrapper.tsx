import React, {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { searchSuggestionService } from "src/services/searchSuggestionService";
import styled from "styled-components";
const StyledWrapperContainer = styled.div`
  position:fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:-1;
`
export function WallWrapper() {
  const [imageURL, setImageURL] = useState("");
  // useEffect(() => {
  //   searchSuggestionService.getBingWrapper().then(res => {
  //     console.log(res.data)
  //   })
  // })
  return <StyledWrapperContainer style={{ background: `url(https://api.dujin.org/bing/1920.php)` }}></StyledWrapperContainer>
}