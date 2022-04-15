import { syncManager } from "utils/syncManager";
import { TimeBasedSyncHandle } from "utils/timeBasedSyncHandle";

export interface UrlInfo {
  Url: string;
  Title: string;
  FaviconUrl?: string;
}

// browser.tabs.onCreated.addListener(function (tab: browser.tabs.Tab) {
//   if (tab.id) {
//     onNewTabCreate(tab.id);
//   }
// });
syncManager.updateStrategy(new TimeBasedSyncHandle());

browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url) {
    console.log("update", changeInfo, tabId);
    syncManager.onTabUpdate(tabId, changeInfo);
  }
});
