import { UrlInfo } from "background";
import { TimerBasedSyncByAlarm } from "syncStrategy/timerBasedSyncByAlarm";
import { TimerBasedSyncByContentJS } from "syncStrategy/timerBasedSyncByContentJS";
import { batchSyncWithRemoteServer, SendToRemote } from "./sender";
export type IBatchSyncCallback = (urlInfos: Array<UrlInfo>) => void;
export interface ISyncStrategy {
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
      case "TimerBasedSyncByContentJS":
        this.updateStrategy(new TimerBasedSyncByContentJS());
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
}
export const syncManager = new SyncManager();
