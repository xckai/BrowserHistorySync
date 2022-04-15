import { UrlInfo } from "background";
import { SendToRemote } from "./sender";
export type ISyncCallback = (urlInfo: UrlInfo) => void;
export interface ISyncStrategy {
  onOpenNewTab(tabId: number): void;
  onUrlChange(tabId: number, url: string): void;
  registerSyncCallback(callback: ISyncCallback): void;
}
class SyncManager {
  private syncStragyHandle: ISyncStrategy;
  updateStrategy(stragyHandle: ISyncStrategy) {
    this.syncStragyHandle = stragyHandle;
    this.syncStragyHandle.registerSyncCallback((urlInfo) => {
      SendToRemote(urlInfo);
    });
  }
  onTabUpdate(tabId: number, updateInfo: browser.tabs._OnUpdatedChangeInfo) {
    if (updateInfo.url) {
      this.syncStragyHandle?.onUrlChange(tabId, updateInfo.url);
    }
  }
  onTabCreate(tab: browser.tabs.Tab) {
    this.syncStragyHandle?.onOpenNewTab(tab.id);
  }
}
export const syncManager = new SyncManager();
