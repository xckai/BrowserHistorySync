import { ISyncCallback, ISyncStrategy } from "./syncManager";

export class TimeBasedSyncHandle implements ISyncStrategy {
  cache: Record<number, { url: string }> = {};
  _syncCallback: ISyncCallback;
  onOpenNewTab(tabId: number): void {
    throw new Error("Method not implemented.");

  }
  async onUrlChange(tabId: number, url: string) {
    const timeSpan = 30000;
    this.cache[tabId] = { url: url, };
    await browser.alarms.clear("tab-" + tabId).catch(e => { });
    await browser.alarms.create("tab-" + tabId, { when: Date.now() + timeSpan });
  }
  registerSyncCallback(callback: ISyncCallback): void {
    this._syncCallback = callback;
    browser.alarms.onAlarm.addListener(this.handleUrlChange.bind(this))
  }

  async handleUrlChange(alarm: browser.alarms.Alarm) {
    console.log("check: " + alarm.name)
    if (alarm && alarm.name) {
      const tabId = parseInt(alarm.name.split("-")[1]);
      let tab = await browser.tabs.get(tabId).catch(err => {
        delete this.cache[tabId];
      })
      if (tab) {
        if (tab.url == this.cache[tabId]?.url) {
          this._syncCallback({
            Url: tab.url,
            Title: tab.title,
            FaviconUrl: tab.favIconUrl,
          })
          delete this.cache[tabId];
        }
      } else {
        delete this.cache[tabId];
      }
    }

    // } else {
    //   return;
    // }
    // await browser.alarms.clear("tab-" + tabId).catch(e => { });


    // const timeSpan = 10000;
    // let visitedDate = new Date();
    // await browser.alarms.clear("tab-" + tabId).then(clear => {
    //   if (clear) {
    //     browser.alarms.onAlarm.removeListener
    //   }
    // }).catch(e => { })
    // async function getTabInfo(alarm: browser.alarms.Alarm) {
    //   if (alarm && alarm.name) {
    //     console.log(alarm.name, tabId)
    //     let id = alarm.name.split("-")[1];
    //     if (parseInt(id) != tabId) {
    //       return;
    //     }
    //   }
    //   console.log(tabId, "checked")
    //   await browser.alarms.clear("tab-" + tabId).then(clear => clear && console.log("tabId: " + tabId + " getTabInfo clear")).catch(e => { })
    //   let tab = await browser.tabs.get(tabId).catch(e => null)
    //   if (tab != null) {
    //     if (tab.url === url) {
    //       this._syncCallback({
    //         Url: tab.url,
    //         Title: tab.title,
    //         FavourIconUrl: tab.favIconUrl,
    //         FirstVisitedDate: visitedDate.toISOString()
    //       })
    //     } else {
    //       url = tab.url;
    //       visitedDate = new Date();

    //       await browser.alarms.create("tab-" + tabId, { when: Date.now() + timeSpan });
    //       browser.alarms.onAlarm.addListener(getTabInfo.bind(this))
    //     }
    //   }
    // }
    // await browser.alarms.create("tab-" + tabId, { when: Date.now() + timeSpan });
    // browser.alarms.onAlarm.addListener(getTabInfo.bind(this))
  }
}
