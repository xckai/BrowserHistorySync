import { syncManager } from "./lib/syncManager";
export interface UrlInfo {
  Url: string;
  Title: string;
  FaviconUrl?: string;
  Referrer?: string;
}
export function setIcon(type: "normal" | "warning") {
  if (type == "normal") {
    (browser.action ?? browser.browserAction).setIcon({ path: "/128.png" });
    return;
  }
  if (type == 'warning') {
    (browser.action ?? browser.browserAction).setIcon({ path: "/icon_warning.png" });
    return;
  }
  return;
}
browser.runtime.onMessage.addListener(function (request) {
  if (request.action == 'setIcon') {
    setIcon(request.type);
  }
})

syncManager.useSyncStrategy("TimerBasedSyncByContentJS")

