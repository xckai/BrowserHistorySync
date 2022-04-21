(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[872],{76851:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>M}),a(25433);var n=a(6333),r=a(18336);function l(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}function o(e){const t=["#55acee","#3b5999","#cd201f","cyan","green","red","#87d068"];return t[function(e){var t,a,n=2166136261;for(t=0,a=e.length;t<a;t++)n^=e.charCodeAt(t),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return n>>>0}(e)%t.length]}var i=a(50697);const c=a.p+"83c12eede95f860c27cd0d5c9d38ce85.png";function s(){return r.createElement("div",{className:i.iv`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `},r.createElement("img",{src:c,className:i.iv`
          margin: 3px 1rem;
        `}))}a(9484);var d=a(91692),m=(a(27892),a(39288)),u=(a(26318),a(19057)),g=(a(49195),a(88485)),f=(a(58213),a(76473)),p=a(20742),w=a(26205),h=a(35050),y=a.n(h);const v=new class{async queryHistoryList(e){if(console.log(window.syncManagerConfig),!window.syncManagerConfig||!window.syncManagerConfig.dataServerUrl)throw new Error("No remote server API config");return y().get(`${window.syncManagerConfig?.dataServerUrl}/api/UrlHistory/QueryUrlHistory`,{params:{pageIndex:1,pageSize:10,keyword:e}})}};var E=a(62927),b=a.n(E);function x(e){return r.createElement(u.default.Item,{onClick:()=>{e.onClick(e.data)}},r.createElement("div",{className:i.iv`
          display: flex;
          justify-content: space-between;
          width: 100%;
        `},r.createElement(f.ZP,{className:i.iv`
            min-width: 1.5rem;
            min-height: 1.5rem !important;
            width: 1.5rem !important;
            height: 1.5rem !important;
            margin-right: 0.2rem !important; ;
          `,src:e.data.faviconUrl}),r.createElement("div",{style:{flex:1,width:"calc(100% - 1.7rem)"}},r.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},r.createElement("span",{style:{flex:1,fontWeight:"bolder"}},e.data.title),r.createElement("span",{style:{fontSize:"80%",color:"gray"}},b()(e.data.timestamp).format("YYYY-MM-DD HH:mm"))),r.createElement("div",{style:{display:"flex",width:"100%",alignItems:"flex-end"}},r.createElement("div",{style:{fontSize:"80%",color:"gray",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:16}},e.data.url),r.createElement(g.default,{style:{borderRadius:3},color:o(e.data.equipmentName)},e.data.equipmentName)))))}let C=0;function S(){const[e,t]=(0,r.useState)([]),[a,o]=(0,r.useState)(!1);let[c,s]=(0,r.useState)(""),[g,f]=(0,r.useState)({total:0,current:0});function h(e){l({type:"OpenNewTab",url:e.url})}return(0,r.useEffect)((()=>{o(!0),async function(){v.queryHistoryList().then((e=>{f({total:e.data.total,current:e.data.current}),t(e.data?.data),o(!1)})).catch((e=>{console.error(e),o(!1)}))}()}),[]),r.createElement(r.Fragment,null,r.createElement("div",{className:i.iv`
          margin: 1rem 2rem;
          .ant-input-affix-wrapper {
            border-radius: 2rem !important;
            border-radius: 2rem !important;
          }
        `},r.createElement(m.Z,{size:"large",placeholder:"搜索历史访问记录",allowClear:!0,value:c,prefix:r.createElement(p.Z,null),onChange:e=>{let a=e.target.value;s(a),function(e){o(!0),C&&(clearTimeout(C),C=0),C=setTimeout((function(){v.queryHistoryList(e).then((e=>{f({total:e.data.total,current:e.data.current}),t(e.data?.data),o(!1)})).catch((e=>{console.error(e),o(!1)}))}),1e3)}(a)}})),r.createElement("div",{id:"scrollableDiv",style:{maxHeight:"450px",overflow:"auto",padding:"0 4px",borderTop:"1px solid rgba(140, 140, 140, 0.35)",borderBottom:"1px solid rgba(140, 140, 140, 0.35)"}},r.createElement(w.Z,{dataLength:e.length,next:function(){a||(o(!0),v.queryHistoryList(c).then((a=>{f({total:a.data.total,current:a.data.current}),t([...e,...a.data?.data]),o(!1)})).catch((e=>{console.error(e),o(!1)})))},hasMore:e.length<g.total,loader:r.createElement("div",{style:{display:"flex",justifyContent:"center",alignContent:"center"}},r.createElement(n.default,null)),endMessage:r.createElement(d.Z,{plain:!0},"已经到底啦 🤐"),scrollableTarget:"scrollableDiv"},r.createElement(u.default,{loading:a,itemLayout:"horizontal",size:"small",className:i.iv`
              margin: 0.5rem 0rem;
              .ant-list-item {
                padding: 8px 8px !important;
                &:hover {
                  background-color: gainsboro;
                }
              }
            `,dataSource:e,renderItem:e=>r.createElement(x,{data:e,onClick:h})}))))}function M(){const[e,t]=(0,r.useState)(!0),a=(0,r.useMemo)((()=>new ResizeObserver((e=>{e[0]?.contentRect&&l({type:"ResizeWindow",height:e[0].contentRect.height})}))),[]),o=(0,r.useCallback)((e=>{console.log(e),null!=e&&a.observe(e)}),[]);return(0,r.useRef)(null),console.log(),(0,r.useEffect)((()=>{var e;window!=window.top?("SetConfig",e=e=>{window.syncManagerConfig=e.syncManagerConfig,t(!1)},window.addEventListener("message",(t=>{t.data&&"SetConfig"==t.data.type&&e(t.data)}),!1),l({type:"GetConfig"})):(window.syncManagerConfig={dataServerUrl:"http://10.0.0.78:28080"},t(!1))}),[]),r.createElement("section",{ref:o},r.createElement("div",{className:"bar"},r.createElement(s,null)),e?r.createElement(n.default,{tip:"正在初始化"}):r.createElement(S,null))}},84351:(e,t,a)=>{var n={"./en-gb":71344,"./en-gb.js":71344,"./zh-cn":53052,"./zh-cn.js":53052};function r(e){var t=l(e);return a(t)}function l(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=l,e.exports=r,r.id=84351}}]);