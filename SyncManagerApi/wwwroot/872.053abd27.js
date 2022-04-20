(globalThis.webpackChunkreact_simple=globalThis.webpackChunkreact_simple||[]).push([[872],{76851:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>N}),a(25433);var n=a(6333),r=(a(27892),a(39288)),l=a(18336);function o(e){window!=window.parent&&(window.parent.postMessage(e,"*"),console.log("send msg",e))}function i(e){const t=["#55acee","#3b5999","#cd201f","cyan","green","red","#87d068"];return t[function(e){var t,a,n=2166136261;for(t=0,a=e.length;t<a;t++)n^=e.charCodeAt(t),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return n>>>0}(e)%t.length]}var c=a(50697);const s=a.p+"83c12eede95f860c27cd0d5c9d38ce85.png";function d(){return l.createElement("div",{className:c.iv`
        width: 100%;
        height: 4rem;
        display: flex;
        border-bottom: 1px #ddd solid;
      `},l.createElement("img",{src:s,className:c.iv`
          margin: 3px 1rem;
        `}))}a(9484);var m=a(91692),u=(a(26318),a(19057)),g=(a(49195),a(88485)),f=(a(58213),a(76473)),p=a(20742),h=a(26205),w=a(35050),y=a.n(w);const v=new class{async queryHistoryList(e){if(console.log(window.syncManagerConfig),!window.syncManagerConfig||!window.syncManagerConfig.dataServerUrl)throw new Error("No remote server API config");return y().get(`${window.syncManagerConfig?.dataServerUrl}/api/UrlHistory/QueryUrlHistory`,{params:{pageIndex:1,pageSize:10,keyword:e}})}};var E=a(62927),b=a.n(E);function x(e){return l.createElement(u.default.Item,{onClick:()=>{e.onClick(e.data)}},l.createElement("div",{className:c.iv`
          display: flex;
          justify-content: space-between;
          width: 100%;
        `},l.createElement(f.ZP,{className:c.iv`
            min-width: 1.5rem;
            min-height: 1.5rem !important;
            width: 1.5rem !important;
            height: 1.5rem !important;
            margin-right: 0.2rem !important; ;
          `,src:e.data.faviconUrl}),l.createElement("div",{style:{flex:1,width:"calc(100% - 1.7rem)"}},l.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline"}},l.createElement("span",{style:{flex:1,fontWeight:"bolder"}},e.data.title),l.createElement("span",{style:{fontSize:"80%",color:"gray"}},b()(e.data.timestamp).format("YYYY-MM-DD HH:mm"))),l.createElement("div",{style:{display:"flex",width:"100%",alignItems:"flex-end"}},l.createElement("div",{style:{fontSize:"80%",color:"gray",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1,paddingRight:16}},e.data.url),l.createElement(g.default,{style:{borderRadius:3},color:i(e.data.equipmentName)},e.data.equipmentName)))))}let C=0;function S(){const[e,t]=(0,l.useState)([]),[a,i]=(0,l.useState)(!1);let[s,d]=(0,l.useState)(""),[g,f]=(0,l.useState)({total:0,current:0});function w(e){o({type:"OpenNewTab",url:e.url})}return(0,l.useEffect)((()=>{i(!0),async function(){v.queryHistoryList().then((e=>{f({total:e.data.total,current:e.data.current}),t(e.data?.data),i(!1)})).catch((e=>{console.error(e),i(!1)}))}()}),[]),l.createElement(l.Fragment,null,l.createElement("div",{className:c.iv`
          margin: 1rem 2rem;
          .ant-input-affix-wrapper {
            border-radius: 2rem !important;
            border-radius: 2rem !important;
          }
        `},l.createElement(r.Z,{size:"large",placeholder:"搜索历史访问记录",allowClear:!0,value:s,prefix:l.createElement(p.Z,null),onChange:e=>{let a=e.target.value;d(a),function(e){i(!0),C&&(clearTimeout(C),C=0),C=setTimeout((function(){v.queryHistoryList(e).then((e=>{f({total:e.data.total,current:e.data.current}),t(e.data?.data),i(!1)})).catch((e=>{console.error(e),i(!1)}))}),1e3)}(a)}})),l.createElement("div",{id:"scrollableDiv",style:{height:"500px",overflow:"auto",padding:"0 4px",borderTop:"1px solid rgba(140, 140, 140, 0.35)",borderBottom:"1px solid rgba(140, 140, 140, 0.35)"}},l.createElement(h.Z,{dataLength:e.length,next:function(){a||(i(!0),v.queryHistoryList(s).then((a=>{f({total:a.data.total,current:a.data.current}),t([...e,...a.data?.data]),i(!1)})).catch((e=>{console.error(e),i(!1)})))},hasMore:e.length<g.total,loader:l.createElement("div",{style:{display:"flex",justifyContent:"center",alignContent:"center"}},l.createElement(n.default,null)),endMessage:!a&&l.createElement(m.Z,{plain:!0},"已经到底啦 🤐"),scrollableTarget:"scrollableDiv"},l.createElement(u.default,{loading:a,itemLayout:"horizontal",size:"small",className:c.iv`
              margin: 0.5rem 0rem;
              .ant-list-item {
                padding: 8px 8px !important;
                &:hover {
                  background-color: gainsboro;
                }
              }
            `,dataSource:e,renderItem:e=>l.createElement(x,{data:e,onClick:w})}))))}const{Search:M}=r.Z;function N(){const[e,t]=(0,l.useState)([]),[a,r]=(0,l.useState)(!1);let[i,c]=(0,l.useState)("");const[s,m]=(0,l.useState)(!0);return(0,l.useEffect)((()=>{var e;window!=window.top?("SetConfig",e=e=>{window.syncManagerConfig=e.syncManagerConfig,m(!1)},window.addEventListener("message",(t=>{t.data&&"SetConfig"==t.data.type&&e(t.data)}),!1),o({type:"GetConfig"})):(window.syncManagerConfig={dataServerUrl:"http://localhost:5266"},m(!1))}),[]),l.createElement("section",null,l.createElement("div",{className:"bar"},l.createElement(d,null)),s?l.createElement(n.default,{tip:"正在初始化"}):l.createElement(S,null))}},84351:(e,t,a)=>{var n={"./en-gb":71344,"./en-gb.js":71344,"./zh-cn":53052,"./zh-cn.js":53052};function r(e){var t=l(e);return a(t)}function l(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=l,e.exports=r,r.id=84351}}]);