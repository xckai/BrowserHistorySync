import { setIcon, UrlInfo } from "background";

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
    if (res.ok) {
      //reset icon to defalut
      setIcon('normal')
    } else {
      setIcon("warning")
    }
  }).catch(err => {
    console.error(err);
    setIcon("warning")
  })
  return;
}
export async function batchSyncWithRemoteServer(urlInfos: Array<UrlInfo>) {
  const { dataServerUrl, equipmentName
  } = await browser.storage.local.get(["dataServerUrl", "equipmentName"]);
  if (!dataServerUrl) {
    console.error("Remote server URL is null!")
  }
  const filteredList =urlInfos.filter(urlInfo=>{
    // remove data:image icon size >64kb
    if(urlInfo.FaviconUrl?.length > 60000){
      return false;
    }
    return true;
  })
  await post(dataServerUrl + "/api/UrlHistory/BatchSync", {
    equipmentInfo: {
      equipmentName,
      browserType
    },
    historyList: filteredList
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
