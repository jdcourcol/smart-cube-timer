(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{204:function(A,r,e){"use strict";r.decode=r.parse=e(205),r.encode=r.stringify=e(206)},205:function(A,r,e){"use strict";function t(A,r){return Object.prototype.hasOwnProperty.call(A,r)}A.exports=function(A,r,e,o){r=r||"&",e=e||"=";var c={};if("string"!=typeof A||0===A.length)return c;var f=/\+/g;A=A.split(r);var l=1e3;o&&"number"==typeof o.maxKeys&&(l=o.maxKeys);var h=A.length;l>0&&h>l&&(h=l);for(var i=0;i<h;++i){var w,B,d,m,Q=A[i].replace(f,"%20"),v=Q.indexOf(e);v>=0?(w=Q.substr(0,v),B=Q.substr(v+1)):(w=Q,B=""),d=decodeURIComponent(w),m=decodeURIComponent(B),t(c,d)?n(c[d])?c[d].push(m):c[d]=[c[d],m]:c[d]=m}return c};var n=Array.isArray||function(A){return"[object Array]"===Object.prototype.toString.call(A)}},206:function(A,r,e){"use strict";var t=function(A){switch(typeof A){case"string":return A;case"boolean":return A?"true":"false";case"number":return isFinite(A)?A:"";default:return""}};A.exports=function(A,r,e,c){return r=r||"&",e=e||"=",null===A&&(A=void 0),"object"==typeof A?map(o(A),function(o){var c=encodeURIComponent(t(o))+e;return n(A[o])?map(A[o],function(A){return c+encodeURIComponent(t(A))}).join(r):c+encodeURIComponent(t(A[o]))}).join(r):c?encodeURIComponent(t(c))+e+encodeURIComponent(t(A)):""};var n=Array.isArray||function(A){return"[object Array]"===Object.prototype.toString.call(A)};function map(A,r){if(A.map)return A.map(r);for(var e=[],i=0;i<A.length;i++)e.push(r(A[i],i));return e}var o=Object.keys||function(A){var r=[];for(var e in A)Object.prototype.hasOwnProperty.call(A,e)&&r.push(e);return r}},252:function(A,r,e){var t=e(408);A.exports=function(A){var r=A.length;return r?A[t(0,r-1)]:void 0}},404:function(A,r){const e="0000aadb-0000-1000-8000-00805f9b34fb",t="0000aadc-0000-1000-8000-00805f9b34fb",n="0000aaaa-0000-1000-8000-00805f9b34fb",o="0000aaab-0000-1000-8000-00805f9b34fb",c="0000aaac-0000-1000-8000-00805f9b34fb",f=["B","D","L","U","R","F"],l=["blue","yellow","orange","white","red","green"],h={0:1,1:2,2:-1,8:-2},w=[[1,4,5],[4,3,5],[3,2,5],[2,1,5],[4,1,0],[3,4,0],[2,3,0],[1,2,0]],B=[[1,4,5],[4,3,5],[3,2,5],[2,1,5],[4,1,0],[3,4,0],[2,3,0],[1,2,0]],d=[[5,1],[5,4],[5,3],[5,2],[1,4],[3,4],[3,2],[1,2],[0,1],[0,4],[0,3],[0,2]],m=[[5,1],[5,4],[5,3],[5,2],[1,4],[3,4],[3,2],[1,2],[0,1],[0,4],[0,3],[0,2]];class Q{constructor(){this.listeners={}}on(label,A){this.listeners[label]||(this.listeners[label]=[]),this.listeners[label].push(A)}off(label,A){let r=this.listeners[label];if(r&&r.length>0){let e=r.indexOf(A);if(e>-1)return r.splice(e,1),this.listeners[label]=r,!0}return!1}emit(label,...A){let r=this.listeners[label];return!!(r&&r.length>0)&&(r.forEach(r=>{r(...A)}),!0)}}class v extends Q{constructor(){super(),this._onCharacteristicValueChanged=this._onCharacteristicValueChanged.bind(this),this._onDisconnected=this._onDisconnected.bind(this)}async connect(){if(!window.navigator)throw new Error("window.navigator is not accesible. Maybe you're running Node.js?");if(!window.navigator.bluetooth)throw new Error("Web Bluetooth API is not accesible");const A=await window.navigator.bluetooth.requestDevice({filters:[{namePrefix:"GiC"}],optionalServices:[e,n]}),r=await A.gatt.connect(),o=await r.getPrimaryService(e),c=await o.getCharacteristic(t);await c.startNotifications();const f=await c.readValue();this._state=this._parseCubeValue(f).state,c.addEventListener("characteristicvaluechanged",this._onCharacteristicValueChanged),this._systemService=await r.getPrimaryService(n),A.addEventListener("gattserverdisconnected",this._onDisconnected),this._device=A}disconnect(){this._device&&this._device.gatt.disconnect()}_onDisconnected(){this._device=null,this.emit("disconnected")}async getBatteryLevel(){const A=await this._systemService.getCharacteristic(o),r=await this._systemService.getCharacteristic(c);await A.startNotifications();const data=new Uint8Array([181]).buffer;return r.writeValue(data),new Promise(r=>{const e=t=>{const n=t.target.value;A.removeEventListener("characteristicvaluechanged",e),A.stopNotifications(),r(n.getUint8(1))};A.addEventListener("characteristicvaluechanged",e)})}get state(){const A={corners:[],edges:[]};return this._state.cornerPositions.forEach((r,e)=>{const t=this._mapCornerColors(w[r-1],this._state.cornerOrientations[e],e);A.corners.push({position:B[e].map(A=>f[A]),colors:t.map(A=>l[A])})}),this._state.edgePositions.forEach((r,e)=>{const t=this._mapEdgeColors(m[r-1],this._state.edgeOrientations[e]);A.edges.push({position:d[e].map(A=>f[A]),colors:t.map(A=>l[A])})}),A}get stateString(){const A=[[29,15,26],[9,8,20],[6,38,18],[44,27,24],[17,35,51],[2,11,45],[36,0,47],[33,42,53]],r=[[25,28],[23,12],[19,7],[21,41],[32,16],[5,10],[3,37],[30,43],[52,34],[48,14],[46,1],[50,39]],e={blue:"B",yellow:"D",orange:"L",white:"U",red:"R",green:"F"},t=this.state,n=[];return t.corners.forEach((r,t)=>{r.position.forEach((o,c)=>{n[A[t][c]]=e[r.colors[c]]})}),t.edges.forEach((A,t)=>{A.position.forEach((o,c)=>{n[r[t][c]]=e[A.colors[c]]})}),n[4]="U",n[13]="R",n[22]="F",n[31]="D",n[40]="L",n[49]="B",n.join("")}_onCharacteristicValueChanged(A){const r=A.target.value,{state:e,moves:t}=this._parseCubeValue(r);this._state=e,this.emit("move",t[0])}_parseCubeValue(A){const r={cornerPositions:[],cornerOrientations:[],edgePositions:[],edgeOrientations:[]},e=[];for(let i=0;i<A.byteLength;i++){const t=A.getUint8(i),n=t>>4,o=15&t;i<4?r.cornerPositions.push(n,o):i<8?r.cornerOrientations.push(n,o):i<14?r.edgePositions.push(n,o):i<16?(r.edgeOrientations.push(!!(128&t)),r.edgeOrientations.push(!!(64&t)),r.edgeOrientations.push(!!(32&t)),r.edgeOrientations.push(!!(16&t)),14===i&&(r.edgeOrientations.push(!!(8&t)),r.edgeOrientations.push(!!(4&t)),r.edgeOrientations.push(!!(2&t)),r.edgeOrientations.push(!!(1&t)))):e.push(this._parseMove(n,o))}return{state:r,moves:e}}_parseMove(A,r){const e=f[A-1],t=h[r-1];let n=e;switch(t){case 2:n=`${e}2`;break;case-1:n=`${e}'`;break;case-2:n=`${e}2'`}return{face:e,amount:t,notation:n}}_mapCornerColors(A,r,e){const t=[];switch(3!==r&&(0!==e&&2!==e&&5!==e&&7!==e||(r=3-r)),r){case 1:t[0]=A[1],t[1]=A[2],t[2]=A[0];break;case 2:t[0]=A[2],t[1]=A[0],t[2]=A[1];break;case 3:t[0]=A[0],t[1]=A[1],t[2]=A[2]}return t}_mapEdgeColors(A,r){const e=[...A];return r&&e.reverse(),e}}A.exports={connect:async()=>{const A=new v;return await A.connect(),A}}},405:function(A,r,e){const t=e(406),n="undefined"!=typeof navigator&&parseFloat((""+(/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))<10&&!window.MSStream;A.exports=class{constructor(){n?this.noSleepTimer=null:(this.noSleepVideo=document.createElement("video"),this.noSleepVideo.setAttribute("playsinline",""),this.noSleepVideo.setAttribute("src",t),this.noSleepVideo.addEventListener("timeupdate",function(A){this.noSleepVideo.currentTime>.5&&(this.noSleepVideo.currentTime=Math.random())}.bind(this)))}enable(){n?(this.disable(),this.noSleepTimer=window.setInterval(function(){window.location.href="/",window.setTimeout(window.stop,0)},15e3)):this.noSleepVideo.play()}disable(){n?this.noSleepTimer&&(window.clearInterval(this.noSleepTimer),this.noSleepTimer=null):this.noSleepVideo.pause()}}},406:function(A,r){A.exports="data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQAD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"},407:function(A,r,e){var t=e(252),n=e(409),o=e(148);A.exports=function(A){return(o(A)?t:n)(A)}},408:function(A,r){var e=Math.floor,t=Math.random;A.exports=function(A,r){return A+e(t()*(r-A+1))}},409:function(A,r,e){var t=e(252),n=e(410);A.exports=function(A){return t(n(A))}},410:function(A,r,e){var t=e(411),n=e(162);A.exports=function(object){return null==object?[]:t(object,n(object))}},411:function(A,r,e){var t=e(196);A.exports=function(object,A){return t(A,function(A){return object[A]})}},413:function(A,r){scrambler=function(){var A,r,e,t,n,o,c,f,l,h,w,B,d,m,Q,v,C;function y(){}function E(A,r){var e,i;for(e=Array(A),i=0;i<A;e[i++]=Array(r));return e}function D(){D=y,v=E(495,18),d=E(324,18),n=E(336,18),m=E(495,8),C=Array(160380),Q=Array(166320),B=Array(870912),w=E(1320,18),h=Array(24),r=Array(346),e=E(2768,18),t=E(2768,10),l=E(24,10),f=E(24,16),o=Array(66432),c=Array(66432)}function I(){I=y,mA=new O,oA=Array(16),lA=Array(16),gA=E(16,16),hA=E(16,18),fA=E(8,8),sA=E(8,18),uA=E(8,8),pA=E(16,10),aA=Array(336),wA=Array(324),nA=Array(2768),iA=nA,cA=Array(40320),dA=E(56,56),BA=[0,0,0,0,1,3,1,3,1,3,1,3,0,0,0,0],QA=new K(2531,1373,67026819,1877),vA=new K(2089,1906,322752913,255),CA=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],[6,7,8,0,1,2,3,4,5,15,16,17,9,10,11,12,13,14],[3,4,5,6,7,8,0,1,2,12,13,14,15,16,17,9,10,11],[2,1,0,5,4,3,8,7,6,11,10,9,14,13,12,17,16,15],[8,7,6,2,1,0,5,4,3,17,16,15,11,10,9,14,13,12],[5,4,3,8,7,6,2,1,0,14,13,12,17,16,15,11,10,9]],function(){var A,r,p;for(r=Array(18),DA=[new K(15120,0,119750400,0),new K(21021,1494,323403417,0),new K(8064,1236,29441808,802),new K(9,0,5880,0),new K(1230,412,2949660,0),new K(224,137,328552,1160)],A=0;A<6;++A)for(r[3*A]=DA[A],p=0;p<2;++p)r[3*A+p+1]=new O,rA(r[3*A+p],DA[A],r[3*A+p+1]),j(r[3*A+p],DA[A],r[3*A+p+1]);DA=r}(),function(){var A,r,e,i,t,n,o,c,s,f,l;for(A=new O,r=new O,e=new K(28783,0,259268407,0),l=new K(15138,0,119765538,1792),(o=new K(5167,0,83473207,0)).co=[3,3,3,3,3,3,3,3],i=0;i<16;++i)oA[i]=new $(A),T(A,l,r),rA(A,l,r),f=r,r=A,A=f,i%4==3&&(T(f,o,r),rA(f,o,r),f=r,r=A,A=f),i%8==7&&(T(f,e,r),rA(f,e,r),f=r,r=A,A=f);for(t=0;t<16;++t)for(n=0;n<16;++n)if(T(oA[t],oA[n],A),0===A.cp[0]&&1===A.cp[1]&&2===A.cp[2]){lA[t]=n;break}for(i=0;i<16;++i)for(t=0;t<16;++t)for(T(oA[i],oA[t],A),n=0;n<16;++n)if(oA[n].cp[0]===A.cp[0]&&oA[n].cp[1]===A.cp[1]&&oA[n].cp[2]===A.cp[2]){gA[i][t]=n;break}for(t=0;t<18;++t)for(s=0;s<16;++s){X(DA[t],lA[s],A);A:for(c=0;c<18;++c){for(i=0;i<8;++i)if(A.cp[i]!=DA[c].cp[i]||A.co[i]!=DA[c].co[i])continue A;hA[s][t]=c}}for(t=0;t<10;++t)for(s=0;s<16;++s)pA[s][t]=VA[hA[s][JA[t]]];for(t=0;t<8;++t)for(s=0;s<8;++s)fA[s][t]=gA[s<<1][t<<1]>>>1;for(t=0;t<18;++t)for(s=0;s<8;++s)sA[s][t]=hA[s<<1][t];for(t=0;t<8;++t)for(s=0;s<8;++s)uA[t][s]=fA[t][lA[s<<1]>>1]}()}function G(A){A.cp=[0,1,2,3,4,5,6,7],A.co=[0,0,0,0,0,0,0,0],A.ep=[0,1,2,3,4,5,6,7,8,9,10,11],A.eo=[0,0,0,0,0,0,0,0,0,0,0,0]}function M(A){var r,e;if(null!=yA)return r=yA[eA(A.cp)],r^=BA[15&r];for(e=0;e<16;++e)if(X(A,lA[e],A.temps),65535!=(r=jA(nA,eA(A.temps.cp))))return r<<4|e;return 0}function F(A){var i,r,e,mask,t,n;for(r=0,e=0,mask=0,t=3,i=11;i>=0;--i)4<=A.ep[i]&&A.ep[i]<=6&&(r+=RA[i][t--],e+=TA(mask&(n=1<<A.ep[i])-1)*LA[2-t],mask|=n);return 6*r+e}function N(A){var r,e;if(null!=yA)return yA[eA(A.ep)];for(e=0;e<16;++e)if(AA(A,lA[e],A.temps),65535!=(r=jA(iA,eA(A.temps.ep))))return r<<4|e;return 0}function Z(A){var i,r;for(r=0,i=0;i<11;++i)r|=A.eo[i]<<i;return r}function R(A){var r,e;if(null!=EA)return EA[Z(A)];for(e=0;e<16;e+=2)if(AA(A,lA[e],A.temps),65535!=(r=jA(aA,Z(A.temps))))return r<<3|e>>>1;return 0}function H(A){var i,r,e,t;for(e=1<<A.ep[11],r=0,i=10;i>=8;--i)r+=TA(e&(t=1<<A.ep[i])-1)*LA[11-i],e|=t;return r}function x(A){var i,r,e,mask,t,n;for(r=0,e=0,mask=0,t=3,i=11;i>=0;--i)A.ep[i]>=9&&(r+=RA[i][t--],e+=TA(mask&(n=1<<A.ep[i])-1)*LA[2-t],mask|=n);return 6*r+e}function k(A){var i,r;for(r=0,i=0;i<7;++i)r*=3,r+=A.co[i];return r}function S(A){var r,e;if(null!=bA)return bA[k(A)];for(e=0;e<16;e+=2)if(X(A,lA[e],A.temps),r=k(A.temps),65535!=(r=jA(wA,r)))return r<<3|e>>>1;return 0}function P(A){var i,r,e;for(r=0,e=4,i=0;i<12;++i)A.ep[i]>=8&&(r+=RA[11-i][e--]);return r}function Y(A){var i,r,e,mask,t,n;for(r=0,e=0,mask=0,t=3,i=11;i>=0;--i)A.ep[i]<=2&&(r+=RA[i][t--],e+=TA(mask&(n=1<<A.ep[i])-1)*LA[2-t],mask|=n);return 6*r+e}function L(A){var r,e,t;for(e=0;e<12;++e)A.temps.ep[A.ep[e]]=e;for(e=0;e<12;++e)A.temps.eo[e]=A.eo[A.temps.ep[e]];for(r=0;r<8;++r)A.temps.cp[A.cp[r]]=r;for(r=0;r<8;++r)t=A.co[A.temps.cp[r]],A.temps.co[r]=-t,A.temps.co[r]<0&&(A.temps.co[r]=A.temps.co[r]+3);!function(A,r){var i;for(i=0;i<8;++i)A.cp[i]=r.cp[i],A.co[i]=r.co[i];for(i=0;i<12;++i)A.ep[i]=r.ep[i],A.eo[i]=r.eo[i]}(A,A.temps)}function W(A,r){var i;for(A.eo[11]=function(i){return i^=i>>>1,i^=i>>>2,i^=i>>>4,1&(i^=i>>>8)}(r),i=0;i<11;++i)A.eo[i]=1&r,r>>>=1}function z(A,r){var i,e;for(A.ep[11]=8,i=10;i>=8;--i)for(A.ep[i]=r%(12-i)+8,r=~~(r/(12-i)),e=i+1;e<12;++e)A.ep[e]>=A.ep[i]&&++A.ep[e]}function U(A,r){var e,i,t;for(e=UA[r%6],r=~~(r/6),t=3,i=11;i>=0;--i)r>=RA[i][t]?(r-=RA[i][t--],A.ep[i]=e[2-t]):A.ep[i]=8-i+t}function V(A,r){var i,e;for(e=0,i=6;i>=0;--i)e+=A.co[i]=r%3,r=~~(r/3);A.co[7]=(15-e)%3}function J(A,r){var i,e;for(e=4,i=0;i<12;++i)r>=RA[11-i][e]?(r-=RA[11-i][e--],A.ep[i]=11-e):A.ep[i]=i+e-4}function X(a,A,b){T(oA[lA[A]],a,mA),T(mA,oA[A],b)}function j(a,b,A){var r;for(r=0;r<8;++r)A.cp[r]=a.cp[b.cp[r]],A.co[r]=(a.co[b.cp[r]]+b.co[r])%3}function T(a,b,A){var r,e,t,n;for(r=0;r<8;++r)A.cp[r]=a.cp[b.cp[r]],t=a.co[b.cp[r]],n=b.co[r],e=t,e+=t<3?n:3-n,e%=3,t<3^n<3&&(e+=3),A.co[r]=e}function O(){G(this)}function _(A,r,e,t){var i;for(G(this),i=0;i<8;++i)this.cp[i]=A[i],this.co[i]=r[i];for(i=0;i<12;++i)this.ep[i]=e[i],this.eo[i]=t[i]}function K(A,r,e,t){G(this),tA(this.cp,A),V(this,r),function(A,r){var i,e;for(A.ep[11]=0,i=10;i>=0;--i)for(A.ep[i]=r%(12-i),r=~~(r/(12-i)),e=i+1;e<12;++e)A.ep[e]>=A.ep[i]&&++A.ep[e]}(this,e),W(this,t)}function $(A){_.call(this,A.cp,A.co,A.ep,A.eo)}function AA(a,A,b){rA(oA[lA[A]],a,mA),rA(mA,oA[A],b)}function rA(a,b,A){var r;for(r=0;r<12;++r)A.ep[r]=a.ep[b.ep[r]],A.eo[r]=b.eo[r]^a.eo[b.ep[r]]}function eA(A){var i,r,e,t;for(r=0,t=1985229328,i=0;i<7;++i)r=(8-i)*r+(t>>(e=A[i]<<2)&7),t-=286331152<<e;return r}function tA(A,r){var i,e,p,t,n;for(n=1985229328,i=0;i<7;++i)r-=(t=~~(r/(p=LA[7-i])))*p,t<<=2,A[i]=n>>t&7,n=(n&(e=(1<<t)-1))+(n>>4&~e);A[7]=n}(A=$.prototype=K.prototype=O.prototype=function(){}.prototype).temps=null;var nA,oA,iA,aA,cA,sA,fA,uA,lA,hA,pA,gA,wA,BA,dA,mA,QA,vA,CA,yA=null,EA=null,bA=null,DA=null;function IA(A,t,l,y,E,D,I,G){var M,F,N,Z,R,H;if(0===t&&0===y&&0===D&&I<5)return 0===I&&function(A){var t,n,l,B,i,d,m,Q,v,s,C,y;for(A.valid2=Math.min(A.valid2,A.valid1),i=A.valid1;i<A.length1;++i)m=A.move[i],A.corn[i+1]=e[A.corn[i]][hA[A.csym[i]][m]],A.csym[i+1]=gA[15&A.corn[i+1]][A.csym[i]],A.corn[i+1]>>>=4,A.mid3[i+1]=w[A.mid3[i]][m];if(A.valid1=A.length1,Q=h[A.mid3[A.length1]%24],(v=o[24*A.corn[A.length1]+f[Q][A.csym[A.length1]]])>=A.maxlength2)return!1;for(i=A.valid2;i<A.length1;++i)A.e1[i+1]=w[A.e1[i]][A.move[i]],A.e2[i+1]=w[A.e2[i]][A.move[i]];if(A.valid2=A.length1,t=A.corn[A.length1],B=4032*dA[~~(A.e1[A.length1]/6)][~~(A.e2[A.length1]/6)]+12*A.e1[A.length1]+A.e2[A.length1]%6*2+(r[t>>>3]>>>(7&t)&1^zA[Q]),l=15&(n=cA[B]),n>>>=4,(v=Math.max(c[24*n+f[Q][l]],v))>=A.maxlength2)return!1;for(d=0===A.length1?10:VA[3*~~(A.move[A.length1-1]/3)+1],i=v;i<A.maxlength2;++i)if(GA(A,n,l,A.corn[A.length1],A.csym[A.length1],Q,i,A.length1,d)){if(A.sol=A.length1+i,C="",(y=((y=A.urfidx)+3)%6)<3){for(s=0;s<A.length1;++s)C+=WA[CA[y][A.move[s]]],C+=" ";for(A.useSeparator&&(C.impl.string+="."),s=A.length1;s<A.sol;++s)C+=WA[CA[y][A.move[s]]],C+=" "}else{for(s=A.sol-1;s>=A.length1;--s)C+=WA[CA[y][A.move[s]]],C+=" ";for(A.useSeparator&&(C+="."),s=A.length1-1;s>=0;--s)C+=WA[CA[y][A.move[s]]],C+=" "}return A.solution=C,!0}return!1}(A);for(N=0;N<18;++N)if(HA[G][N])N+=2;else if(Z=v[D][N],H=d[t][sA[l][N]],R=fA[7&H][l],!(C[495*(H>>>=3)+m[Z][R]]>=I)&&(M=n[y][sA[E][N]],F=fA[7&M][E],!(B[2688*H+((M>>>=3)<<3|uA[F][R])]>=I||Q[495*M+m[Z][F]]>=I)&&(A.move[A.length1-I]=N,A.valid1=Math.min(A.valid1,A.length1-I),IA(A,H,R,M,F,Z,I-1,N))))return!0;return!1}function GA(A,r,n,h,w,B,d,m,Q){var v,C,y,E,D,I;if(0===r&&0===h&&0===B)return!0;for(D=0;D<10;++D)if(!xA[Q][D]&&(I=l[B][D],y=t[r][pA[n][D]],E=gA[15&y][n],!(c[24*(y>>>=4)+f[I][E]]>=d)&&(v=e[h][hA[w][JA[D]]],C=gA[15&v][w],!(o[24*(v>>>=4)+f[I][C]]>=d)&&(A.move[m]=JA[D],GA(A,y,E,v,C,I,d-1,m+1,D)))))return!0;return!1}function MA(A,r){var e,i;for(NA(),i=0;i<54;++i)switch(r.charCodeAt(i)){case 85:A.f[i]=0;break;case 82:A.f[i]=1;break;case 70:A.f[i]=2;break;case 68:A.f[i]=3;break;case 76:A.f[i]=4;break;case 66:A.f[i]=5;break;default:return"Error 1"}return e=function(A){var r,e,t,i,n,o;for(r=new O,i=0;i<8;++i)r.cp[i]=0;for(i=0;i<12;++i)r.ep[i]=0;for(i=0;i<8;++i){for(o=0;o<3&&(0!==A[SA[i][o]]&&3!==A[SA[i][o]]);++o);for(e=A[SA[i][(o+1)%3]],t=A[SA[i][(o+2)%3]],n=0;n<8;++n)if(e===kA[n][1]&&t===kA[n][2]){r.cp[i]=n,r.co[i]=o%3;break}}for(i=0;i<12;++i)for(n=0;n<12;++n){if(A[YA[i][0]]===PA[n][0]&&A[YA[i][1]]===PA[n][1]){r.ep[i]=n,r.eo[i]=0;break}if(A[YA[i][0]]===PA[n][1]&&A[YA[i][1]]===PA[n][0]){r.ep[i]=n,r.eo[i]=1;break}}return r}(A.f),A.sol=22,function(A,r){var i;for(r.temps=new O,i=0;i<6;++i)A.twist[i]=S(r),A.tsym[i]=7&A.twist[i],A.twist[i]>>>=3,A.flip[i]=R(r),A.fsym[i]=7&A.flip[i],A.flip[i]>>>=3,A.slice_0[i]=P(r),A.corn0[i]=M(r),A.csym0[i]=15&A.corn0[i],A.corn0[i]>>>=4,A.mid30[i]=x(r),A.e10[i]=Y(r),A.e20[i]=F(r),A.prun[i]=Math.max(Math.max(C[495*A.twist[i]+m[A.slice_0[i]][A.tsym[i]]],Q[495*A.flip[i]+m[A.slice_0[i]][A.fsym[i]]]),B[2688*A.twist[i]+(A.flip[i]<<3|uA[A.fsym[i]][A.tsym[i]])]),j(vA,r,r.temps),j(r.temps,QA,r),rA(vA,r,r.temps),rA(r.temps,QA,r),2===i&&L(r);for(A.solution=null,A.length1=0;A.length1<A.sol;++A.length1)for(A.maxlength2=Math.min(1+~~(A.sol/2),A.sol-A.length1),A.urfidx=0;A.urfidx<6;++A.urfidx)if(A.corn[0]=A.corn0[A.urfidx],A.csym[0]=A.csym0[A.urfidx],A.mid3[0]=A.mid30[A.urfidx],A.e1[0]=A.e10[A.urfidx],A.e2[0]=A.e20[A.urfidx],A.prun[A.urfidx]<=A.length1&&IA(A,A.twist[A.urfidx],A.tsym[A.urfidx],A.flip[A.urfidx],A.fsym[A.urfidx],A.slice_0[A.urfidx],A.length1,18))return null===A.solution?"Error 8":A.solution;return"Error 7"}(A,e)}function FA(){this.move=Array(31),this.corn=Array(20),this.csym=Array(20),this.mid3=Array(20),this.e1=Array(20),this.e2=Array(20),this.twist=Array(6),this.tsym=Array(6),this.flip=Array(6),this.fsym=Array(6),this.slice_0=Array(6),this.corn0=Array(6),this.csym0=Array(6),this.mid30=Array(6),this.e10=Array(6),this.e20=Array(6),this.prun=Array(6),this.count=Array(6),this.f=Array(54)}function NA(A){XA||(!function(){y;var i,A;SA=[[8,9,20],[6,18,38],[0,36,47],[2,45,11],[29,26,15],[27,44,24],[33,53,42],[35,17,51]];YA=[[5,10],[7,19],[3,37],[1,46],[32,16],[28,25],[30,43],[34,52],[23,12],[21,41],[50,39],[48,14]];kA=[[0,1,2],[0,2,4],[0,4,5],[0,5,1],[3,2,1],[3,4,2],[3,5,4],[3,1,5]];PA=[[0,1],[0,2],[0,4],[0,5],[3,1],[3,2],[3,4],[3,5],[2,1],[2,4],[5,4],[5,1]];RA=E(12,12);LA=[1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600];WA=["U ","U2","U'","R ","R2","R'","F ","F2","F'","D ","D2","D'","L ","L2","L'","B ","B2","B'"];JA=[0,1,2,4,7,9,10,11,13,16];VA=Array(18);HA=E(19,18);xA=E(11,10);zA=Array(24);UA=[[11,10,9],[10,11,9],[11,9,10],[9,11,10],[10,9,11],[9,10,11]];for(i=0;i<10;++i)VA[JA[i]]=i;for(i=0;i<18;++i){for(A=0;A<18;++A)HA[i][A]=~~(i/3)==~~(A/3)||~~(i/3)%3==~~(A/3)%3&&i>=A;HA[18][i]=!1}for(i=0;i<10;++i){for(A=0;A<10;++A)xA[i][A]=HA[JA[i]][JA[A]];xA[10][i]=!1}for(i=0;i<12;++i)for(A=0;A<12;++A)RA[i][A]=0;for(i=0;i<12;++i)for(RA[i][0]=1,RA[i][i]=1,A=1;A<i;++A)RA[i][A]=RA[i-1][A-1]+RA[i-1][A];for(i=0;i<24;++i)zA[i]=_A(i)}(),A("[0/9] Initializing Cubie Cube..."),I(),EA=Array(2048),bA=Array(2187),yA=Array(40320),A("[1/9] Initializing Sym2Raw..."),function(){var a,b,A,r,e,i,t,n,o,mask,c,s;for(A=new O,e=new O,c=Array(1260),r=0,i=0;i<64;c[i++]=0);for(i=0;i<2048;++i)if(0==(c[i>>>5]&1<<(31&i))){for(W(A,i),s=0;s<16;s+=2)rA(oA[lA[s]],A,mA),rA(mA,oA[s],e),c[(t=Z(e))>>>5]|=1<<(31&t),EA[t]=r<<3|s>>>1;aA[r++]=i}for(r=0,i=0;i<69;c[i++]=0);for(i=0;i<2187;++i)if(0==(c[i>>>5]&1<<(31&i))){for(V(A,i),s=0;s<16;s+=2)T(oA[lA[s]],A,mA),T(mA,oA[s],e),c[(t=k(e))>>>5]|=1<<(31&t),bA[t]=r<<3|s>>>1;wA[r++]=i}for((mask=Array(2))[0]=Array(56),mask[1]=Array(56),i=0;i<56;++i)mask[0][i]=mask[1][i]=0;for(i=0;i<40320;++i)tA(A.ep,i),a=~~(Y(A)/6),mask[(b=~~(F(A)/6))>>5][a]|=1<<(31&b);for(i=0;i<56;++i)for(r=0,n=0;n<56;++n)0!=(mask[n>>5][i]&1<<(31&n))&&(dA[i][n]=r++);for(r=0,i=0;i<1260;c[i++]=0);for(i=0;i<40320;++i)if(0==(c[i>>>5]&1<<(31&i))){for(tA(A.ep,i),s=0;s<16;++s)rA(oA[lA[s]],A,mA),rA(mA,oA[s],e),c[(t=eA(e.ep))>>>5]|=1<<(31&t),a=Y(e),b=F(e),o=4032*dA[~~(a/6)][~~(b/6)]+12*a+b%6*2+KA(t),cA[o]=r<<4|s,yA[t]=r<<4|s;iA[r++]=i}}(),A("[2/9] Initializing CoordCube..."),D(),A("[3/9] Initializing Perm, Flip, and Twist Moves..."),function(){var A,r,i,t;for(A=new O,r=new O,i=0;i<2768;++i)for(tA(A.cp,nA[i]),t=0;t<18;++t)j(A,DA[t],r),e[i][t]=M(r)}(),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<2768;++i)for(tA(A.ep,iA[i]),e=0;e<10;++e)rA(A,DA[JA[e]],r),t[i][e]=N(r)}(),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<336;++i)for(W(A,aA[i]),e=0;e<18;++e)rA(A,DA[e],r),n[i][e]=R(r)}(),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<324;++i)for(V(A,wA[i]),e=0;e<18;++e)j(A,DA[e],r),d[i][e]=S(r)}(),A("[4/9] Initializing UDSlice..."),yA=null,EA=null,bA=null,function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<495;++i)for(J(A,i),e=0;e<18;++e)rA(A,DA[e],r),v[i][e]=P(r)}(),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<495;++i)for(J(A,i),e=0;e<16;e+=2)AA(A,lA[e],r),m[i][e>>>1]=P(r)}(),A("[5/9] Initializing Mid3Move..."),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<1320;++i)for(U(A,i),e=0;e<18;++e)rA(A,DA[e],r),w[i][e]=x(r)}(),function(){var A,i;for(A=new O,i=0;i<24;++i)z(A,i),h[x(A)%24]=i}(),function(){var i;for(i=0;i<346;++i)r[i]=0;for(i=0;i<2768;++i)r[i>>>3]=r[i>>>3]|KA(nA[i])<<(7&i)}(),A("[6/9] Initializing Perms..."),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<24;++i)for(z(A,i),e=0;e<10;++e)rA(A,DA[JA[e]],r),l[i][e]=H(r)}(),function(){var A,r,i,e;for(A=new O,r=new O,i=0;i<24;++i)for(z(A,i),e=0;e<16;++e)AA(A,lA[e],r),f[i][e]=H(r)}(),A("[7/9] Initializing TwistFlipSlicePrun..."),function(A){var r,e,t,o,c,f,l,h,w,y,E,D,i,I,G,M,F,N,R,select,H,x,S,P,Y,L,z,U;for(r=Array(324),t=new O,c=new O,i=0;i<324;++i)for(r[i]=0,V(t,wA[i]),F=0;F<8;++F)T(oA[lA[F<<1]],t,mA),T(mA,oA[F<<1],c),65535!=jA(wA,k(c))&&(r[i]=r[i]|1<<F);for(e=Array(336),i=0;i<336;++i)for(e[i]=0,W(t,aA[i]),F=0;F<8;++F)rA(oA[lA[F<<1]],t,mA),rA(mA,oA[F<<1],c),65535!=jA(aA,Z(c))&&(e[i]=e[i]|1<<F);for(i=0;i<870912;++i)B[i]=-1;for(i=0;i<8;++i)B[i]=0;for(f=0,l=8;l<870912;){for(select=(M=f>6)?-1:f,o=M?f:-1,++f,i=0;i<870912;++i)if(B[i]==select)for(z=~~(i/2688),h=i%2688,y=7&i,h>>>=3,R=0;R<18;++R)if(L=7&(U=d[z][R]),U>>>=3,w=n[h][sA[y][R]],E=uA[fA[7&w][y]][L],B[I=2688*U+((w>>>=3)<<3|E)]===o){if(++l,M){B[i]=f;break}if(B[I]=f,S=r[U],P=e[w],1!=S||1!=P)for(F=0;F<8;++F,P>>=1)if(1==(1&P))for(D=uA[E][F],N=0;N<8;++N)0!=(S&1<<N)&&(G=2688*U+(w<<3|uA[D][N]),-1===B[G]&&(B[G]=f,++l))}l/870912>.01&&A("TwistFlipPrun: "+Math.floor(100*l/870912)+"% ("+l+"/870912)")}for(i=0;i<160380;++i)C[i]=-1;for(C[0]=0,f=0,l=1;l<160380;){for(select=(M=f>6)?-1:f,o=M?f:-1,++f,i=0;i<160380;++i)if(C[i]===select)for(H=i%495,z=~~(i/495),R=0;R<18;++R)if(Y=7&(U=d[z][R]),x=m[v[H][R]][Y],C[I=495*(U>>>=3)+x]===o){if(++l,M){C[i]=f;break}if(C[I]=f,1!=(S=r[U]))for(F=1;F<8;++F)1==(1&(S>>=1))&&(G=495*U+m[x][F],-1===C[G]&&(C[G]=f,++l))}l/160380>.01&&A("UDSliceTwistPrun: "+Math.floor(100*l/160380)+"% ("+l+"/160380)")}for(i=0;i<166320;++i)Q[i]=-1;for(Q[0]=0,f=0,l=1;l<166320;){for(select=(M=f>6)?-1:f,o=M?f:-1,++f,i=0;i<166320;++i)if(Q[i]===select)for(H=i%495,h=~~(i/495),R=0;R<18;++R)if(Y=7&(w=n[h][R]),x=m[v[H][R]][Y],Q[I=495*(w>>>=3)+x]===o){if(++l,M){Q[i]=f;break}if(Q[I]=f,1!=(S=e[w]))for(F=1;F<8;++F)1==(1&(S>>=1))&&(G=495*w+m[x][F],-1===Q[G]&&(Q[G]=f,++l))}l/166320>.01&&A("UDSliceFlipPrun: "+Math.floor(100*l/166320)+"% ("+l+"/166320)")}}(A),A("[8/9] Initializing MCEPermPrum..."),function(A){var r,n,h,w,B,d,m,Q,v,C,i,y,E,D,I,G,M,F,select,N,Z;for(n=new O,d=new O,m=0,Q=1,r=Array(2768),i=0;i<2768;++i)for(r[i]=0,tA(n.ep,iA[i]),I=1;I<16;++I)rA(oA[lA[I]],n,mA),rA(mA,oA[I],d),65535!=jA(iA,eA(d.ep))&&(r[i]=r[i]|1<<I);for(i=0;i<66432;++i)c[i]=-1;for(c[0]=0;Q<66432;){for(select=(D=m>7)?-1:m,h=D?m:-1,++m,i=0;i<66432;++i)if(c[i]===select)for(M=i%24,v=~~(i/24),G=0;G<10;++G)if(Z=15&(C=t[v][G]),F=f[l[M][G]][Z],c[y=24*(C>>>=4)+F]===h){if(++Q,D){c[i]=m;break}if(c[y]=m,0!=(N=r[C]))for(I=1;I<16;++I)1==(1&(N>>=1))&&(E=24*C+f[F][I],-1===c[E]&&(c[E]=m,++Q))}Q/66432>.01&&A("MEPermPrun: "+Math.floor(100*Q/66432)+"% ("+Q+"/66432)")}for(i=0;i<66432;++i)o[i]=-1;for(o[0]=0,m=0,Q=1;Q<66432;){for(select=(D=m>7)?-1:m,h=D?m:-1,++m,i=0;i<66432;++i)if(o[i]===select)for(M=i%24,w=~~(i/24),G=0;G<10;++G)if(Z=15&(B=e[w][JA[G]]),F=f[l[M][G]][Z],o[y=24*(B>>>=4)+F]===h){if(++Q,D){o[i]=m;break}if(o[y]=m,0!=(N=r[B]))for(I=1;I<16;++I)1==(1&(N>>=1))&&(E=24*B+f[F][I^BA[I]],-1===o[E]&&(o[E]=m,++Q))}Q/66432>.01&&A("MCPermPrun: "+Math.floor(100*Q/66432)+"% ("+Q+"/66432)")}}(A),A("[9/9] Done initializing 3x3x3..."),XA=!0)}function ZA(){var A,r;do{r=Math.floor(479001600*qA.random()),A=Math.floor(40320*qA.random())}while(0!=(KA(A)^OA(r)));return function(A){var r,e,t,i,n,o,c,f;for(t=Array(54),f=[85,82,70,68,76,66],i=0;i<54;++i)t[i]=f[~~(i/9)];for(r=0;r<8;++r)for(n=A.cp[r],c=A.co[r],o=0;o<3;++o)t[SA[r][(o+c)%3]]=f[kA[n][o]];for(e=0;e<12;++e)for(n=A.ep[e],c=A.eo[e],o=0;o<2;++o)t[YA[e][(o+c)%2]]=f[PA[n][o]];return String.fromCharCode.apply(null,t)}(new K(A,Math.floor(2187*qA.random()),r,Math.floor(2048*qA.random())))}(A=FA.prototype).inverse=!1,A.length1=0,A.maxlength2=0,A.sol=999,A.solution=null,A.urfidx=0,A.useSeparator=!1,A.valid1=0,A.valid2=0;var RA,HA,xA,kA,SA,PA,YA,LA,WA,zA,UA,VA,JA,XA=!1;function jA(A,r){var e,t,n,o,c;if(r<=A[(t=A.length)-1])for(e=0,o=t-1;e<=o;)if(r>(c=A[n=e+o>>>1]))e=n+1;else{if(!(r<c))return n;o=n-1}return 65535}function TA(i){return(i=(858993459&(i-=i>>>1&1431655765))+(i>>>2&858993459))+(i>>>8)+(i>>>4)&15}function OA(A){var i,p;for(p=0,i=10;i>=0;--i)p+=A%(12-i),A=~~(A/(12-i));return p&=1}function _A(A){var i,p;for(p=0,i=2;i>=0;--i)p+=A%(4-i),A=~~(A/(4-i));return p&=1}function KA(A){var i,p;for(p=0,i=6;i>=0;--i)p+=A%(8-i),A=~~(A/(8-i));return p&=1}var qA=void 0,$A=function(A){qA=A},Ar=[[[0,1,2],[3,4,5],[6,7,8]],[[9,10,11],[12,13,14],[15,16,17]],[[18,19,20],[21,22,23],[24,25,26]],[[36,37,38],[39,40,41],[42,43,44]],[[45,46,47],[48,49,50],[51,52,53]],[[27,28,29],[30,31,32],[33,34,35]]],rr=[[60,20],[100,60],[60,60],[20,60],[140,60],[60,100]];var er=function(A,r,e){var t=Math.min(A/160,r/120);return[e[0]*t+(A-160*t)/2,e[1]*t+(r-120*t)/2]};function nr(A,r,e,t,n,o,c){for(var col,f=[t-o,t-o,t+o,t+o],l=[n-o,n+o,n+o,n-o],h="",i=0;i<f.length;i++){var w=er(r,e,[f[i],l[i]]);h+=(0===i?"M":"L")+w[0]+","+w[1]}h+="z",A.path(h).attr({fill:(col=c,"r"===col?"#FF0000":"o"===col?"#FF8000":"b"===col?"#0000FF":"g"===col?"#00FF00":"y"===col?"#FFFF00":"w"===col?"#FFFFFF":"x"===col?"#000000":void 0),stroke:"#000"})}var or,ir=!1;return{version:"December 29, 2011",initialize:function(A){return ir=!1,function(A,r,e){"function"!=typeof e&&(e=function(){}),ir||(or=new FA,NA(e),$A(r),ir=!0),A&&setTimeout(A,0)}(void 0,A)},setRandomSource:$A,getRandomScramble:function(){return(A=ZA(),{state:A,scramble_string:MA(or,A)}).scramble_string.trim();var A},drawScramble:function(A,r,e,t){for(var n={U:"wrgoby"[0],R:"wrgoby"[1],F:"wrgoby"[2],L:"wrgoby"[3],B:"wrgoby"[4],D:"wrgoby"[5]},o=Raphael(A,e,t),c=r+" URFLBD",i=0;i<6;i++)for(var f=0;f<3;f++)for(var l=0;l<3;l++){var h=c[Ar[i][f][l]];nr(o,e,t,rr[i][0]+12*(l-1),rr[i][1]+12*(f-1),6,n[h])}},setScrambleLength:function(){}}}(),A.exports=scrambler}}]);