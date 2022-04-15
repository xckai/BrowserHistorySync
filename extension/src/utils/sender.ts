import { UrlInfo } from "background";

let sendingMessageQueue: Array<UrlInfo> = [];

async function post(url = '', data = {}) {
  // Default options are marked with *
  try {
    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  } catch (e) {
    console.error(e)
  }
  return; // parses JSON response into native JavaScript objects
}

export async function SendToRemote(urlInfo: UrlInfo) {
  const { syncManagerServerUrl } = await browser.storage.sync.get(["syncManagerServerUrl"]);
  console.log(syncManagerServerUrl)
  await post(syncManagerServerUrl, [urlInfo])
}
