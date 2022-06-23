<template>
	<view class="wrap">
		<!-- 顶部背景图 -->
		<image class="topPhoto" src="../../static/images/schedule_bg.jpg"></image>
		<!-- 下拉菜单 -->
		<u-row gutter="16" class="choose-menu">
			<u-dropdown ref="uDropdown" @open="" @close="">
				<u-dropdown-item :height="navHeight" v-model="industry" :title="industryTitle"
					:options="industryOptions" @change="industryChange">
				</u-dropdown-item>
				<u-dropdown-item :height="navHeight" v-model="attributes" :title="attributesTitle"
					:options="attributesOptions" @change="attributesChange">
				</u-dropdown-item>
				<u-dropdown-item :height="navHeight" v-model="follow" :title="followTitle" :options="followOptions"
					@change="followChange">
				</u-dropdown-item>
			</u-dropdown>
		</u-row>
		<!-- 公司列表 -->
		<scroll-view scroll-y="true" class="sv" :style="{height:navHeight+'px'}" @scrolltolower="reachBottom">
			<!-- item -->
			<view gutter="16" class="company_item u-border-top" @tap="goDetail(res.id)" v-for="(res, index) in list"
				:key="index">
				<view class="leftbox">
					<image mode="aspectFill" class="companyLogo"
						:src="res.logo">
					</image>
					<text class="u-font-14 u-margin-10">{{res.name}}</text>
					<u-button type="success" size="mini" shape="square" @click="tapFollow(res.id,index)"
						v-if="res.isFollow">已关注
					</u-button>
					<u-button type="success" size="mini" shape="square"  @click="tapFollow(res.id,index)" v-else> + 关注</u-button>
				</view>
				<view class="centerbox">
					<view class="u-margin-10">内推</view>
					<view class="u-margin-10">网申</view>
					<view class="u-margin-10">笔试</view>
					<view class="u-margin-10">面试</view>
					<view class="u-margin-10">offer</view>
				</view>
				<view class="rightbox">
					<view class="u-margin-10">{{res.recommendTime}}</view>
					<view class="u-margin-10">{{res.applyOnlineTime}}</view>
					<view class="u-margin-10">{{res.writtenExamTime}}</view>
					<view class="u-margin-10">{{res.interviewTime}}</view>
					<view class="u-margin-10">{{res.offerTime}}</view>
				</view>
			</view>
			<!-- 加载更多 -->
			<u-loadmore class="loadmore" :status="loadingstatus" bgColor="#f2f2f2"></u-loadmore>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				industry: 0,
				attributes: 0,
				follow: 0,
				industryTitle: '行业类型',
				attributesTitle: '公司属性',
				followTitle: '是否关注',
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度
				industryOptions: [],
				attributesOptions: [],
				followOptions: [],
				page: 0,
				pageSize: 5,
				total: 0,
				list: [],
				loadingstatus: "loadmore",
			}
		},
		filters: {
			fliters_image(value) {
				let res = ''
				let tmp = 'https://fakeimg.pl/350x200/CFD8DC/000/?font=noto&text='
				if (value.length > tmp.length + 2) {
					return value.substr(0, tmp.length + 2)
				}
				return value
			}
		},
		async onLoad() {
			if (!this.$u.utils.isLogin()) return
			const industryOptions = await this.$u.api.getDictionaryItem({
				code: "industry_type"
			})
			const attributesOptions = await this.$u.api.getDictionaryItem({
				code: "company_attributes"
			})
			const followOptions = await this.$u.api.getDictionaryItem({
				code: "isfollow_type"
			})
			this.industryOptions = industryOptions.list
			this.attributesOptions = attributesOptions.list
			this.followOptions = followOptions.list
			this.industryOptions.unshift({
				"label": "全部",
				"value": 0
			})
			this.attributesOptions.unshift({
				"label": "全部",
				"value": 0
			})
			this.followOptions.unshift({
				"label": "全部",
				"value": 0
			})
			await this.getSchedule()
		},
		// async onShow() {
		// 	this.page = 0
		// 	this.list = []
		// 	await this.getSchedule()
		// },
		methods: {
			// 跳校招详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/schedule/details?id=' + id
				})
			},
			async reachBottom() {
				if (this.loadingstatus != "nomore") {
					await this.getSchedule()
				}
			},
			async getSchedule() {
				const res = await this.$u.api.getRecruitInfoList({
					page: this.page + 1,
					pageSize: 5,
					industryType: this.industry,
					attribute: this.attributes,
					isFollow: this.follow,
				})
				this.page = res.pagination.currentPage
				this.pageSize = res.pagination.perPageCount
				this.total = res.pagination.total
				this.list = this.list.concat(res.list)
				if (res.pagination.currentPage * res.pagination.perPageCount >= res.pagination.total) {
					this.loadingstatus = "nomore"
				}
			},
			toUrl(url) {
				this.$u.route(url);
			},
			// 行业下拉值改变
			async industryChange() {
				// 修改Title
				this.industryOptions.forEach((elem, index) => {
					if (elem.value == 0) {
						this.industryTitle = "行业类型"
						return
					}
					if (elem.value == this.industry) {
						this.industryTitle = elem.label
						return
					}
				});
				this.list = []
				this.page = 0
				this.loadingstatus = "loadmore"
				await this.getSchedule()
			},
			// 公司属性下拉值改变
			async attributesChange() {
				// 修改Title
				this.attributesOptions.forEach((elem, index) => {
					if (elem.value == 0) {
						this.attributesTitle = "公司属性"
						return
					}
					if (elem.value == this.attributes) {
						this.attributesTitle = elem.label
						return
					}
				});
				this.page = 0
				this.list = []
				this.loadingstatus = "loadmore"
				await this.getSchedule()
			},
			// 是否关注下拉值改变
			async followChange() {
				// 修改Title
				this.followOptions.forEach((elem, index) => {
					if (elem.value == 0) {
						this.followTitle = "是否关注"
						return
					}
					if (elem.value == this.follow) {
						this.followTitle = elem.label
						return
					}
				});
				this.page = 0
				this.list = []
				this.loadingstatus = "loadmore"
				await this.getSchedule()
			},
			// 点击关注
			async tapFollow(id,index) {
				console.log(111)
				let res = await this.$u.api.followRecruitInfo({
					companyId: id,
				})
				if (res.isFollow) {
					uni.showToast({
						title: '关注成功',
						duration: 1000
					});
				} else {
					uni.showToast({
						title: '取消关注',
						duration: 1000
					});
				}
				this.list[index].isFollow = res.isFollow
			}
		},
		
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数
					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".sv"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						let pH = that._data.pH;
						that._data.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
		},
	}
</script>
<style>
	page {
		background-color: #f3f3f3;
	}
</style>
<style lang="scss" scoped>
	.wrap {
		position: fixed;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.companyLogo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.topPhoto {
		width: 100%;
		height: 250rpx;
		object-fit: fill;
	}

	.choose-menu {
		height: 80rpx;
		display: block;
		background-color: #FFFFFF;
	}

	.company_item {
		width: 100%;
		padding: 20rpx 0rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;

		.leftbox {
			flex: 2;
			display: flex;
			justify-content: center; //水平居中
			align-items: center; //垂直居中
			flex-direction: column;
		}

		.centerbox {
			color: $u-type-success;
		}

		.rightbox {
			flex: 3;
		}
	}
</style>
