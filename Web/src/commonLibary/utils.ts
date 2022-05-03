import { set } from "lodash";


let callbackIndex = 0;
export interface Msg {
    type: "GetConfig" | "ResizeWindow" | "SetConfig" | "OpenNewTab" | "CloseWindow"
    syncManagerConfig?: SyncManagerConfig
    url?: string,
    height?: number,
    width?: number,
}
export function sendCommandMsg(msg: Msg) {
    if (window != window.parent) {
        window.parent.postMessage(msg, "*");
        console.log("send msg", msg)

    } else {
        return;
    }
}
export function isInExtension() {
    return window != window.top;
}
export function listenToParentMsg(type: Msg["type"], cb: (msg: Msg) => void) {
    window.addEventListener("message", (e) => {
        if (e.data && e.data.type == type) {
            cb(e.data);
        }
    }, false)
}
export function hashIntoNumber(str: string) {
    var i, l,
        hval = 0x811c9dc5;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    return hval >>> 0;
}
export function hashIntoColor(str: string) {
    const colors = [
        "#55acee", "#3b5999", "#cd201f", "cyan", "green", "red", "#87d068"
    ]
    return colors[hashIntoNumber(str) % colors.length];
}
export function jsonp(url: string, key: string, callbackNamePath: string) {
    return new Promise<any>((resolve, rej) => {

        set(window, callbackNamePath, (data: any) => { resolve(data) });
        let script = document.getElementById(key) as HTMLScriptElement;
        if (script != null) {
            script.remove();
        }

        script = document.createElement("script");
        script.src = url;
        script.id = key;
        script.onerror = (error) => {
            rej(error)
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    })
}