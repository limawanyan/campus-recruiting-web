(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/mp-html/components/mp-html/mp-html"],{"10d1":function(t,e,n){"use strict";var o=n("1c01"),i=n.n(o);i.a},1566:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("40c0"));function i(t){return t&&t.__esModule?t:{default:t}}var r=function(){n.e("uni_modules/mp-html/components/mp-html/node/node").then(function(){return resolve(n("d010"))}.bind(null,n)).catch(n.oe)},a=[],l={name:"mp-html",data:function(){return{nodes:[]}},props:{containerStyle:{type:String,default:""},content:{type:String,default:""},copyLink:{type:[Boolean,String],default:!0},domain:String,errorImg:{type:String,default:""},lazyLoad:{type:[Boolean,String],default:!1},loadingImg:{type:String,default:""},pauseVideo:{type:[Boolean,String],default:!0},previewImg:{type:[Boolean,String],default:!0},scrollTable:[Boolean,String],selectable:[Boolean,String],setTitle:{type:[Boolean,String],default:!0},showImgMenu:{type:[Boolean,String],default:!0},tagStyle:Object,useAnchor:[Boolean,Number]},components:{node:r},watch:{content:function(t){this.setContent(t)}},created:function(){this.plugins=[];for(var t=a.length;t--;)this.plugins.push(new a[t](this))},mounted:function(){this.content&&!this.nodes.length&&this.setContent(this.content)},beforeDestroy:function(){this._hook("onDetached"),clearInterval(this._timer)},methods:{in:function(t,e,n){t&&e&&n&&(this._in={page:t,selector:e,scrollTop:n})},navigateTo:function(e,n){var o=this;return new Promise((function(i,r){if(o.useAnchor){n=n||parseInt(o.useAnchor)||0;var a=" ";a=">>>";var l=t.createSelectorQuery().in(o._in?o._in.page:o).select((o._in?o._in.selector:"._root")+(e?"".concat(a,"#").concat(e):"")).boundingClientRect();o._in?l.select(o._in.selector).scrollOffset().select(o._in.selector).boundingClientRect():l.selectViewport().scrollOffset(),l.exec((function(e){if(e[0]){var a=e[1].scrollTop+e[0].top-(e[2]?e[2].top:0)+n;o._in?o._in.page[o._in.scrollTop]=a:t.pageScrollTo({scrollTop:a,duration:300}),i()}else r(Error("Label not found"))}))}else r(Error("Anchor is disabled"))}))},getText:function(t){var e="";return function t(n){for(var o=0;o<n.length;o++){var i=n[o];if("text"===i.type)e+=i.text.replace(/&amp;/g,"&");else if("br"===i.name)e+="\n";else{var r="p"===i.name||"div"===i.name||"tr"===i.name||"li"===i.name||"h"===i.name[0]&&i.name[1]>"0"&&i.name[1]<"7";r&&e&&"\n"!==e[e.length-1]&&(e+="\n"),i.children&&t(i.children),r&&"\n"!==e[e.length-1]?e+="\n":"td"!==i.name&&"th"!==i.name||(e+="\t")}}}(t||this.nodes),e},getRect:function(){var e=this;return new Promise((function(n,o){t.createSelectorQuery().in(e).select("#_root").boundingClientRect().exec((function(t){return t[0]?n(t[0]):o(Error("Root label not found"))}))}))},pauseMedia:function(){for(var t=(this._videos||[]).length;t--;)this._videos[t].pause()},setContent:function(t,e){var n=this;e&&this.imgList||(this.imgList=[]);var i,r=new o.default(this).parse(t);this.$set(this,"nodes",e?(this.nodes||[]).concat(r):r),this._videos=[],this.$nextTick((function(){n._hook("onLoad"),n.$emit("load")})),clearInterval(this._timer),this._timer=setInterval((function(){n.getRect().then((function(t){t.height===i&&(n.$emit("ready",t),clearInterval(n._timer)),i=t.height})).catch((function(){}))}),350)},_hook:function(t){for(var e=a.length;e--;)this.plugins[e][t]&&this.plugins[e][t]()}}};e.default=l}).call(this,n("543d")["default"])},"1c01":function(t,e,n){},2028:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"450a":function(t,e,n){"use strict";n.r(e);var o=n("2028"),i=n("ae9c");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("10d1");var a,l=n("f0c5"),c=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=c.exports},ae9c:function(t,e,n){"use strict";n.r(e);var o=n("1566"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/mp-html/components/mp-html/mp-html-create-component',
    {
        'uni_modules/mp-html/components/mp-html/mp-html-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("450a"))
        })
    },
    [['uni_modules/mp-html/components/mp-html/mp-html-create-component']]
]);
