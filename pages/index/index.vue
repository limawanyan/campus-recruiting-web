<template>
	<view class="wrap">
		<view class="u-tabs-box u-margin-top-20" style="padding: 0 20upx;">
			<!-- 顶部搜索 通知 发布按钮 -->
			<view class="searchbox">
				<!-- @click="toUrl('/pages/search/search')" -->
				<u-search class="search_input" v-model="keyword" placeholder="搜索面经" :disabled="false" shape="square"
					:show-action="false" :animation="true" :clearabled="true" @search="search" @clear="clear">
				</u-search>
				<!-- 通知显示 -->
				<view class="u-padding-10" style="position: relative;" @tap="toUrl('/pages/center/news')">
					<text class="iconfont icon-tongzhi"></text>
					<!-- <u-badge :is-dot="true" style="top:5upx;right: 5upx;" type="error"></u-badge> -->
				</view>
				<!-- 发布帖子按钮 -->
				<view class="u-padding-10" @click="releaseShow = true">
					<text class="iconfont icon-jiahao"></text>
				</view>
			</view>
			<!-- 选项卡 
			 is-scroll(默认为true)，配置tabsSwiper组件的内容是否可以左右拖动
			 name="cate_name" count="cate_count" 设置读取的key名称
			 activeColor 激活颜色
			 
			 current为初始化tabsSwiper的激活tab索引，默认为 0
			 -->
			<u-tabs-swiper activeColor="#0081ff" ref="tabs" :list="list" :current="current" @change="change"
				:is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			<!-- 二级选项卡 -->
			<scroll-view class="u-m-l-10" scroll-x style="height: 100upx;width: 100%;">
				<view class="tags">
					<view @click="changeSort(index)" class="tag"
						:class="{'active': list[current] === undefined ? false : (list[current].sort == index) }"
						v-for="(item, index) in sorts">{{item.tag_name}}</view>
				</view>
			</scroll-view>
		</view>

		<!-- 帖子列表 -->
		<scroll-view scroll-y style="height: 85%;width: 100%;background: #f3f3f3;" @scrolltolower="reachBottom">
			<view class="page-box">
				<view class="order" @tap="goDetail(res.id)"
					v-for="(res, index) in list[current].list" :key="index">

					<view>
						<view class="item">
							<view class="content">
								<!-- 用户信息 -->
								<view class="userInfo">
									<image class="userHead" :src="res.user.head"></image>
									<view class="center">
										<text class="userName">{{res.user.name}}</text>
										<view class="userTag">
											<text>{{res.user.intentionalWork}}</text>
											<text class="grade">-{{res.user.graduation}}</text>
										</view>
									</view>
								</view>
								<!-- 帖子标题 -->
								<view class="title u-line-2" style="font-weight: bold;font-size: 30upx;">
									{{res.title}}
								</view>
								<!-- 帖子摘要 -->
								<view class="summary u-line-3">
									{{res.content | filter_content }}
								</view>
							</view>
						</view>
						<!-- 底部 点赞 评论 浏览量 -->
						<view class="bottom">
							<!-- 浏览量 -->
							<view>
								<u-icon color="#cecfd1" labelColor="#919192" size="40" labelSize="20" name="eye"
									:label="res.browseNum"></u-icon>
							</view>
							<!-- 评论数量 -->
							<view>
								<u-icon color="#cecfd1" labelColor="#919192" size="40" labelSize="20" name="chat"
									:label="res.commentNum"></u-icon>
							</view>
							<!-- 点赞数量 -->
							<view>
								<u-icon color="#cecfd1" labelColor="#919192" size="40" labelSize="20" name="thumb-up"
									:label="res.likeNum"></u-icon>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 加载更多 -->
			<u-loadmore class="loadmore" :status="loadingstatus" bgColor="#f2f2f2"></u-loadmore>
		</scroll-view>

		<!-- 发布帖子弹出框 -->
		<u-popup v-model="releaseShow" mode="bottom" border-radius="20" length="30%">
			<view class="u-font-sm u-text-center u-padding-20">
				选择你想发布的内容在社区分享
			</view>
			<view class="">
				<view class="fabu_box">
					<view class="fabu_mianjin" @click="toUrl('/pages/index/release')">
						<view class="release_item">
							<image class="fabu_photo" src="../../static/xinqiu.png"></image>
							<view class="u-m-l-10">分享面经</view>
						</view>
					</view>
					<view class="fabu_mianti">
						<view class="release_item" @click="toUrl('/pages/topic/release')">
							<image class="fabu_photo" src="../../static/timu.png"></image>
							<view class="u-m-l-10">爆料面题</view>
						</view>
					</view>
				</view>
				<view class="fabu_xinzi" offset="1" span="10">
					<view class="release_item" @click="toUrl('/pages/salary/release')">
						<image class="fabu_photo" src="../../static/qiandai.png"></image>
						<view class="u-m-l-10">薪资爆料</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '', // 搜索关键字
				parentType: 1, // 父级板块类型
				list: [],
				sorts: [{
						tag_id: 1,
						tag_name: "最热"
					},
					{
						tag_id: 2,
						tag_name: "新回复"
					},
					{
						tag_id: 3,
						tag_name: "新发布"
					}
				],
				current: 0, // 类别
				tabsHeight: 0,
				releaseShow: false,
				loadingstatus: "loadmore",
			};
		},
		filters: {
			filter_content(value) {
				return value.replace(/[^\u4e00-\u9fa5]/gi, "")
			},
		},
		async onLoad() {
			const types = await this.$u.api.getDictionaryItem({
				code: "interview_experience_type"
			})
			types.list.forEach((elem, index) => {
				this.list.push({
					name: elem.label, // 子级板块名称
					cate_id: elem.value, // 子级板块ID
					list: [], // 数据列表
					sort: 0, // 排序方式索引
					page: 0, // 当前页码
					pageSize: 10, // 一页数据条数
					total: 0, // 总条数
					loadingstatus: "loadmore", // 加载更多
				})
			});
			// 初始化数据
			await this.getList()
		},
		onShow() {
			this.current = 0
			if (this.list != undefined && this.list != null) {
				this.list[this.current].sort = 0
			}
		},
		methods: {
			toUrl(url) {
				this.$u.route(url);
			},
			goDetail(postId) {
				uni.navigateTo({
					url: '/pages/index/details?id=' + postId
				})
			},
			getCate(idx) {
				let _this = this
				let cate_id = _this.list[idx].cate_id
			},
			async reachBottom() {
				if (this.list[this.current].loadingstatus == "nomore") {
					this.loadingstatus = "nomore"
				} else {
					await this.getList()
				}
			},
			// 请求数据
			async getList() {
				let page = 0
				let subType = 0
				let sortType = 0
				if (this.list != undefined && this.list != null) {
					page = this.list[this.current].page + 1
					subType = this.list[this.current].cate_id
					sortType = this.sorts[this.list[this.current].sort].tag_id
				}
				const res = await this.$u.api.getPostInfoListBySearch({
					page: page,
					pageSize: 10,
					parentType: this.parentType,
					subType: subType,
					sortType: sortType,
					keyWord: this.keyword,
				})
				this.list[this.current].page = res.pagination.currentPage
				this.list[this.current].pageSize = res.pagination.perPageCount
				this.list[this.current].total = res.pagination.total
				this.list[this.current].list = this.list[this.current].list.concat(res.list)
				if (res.pagination.currentPage * res.pagination.perPageCount >= res.pagination.total) {
					this.list[this.current].loadingstatus = "nomore"
				}
			},
			// 切换栏目
			async change(index) {
				this.current = index
				if (this.list != undefined && this.list != null) {
					this.list[this.current].sort = 0
					this.list[this.current].list = []
					this.list[this.current].page = 0
				}
				await this.getList()
			},
			// 更改排序方式
			async changeSort(index) {
				if (this.list != undefined && this.list != null) {
					this.list[this.current].sort = index
					this.list[this.current].list = []
					this.list[this.current].page = 0
				}
				await this.getList()
			},
			// 模糊搜索
			async search() {
				if (this.list != undefined && this.list != null) {
					this.list[this.current].list = []
					this.list[this.current].page = 0
				}
				await this.getList()
			},
			// 清空搜索
			async clear() {
				if (this.list != undefined && this.list != null) {
					this.list[this.current].list = []
					this.list[this.current].page = 0
				}
				await this.getList()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		position: fixed;
		display: flex;
		flex-direction: column;
		height: 90%;
		width: 100%;
	}

	.userHead {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.fabu_box {
		padding: 10rpx;
		display: flex;
		flex-direction: row;

		.fabu_mianjin {
			flex: 1;
			margin-right: 10rpx;
		}

		.fabu_mianti {
			flex: 1;
			margin-left: 10rpx;
		}

	}

	.fabu_xinzi {
		padding: 10rpx;
		margin-bottom: 10rpx;
	}

	page {
		width: 100%;
		height: 100%;

		.searchbox {
			display: flex;
			flex-direction: row;
			align-items: center;

			.search_input {
				flex: 2;
			}
		}
	}

	.fabu_photo {
		width: 60rpx;
		height: 60rpx;
	}

	.iconfont {
		font-size: 40upx !important;
	}

	.tags {
		display: flex;
		align-items: center;
		height: 100upx;
		width: 100%;

		.tag {
			padding: 10upx 20upx;
			margin-right: 20upx;
			background-color: #f3f3f3;
			border-radius: 30upx;
			font-size: 24upx;
			white-space: nowrap;
		}

		.active {
			background-color: #0081ff;
			color: #ffffff;
		}
	}

	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
				font-size: 32rpx;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					width: 100%;
					font-size: 28rpx;
					line-height: 50rpx;
					margin: 5rpx 0rpx;
				}

				.u-line-2 {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				.u-line-3 {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}

				.userInfo {
					display: flex;
					flex-direction: row;

					.center {
						margin-left: 20rpx;

						.userName {
							font-size: 26rpx;
							font-weight: bold;
						}

						.userTag {
							font-size: 16rpx;
							color: #82848A;
						}
					}
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}

	.release_item {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		align-items: center;
		background: -webkit-linear-gradient(left, orange, white);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, orange, white);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, orange, white);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, orange, white);
		border-radius: 20rpx;

		text {
			font-size: 26rpx;
		}
	}

	.summary {
		font-size: 25rpx;
	}
</style>
