import { IBatchSyncCallback, ISyncStrategy } from "../syncManager";
export class TimerBasedSyncByContentJS implements ISyncStrategy {
  distory(): void {
    browser.runtime.onMessage.removeListener(this.onReceiveContextMsg.bind(this))
  }
  config(callback: IBatchSyncCallback): void {
    this._batchSyncCallback = callback;
    browser.runtime.onMessage.addListener(this.onReceiveContextMsg.bind(this))
  }
  _batchSyncCallback: IBatchSyncCallback;
  async onReceiveContextMsg(msg, sender: browser.runtime.MessageSender, sendResponse) {
    console.log("receive msg", msg, sender)
    if (msg.type == "TimerBasedSyncTrigger") {
      let tab = await browser.tabs.get(sender.tab.id);
      if (tab) {
        this._batchSyncCallback([
          {
            Url: tab.url,
            Title: tab.title,
            FaviconUrl: tab.favIconUrl,
            Referrer: msg.referrer
          }
        ])
      }
      sendResponse(true);
    }
    sendResponse(false)
    return true;
  }
}
