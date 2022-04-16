import { IBatchSyncCallback, ISyncStrategy } from "../syncManager";
export class TimerBasedSyncByAlarm implements ISyncStrategy {
  distory(): void {
    browser.tabs.onUpdated.removeListener(this.onUrlChange.bind(this));
  }
  _batchSyncCallback: IBatchSyncCallback;
  async onUrlChange(tabId: number, changeInfo: browser.tabs._OnUpdatedChangeInfo) {
    const url = changeInfo.url;
    if (!url) {
      return
    }
    let handling = [];
    let { timeBasedHistoryRecoders: recoders } = await browser.storage.local.get(["timeBasedHistoryRecoders"]);
    recoders = recoders ?? [];
    recoders = recoders.filter(recoder => {
      if (Date.now() - recoder.timestamp > 30000) {
        handling.push(recoder);
        return false;
      } else if (tabId == recoder.tabId) {
        return false;
      }
      return true;
    });
    recoders.push({ url: url, timestamp: Date.now(), tabId: tabId });
    await browser.storage.local.set({
      timeBasedHistoryRecoders
        : recoders
    })
    console.log(recoders, handling, "recoders");
    handling.length > 0 && this.handleRecoders(handling);
    await browser.alarms.create("timerbasedSyncTimer", { delayInMinutes: 1 });
  }
  config(callback: IBatchSyncCallback): void {
    this._batchSyncCallback = callback;
    browser.tabs.onUpdated.addListener(this.onUrlChange.bind(this));
    browser.alarms.onAlarm.addListener((alarm) => {
      this.checkRecoderByTimer(alarm)
    });
  }
  async checkRecoderByTimer(alarm: browser.alarms.Alarm) {
    console.log("checked by timer", alarm)
    if (alarm == undefined || alarm.name !== "timerbasedSyncTimer") {
      return;
    }

    let { timeBasedHistoryRecoders: recoders } = await browser.storage.local.get(["timeBasedHistoryRecoders"]);
    recoders = recoders ?? [];

    let handling = [];
    recoders = recoders.filter(recoder => {
      if (Date.now() - recoder.timestamp > 30000) {
        handling.push(recoder);
        return false;
      }
      return true;
    });
    await browser.storage.local.set({
      timeBasedHistoryRecoders
        : recoders
    })
    handling.length > 0 && await this.handleRecoders(handling);
    if (recoders.length > 0) {
      await browser.alarms.create("timerbasedSyncTimer", { delayInMinutes: 1 });
    }
  }
  async handleRecoders(recoders: Array<{ url: string, timestamp: number, tabId: number }>) {
    let tabs = await Promise.all(recoders.map(async recoder => {
      return await browser.tabs.get(recoder.tabId).catch(err => {
        console.log("tab error: ", err)
      })
    }));
    console.log(tabs);
    let urlInfos = tabs.filter(t => !!t).map((tab: browser.tabs.Tab) => ({
      Url: tab.url,
      Title: tab.title,
      FaviconUrl: tab.favIconUrl,
    }));
    if (urlInfos.length > 0) {
      this._batchSyncCallback(urlInfos);
    }
  }
  // async handleUrlChangeByAlarm(alarm: browser.alarms.Alarm) {


  //   console.log("check: " + alarm.name)
  //   if (alarm && alarm.name) {
  //     const tabId = parseInt(alarm.name.split("-")[1]);
  //     let tab = await browser.tabs.get(tabId).catch(err => {
  //       console.log("tab error: ", err)
  //       delete this.cache[tabId];
  //     })
  //     console.log(tab, this.cache[tabId]);
  //     if (tab) {
  //       if (tab.url == this.cache[tabId]?.url) {
  //         this._syncCallback({
  //           Url: tab.url,
  //           Title: tab.title,
  //           FaviconUrl: tab.favIconUrl,
  //         })
  //         delete this.cache[tabId];
  //       }
  //     } else {
  //       delete this.cache[tabId];
  //     }
  //   }

  //   // } else {
  //   //   return;
  //   // }
  //   // await browser.alarms.clear("tab-" + tabId).catch(e => { });


  //   // const timeSpan = 10000;
  //   // let visitedDate = new Date();
  //   // await browser.alarms.clear("tab-" + tabId).then(clear => {
  //   //   if (clear) {
  //   //     browser.alarms.onAlarm.removeListener
  //   //   }
  //   // }).catch(e => { })
  //   // async function getTabInfo(alarm: browser.alarms.Alarm) {
  //   //   if (alarm && alarm.name) {
  //   //     console.log(alarm.name, tabId)
  //   //     let id = alarm.name.split("-")[1];
  //   //     if (parseInt(id) != tabId) {
  //   //       return;
  //   //     }
  //   //   }
  //   //   console.log(tabId, "checked")
  //   //   await browser.alarms.clear("tab-" + tabId).then(clear => clear && console.log("tabId: " + tabId + " getTabInfo clear")).catch(e => { })
  //   //   let tab = await browser.tabs.get(tabId).catch(e => null)
  //   //   if (tab != null) {
  //   //     if (tab.url === url) {
  //   //       this._syncCallback({
  //   //         Url: tab.url,
  //   //         Title: tab.title,
  //   //         FavourIconUrl: tab.favIconUrl,
  //   //         FirstVisitedDate: visitedDate.toISOString()
  //   //       })
  //   //     } else {
  //   //       url = tab.url;
  //   //       visitedDate = new Date();

  //   //       await browser.alarms.create("tab-" + tabId, { when: Date.now() + timeSpan });
  //   //       browser.alarms.onAlarm.addListener(getTabInfo.bind(this))
  //   //     }
  //   //   }
  //   // }
  //   // await browser.alarms.create("tab-" + tabId, { when: Date.now() + timeSpan });
  //   // browser.alarms.onAlarm.addListener(getTabInfo.bind(this))
  // }
}
