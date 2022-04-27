let retryTimes = 0;
async function timer() {
    browser.runtime.sendMessage({ type: "TimerBasedSyncTrigger", referrer: document.referrer }).then(v => {
    }).catch(e => {
        console.error("TimerBasedSyncTrigger", e);
        (retryTimes++ < 3) && setTimeout(timer, 500)
    })
}
setTimeout(timer, 30000);