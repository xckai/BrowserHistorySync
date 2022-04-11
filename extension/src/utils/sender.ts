import { UrlInfo } from "background";

let sendingMessageQueue: Array<UrlInfo> = [];
export function SendToRemote(urlInfo: UrlInfo) {
  sendingMessageQueue.push(urlInfo);
}
(<any>globalThis)["sendingMessageQueue"] = sendingMessageQueue;
