import { UrlInfo } from "background";
import { ISyncCallback, ISyncStrategy } from "./syncManager";

export class TimeBasedSyncHandle implements ISyncStrategy {
  _syncCallback: ISyncCallback;
  onOpenNewTab(tabId: number): void {
    throw new Error("Method not implemented.");
  }
  onUrlChange(tabId: number, url: string): void {
    this.handleUrlChange(tabId);
  }
  syncCallback(callback: ISyncCallback): void {
    this._syncCallback = callback;
  }
  async handleUrlChange(tabId: number): Promise<void> {
    let retryTime = 0;
    let crtInfo: UrlInfo;
    async function getTabInfo() {
      let tab = await browser.tabs.get(tabId);
      console.log(retryTime, "looping");
      if (tab.status === "complete") {
        this._syncCallback({
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
        if (retryTime++ < 5) {
          setTimeout(getTabInfo, 1000);
        } else {
          this._syncCallback(crtInfo);
        }
      }
    }
    setTimeout(getTabInfo, 1000);
  }
}
