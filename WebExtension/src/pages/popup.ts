interface SyncManagerConfig {
    dataServerUrl?: string,
    fontendUrl?: string,
}
interface Msg {
    type: "GetConfig" | "ResizeWindow" | "SetConfig" | "OpenNewTab"
    syncManagerConfig?: SyncManagerConfig
    url?: string,
    height?: number,
    width?: number,
}
async function init() {
    const { fontendServerUrl, dataServerUrl } = await browser.storage.local.get([
        "fontendServerUrl", "dataServerUrl"
    ]);
    if (!fontendServerUrl) {
        console.error("Fontend server URL is null!!");
    }
    if (!dataServerUrl) {
        console.error("Remote Data server URL is null!!");
    }
    console.log(fontendServerUrl, dataServerUrl)
    const iframe = <HTMLIFrameElement>document
        .getElementById("main-frame");
    window.addEventListener(
        "message",
        function (e) {
            if (e.data) {
                let msg: Msg = e.data;
                switch (msg.type) {
                    case "GetConfig": {
                        iframe.contentWindow.postMessage({
                            type: "SetConfig", syncManagerConfig: {
                                dataServerUrl: dataServerUrl,
                                fontendUrl: fontendServerUrl
                            }
                        } as Msg, "*")
                        break;
                    }
                    case "OpenNewTab": {
                        browser.tabs.create({ url: msg.url })
                        break;
                    }
                    case "ResizeWindow": {
                        let height = msg.height - 36;
                        iframe.style.height = msg.height + "px";
                        document.getElementById("main-body").style.height = msg.height + "px";
                        break;
                    }
                    default:
                        console.error("Msg type is not correct: ", msg)
                }

            }
        },
        false
    );

    iframe.setAttribute("src", fontendServerUrl + "/popup");
}
init();
