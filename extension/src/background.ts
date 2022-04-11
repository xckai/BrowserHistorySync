import { syncManager } from "utils/syncManager";
import { onNewTabCreate, onTabUrlUpdate } from "utils/TabHandle";

export interface UrlInfo {
  Url: string;
  Title: string;
  Status: string;
  FavourIcon?: string;
  FavourIconUrl?: string;
}

// browser.tabs.onCreated.addListener(function (tab: browser.tabs.Tab) {
//   if (tab.id) {
//     onNewTabCreate(tab.id);
//   }
// });
browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    console.log("update", changeInfo, tabId);
    syncManager.onTabUpdate(tabId, changeInfo);
  }
});
