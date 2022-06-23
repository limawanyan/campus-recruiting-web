(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/comment/comment"],{"688e":function(t,e,n){},bf36:function(t,e,n){"use strict";var i=n("688e"),o=n.n(i);o.a},d8b8:function(t,e,n){"use strict";n.r(e);var i=n("ed51"),o=n("f371");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("bf36");var r,a=n("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"6a339d7e",null,!1,i["a"],r);e["default"]=c.exports},ed51:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},u=[]},f371:function(t,e,n){"use strict";n.r(e);var i=n("f4a1"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},f4a1:function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"comment",props:{commentList:{type:Array,default:function(){return[]}},commentCountTotal:{type:Number,default:0},isNewest:{type:Boolean,default:!0}},data:function(){return{}},methods:{replyComment:function(t){var e={data:t};this.$emit("reply",e)},tapcommentlike:function(t,e){var n=i({id:t,index:e},"index",e);this.$emit("tapLikes",n)},showRecommendList:function(){this.$emit("showRecommendList")},showNewestList:function(){this.$emit("showNewestList")}}};e.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/comment/comment-create-component',
    {
        'components/comment/comment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d8b8"))
        })
    },
    [['components/comment/comment-create-component']]
]);
