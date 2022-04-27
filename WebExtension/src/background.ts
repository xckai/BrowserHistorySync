import { syncManager } from "./lib/syncManager";

export interface UrlInfo {
  Url: string;
  Title: string;
  FaviconUrl?: string;
  Referrer?: string;
}

syncManager.useSyncStrategy("TimerBasedSyncByContentJS")

