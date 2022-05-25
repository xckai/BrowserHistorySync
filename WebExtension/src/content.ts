let retryTimes = 0;
async function timer() {
  browser.runtime
    .sendMessage({ type: "TimerBasedSyncTrigger", referrer: document.referrer })
    .then((v) => {})
    .catch((e) => {
      console.error("TimerBasedSyncTrigger", e);
      retryTimes++ < 3 && setTimeout(timer, 500);
    });
}
browser.storage.local
  .get(["delayUploadTime"])
  .then((res) => {
    if (res["delayUploadTime"])
      setTimeout(timer, parseInt(res["delayUploadTime"]) * 1000);
    else setTimeout(timer, 30000);
  })
  .catch((e) => {
    setTimeout(timer, 30000);
  });
