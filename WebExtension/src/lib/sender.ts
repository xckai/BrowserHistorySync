import { UrlInfo } from "background";

let sendingMessageQueue: Array<UrlInfo> = [];
let browserType = "Chrome";
if ((navigator.userAgent.indexOf("Edg") != -1)) {
  browserType = "Edge"
}

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
export async function batchSyncWithRemoteServer(urlInfos: Array<UrlInfo>) {
  const { dataServerUrl, equipmentName
  } = await browser.storage.local.get(["dataServerUrl", "equipmentName"]);
  if (!dataServerUrl) {
    console.error("Remote server URL is null!!")
  }
  console.log("upload: ", urlInfos, dataServerUrl)

  await post(dataServerUrl + "/api/UrlHistory/BatchSyncUrlHistory", {
    equipmentInfo: {
      equipmentName,
      browserType
    },
    historyList: urlInfos
  })
}
export async function SendToRemote(urlInfo: UrlInfo) {
  const { dataServerUrl, equipmentName
  } = await browser.storage.local.get(["dataServerUrl", "equipmentName"]);
  if (!dataServerUrl) {
    console.error("Remote server URL is null!!")
  }
  console.log("upload: ", urlInfo, dataServerUrl)
  await post(dataServerUrl, {
    equipmentInfo: {
      equipmentName,
      browserType
    },
    historyList: [urlInfo]
  })
}
