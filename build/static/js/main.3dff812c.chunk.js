(this.webpackJsonplcard=this.webpackJsonplcard||[]).push([[3],{106:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n(18),i=n.n(c),u=(n(76),n(118)),o=n(119),a=n(113),s=Object(a.a)({palette:{primary:{main:"#F4A300",light:"#f4b700",contrastText:"#ffffff"},secondary:{main:"#3B7CAD"},text:{secondary:"#A5A5A5"}},typography:{h6:{fontWeight:600},h5:{fontWeight:600},subtitle2:{color:"#757575"},body2:{fontSize:15}},props:{MuiTextField:{variant:"outlined"},MuiFormControl:{variant:"outlined"}},overrides:{MuiButton:{label:{textTransform:"capitalize",fontWeight:600}}}}),l=n(26),d=n(3),f=n(46),b=n(41),O=n(21),j=n(2),p=Object(r.createContext)(null),E=function(t){var e=t.children;return Object(r.useEffect)((function(){b.d.interceptors.response.use((function(t){var e=t.data;return e.error&&O.b.error(e.message),t}),(function(t){var e;throw O.b.error((null===(e=t.response)||void 0===e?void 0:e.data.message)||t.message),t}))}),[]),Object(j.jsx)(p.Provider,{value:null,children:e})},h=(n(102),Object(r.createContext)(null)),T=function(t){var e=t.children;return Object(j.jsxs)(h.Provider,{value:null,children:[e,Object(j.jsx)(O.a,{})]})},m=(n(103),n(104),n(42)),S=n(38),g=n(50),v=Object(S.e)(Object(S.c)({urlBuilder:g.a})),x=function(){return Object(j.jsx)(l.a,{children:Object(j.jsx)(u.a,{theme:s,children:Object(j.jsx)(o.b,{injectFirst:!0,children:Object(j.jsx)(r.Suspense,{fallback:"Loading...",children:Object(j.jsx)(T,{children:Object(j.jsx)(m.a,{store:v,children:Object(j.jsx)(E,{children:Object(j.jsx)(d.d,{children:Object(j.jsx)(f.b,{})})})})})})})})})},I=function(t){t&&t instanceof Function&&n.e(12).then(n.bind(null,632)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,i=e.getLCP,u=e.getTTFB;n(t),r(t),c(t),i(t),u(t)}))};i.a.render(Object(j.jsx)(x,{}),document.getElementById("root")),I()},41:function(t,e,n){"use strict";n.d(e,"a",(function(){return a.a})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"g",(function(){return d})),n.d(e,"e",(function(){return f})),n.d(e,"h",(function(){return b})),n.d(e,"j",(function(){return O})),n.d(e,"f",(function(){return j})),n.d(e,"i",(function(){return p})),n.d(e,"k",(function(){return E})),n.d(e,"d",(function(){return h}));var r,c,i=n(44),u=n(67),o=n.n(u),a=n(49);!function(t){t.GETURLBUILDER="/url-design",t.SETINFORMATIONS="/url-design/info",t.SETABOUTME="/url-design/about-me",t.SETSOCIALNETWORKS="/url-design/social-links",t.SETVIDEO="/url-design/video",t.SETIMAGES="/url-design/images",t.SETTESTIMONIALS="/url-design/testimonials"}(r||(r={})),function(t){t.Regular="REGULAR",t.Embeded="EMBEDED"}(c||(c={}));var s,l=function(){return h.get(r.GETURLBUILDER)},d=function(t){return h.post(r.SETINFORMATIONS,t)},f=function(t){return h.post(r.SETABOUTME,{text:t})},b=function(t){return h.post(r.SETSOCIALNETWORKS,t)},O=function(t){return h.post(r.SETVIDEO,t)},j=function(t){return h.post(r.SETIMAGES,t)},p=function(t){return h.post(r.SETTESTIMONIALS,t)};!function(t){t.UPLOAD="/user-file/upload"}(s||(s={}));var E=function(t){var e=new FormData;return e.append("file",t),h.post(s.UPLOAD,e,{headers:{"Content-Type":"multipart/form-data"}})},h=o.a.create({baseURL:i.a});h.interceptors.request.use((function(t){return t.headers.Authorization="Barer "+localStorage.token,t}))},44:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r="https://lcard.startify.dev:8000"},45:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.SET_BUILDER_DATA="SET_BUILDER_DATA"}(r||(r={}))},46:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return T}));var r,c=n(0),i=n(19),u=n(24),o=n(3),a=n(30),s=n(65),l=n(117),d=n(120),f=n(2),b=function(t){var e=Object(a.a)("token"),n=Object(u.a)(e,1)[0];if(!n)return Object(f.jsx)(o.a,{to:{pathname:r.LOGIN}});var c=Object(s.a)(n,{});return Object(l.a)(c.exp||0,Object(d.a)(new Date))?Object(f.jsx)(o.b,Object(i.a)({},t)):(localStorage.clear(),Object(f.jsx)(o.a,{to:{pathname:r.LOGIN}}))},O=function(t){var e=Object(a.a)("token");return Object(u.a)(e,1)[0]?Object(f.jsx)(o.a,{to:{pathname:r.URLDESIGNER}}):Object(f.jsx)(o.b,Object(i.a)({},t))},j=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(8)]).then(n.bind(null,609))})),p=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(9),n.e(10)]).then(n.bind(null,641))})),E=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(11)]).then(n.bind(null,642))})),h=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(7)]).then(n.bind(null,633))}));function T(){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(O,{exact:!0,path:r.LOGIN,component:j}),Object(f.jsx)(O,{exact:!0,path:r.SIGNUP,component:p}),Object(f.jsx)(O,{exact:!0,path:r.VERIFYACCOUNT,component:E}),Object(f.jsx)(b,{exact:!0,path:r.URLDESIGNER,component:h})]})}!function(t){t.HOME="/",t.LOGIN="/login",t.SIGNUP="/signup",t.VERIFYACCOUNT="/verify-account",t.URLDESIGNER="/url-designer"}(r||(r={}))},49:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.LOGIN="/users/login",t.LOGOUT="/users/logout",t.SIGNUP="/users/signup",t.ACTIVATE="/users/activate"}(r||(r={}))},50:function(t,e,n){"use strict";var r=n(19),c=n(45),i={userId:"",info:{phoneNumber:"",email:"",calendar:"",location:"",website:"",links:[]},aboutMe:{text:""},socialNetworks:[],video:{file:{_id:"",fileName:"",filePath:"",mimeType:"",createdAt:"",updatedAt:"",__v:0}},images:[],testimonials:[],customCTA:null,appStores:null,contactForm:null};e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case c.a.SET_BUILDER_DATA:return Object(r.a)({},e.data);default:return t}}},76:function(t,e,n){}},[[106,4,6]]]);
//# sourceMappingURL=main.3dff812c.chunk.js.map