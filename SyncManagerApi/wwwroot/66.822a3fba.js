"use strict";(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[66],{66:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var i=r(73763),n=r(62632),o=r(48336),a=r.n(o);const c=r.p+"386a6d6e18b6baca332d497fd84497b2.ico",s=r.p+"68113a27e75d141340fe204d8f2dabfd.ico",l=r.p+"f3699179d7aa59e3b841f24ccaa17df7.png",d=r.p+"851378514f50d38c2b60bb0769a84f14.png",g=i.ZP.div.withConfig({displayName:"SearchProviderTag__SearchProviderTagContainer",componentId:"sc-1o85geg-0"})(["position:relative;display:flex;width:2rem;height:1.8rem;justify-content:space-around;align-items:center;cursor:pointer;color:black;img{width:1.2rem;height:1.2rem;object-fit:scale-down;}span{font-weight:500;}"]);function u(e){return n.createElement(g,{className:e.className,title:function(e){switch(e){case"Baidu":return"百度搜索";case"Bing":return"微软Bing搜索";case"Google":return"谷歌搜索";case"BrowserHistory":return"浏览器访问记录中搜索";default:return"Not recogenized"}}(e.searchProvider),onClick:()=>{e?.onClick&&e?.onClick(e.searchProvider)}},n.createElement("img",{src:function(e){switch(e){case"Baidu":return c;case"Bing":return l;case"Google":return s;case"BrowserHistory":return d;default:return"Not recogenized"}}(e.searchProvider)}))}const p=i.ZP.div.withConfig({displayName:"SearchBoxProviderFooter__Divider",componentId:"sc-v36ah9-0"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),h=i.ZP.div.withConfig({displayName:"SearchBoxProviderFooter__Container",componentId:"sc-v36ah9-1"})(["height:2.5rem;padding-bottom:0.5rem;.search_tag{margin:4px;background:none;&:hover{background:#0000002f;}}"]);function m(e){return n.createElement(h,null,n.createElement(p,null),n.createElement(f,null,n.createElement("span",null," Search with: "),n.createElement(u,{className:"Google"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Google",onClick:e?.onSearchProviderChange}),n.createElement(u,{className:"Baidu"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Baidu",onClick:e?.onSearchProviderChange}),n.createElement(u,{className:"Bing"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"Bing",onClick:e?.onSearchProviderChange}),n.createElement(u,{className:"BrowserHistory"==e.currentSearchProvider?"search_tag active":"search_tag",searchProvider:"BrowserHistory",onClick:e?.onSearchProviderChange})))}var f=(0,i.ZP)("div").withConfig({displayName:"SearchBoxProviderFooter___StyledDiv",componentId:"sc-v36ah9-2"})(['display:flex;align-items:center;span{padding:5px 8px;}.search_tag{&.active{&::after{position:absolute;content:" ";height:2px;bottom:0;width:1rem;border-radius:1px;background:#40a9ff;}}}']);const w=i.ZP.div.withConfig({displayName:"StyledDivider",componentId:"sc-3jow0v-0"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),v=r.p+"490d124811d9527aa5066c2812dc4cfd.svg",b=i.ZP.div.withConfig({displayName:"SearchBoxSuggestList__SearchListItemStyled",componentId:"sc-hat7ln-0"})(["display:flex;align-items:center;background-color:",";&:hover{background-color:#efefef;}.active_indicator{width:0.2rem;height:2rem;border-top-right-radius:2px;border-bottom-right-radius:2px;margin-right:0.8rem;background:",";}.icon{width:1rem;height:1rem;img{width:100%;height:100%;vertical-align:baseline;}}.title{padding:6px 6px;overflow:hidden;flex:1;white-space:nowrap;word-break:break-all;text-overflow:ellipsis;.history_url{font-size:80%;color:#555;}}"],(e=>e.active?"#efefef":"none"),(e=>e.active?"#5b95ff":"unset"));function y(e){return n.createElement(b,{active:e.active,onClick:()=>{e.onClick&&e.onClick(e.item)}},n.createElement("div",{className:"active_indicator"}),n.createElement("div",{className:"icon"},"history"==e.item.type?n.createElement("img",{src:e.item.iconURL}):n.createElement("img",{src:v})),n.createElement("div",{className:"title"},e.item.title,"history"==e.item.type&&n.createElement("span",{className:"history_url"}," - ",e.item.url)))}function S(e){return n.createElement("div",null,e.listData.length>0&&n.createElement(w,null),e.listData.map(((t,r)=>n.createElement(y,{onClick:e.onClick,key:t.title+" "+t.url,item:t,active:e.activeItemIdx==r}))))}var x=r(61048),_=r.n(x),k=r(931),P=r.n(k),C=r(52993),E=r.n(C),B=r(64387);const N=new class{async getSuggestion(e,t){return""==(t=a()(t))?[]:"Bing"==e?this.getBingSuggestion(t):"Google"==e?this.getGoogleSuggestion(t):"Baidu"==e?this.getBaiduSuggestion(t):this.getHistorySearchSuggestion(t)}handleSuggestion(e,t){console.log(e,t),"BrowserHistory"!=e?"Bing"!=e?"Baidu"!=e?"Google"!=e||window.open(`https://www.google.com/search?q=${t.title}`):window.open(`https://www.baidu.com/s?wd=${t.title}`):window.open(`https://www.bing.com/search?q=${t.title}`):window.open(t.url)}async getHistorySearchSuggestion(e){return E().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/Suggestion`,{params:{maxSize:10,keyword:a()(e)}}).then((e=>e.data.map((e=>({title:e.title,url:e.url,iconURL:e.faviconUrl,type:"history"})))))}async getGoogleSuggestion(e){return(0,B.R6)(`https://suggestqueries.google.com/complete/search?client=gws-wiz&q=${e}&jsonp=window.google_sug`,"google_sug","google_sug").then((t=>{console.log(t);let r=P()(t,"[0]");if(r&&r.length>0){let t=_()(r,(e=>({title:e[0],type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t.filter(((t,r)=>0==r||t.title!=e))}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}async getBaiduSuggestion(e){return(0,B.R6)(`https://suggestion.baidu.com/su?wd=${e}&cb=window.baidu_sug`,"baidu_sug","baidu_sug").then((t=>{let r=P()(t,"s");if(r&&r.length>0){let t=_()(r,(e=>({title:e,type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t.filter(((t,r)=>0==r||t.title!=e))}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}async getBingSuggestion(e){return(0,B.R6)(`https://api.bing.com/qsonhs.aspx?type=cb&q=${e}&cb=window.bing.sug`,"bing_suggestion","bing.sug").then((t=>{let r=P()(t,"AS.Results[0].Suggests");if(r&&r.length>0){let t=_()(r,(e=>({title:e.Txt,type:"suggest"})));return t[0].title!=e&&(t=[{title:e,type:"suggest"},...t]),t.filter(((t,r)=>0==r||t.title!=e))}return[{title:e,type:"suggest"}]}),(t=>[{title:e,type:"suggest"}]))}},I=r.p+"377814eef48b5f25c3e9be32b0735797.svg",F=i.ZP.input.withConfig({displayName:"SearchBoxInput__StyledInput",componentId:"sc-nl4zkd-0"})(["width:100%;border:none;box-sizing:border-box;border-radius:3px;height:2rem;font-size:110%;padding-left:4rem;padding-right:1rem;position:relative;background-color:rgba(0,0,0,0);&:focus{border:none;outline:0;}"]),z=i.ZP.div.withConfig({displayName:"SearchBoxInput__StyledSearchInput",componentId:"sc-nl4zkd-1"})(["position:relative;box-sizing:content-box;padding:0 0.5rem;height:2rem;.search_icon{position:absolute;z-index:2;padding:0.3rem;width:2rem;height:1.4rem;}.search_tag{position:absolute;top:0.1rem;left:2.4rem;}.enter_icon{position:absolute;z-index:2;padding:0.3rem;right:0;width:1.5rem;height:1.2rem;top:0.2rem;opacity:0.5;visibility:hidden;}"]);function D(e){const t=(0,n.useRef)();return(0,n.useEffect)((()=>{e.isForcused&&t?.current?.focus()}),[e.isForcused,e.currentSearchProvider]),n.createElement(z,{className:e.className},n.createElement("img",{className:"search_icon",src:v,alt:""}),n.createElement(F,{className:"search_input",placeholder:`Search With ${e.currentSearchProvider}`,value:e.searchValue,onChange:t=>{e.onSearchValueChange(t.target.value)},ref:t,onFocusCapture:e.onFocus,autoFocus:!1,autoComplete:"off",onBeforeInput:e.onFocus,onClick:t=>{t.stopPropagation(),t.preventDefault(),e.onFocus()}}),n.createElement(u,{className:"search_tag",searchProvider:e.currentSearchProvider}),n.createElement("img",{className:"enter_icon",src:I,style:{visibility:e.isForcused?"visible":"hidden"}}))}const Z=i.ZP.section.withConfig({displayName:"SearchBox__SearchBoxContainer",componentId:"sc-av7v11-0"})(["width:",";transition:width 0.5s;padding:0.6rem 0px;position:relative;background:#fff;opacity:",";z-index:2;border:#d9d9d9 1px solid;border-color:",";box-shadow:",";border-radius:10px;"],(e=>e.inputForced?"90%":"20rem"),(e=>e.inputForced?1:.6),(e=>e.inputForced?"#97d0ff ":"#d9d9d9"),(e=>e.inputForced?"0 0 0 2px #188fff16":" ")),$=(i.ZP.div.withConfig({displayName:"SearchBox__Divider",componentId:"sc-av7v11-1"})(["margin:5px;height:1px;background-color:#d9d9d9;"]),i.ZP.div.withConfig({displayName:"SearchBox__StyledBackgroundLayer",componentId:"sc-av7v11-2"})(["position:fixed;left:0;right:0;top:0;bottom:0;transition:background-color 0.3s;z-index:",";pointer-events:all;background-color:",";;"],(e=>e.inputForced?1:-1),(e=>e.inputForced?"rgba(0,0,0,.6)":"none")));let R=0;const H="zh-CN"==navigator.language||-480==(new Date).getTimezoneOffset()?"cn.bing.com":"bing.com",T=new class{async getBingWallPaper(){return E().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/HttpProxy`,{params:{url:`https://${H}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${navigator.language}`}}).then((e=>({title:P()(e.data,"images[0].title"),imgUrl:`https://${H}${P()(e.data,"images[0].url")}`.replace("1920x1080",`${(0,B.nk)()}`),copyRightLink:P()(e.data,"images[0].copyrightlink"),copyRight:P()(e.data,"images[0].copyright")})))}},L=i.ZP.div.withConfig({displayName:"WallPaper__StyledWrapperContainer",componentId:"sc-bimr2e-0"})(["position:fixed;left:0;right:0;top:0;bottom:0;z-index:1;background-color:#444;background-repeat:no-repeat;background-size:cover;background-position:center;.info{position:absolute;bottom:0.1rem;right:1rem;a{font-size:90%;color:#bbb;&:hover{color:#1890ff;}}}"]);function G(){const e=window.localStorage.getItem("wallpaper_cache"),[t,r]=(0,n.useState)(e?JSON.parse(e):{});return(0,n.useEffect)((()=>{T.getBingWallPaper().then((e=>{r(e),window.localStorage.setItem("wallpaper_cache",JSON.stringify(e))}))}),[]),n.createElement(L,{style:{backgroundImage:`url(${t.imgUrl})`}},n.createElement(U,null),n.createElement("div",{className:"info"},n.createElement("a",{target:"_blank",title:t.copyRight,href:t.copyRightLink},t.title),n.createElement("a",{target:"_blank",href:"https://www.microsoft.com/bing/bing-wallpaper"},"@Bing Wallpaper")))}var U=(0,i.ZP)("div").withConfig({displayName:"WallPaper___StyledDiv",componentId:"sc-bimr2e-1"})(["background:radial-gradient( ellipse farthest-side at center,rgba(0,0,0,0)100%,rgba(0,0,0,.2) 150%);position:absolute;left:0;right:0;top:0;bottom:0"]);function W(){return n.createElement(q,null,n.createElement(G,null),n.createElement(j,null))}var q=(0,i.ZP)("section").withConfig({displayName:"Index___StyledSection",componentId:"sc-199l8oy-0"})(["height:100vh;width:100vw;"]),j=(0,i.ZP)((function(e){const[t,r]=(0,n.useState)(!1),[i,o]=(0,n.useState)(""),[c,s]=(0,n.useState)(!1),[l,d]=(0,n.useState)(0),[g,u]=(0,n.useState)("BrowserHistory"),[p,h]=(0,n.useState)([]),f=(0,n.useCallback)((()=>{r(!0)}),[]),w=(0,n.useCallback)(((e,t)=>{d(0),console.log(t),R&&(clearTimeout(R),R=0),""!=a()(t)?R=setTimeout((function(){s(!0),N.getSuggestion(e,t).then((e=>{R&&h(e),s(!1)})).catch((e=>{console.error(e),s(!1),h([])}))}),50):h([])}),[]),v=(0,n.useCallback)((e=>{d(0),o(""),h([]),r(!1),N.handleSuggestion(g,e)}),[g]);function b(e){u(e),window.localStorage.setItem("latest_used_provider",e)}function y(e){if(console.log(e.key),"ArrowUp"!=e.key)if("ArrowDown"!=e.key)if("Enter"!=e.key){if("Escape"==e.key)return d(0),h([]),void(i?o(""):r(!1));if("Tab"==e.key)if(e.stopImmediatePropagation(),e.preventDefault(),t){let e=["Google","Baidu","Bing","BrowserHistory"],t=e.indexOf(g);b(e[(t+1)%e.length])}else r(!0)}else{e.stopImmediatePropagation(),e.preventDefault();let t=p[l];t&&v(t)}else t&&(e.stopImmediatePropagation(),e.preventDefault(),l<p.length-1&&d(l+1));else t&&(e.stopImmediatePropagation(),e.preventDefault(),l>0&&d(l-1))}return(0,n.useEffect)((()=>{t&&w(g,i)}),[g,t]),(0,n.useEffect)((()=>{window.addEventListener("keydown",y);const e=window.localStorage.getItem("latest_used_provider");return e&&b(e),()=>{window.removeEventListener("keydown",y)}})),n.createElement(n.Fragment,null,n.createElement($,{inputForced:t,onClick:e=>{e.stopPropagation(),e.preventDefault(),r(!1)}}),n.createElement(Z,{inputForced:t,className:e.className},n.createElement(D,{onFocus:f,isForcused:t,searchValue:i,onSearchValueChange:e=>{o(e),w(g,e)},currentSearchProvider:g}),t&&n.createElement("div",null,n.createElement(S,{onClick:v,listData:p,loading:c,activeItemIdx:l}),n.createElement(m,{currentSearchProvider:g,onSearchProviderChange:b}))))})).withConfig({displayName:"Index___StyledSearchBox",componentId:"sc-199l8oy-1"})(["max-width:40rem;margin:0px 30%;margin-top:20vh;"])},64387:(e,t,r)=>{r.d(t,{MT:()=>c,R6:()=>s,d5:()=>o,nk:()=>l,uk:()=>a});var i=r(30842),n=r.n(i);function o(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}function a(){return window!=window.top}function c(e,t){window.addEventListener("message",(r=>{r.data&&r.data.type==e&&t(r.data)}),!1)}function s(e,t,r){return new Promise(((i,o)=>{n()(window,r,(e=>{i(e)}));let a=document.getElementById(t);null!=a&&a.remove(),a=document.createElement("script"),a.src=e,a.id=t,a.onerror=e=>{o(e)},document.getElementsByTagName("head")[0].appendChild(a)}))}function l(){let e=screen.availWidth*window.devicePixelRatio,t=screen.availHeight*window.devicePixelRatio;return e>t?t>1200?"UHD":t>1080?"1920x1200":t>768?"1920x1080":e>1280?"1366x768":"1280x768":e>720?"768x1280":e>480?"720x1280":"480x800"}}}]);