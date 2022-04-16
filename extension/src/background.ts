import { syncManager } from "syncManager";

export interface UrlInfo {
  Url: string;
  Title: string;
  FaviconUrl?: string;
}

syncManager.useSyncStrategy("TimerBasedSync")
browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    syncManager.onTabUpdate(tabId, changeInfo);
  }
});
