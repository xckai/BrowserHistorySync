import {
  AxiosResponse,
  default as axios
} from 'axios';
import { get, map, trim } from 'lodash';
import { getRecommendResolution4BingWallpaper } from 'src/commonLibary/utils';

export interface BingWallWrapperInfo { imgUrl: string, title: string, copyRightLink: string ,copyRight:string}
function getBingHost() {
  if (navigator.language == 'zh-CN') {
    return "cn.bing.com";
  }
  if (new Date().getTimezoneOffset() == -480) {
    return "cn.bing.com";
  }
  return "bing.com"
}
const bingHost = getBingHost();
class WallpaperService{
  async getBingWallPaper() {
    return axios.get<any, AxiosResponse<BingWallWrapperInfo>>(
      `${window.syncManagerConfig?.dataServerUrl ?? ""}/api/HttpProxy`,
      {
        params: {
          url: `https://${bingHost}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${navigator.language}`
        }
      }
    ).then(res => {
      return {
        title: get(res.data, "images[0].title"),
        imgUrl: `https://${bingHost}${get(res.data, "images[0].url")}`.replace("1920x1080",`${getRecommendResolution4BingWallpaper()}`),
        copyRightLink: get(res.data, "images[0].copyrightlink"),
        copyRight:get(res.data, "images[0].copyright")
      }
    })
    // return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
  }
}
export const wallpaperService = new WallpaperService();