import { BaseAuthAxiosService } from './baseAuthAxiosService';

import { get, map, result, trim } from 'lodash';
import { jsonp } from 'src/commonLibary/utils';
import { SearchProvider } from 'src/Pages/Homepage/SearchProviderTag';
import { IHistoryInfo, IPagination } from './syncManagerService';
import { AxiosResponse } from 'axios';
export interface SearchSuggestListItemMode {
  title: string;
  url?: string;
  iconURL?: string;
  type: "suggest" | "history";
}
class SearchSuggestionService extends BaseAuthAxiosService {
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
  handleSuggestion(crtSearchProvider: SearchProvider, suggestItem: SearchSuggestListItemMode) {
    console.log(crtSearchProvider, suggestItem)
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
  async getHistorySearchSuggestion(keyword?: string) {
    return this.axiosClient.get<any, AxiosResponse<Array<IHistoryInfo>>>(`/api/Suggestion`, {
      params: {
        maxSize: 10,
        keyword: trim(keyword)
      }
    }).then(res => {
      return res.data.map(info => ({
        title: info.title,
        url: info.url,
        iconURL: info.faviconUrl,
        type: "history"
      } as SearchSuggestListItemMode))
    })
  }

  async getGoogleSuggestion(keyword: string) {
    return jsonp(`https://suggestqueries.google.com/complete/search?client=gws-wiz&q=${keyword}&jsonp=window.google_sug`, "google_sug", "google_sug").then(data => {
      let results = get(data, "[0]");
      if (results && results.length > 0) {
        let suggestions = map(results, item => ({
          title: item[0],
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions.filter((item, idx) => idx == 0 || item.title != keyword);
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    }, rej => [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>)
  }
  async getBaiduSuggestion(keyword: string) {
    return jsonp(`https://suggestion.baidu.com/su?wd=${keyword}&cb=window.baidu_sug`, "baidu_sug", "baidu_sug").then(data => {
      let results = get(data, "s");
      if (results && results.length > 0) {
        let suggestions = map(results, item => ({
          title: item,
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions.filter((item, idx) => idx == 0 || item.title != keyword);
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    }, rej => [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>)
  }

  async getBingSuggestion(keyword: string) {
    return jsonp(`https://api.bing.com/qsonhs.aspx?type=cb&q=${keyword}&cb=window.bing.sug`, "bing_suggestion", "bing.sug").then(data => {
      let results = get(data, "AS.Results[0].Suggests");
      if (results && results.length > 0) {
        let suggestions = map(results, item => ({
          title: item.Txt,
          type: "suggest"
        } as SearchSuggestListItemMode));
        if (suggestions[0].title != keyword) {
          suggestions = [{ title: keyword, type: "suggest" }, ...suggestions];
        }
        return suggestions.filter((item, idx) => idx == 0 || item.title != keyword);
      } else {
        return [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>
      }
    }, rej => [{ title: keyword, type: "suggest" }] as Array<SearchSuggestListItemMode>)
  }

}

export const searchSuggestionService = new SearchSuggestionService()