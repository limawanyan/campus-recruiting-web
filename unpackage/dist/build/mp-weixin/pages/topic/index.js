(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/topic/index"],{"017c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a"));function u(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,r,u,i,a){try{var o=t[i](a),c=o.value}catch(s){return void n(s)}o.done?e(c):Promise.resolve(c).then(r,u)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,u){var a=t.apply(e,n);function o(t){i(a,r,u,o,c,"next",t)}function c(t){i(a,r,u,o,c,"throw",t)}o(void 0)}))}}var o={data:function(){return{keyword:"",parentType:2,list:[],sorts:[{tag_id:1,tag_name:"最热"},{tag_id:2,tag_name:"新回复"},{tag_id:3,tag_name:"新发布"}],current:0,tabsHeight:0,releaseShow:!1,loadingstatus:"loadmore"}},onLoad:function(){var t=this;return a(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.api.getDictionaryItem({code:"interview_subject_type"});case 2:return n=e.sent,n.list.forEach((function(e,n){t.list.push({name:e.label,cate_id:e.value,list:[],sort:0,page:0,pageSize:10,total:0,loadingstatus:"loadmore"})})),e.next=6,t.getList();case 6:case"end":return e.stop()}}),e)})))()},onShow:function(){this.current=0,this.list[this.current].sort=0},methods:{goDetail:function(e){t.navigateTo({url:"/pages/topic/details?id="+e})},toUrl:function(t){this.$u.route(t)},getCate:function(t){var e=this;e.list[t].cate_id},reachBottom:function(){var t=this;return a(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("nomore"!=t.list[t.current].loadingstatus){e.next=4;break}t.loadingstatus="nomore",e.next=6;break;case 4:return e.next=6,t.getList();case 6:case"end":return e.stop()}}),e)})))()},getList:function(){var t=this;return a(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.api.getPostInfoListBySearch({page:t.list[t.current].page+1,pageSize:10,parentType:t.parentType,subType:t.list[t.current].cate_id,sortType:t.sorts[t.list[t.current].sort].tag_id,keyWord:t.keyword});case 2:n=e.sent,t.list[t.current].page=n.pagination.currentPage,t.list[t.current].pageSize=n.pagination.perPageCount,t.list[t.current].total=n.pagination.total,t.list[t.current].list=t.list[t.current].list.concat(n.list),n.pagination.currentPage*n.pagination.perPageCount>=n.pagination.total&&(t.list[t.current].loadingstatus="nomore");case 8:case"end":return e.stop()}}),e)})))()},change:function(t){var e=this;return a(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.current=t,e.list[e.current].sort=0,""!=e.keyword&&(e.list[e.current].list=[],e.list[e.current].page=0),n.next=5,e.getList();case 5:case"end":return n.stop()}}),n)})))()},changeSort:function(t){var e=this;return a(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.list[e.current].sort=t,e.list[e.current].list=[],e.list[e.current].page=0,n.next=5,e.getList();case 5:case"end":return n.stop()}}),n)})))()},search:function(){var t=this;return a(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.list[t.current].list=[],t.list[t.current].page=0,e.next=4,t.getList();case 4:case"end":return e.stop()}}),e)})))()},clear:function(){var t=this;return a(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.list[t.current].list=[],t.list[t.current].page=0,e.next=4,t.getList();case 4:case"end":return e.stop()}}),e)})))()}}};e.default=o}).call(this,n("543d")["default"])},"2b0b":function(t,e,n){"use strict";n.r(e);var r=n("017c"),u=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=u.a},"6c9b":function(t,e,n){"use strict";var r=n("ce83"),u=n.n(r);u.a},"7d33":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var r={uSearch:function(){return n.e("uview-ui/components/u-search/u-search").then(n.bind(null,"8471"))},uTabsSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-tabs-swiper/u-tabs-swiper")]).then(n.bind(null,"8b28"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"0e16"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"49cd"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"8eda"))}},u=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.releaseShow=!0})},i=[]},ce83:function(t,e,n){},d47f:function(t,e,n){"use strict";(function(t){n("fef4");r(n("66fd"));var e=r(n("d78b"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},d78b:function(t,e,n){"use strict";n.r(e);var r=n("7d33"),u=n("2b0b");for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);n("6c9b");var a,o=n("f0c5"),c=Object(o["a"])(u["default"],r["b"],r["c"],!1,null,"55ccd37d",null,!1,r["a"],a);e["default"]=c.exports}},[["d47f","common/runtime","common/vendor"]]]);