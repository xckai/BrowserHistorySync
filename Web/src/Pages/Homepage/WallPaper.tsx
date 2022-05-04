import React, {
  FocusEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BingWallWrapperInfo,
  wallpaperService,
} from "src/services/wallpaperService";
import styled from "styled-components";
const StyledWrapperContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: #444;
  background-repeat: no-repeat;
  background-size: cover;
  .info {
    position: absolute;
    bottom: 0.1rem;
    right: 1rem;
    a {
      font-size: 90%;
      opacity: 0.7;
      color: gray;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
export function WallPaper() {
  const cacheItem = window.localStorage.getItem("wallpaper_cache");
  const [imageInfo, setImageInfo] = useState(
    cacheItem ? JSON.parse(cacheItem) : ({} as BingWallWrapperInfo)
  );
  useEffect(() => {
    wallpaperService.getBingWallPaper().then((res) => {
      setImageInfo(res);
      window.localStorage.setItem("wallpaper_cache", JSON.stringify(res));
    });
  }, []);
  return (
    <StyledWrapperContainer
      style={{ backgroundImage: `url(${imageInfo.imgUrl})` }}
    >
      <div className="info">
        <a
          target="_blank"
          title={imageInfo.copyRight}
          href={imageInfo.copyRightLink}
        >
          {imageInfo.title}
        </a>
        <a target="_blank" href="https://www.microsoft.com/bing/bing-wallpaper">
          @Bing Wallpaper
        </a>
      </div>
    </StyledWrapperContainer>
  );
}
