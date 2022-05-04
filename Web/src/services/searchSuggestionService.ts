import {
  AxiosResponse,
  default as axios
} from 'axios';
import { get, map, trim } from 'lodash';
import { jsonp } from 'src/commonLibary/utils';
import { SearchProvider } from 'src/Pages/Homepage/SearchProviderTag';
import { IHistoryInfo, IPagination } from './syncManagerService';
export interface SearchSuggestListItemMode {
  title: string;
  url?: string;
  iconURL?: string;
  type: "suggest" | "history";
}
class SearchSuggestionService {
  async getSuggestion(searchProvider: SearchProvider, keyword: string) {
    keyword = trim(keyword);
    if (keyword == "") {
      return [];
    }
    if (searchProvider == "Bing") {
      return this.getBingSuggestion(keyword)
    }
    if (searchProvider == "Google") {
      return this.getGoogleSuggestion(keyword)
    }
    if (searchProvider == "Baidu") {
      return this.getBaiduSuggestion(keyword);
    }
    return this.getHistorySearchSuggestion(keyword);
  }
  async getHistorySearchSuggestion(keyword?: string) {
    return axios.get<any, AxiosResponse<IPagination<IHistoryInfo>>>(`${window.syncManagerConfig?.dataServerUrl ?? ""
      }/api/UrlHistory/Query`, {
      params: {
        pageIndex: 1,
        pageSize: 10,
        keyword: trim(keyword)
      }
    }).then(res => {
      return res.data.data.map(info => ({
        title: info.title,
        url: info.url,
        iconURL: info.faviconUrl,
        type: "history"
      } as SearchSuggestListItemMode))
    })
  }
  handleSuggestion(crtSearchProvider: SearchProvider, suggestItem: SearchSuggestListItemMode) {
    console.log(crtSearchProvider,suggestItem)
    if (crtSearchProvider == 'BrowserHistory') {
      window.open(suggestItem.url);
      return;
    }
    if (crtSearchProvider == 'Bing') {
      window.open(`https://www.bing.com/search?q=${suggestItem.title}`)
      return;
    }
    if (crtSearchProvider == "Baidu") {
      window.open(`https://www.baidu.com/s?wd=${suggestItem.title}`)
      return;
    }
    if (crtSearchProvider == "Google") {
      window.open(`https://www.google.com/search?q=${suggestItem.title}`)
      return;
    }
  }
  async getGoogleSuggestion(keyword: string) {
    return jsonp(`https://suggestqueries.google.com/complete/search?client=gws-wiz&q=${keyword}&jsonp=window.google_sug`, "google_sug", "google_sug").then(data => {
      console.log(data);
      let results = get(data, "[0]");
      if (results) {
        let suggestions = map(results, item => ({
          title: item[0],
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions;
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    })
  }
  async getBaiduSuggestion(keyword: string) {
    return jsonp(`https://suggestion.baidu.com/su?wd=${keyword}&cb=window.baidu_sug`, "baidu_sug", "baidu_sug").then(data => {
      let results = get(data, "s");
      if (results) {
        let suggestions = map(results, item => ({
          title: item,
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions;
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    })
  }

  async getBingSuggestion(keyword: string) {
    return jsonp(`https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}&cb=window.bing.sug`, "bing_suggestion", "bing.sug").then(data => {
      let results = get(data, "AS.Results[0].Suggests");
      if (results) {
        let suggestions = map(results, item => ({
          title: item.Txt,
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions;
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    })
  }
  async getBingWrapper() {
    return axios.get("https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=zh-CN");
  }
}

export const searchSuggestionService = new SearchSuggestionService()