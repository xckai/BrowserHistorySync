"use strict";(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[905],{22905:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$});var i=r(28284),n=r(47535);const a=r.p+"386a6d6e18b6baca332d497fd84497b2.ico",o=r.p+"68113a27e75d141340fe204d8f2dabfd.ico",c=r.p+"f3699179d7aa59e3b841f24ccaa17df7.png",s=r.p+"851378514f50d38c2b60bb0769a84f14.png",l=i.ZP.div.withConfig({displayName:"SearchProviderTag__SearchProviderTagContainer",componentId:"sc-1o85geg-0"})(["position:relative;display:flex;width:2rem;height:1.8rem;justify-content:space-around;align-items:center;cursor:pointer;color:black;img{width:1.2rem;height:1.2rem;object-fit:scale-down;}span{font-weight:500;}"]);function d(e){return n.createElement(l,{className:e.className,title:function(e){switch(e){case"Baidu":return"百度搜索";case"Bing":return"微软Bing搜索";case"Google":return"谷歌搜索";case"BrowserHistory":return"浏览器访问记录中搜索";default:return"Not recogenized"}}(e.searchProvider),onClick:()=>{e?.onClick&&e?.onClick(e.searchProvider)}},n.createElement("img",{src:function(e){switch(e){case"Baidu":return a;case"Bing":return c;case"Google":return o;case"BrowserHistory":return s;default:return"Not recogenized"}}(e.searchProvider)}))}const g=i.ZP.div.withConfig({displayName:"SearchBoxProviderFooter__Divider",componentId:"sc-v36ah9-0"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),u=i.ZP.div.withConfig({displayName:"SearchBoxProviderFooter__Container",componentId:"sc-v36ah9-1"})(["height:2.5rem;padding-bottom:0.5rem;.search_tag{margin:4px;background:none;&:hover{background:#0000002f;}}"]);function p(e){return n.createElement(u,null,n.createElement(g,null),n.createElement(m,null,n.createElement("span",null," Search with: "),n.createElement(d,{className:"Google"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Google",onClick:e?.onSearchProviderChange}),n.createElement(d,{className:"Baidu"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Baidu",onClick:e?.onSearchProviderChange}),n.createElement(d,{className:"Bing"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Bing",onClick:e?.onSearchProviderChange}),n.createElement(d,{className:"BrowserHistory"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"BrowserHistory",onClick:e?.onSearchProviderChange})))}var m=(0,i.ZP)("div").withConfig({displayName:"SearchBoxProviderFooter___StyledDiv",componentId:"sc-v36ah9-2"})(['display:flex;align-items:center;span{padding:5px 8px;}.search_tag{&.active{&::after{position:absolute;content:" ";height:2px;bottom:0;width:1rem;border-radius:1px;background:#40a9ff;}}}']),h=(r(61762),r(24746));const f=i.ZP.div.withConfig({displayName:"StyledDivider",componentId:"sc-3jow0v-0"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),w=r.p+"f094bf70effe140dec85a9ee5f7eb57f.svg",v=i.ZP.div.withConfig({displayName:"SearchBoxSuggestList__SearchListItemStyled",componentId:"sc-hat7ln-0"})(["display:flex;align-items:center;background-color:",";&:hover{background-color:#efefef;}.active_indicator{width:0.2rem;height:2rem;border-top-right-radius:2px;border-bottom-right-radius:2px;margin-right:.8rem;background:",";}.icon{width:1rem;height:1rem;img{width:100%;height:100%;vertical-align:baseline;}}.title{padding:6px 6px;overflow:hidden;white-space:nowrap;word-break:break-all;text-overflow:ellipsis;}"],(e=>e.active?"#efefef":"none"),(e=>e.active?"#5b95ff":"unset"));function b(e){return n.createElement(v,{active:e.active,onClick:()=>{e.onClick&&e.onClick(e.item)}},n.createElement("div",{className:"active_indicator"}),n.createElement("div",{className:"icon"},"history"==e.item.type?n.createElement("img",{src:e.item.iconURL}):n.createElement("img",{src:w})),n.createElement("div",{className:"title"},e.item.title))}function y(e){return n.createElement("div",null,(e.loading||e.listData.length>0)&&n.createElement(f,null),e.loading&&n.createElement(S,null,n.createElement(h.default,null)),e.listData.map(((t,r)=>n.createElement(b,{onClick:e.onClick,key:t.url+" "+r,item:t,active:e.activeItemIdx==r}))))}var S=(0,i.ZP)("div").withConfig({displayName:"SearchBoxSuggestList___StyledDiv",componentId:"sc-hat7ln-1"})(["display:flex;justify-content:center;align-items:center;height:4rem;"]),x=r(22183),_=r.n(x),k=r(10255),P=r(36641);const C=new class{async getSuggestion(e,t){return""==(t=(0,k.trim)(t))?[]:"Bing"==e?this.getBingSuggestion(t):"Google"==e?this.getGoogleSuggestion(t):"Baidu"==e?this.getBaiduSuggestion(t):this.getHistorySearchSuggestion(t)}handleSuggestion(e,t){console.log(e,t),"BrowserHistory"!=e?"Bing"!=e?"Baidu"!=e?"Google"!=e||window.open(`https://www.google.com/search?q=${t.title}`):window.open(`https://www.baidu.com/s?wd=${t.title}`):window.open(`https://www.bing.com/search?q=${t.title}`):window.open(t.url)}async getHistorySearchSuggestion(e){return _().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/UrlHistory/Query`,{params:{pageIndex:1,pageSize:10,keyword:(0,k.trim)(e)}}).then((e=>e.data.data.map((e=>({title:e.title,url:e.url,iconURL:e.faviconUrl,type:"history"})))))}async getGoogleSuggestion(e){return(0,P.R6)(`https://suggestqueries.google.com/complete/search?client=gws-wiz&q=${e}&jsonp=window.google_sug`,"google_sug","google_sug").then((t=>{console.log(t);let r=(0,k.get)(t,"[0]");if(r&&r.length>0){let t=(0,k.map)(r,(e=>({title:e[0],type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}async getBaiduSuggestion(e){return(0,P.R6)(`https://suggestion.baidu.com/su?wd=${e}&cb=window.baidu_sug`,"baidu_sug","baidu_sug").then((t=>{let r=(0,k.get)(t,"s");if(r&&r.length>0){let t=(0,k.map)(r,(e=>({title:e,type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}async getBingSuggestion(e){return(0,P.R6)(`https://api.bing.com/qsonhs.aspx?type=cb&q=${e}&cb=window.bing.sug`,"bing_suggestion","bing.sug").then((t=>{let r=(0,k.get)(t,"AS.Results[0].Suggests");if(r&&r.length>0){let t=(0,k.map)(r,(e=>({title:e.Txt,type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}},E=r.p+"fb28ed80f62bbcd271ff44f44f75f96a.svg",B=i.ZP.input.withConfig({displayName:"SearchBoxInput__StyledInput",componentId:"sc-nl4zkd-0"})(["width:100%;border:none;box-sizing:border-box;border-radius:3px;height:2rem;font-size:110%;padding-left:4rem;padding-right:1rem;position:relative;background-color:rgba(0,0,0,0);&:focus{border:none;outline:0;}"]),I=i.ZP.div.withConfig({displayName:"SearchBoxInput__StyledSearchInput",componentId:"sc-nl4zkd-1"})(["position:relative;box-sizing:content-box;padding:0 0.5rem;height:2rem;.search_icon{position:absolute;z-index:2;padding:0.3rem;width:2rem;height:2rem;}.search_tag{position:absolute;top:0.1rem;left:2.4rem;}.enter_icon{position:absolute;z-index:2;padding:0.3rem;right:0;width:1.8rem;height:1.8rem;top:0.2rem;opacity:0.5;visibility:hidden;}"]);function N(e){const t=(0,n.useRef)();return(0,n.useEffect)((()=>{e.isForcused&&t?.current?.focus()}),[e.isForcused,e.currentSearchProvider]),n.createElement(I,{className:e.className},n.createElement("img",{className:"search_icon",src:w,alt:""}),n.createElement(B,{className:"search_input",placeholder:`Search With ${e.currentSearchProvider}`,value:e.searchValue,onChange:t=>{e.onSearchValueChange(t.target.value)},ref:t,onFocusCapture:e.onFocus,autoFocus:!1,autoComplete:"off",onBeforeInput:e.onFocus,onClick:t=>{t.stopPropagation(),t.preventDefault(),e.onFocus()}}),n.createElement(d,{className:"search_tag",searchProvider:e.currentSearchProvider}),n.createElement("img",{className:"enter_icon",src:E,style:{visibility:e.isForcused?"visible":"hidden"}}))}const F=i.ZP.section.withConfig({displayName:"SearchBox__SearchBoxContainer",componentId:"sc-av7v11-0"})(["width:",";transition:width 0.5s;padding:0.6rem 0px;position:relative;background:#fff;opacity:",";z-index:2;border:#d9d9d9 1px solid;border-color:",";box-shadow:",";border-radius:10px;"],(e=>e.inputForced?"90%":"20rem"),(e=>e.inputForced?1:.6),(e=>e.inputForced?"#97d0ff ":"#d9d9d9"),(e=>e.inputForced?"0 0 0 2px #188fff16":" ")),z=(i.ZP.div.withConfig({displayName:"SearchBox__Divider",componentId:"sc-av7v11-1"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),i.ZP.div.withConfig({displayName:"SearchBox__StyledBackgroundLayer",componentId:"sc-av7v11-2"})(["position:fixed;left:0;right:0;top:0;bottom:0;transition:background-color 0.3s;z-index:",";pointer-events:all;background-color:",";;"],(e=>e.inputForced?1:-1),(e=>e.inputForced?"rgba(0,0,0,.6)":"none")));let D=0;const Z=new class{async getBingWallPaper(){return _().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/HttpProxy`,{params:{url:"https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"}}).then((e=>({title:(0,k.get)(e.data,"images[0].title"),imgUrl:`https://bing.com${(0,k.get)(e.data,"images[0].url")}`.replace("1920x1080",`${(0,P.nk)()}`),copyRightLink:(0,k.get)(e.data,"images[0].copyrightlink"),copyRight:(0,k.get)(e.data,"images[0].copyright")})))}},H=i.ZP.div.withConfig({displayName:"WallPaper__StyledWrapperContainer",componentId:"sc-bimr2e-0"})(["position:fixed;left:0;right:0;top:0;bottom:0;z-index:1;background-color:#444;background-repeat:no-repeat;background-size:cover;background-position:center;.info{position:absolute;bottom:0.1rem;right:1rem;a{font-size:90%;color:#bbb;&:hover{color:#1890ff;}}}"]);function R(){const e=window.localStorage.getItem("wallpaper_cache"),[t,r]=(0,n.useState)(e?JSON.parse(e):{});return(0,n.useEffect)((()=>{Z.getBingWallPaper().then((e=>{r(e),window.localStorage.setItem("wallpaper_cache",JSON.stringify(e))}))}),[]),n.createElement(H,{style:{backgroundImage:`url(${t.imgUrl})`}},n.createElement("div",{className:"info"},n.createElement("a",{target:"_blank",title:t.copyRight,href:t.copyRightLink},t.title),n.createElement("a",{target:"_blank",href:"https://www.microsoft.com/bing/bing-wallpaper"},"@Bing Wallpaper")))}function $(){return n.createElement(L,null,n.createElement(R,null),n.createElement(T,null))}var L=(0,i.ZP)("section").withConfig({displayName:"Index___StyledSection",componentId:"sc-199l8oy-0"})(["height:100vh;width:100vw;"]),T=(0,i.ZP)((function(e){const[t,r]=(0,n.useState)(!1),[i,a]=(0,n.useState)(""),[o,c]=(0,n.useState)(!1),[s,l]=(0,n.useState)(0),[d,g]=(0,n.useState)("BrowserHistory"),[u,m]=(0,n.useState)([]),h=(0,n.useCallback)((()=>{r(!0)}),[]),f=(0,n.useCallback)(((e,t)=>{l(0),""!=(0,k.trim)(t)?(D&&(clearTimeout(D),D=0),D=setTimeout((function(){c(!0),m([]),C.getSuggestion(e,t).then((e=>{m(e),c(!1)})).catch((e=>{console.error(e),c(!1)}))}),100)):m([])}),[]),w=(0,n.useCallback)((e=>{l(0),a(""),m([]),r(!1),C.handleSuggestion(d,e)}),[d]);function v(e){g(e),window.localStorage.setItem("latest_used_provider",e)}function b(e){if(console.log(e.key),"ArrowUp"!=e.key)if("ArrowDown"!=e.key)if("Enter"!=e.key){if("Escape"==e.key)return l(0),m([]),void(i?a(""):r(!1));if("Tab"==e.key)if(e.stopImmediatePropagation(),e.preventDefault(),t){let e=["Google","Baidu","Bing","BrowserHistory"],t=e.indexOf(d);v(e[(t+1)%e.length])}else r(!0)}else{e.stopImmediatePropagation(),e.preventDefault();let t=u[s];t&&w(t)}else t&&(e.stopImmediatePropagation(),e.preventDefault(),s<u.length-1&&l(s+1));else t&&(e.stopImmediatePropagation(),e.preventDefault(),s>0&&l(s-1))}return(0,n.useEffect)((()=>{t&&f(d,i)}),[d,t]),(0,n.useEffect)((()=>{window.addEventListener("keydown",b);const e=window.localStorage.getItem("latest_used_provider");return e&&v(e),()=>{window.removeEventListener("keydown",b)}})),n.createElement(n.Fragment,null,n.createElement(z,{inputForced:t,onClick:e=>{e.stopPropagation(),e.preventDefault(),r(!1)}}),n.createElement(F,{inputForced:t,className:e.className},n.createElement(N,{onFocus:h,isForcused:t,searchValue:i,onSearchValueChange:e=>{a(e),f(d,e)},currentSearchProvider:d}),t&&n.createElement("div",null,n.createElement(y,{onClick:w,listData:u,loading:o,activeItemIdx:s}),n.createElement(p,{currentSearchProvider:d,onSearchProviderChange:v}))))})).withConfig({displayName:"Index___StyledSearchBox",componentId:"sc-199l8oy-1"})(["max-width:40rem;margin:0px 30%;margin-top:20vh;"])},36641:(e,t,r)=>{r.d(t,{MT:()=>o,R6:()=>c,d5:()=>n,nk:()=>s,uk:()=>a});var i=r(10255);function n(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}function a(){return window!=window.top}function o(e,t){window.addEventListener("message",(r=>{r.data&&r.data.type==e&&t(r.data)}),!1)}function c(e,t,r){return new Promise(((n,a)=>{(0,i.set)(window,r,(e=>{n(e)}));let o=document.getElementById(t);null!=o&&o.remove(),o=document.createElement("script"),o.src=e,o.id=t,o.onerror=e=>{a(e)},document.getElementsByTagName("head")[0].appendChild(o)}))}function s(){let e=screen.availWidth*window.devicePixelRatio,t=screen.availHeight*window.devicePixelRatio;return e>t?t>1200?"UHD":t>1080?"1920x1200":t>768?"1920x1080":e>1280?"1366x768":"1280x768":e>720?"768x1280":e>480?"720x1280":"480x800"}}}]);