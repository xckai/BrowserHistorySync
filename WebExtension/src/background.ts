import { syncManager } from "./lib/syncManager";

export interface UrlInfo {
  Url: string;
  Title: string;
  FaviconUrl?: string;
}

syncManager.useSyncStrategy("TimerBasedSyncByContentJS")

