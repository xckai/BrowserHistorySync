(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[77],{13502:(e,t,a)=>{"use strict";a.d(t,{T:()=>o});var r=a(42930),n=a(18336);const i=a.p+"5d671c97c56c550e2d046f63f2107c8b.png";function o(){return n.createElement("div",{className:r.iv`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `},n.createElement("img",{src:i,className:r.iv`
          margin: 3px 1rem;
        `}))}},33045:(e,t,a)=>{"use strict";a.d(t,{H:()=>k}),a(58213);var r=a(76473),n=(a(9484),a(91692)),i=(a(25433),a(6333)),o=(a(27892),a(39288)),l=(a(11729),a(16958)),c=(a(49195),a(88485)),s=(a(26318),a(19057)),m=a(18336),d=a(98502),u=a(88294),p=a(26205),g=a(35050),f=a.n(g);const y=new class{async queryHistoryList(e,t,a=1,r=15){return f().get(`${window.syncManagerConfig?.dataServerUrl??""}/api/UrlHistory/Query`,{params:{pageIndex:a,pageSize:r,keyword:e,dateFrom:t?.dateFrom?.toISOString(),dateTo:t?.dateTo?.toISOString(),equipments:t?.equipmentName}})}async deleteHistoryItem(e){return f().delete(`${window.syncManagerConfig?.dataServerUrl??""}/api/UrlHistory?id=${e}`)}};var h=a(62927),v=a.n(h),S=a(45872),_=a.n(S),C=a(77226);const E=(0,C.ZP)(s.default).withConfig({displayName:"SearchListGroup__StyledList",componentId:"sc-606ry-0"})(["margin:0.5rem 0rem;"]),w=(0,C.ZP)(s.default.Item).withConfig({displayName:"SearchListGroup__StyledListItem",componentId:"sc-606ry-1"})(["padding:8px 8px 8px 16px !important;.close_btn{visibility:hidden;opacity:0.3;}&:hover{background-color:#e6e5e5;border-radius:3px;.close_btn{visibility:visible;&:hover{color:#40a9ff;opacity:0.9;cursor:pointer;}}}.item_container{display:flex;justify-content:space-between;width:100%;align-items:center;.ant-avatar{min-width:1rem;min-height:1rem !important;width:1rem !important;height:1rem !important;margin-right:0.5rem !important;}}"]);function b(e){return m.createElement(w,{onClick:()=>{e.onClick(e.data)},title:`${e.data.equipmentName} ${v()(e.data.timestamp).format("YYYY-MM-DD HH:mm ")} \n ${e.data.url}`},m.createElement("div",{className:"item_container"},m.createElement(D,{src:e.data.faviconUrl,$_css:e.data.faviconUrl?0:"50%"}),m.createElement("div",{style:{flex:1,width:"calc(100% - 1.7rem)"}},m.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},m.createElement("span",{style:{flex:1,fontSize:"90%"}},e.data.title))),m.createElement(d.Z,{className:"close_btn",onClick:t=>{t.preventDefault(),t.stopPropagation(),e.onDeleteBtnClick(e.data)}})))}function x(e){return m.createElement(m.Fragment,null,m.createElement(T,{plain:!0,key:e.groupTitle},e.groupTitle),e.items.map(((t,a)=>m.createElement(b,{data:t,key:t.url+" "+a,onClick:e.onClick,onClickEquipmentTag:e.onClickEquipmentTag,onDeleteBtnClick:e.onDeleteItem}))))}function N(e){return e.data.equipmentName||e.data.dateTo?m.createElement(Z,null,m.createElement("span",{style:{marginRight:".5rem"}},"Filter:"),e.data.equipmentName&&m.createElement(c.Z,{closable:!0,onClose:()=>{e.onChange({...e.data,equipmentName:void 0})}},e.data.equipmentName),e.data.dateFrom&&m.createElement(c.Z,{closable:!0,onClose:()=>{e.onChange({...e.data,dateFrom:void 0,dateTo:void 0})}},e.data.dateFrom.format("YY/MM/DD")+"-"+e.data.dateTo.format("YY/MM/DD"))):null}let I=0;function k(e){const[t,a]=(0,m.useState)([]),[r,c]=(0,m.useState)(!1),[s,d]=(0,m.useState)({});let[g,f]=(0,m.useState)(""),[h,S]=(0,m.useState)({total:0,current:1});const C=(0,m.useRef)();function w(e){d({equipmentName:e.equipmentName})}function b(e){e.id&&y.deleteHistoryItem(e.id).then((r=>{let n=t.filter((t=>t.id!==e.id));l.default.success("删除成功"),a([...n])})).catch((e=>{console.error(e),l.default.error(e.message)}))}return(0,m.useEffect)((()=>{c(!0),async function(){y.queryHistoryList("",{},h.current,e.pageSize).then((e=>{S({total:e.data.total,current:e.data.current}),a(e.data?.data),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)}))}(),C&&C.current?.focus()}),[]),m.createElement(L,{className:e.className},m.createElement(q,null,m.createElement(o.Z,{ref:C,size:"large",placeholder:"搜索历史访问记录",allowClear:!0,value:g,prefix:m.createElement(u.Z,null),onChange:t=>{let r=t.target.value;f(r),function(t){c(!0),a([]),I&&(clearTimeout(I),I=0),I=setTimeout((function(){y.queryHistoryList(t,s,1,e.pageSize).then((e=>{S({total:e.data.total,current:e.data.current}),a(e.data?.data),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)}))}),500)}(r)}})),m.createElement(N,{data:s,onChange:d}),m.createElement(Y,{id:"scrollableDiv"},m.createElement(p.Z,{dataLength:t.length,next:function(){r||(c(!0),y.queryHistoryList(g,s,h.current+1,e.pageSize).then((e=>{S({total:e.data.total,current:e.data.current}),a([...t,...e.data?.data]),c(!1)})).catch((e=>{console.error(e),l.default.error(e.message),c(!1)})))},hasMore:t.length<h.total,loader:!r&&m.createElement("div",{style:{display:"flex",justifyContent:"center",alignContent:"center"}},m.createElement(i.default,null)),endMessage:!r&&m.createElement(n.Z,{plain:!0},"已经到底啦 🤐"),scrollableTarget:"scrollableDiv"},m.createElement(E,{loading:r,itemLayout:"horizontal",size:"small",dataSource:function(e){return _()(e).groupBy((e=>v()(e.timestamp).format("YYYY-MM-DD A"))).map((e=>({groupTitle:v()(e[0].timestamp).format("YYYY-MM-DD A"),items:e}))).value()}(t),renderItem:t=>m.createElement(x,{key:t.groupTitle,items:t.items,groupTitle:t.groupTitle,onClick:e.onClickItem,onClickEquipmentTag:w,onDeleteItem:b})}))))}var D=(0,C.ZP)(r.ZP).withConfig({displayName:"SearchListGroup___StyledAvatar",componentId:"sc-606ry-2"})(["border-radius:",";"],(e=>e.$_css)),T=(0,C.ZP)(n.Z).withConfig({displayName:"SearchListGroup___StyledDivider",componentId:"sc-606ry-3"})(["margin:0 !important;"]),Z=(0,C.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv",componentId:"sc-606ry-4"})(["margin:0px 1rem 5px 1rem;"]),L=(0,C.ZP)("section").withConfig({displayName:"SearchListGroup___StyledSection",componentId:"sc-606ry-5"})(["display:flex;flex-direction:column;"]),q=(0,C.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv2",componentId:"sc-606ry-6"})(["margin:1rem 1rem 0.5rem 1rem;display:flex;align-items:center;justify-content:space-around;.ant-input-affix-wrapper{border-radius:2rem !important;border-radius:2rem !important;}"]),Y=(0,C.ZP)("div").withConfig({displayName:"SearchListGroup___StyledDiv3",componentId:"sc-606ry-7"})(["margin-top:0.5rem;flex:1;overflow:auto;"])},25566:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var r=a(77226),n=a(18336),i=a(33045),o=a(13502);function l(){return n.createElement(c,null,n.createElement("div",{className:"bar"},n.createElement(o.T,null)),n.createElement(s,{onClickItem:function(e){window.open(e.url)},pageSize:50}))}var c=(0,r.ZP)("section").withConfig({displayName:"Index___StyledSection",componentId:"sc-155ji52-0"})(["width:100%;height:100vh;"]),s=(0,r.ZP)(i.H).withConfig({displayName:"Index___StyledSearchListGroup",componentId:"sc-155ji52-1"})(["height:100%;height:calc(100% - 64px);"])},84351:(e,t,a)=>{var r={"./en-gb":71344,"./en-gb.js":71344,"./zh-cn":53052,"./zh-cn.js":53052};function n(e){var t=i(e);return a(t)}function i(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=i,e.exports=n,n.id=84351}}]);