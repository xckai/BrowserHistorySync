(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[154],{13502:(e,t,a)=>{"use strict";a.d(t,{T:()=>o});var n=a(42930),r=a(18336);const i=a.p+"83c12eede95f860c27cd0d5c9d38ce85.png";function o(){return r.createElement("div",{className:n.iv`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `},r.createElement("img",{src:i,className:n.iv`
          margin: 3px 1rem;
        `}))}},33045:(e,t,a)=>{"use strict";a.d(t,{H:()=>D}),a(58213);var n=a(76473),r=(a(9484),a(91692)),i=(a(25433),a(6333)),o=(a(27892),a(39288)),l=(a(11729),a(16958)),c=(a(49195),a(88485)),s=(a(26318),a(19057)),d=a(18336),m=a(98502),u=a(88294),p=a(26205),g=a(35050),f=a.n(g);const y=new class{async queryHistoryList(e,t,a=1,n=15){return f().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/UrlHistory/Query`,{params:{pageIndex:a,pageSize:n,keyword:e,dateFrom:t?.dateFrom?.toISOString(),dateTo:t?.dateTo?.toISOString(),equipments:t?.equipmentName}})}async deleteHistoryItem(e){return f().delete(`${window.syncManagerConfig?.dataServerUrl??""}/api/UrlHistory?id=${e}`)}};var h=a(62927),v=a.n(h),w=a(45872),C=a.n(w),S=a(77226);const E=(0,S.ZP)(s.default).withConfig({displayName:"SearchListGroup__StyledList",componentId:"sc-606ry-0"})(["margin:0.5rem 0rem;"]),_=(0,S.ZP)(s.default.Item).withConfig({displayName:"SearchListGroup__StyledListItem",componentId:"sc-606ry-1"})(["padding:8px 8px 8px 16px !important;.close_btn{visibility:hidden;opacity:0.3;}&:hover{background-color:#e6e5e5;border-radius:3px;.close_btn{visibility:visible;&:hover{color:#40a9ff;opacity:0.9;cursor:pointer;}}}.item_container{display:flex;justify-content:space-between;width:100%;align-items:center;.ant-avatar{min-width:1rem;min-height:1rem !important;width:1rem !important;height:1rem !important;margin-right:0.5rem !important;}}"]);function b(e){return d.createElement(_,{onClick:()=>{e.onClick(e.data)},title:`${e.data.equipmentName} ${v()(e.data.timestamp).format("YYYY-MM-DD HH:mm ")} \n ${e.data.url}`},d.createElement("div",{className:"item_container"},d.createElement(I,{src:e.data.faviconUrl,$_css:e.data.faviconUrl?0:"50%"}),d.createElement("div",{style:{flex:1,width:"calc(100% - 1.7rem)"}},d.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},d.createElement("span",{style:{flex:1,fontSize:"90%"}},e.data.title))),d.createElement(m.Z,{className:"close_btn",onClick:t=>{t.preventDefault(),t.stopPropagation(),e.onDeleteBtnClick(e.data)}})))}function N(e){return d.createElement(d.Fragment,null,d.createElement(T,{plain:!0,key:e.groupTitle},e.groupTitle),e.items.map(((t,a)=>d.createElement(b,{data:t,key:t.url+" "+a,onClick:e.onClick,onClickEquipmentTag:e.onClickEquipmentTag,onDeleteBtnClick:e.onDeleteItem}))))}function x(e){return e.data.equipmentName||e.data.dateTo?d.createElement(M,null,d.createElement("span",{style:{marginRight:".5rem"}},"Filter:"),e.data.equipmentName&&d.createElement(c.default,{closable:!0,onClose:()=>{e.onChange({...e.data,equipmentName:void 0})}},e.data.equipmentName),e.data.dateFrom&&d.createElement(c.default,{closable:!0,onClose:()=>{e.onChange({...e.data,dateFrom:void 0,dateTo:void 0})}},e.data.dateFrom.format("YY/MM/DD")+"-"+e.data.dateTo.format("YY/MM/DD"))):null}let k=0;function D(e){const[t,a]=(0,d.useState)([]),[n,c]=(0,d.useState)(!1),[s,m]=(0,d.useState)({});let[g,f]=(0,d.useState)(""),[h,w]=(0,d.useState)({total:0,current:1});function S(e){m({equipmentName:e.equipmentName})}function _(e){e.id&&y.deleteHistoryItem(e.id).then((n=>{let r=t.filter((t=>t.id!==e.id));l.default.success("删除成功"),a([...r])})).catch((e=>{console.error(e),l.default.error(e.message)}))}return(0,d.useEffect)((()=>{c(!0),async function(){y.queryHistoryList("",{},h.current,e.pageSize).then((e=>{w({total:e.data.total,current:e.data.current}),a(e.data?.data),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)}))}()}),[]),d.createElement(L,{className:e.className},d.createElement(Z,null,d.createElement(o.Z,{size:"large",placeholder:"搜索历史访问记录",allowClear:!0,value:g,prefix:d.createElement(u.Z,null),onChange:t=>{let n=t.target.value;f(n),function(t){c(!0),a([]),k&&(clearTimeout(k),k=0),k=setTimeout((function(){y.queryHistoryList(t,s,1,e.pageSize).then((e=>{w({total:e.data.total,current:e.data.current}),a(e.data?.data),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)}))}),500)}(n)}})),d.createElement(x,{data:s,onChange:m}),d.createElement(q,{id:"scrollableDiv"},d.createElement(p.Z,{dataLength:t.length,next:function(){n||(c(!0),y.queryHistoryList(g,s,h.current+1,e.pageSize).then((e=>{w({total:e.data.total,current:e.data.current}),a([...t,...e.data?.data]),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)})))},hasMore:t.length<h.total,loader:!n&&d.createElement("div",{style:{display:"flex",justifyContent:"center",alignContent:"center"}},d.createElement(i.default,null)),endMessage:!n&&d.createElement(r.Z,{plain:!0},"已经到底啦 🤐"),scrollableTarget:"scrollableDiv"},d.createElement(E,{loading:n,itemLayout:"horizontal",size:"small",dataSource:function(e){return C()(e).groupBy((e=>v()(e.timestamp).format("YYYY-MM-DD A"))).map((e=>({groupTitle:v()(e[0].timestamp).format("YYYY-MM-DD A"),items:e}))).value()}(t),renderItem:t=>d.createElement(N,{key:t.groupTitle,items:t.items,groupTitle:t.groupTitle,onClick:e.onClickItem,onClickEquipmentTag:S,onDeleteItem:_})}))))}var I=(0,S.ZP)(n.ZP).withConfig({displayName:"SearchListGroup___StyledAvatar",componentId:"sc-606ry-2"})(["border-radius:",";"],(e=>e.$_css)),T=(0,S.ZP)(r.Z).withConfig({displayName:"SearchListGroup___StyledDivider",componentId:"sc-606ry-3"})(["margin:0 !important;"]),M=(0,S.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv",componentId:"sc-606ry-4"})(["margin:0px 1rem 5px 1rem;"]),L=(0,S.ZP)("section").withConfig({displayName:"SearchListGroup___StyledSection",componentId:"sc-606ry-5"})(["display:flex;flex-direction:column;"]),Z=(0,S.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv2",componentId:"sc-606ry-6"})(["margin:1rem 1rem 0.5rem 1rem;display:flex;align-items:center;justify-content:space-around;.ant-input-affix-wrapper{border-radius:2rem !important;border-radius:2rem !important;}"]),q=(0,S.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv3",componentId:"sc-606ry-7"})(["margin-top:0.5rem;flex:1;overflow:auto;"])},738:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s}),a(25433);var n=a(6333),r=a(77226),i=a(18336);function o(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}var l=a(13502),c=a(33045);function s(){const[e,t]=(0,i.useState)(!0),a=(0,i.useMemo)((()=>new ResizeObserver((e=>{e[0]?.contentRect&&o({type:"ResizeWindow",height:e[0].contentRect.height,width:e[0].contentRect.width})}))),[]),r=(0,i.useCallback)((e=>{console.log(e),null!=e&&a.observe(e)}),[]);return(0,i.useRef)(null),(0,i.useEffect)((()=>{var e;window!=window.top?("SetConfig",e=e=>{window.syncManagerConfig=e.syncManagerConfig,t(!1)},window.addEventListener("message",(t=>{t.data&&"SetConfig"==t.data.type&&e(t.data)}),!1),o({type:"GetConfig"})):(window.syncManagerConfig={dataServerUrl:""},t(!1))}),[]),i.createElement(d,{ref:r},i.createElement("div",{className:"bar"},i.createElement(l.T,null)),e?i.createElement(n.default,{tip:"正在初始化"}):i.createElement(m,{onClickItem:function(e){o({type:"OpenNewTab",url:e.url})},pageSize:15}))}var d=(0,r.ZP)("section").withConfig({displayName:"Popup___StyledSection",componentId:"sc-o6znvb-0"})(["width:30rem;"]),m=(0,r.ZP)(c.H).withConfig({displayName:"Popup___StyledSearchListGroup",componentId:"sc-o6znvb-1"})(["max-height:500px;"])},84351:(e,t,a)=>{var n={"./en-gb":71344,"./en-gb.js":71344,"./zh-cn":53052,"./zh-cn.js":53052};function r(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=i,e.exports=r,r.id=84351}}]);