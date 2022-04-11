import { UrlInfo } from "background";

import { SendToRemote } from "./sender";

interface UrlInfoData {
  Url: string;
  Title: string;
  RetentionTime: number;
  FavourIconUrl: string;
  LastCheckedTimestamp: Date;
  TabId: number;
}
let cache: Array<Partial<UrlInfoData>> = [];
export async function onNewTabCreate(tabid: number) {
  let retryTime = 0;
  let crtInfo: UrlInfo;
  async function getTabInfo() {
    let tab = await browser.tabs.get(tabid);
    console.log(retryTime, "looping");
    if (tab.status === "complete") {
      handleFavourIcon({
        Url: tab.url,
        Title: tab.title,
        Status: tab.status,
        FavourIconUrl: tab.favIconUrl,
      });
    } else {
      crtInfo = {
        Url: tab.url,
        Title: tab.title,
        Status: tab.status,
        FavourIconUrl: tab.favIconUrl,
      };
      if (retryTime++ < 10) {
        setTimeout(getTabInfo, 1000);
      } else {
        handleFavourIcon(crtInfo);
      }
    }
  }
  setTimeout(getTabInfo, 1000);
}

export async function onTabUrlUpdate(tabId: number, url: string) {
  let isRecorded = cache.some((t) => t.Url == url)[0];
  if (!isRecorded) cache.push({ Url: url, TabId: tabId });
}

async function doCheck() {
  const tabs = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
}

async function handleFavourIcon(urlInfo: UrlInfo) {
  //   if (urlInfo.Status == "complete" && urlInfo.FavourIconUrl) {
  //     let base64: any = await fetch(urlInfo.FavourIconUrl, { method: "get" })
  //       .then((resp) => resp.blob())
  //       .then(
  //         (blob) =>
  //           new Promise((resolve) => {
  //             const reader = new FileReader();
  //             reader.onloadend = () => resolve(reader.result);
  //             reader.readAsDataURL(blob);
  //           })
  //       );
  //     urlInfo.FavourIcon = base64;
  //   }
  SendToRemote(urlInfo);
}
