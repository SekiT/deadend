!function(){"use strict";const t=t=>({name:"NoRouteFoundForDefaultPath",message:`No route found for the defaultPath: '${t}'`});class e{constructor(n,s,a){this.location=n,this.routes=a;const{matches:i}=e.traverse(s,a);if(0===i.length)throw t(s)}startTracking(t){t.addEventListener("hashchange",({newURL:t})=>{const e=new URL(t).hash.slice(1);this.moveTo(e)})}static traverse(t,n,s=[],a=""){let i=null;if(n.find(e=>{const n=e.match(t);return null!==n&&(i={route:e,result:n},!0)}),null===i)return{path:a,matches:s};const{result:{path:r},route:{children:o}}=i;if(o.length>0){const n=t.substring(r.length);return e.traverse(n,o,[...s,i],a+r)}return{path:a+r,matches:[...s,i]}}moveTo(t){const{path:n,matches:s}=e.traverse(t,this.routes);return this.location.replace(`#${n}`),s.forEach(({route:t,result:{params:e}})=>{t.handler({path:n,params:e})}),n}}class n{constructor(t,e,n=[]){this.paramNames=[];const s=t.split("/").map(t=>t.startsWith(":")?(this.paramNames.push(t.slice(1)),"([^/]+)"):t).join("/");this.pathRegex=new RegExp(`^${s}`),this.handler=e,this.children=n}match(t){const e=this.pathRegex.exec(t);if(null===e)return null;const[n,...s]=e,a=t.charAt(n.length);if(""!==a&&"/"!==a)return null;const i={};return this.paramNames.forEach((t,e)=>{i[t]=s[e]}),{path:n,params:i}}}const s={};var a=(t,e,n)=>{if(!/[a-z][a-z0-9_.-]*-[a-z0-9_.-]*/.test(t))throw(t=>({name:"InvalidViewName",message:`Invalid view name: '${t}'`}))(t);return customElements.define(t,class extends HTMLElement{constructor(){super();const a=this.getAttribute("id")||"";void 0===s[t]&&(s[t]={}),s[t][a]={element:this,fun:n};const{html:i,attachments:r}=n(...e);this.innerHTML=i,Object.entries(r).forEach(([t,e])=>{Object.assign(this.querySelector(t),e)})}}),t};const i=(t,e="")=>(...n)=>{if(void 0===s[t])return;const{element:a,fun:i}=s[t][e],{html:r,attachments:o}=i(...n);a.innerHTML=r,Object.entries(o).forEach(([t,e])=>{Object.assign(a.querySelector(t),e)})},r=(t,e,n)=>`\n  <a href="#/${e}" class="navbar-item${t===e?" active":""}">${n}</a>\n`;var o=a("deadend-navbar",[""],t=>({html:`\n    <nav>\n      <a class="title" href="#">deadend</a>\n      ${r(t,"input","Using input")}\n      ${r(t,"http","Using HTTP")}\n      ${r(t,"tick","Using tick event")}\n      <a class="navbar-item" href="http://github.com/SekiT/deadend">GitHub</a>\n    </nav>\n  `,attachments:{nav:{onclick:()=>i("deadend-navbar")("clicked")}}})),c=a("deadend-home",[],()=>({html:'\n    <h1 class="home-title">deadend</h1>\n    <p>My deadend of frontend</span>\n    <ul>\n      <li><a href="#/input">Using input</a></li>\n      <li><a href="#/http">Using HTTP</a></li>\n      <li><a href="#/tick">Using tick event</a></li>\n    </ul>\n  ',attachments:{}}));const h={value:"",observers:[]};var u=t=>{h.value=t,h.observers.forEach(e=>e(t))},l=()=>h.value,d=t=>{h.observers.push(t)};const m="deadend-near-realtime-output";var p=a(m,[""],t=>({html:`\n    <p>\n      This is updated near-realtime. Value is: ${t}\n    </p>\n  `,attachments:{}}));(t=>d(e=>i(t)(e)))(m);const v="deadend-on-event-output";var b=a(v,[""],t=>({html:`\n    <p>\n      This is updated when <button class="updater">this button</button> is clicked. Value is: ${t}\n    </p>\n  `,attachments:{"button.updater":{onclick:()=>i(v)(l())}}})),f=a("deadend-input",[],()=>({html:`\n    <h1>Using input</h1>\n    <p>\n      deadend is not reactive. Event listeners call subject.next and observers update the view.\n    </p>\n    <input type="text"><button class="setter">Set random value to the subject</button>\n    <${p}></${p}>\n    <${b}></${b}>\n  `,attachments:{input:{oninput:({target:t})=>u(t.value)},"button.setter":{onclick:()=>u(["deadend","lorem ipsum","quick fox"][new Date%3])}}})),$=a("deadend-http-output",[""],t=>({html:`\n    <p>Fetched text: "${t}"</p>\n  `,attachments:{}})),g=a("deadend-http",[],()=>({html:`\n    <h1>Using HTTP</h1>\n    <p>\n      Fetch API suffices. You may use subject, but chaining promises is enough for most cases.\n    </p>\n    <button>Fetch</button>\n    <${$}></${$}>\n  `,attachments:{button:{onclick:()=>{fetch("data/data.txt").then(t=>t.text()).then(t=>i($)(t)).catch(t=>i($)(`${t}`))}}}}));const k={count:0,observers:[],timer:0},w=t=>{k.observers.forEach(e=>e(t))};var T=t=>{clearInterval(k.timer),k.timer=setInterval(()=>{w(k.count+=1)},1e3),w(k.count=t)},x=t=>{k.observers.push(t)};const E="deadend-tick-every-second";var y=a(E,[0],t=>({html:`\n    <p>\n      This is updated by every tick: ${t}\n    </p>\n  `,attachments:{}}));x(t=>i(E)(t));const U={pressed:"none",observers:[]};x(()=>{(t=>U.observers.forEach(e=>e(t)))(U.pressed),U.pressed="none"});var j=t=>{U.pressed=t},H=t=>{U.observers.push(t)};const L="deadend-tick-exclusive-control-output";var I=a(L,["none"],t=>({html:`\n    <div>Last pressed in a tick: ${t}</div>\n  `,attachments:{}}));H(t=>{i(L)(t)});var N=a("deadend-tick-exclusive-control",[],()=>({html:`\n    <div>\n      <button class="a">A</button><button class="b">B</button><button class="c">C</button>\n      <${I}></${I}>\n    </div>\n  `,attachments:{"button.a":{onclick:()=>j("A")},"button.b":{onclick:()=>j("B")},"button.c":{onclick:()=>j("C")}}})),P=a("deadend-tick",[],()=>({html:`\n    <h1>Using tick event</h1>\n    This view initializes count by using attachments, though it seems dirty.\n    <${y}></${y}>\n    You can filter inputs by ticks. This will be useful to control multiple simultaneous inputs.\n    <${N}></${N}>\n  `,attachments:{h1:{none:T(0)}}}));const R={home:c,input:f,http:g,tick:P};var S=a("deadend-route-switch",["home"],t=>{const e=R[t];return{html:`\n      <${e}></${e}>\n    `,attachments:{}}}),z={root:a("deadend-root",[],()=>({html:`\n    <${o}></${o}>\n    <${S}></${S}>\n  `,attachments:{}})),navbar:o,routeSwitch:S,input:f,http:g,tick:P};const{root:A,navbar:F,routeSwitch:M}=z,O=t=>()=>{i(F)(t),i(M)(t)},q=new e(window.location,"",[new n("",({path:t})=>{""===t&&O("home")()},[new n("/input",O("input")),new n("/http",O("http")),new n("/tick",O("tick"))])]);document.getElementById("root").innerHTML=`<${A}></${A}>`,q.moveTo("/bar/baz"),q.startTracking(window)}();
