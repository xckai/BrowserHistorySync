import { UrlInfo } from "background";

let sendingMessageQueue: Array<UrlInfo> = [];
let browserType = "Chrome";
let showErrorIndicator = false;
if ((navigator.userAgent.indexOf("Edg") != -1)) {
  browserType = "Edge"
}

async function post(url = '', data = {}) {
  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.ok && showErrorIndicator) {
      //reset icon to defalut
      (browser.action ?? browser.browserAction).setIcon({ path: "/128.png" });
      showErrorIndicator = false;
    } else if (!res.ok && !showErrorIndicator) {
      // set icon to warning ;
      (browser.action ?? browser.browserAction).setIcon({ path: "/icon_warning.png" });
      showErrorIndicator = true;
    }
  }).catch(err => {
    console.error(err);
    if (!showErrorIndicator) {
      // set icon to warning ;
      (browser.action ?? browser.browserAction).setIcon({ path: "/icon_warning.png" });
      showErrorIndicator = true;
    }
  })
  return;
}
export async function batchSyncWithRemoteServer(urlInfos: Array<UrlInfo>) {
  const { dataServerUrl, equipmentName
  } = await browser.storage.local.get(["dataServerUrl", "equipmentName"]);
  if (!dataServerUrl) {
    console.error("Remote server URL is null!")
  }

  await post(dataServerUrl + "/api/UrlHistory/BatchSync", {
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
