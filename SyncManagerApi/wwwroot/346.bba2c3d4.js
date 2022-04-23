(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[346],{96922:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>S}),a(25433);var n=a(6333),r=a(50697),o=a(18336);function i(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}function l(e){const t=["#55acee","#3b5999","#cd201f","cyan","green","red","#87d068"];return t[function(e){var t,a,n=2166136261;for(t=0,a=e.length;t<a;t++)n^=e.charCodeAt(t),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return n>>>0}(e)%t.length]}const c=a.p+"83c12eede95f860c27cd0d5c9d38ce85.png";function m(){return o.createElement("div",{className:r.iv`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `},o.createElement("img",{src:c,className:r.iv`
          margin: 3px 1rem;
        `}))}a(27892);var s=a(39288),d=(a(9484),a(91692)),u=(a(26318),a(19057)),p=(a(49195),a(88485)),g=(a(58213),a(76473)),f=a(20742),h=a(26205),v=a(35050),w=a.n(v);const y=new class{async queryHistoryList(e,t){if(console.log(window.syncManagerConfig),!window.syncManagerConfig||!window.syncManagerConfig.dataServerUrl)throw new Error("No remote server API config");return w().get(`${window.syncManagerConfig?.dataServerUrl}/api/UrlHistory/Query`,{params:{pageIndex:1,pageSize:15,keyword:e,dateFrom:t?.dateFrom?.toISOString(),dateTo:t?.dateTo?.toISOString(),equipments:t?.equipmentName}})}};var E=a(62927),C=a.n(E),b=a(45872),x=a.n(b);function N(e){return o.createElement(u.default.Item,{onClick:()=>{e.onClick(e.data)},title:C()(e.data.timestamp).format("YYYY-MM-DD HH:mm ")+e.data.url},o.createElement("div",{className:r.iv`
          display: flex;
          justify-content: space-between;
          width: 100%;
          align-items: center;
        `},o.createElement(g.ZP,{className:r.iv`
            min-width: 1rem;
            min-height: 1rem !important;
            width: 1rem !important;
            height: 1rem !important;
            margin-right: 0.5rem !important;
            border-radius: ${e.data.faviconUrl?0:"50%"};
          `,src:e.data.faviconUrl}),o.createElement("div",{style:{flex:1,width:"calc(100% - 1.7rem)"}},o.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},o.createElement("span",{style:{flex:1,fontSize:"90%"}},e.data.title),o.createElement(p.default,{className:r.iv`
                cursor: pointer;
              `,style:{borderRadius:3},color:l(e.data.equipmentName),onClick:t=>{t.preventDefault(),t.stopPropagation(),e.onClickEquipmentTag(e.data)}},e.data.equipmentName)))))}function T(e){return o.createElement(o.Fragment,null,o.createElement(d.Z,{className:r.iv`
          margin: 0 !important;
        `,plain:!0,key:e.groupTitle},e.groupTitle),e.items.map((t=>o.createElement(N,{data:t,onClick:e.onClick,onClickEquipmentTag:e.onClickEquipmentTag}))))}function M(e){return e.data.equipmentName||e.data.dateTo?o.createElement("div",{className:r.iv`
        margin: 0px 1rem 5px 1rem;
      `},o.createElement("span",{style:{marginRight:".5rem"}},"Filter:"),e.data.equipmentName&&o.createElement(p.default,{closable:!0,onClose:()=>{e.onChange({...e.data,equipmentName:void 0})}},e.data.equipmentName),e.data.dateFrom&&o.createElement(p.default,{closable:!0,onClose:()=>{e.onChange({...e.data,dateFrom:void 0,dateTo:void 0})}},e.data.dateFrom.format("YY/MM/DD")+"-"+e.data.dateTo.format("YY/MM/DD"))):null}let k=0;function q(){const[e,t]=(0,o.useState)([]),[a,l]=(0,o.useState)(!1),[c,m]=(0,o.useState)({});let[p,g]=(0,o.useState)(""),[v,w]=(0,o.useState)({total:0,current:0});function E(e){m({equipmentName:e.equipmentName})}function b(e){i({type:"OpenNewTab",url:e.url})}return(0,o.useEffect)((()=>{l(!0),async function(){y.queryHistoryList().then((e=>{w({total:e.data.total,current:e.data.current}),t(e.data?.data),l(!1)})).catch((e=>{console.error(e),l(!1)}))}()}),[]),o.createElement(o.Fragment,null,o.createElement("div",{className:r.iv`
          margin: 1rem 1rem 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .ant-input-affix-wrapper {
            border-radius: 2rem !important;
            border-radius: 2rem !important;
          }
        `},o.createElement(s.Z,{size:"large",placeholder:"搜索历史访问记录",allowClear:!0,value:p,prefix:o.createElement(f.Z,null),onChange:e=>{let a=e.target.value;g(a),function(e){l(!0),t([]),k&&(clearTimeout(k),k=0),k=setTimeout((function(){y.queryHistoryList(e).then((e=>{w({total:e.data.total,current:e.data.current}),t(e.data?.data),l(!1)})).catch((e=>{console.error(e),l(!1)}))}),1e3)}(a)}})),o.createElement(M,{data:c,onChange:m}),o.createElement("div",{id:"scrollableDiv",style:{marginTop:".5rem",maxHeight:"450px",minHeight:"300px",overflow:"auto",padding:"0 4px",borderTop:"1px solid rgba(140, 140, 140, 0.35)",borderBottom:"1px solid rgba(140, 140, 140, 0.35)"}},o.createElement(h.Z,{dataLength:e.length,next:function(){a||(l(!0),y.queryHistoryList(p).then((a=>{w({total:a.data.total,current:a.data.current}),t([...e,...a.data?.data]),l(!1)})).catch((e=>{console.error(e),l(!1)})))},hasMore:e.length<v.total,loader:!a&&o.createElement("div",{style:{display:"flex",justifyContent:"center",alignContent:"center"}},o.createElement(n.default,null)),endMessage:!a&&o.createElement(d.Z,{plain:!0},"已经到底啦 🤐"),scrollableTarget:"scrollableDiv"},o.createElement(u.default,{loading:a,itemLayout:"horizontal",size:"small",className:r.iv`
              margin: 0.5rem 0rem;
              .ant-list-item {
                padding: 8px 8px !important;
                &:hover {
                  background-color: gainsboro;
                }
              }
            `,dataSource:function(e){return x()(e).groupBy((e=>C()(e.timestamp).format("YYYY-MM-DD A"))).map((e=>({groupTitle:C()(e[0].timestamp).format("YYYY-MM-DD A"),items:e}))).value()}(e),renderItem:e=>o.createElement(T,{items:e.items,groupTitle:e.groupTitle,onClick:b,onClickEquipmentTag:E})}))))}function S(){const[e,t]=(0,o.useState)(!0),a=(0,o.useMemo)((()=>new ResizeObserver((e=>{e[0]?.contentRect&&i({type:"ResizeWindow",height:e[0].contentRect.height})}))),[]),l=(0,o.useCallback)((e=>{console.log(e),null!=e&&a.observe(e)}),[]);return(0,o.useRef)(null),console.log(),(0,o.useEffect)((()=>{var e;window!=window.top?("SetConfig",e=e=>{window.syncManagerConfig=e.syncManagerConfig,t(!1)},window.addEventListener("message",(t=>{t.data&&"SetConfig"==t.data.type&&e(t.data)}),!1),i({type:"GetConfig"})):(window.syncManagerConfig={dataServerUrl:"http://localhost:5266"},t(!1))}),[]),o.createElement("section",{ref:l,className:r.iv`
        width: 30rem;
      `},o.createElement("div",{className:"bar"},o.createElement(m,null)),e?o.createElement(n.default,{tip:"正在初始化"}):o.createElement(q,null))}},84351:(e,t,a)=>{var n={"./en-gb":71344,"./en-gb.js":71344,"./zh-cn":53052,"./zh-cn.js":53052};function r(e){var t=o(e);return a(t)}function o(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=o,e.exports=r,r.id=84351}}]);