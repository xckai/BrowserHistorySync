let retryTimes = 0;
async function timer() {
    browser.runtime.sendMessage({ type: "TimerBasedSyncTrigger" }).then(v => {
        console.log("TimerBasedSyncTrigger success", v)
    }).catch(e => {
        console.error("TimerBasedSyncTrigger", e);
        (retryTimes++ < 3) && setTimeout(timer, 500)
    })
}
setTimeout(timer, 30000);