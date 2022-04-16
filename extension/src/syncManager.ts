import { UrlInfo } from "background";
import { TimerBasedSyncByAlarm } from "syncStrategy/timerBasedSyncByAlarm";
import { batchSyncWithRemoteServer, SendToRemote } from "./sender";
export type IBatchSyncCallback = (urlInfos: Array<UrlInfo>) => void;
export interface ISyncStrategy {
  onOpenNewTab(tabId: number): void;
  onUrlChange(tabId: number, url: string): void;
  config(callback: IBatchSyncCallback): void;
  distory(): void;
}
class SyncManager {
  private currentSyncHandler: ISyncStrategy;
  useSyncStrategy(name: string) {
    switch (name) {
      case "TimerBasedSync":
        this.updateStrategy(new TimerBasedSyncByAlarm());
        break;
      default:
        throw new Error("Error！ can not found sync strategy named: " + name);
    }
  }
  updateStrategy(stragyHandle: ISyncStrategy) {
    if (this.currentSyncHandler) {
      this.currentSyncHandler.distory();
    }
    this.currentSyncHandler = stragyHandle;
    this.currentSyncHandler.config((urlInfos) => {
      batchSyncWithRemoteServer(urlInfos);
    });
  }
  onTabUpdate(tabId: number, updateInfo: browser.tabs._OnUpdatedChangeInfo) {
    if (updateInfo.url) {
      this.currentSyncHandler?.onUrlChange(tabId, updateInfo.url);
    }
  }
  onTabCreate(tab: browser.tabs.Tab) {
    this.currentSyncHandler?.onOpenNewTab(tab.id);
  }
}
export const syncManager = new SyncManager();
