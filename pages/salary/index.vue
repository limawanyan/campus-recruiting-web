<template>
	<view class="wrap">
		<!-- 顶部搜索-->
		<view class="top">
			<u-search class="content" placeholder="输入公司/职位/城市进行查询" v-model="keyWord" shape="square" bg-color="#fff"
				border-color="#D3D3D3" placeholder-color="#D6D6D6" :show-action="false" :input-style="searchBoxStyle"
				@search="search" @clear="clear">
			</u-search>
		</view>
		<!-- 下拉菜单 -->
		<u-row gutter="16" class="choose-menu">
			<u-dropdown ref="uDropdown" @open="" @close="">
				<u-dropdown-item :height="navHeight" v-model="industry" :title="industryTitle"
					:options="industryOptions" @change="industryChange"></u-dropdown-item>
				<u-dropdown-item :height="navHeight" v-model="education" :title="educationTitle"
					:options="educationOptions" @change="educationChange"></u-dropdown-item>
			</u-dropdown>
		</u-row>
		<!-- 爆料信息 -->
		<scroll-view scroll-y="true" class="sv" :style="{height:navHeight+'px'}" @scrolltolower="reachBottom">
			<view class="info" @tap="goDetail(res.id)" v-for="(res, index) in list" :key="index">
				<view class="one">
					<text class="campany">{{res.company}}</text>
					<u-tag class="reliability" :text="'可信度:' + res.reliability" size="mini" type="primary"
						border-color="#fbfbfb" />
					<u-tag class="education" :text="res.education" size="mini" type="primary" border-color="#fbfbfb" />
				</view>
				<view class="two">
					<text class="post">{{res.postName}}</text>
					<text class="salary">{{res.description}}</text>
				</view>
				<view class="three">
					<u-icon class="place" name="map" color="#4088ff" label-color="#4088ff" :label="res.cityName">
					</u-icon>
					<u-icon class="time" name="clock" color="#4088ff" label-color="#4088ff"
						:label="res.createdAt|filter_time"></u-icon>
					<u-icon class="details" label-pos="left" label-color="#4088ff" label="查看详情" color="#4088ff"
						name="play-right-fill" size="28"></u-icon>
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
				searchBoxStyle: {
					width: "450rpx",
				},
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度
				keyword: '',
				industryTitle: '行业',
				educationTitle: '学历',
				industry: 0,
				education: 0,
				industryOptions: [],
				educationOptions: [],
				page: 0,
				pageSize: 10,
				keyWord: '',
				list: [],
				loadingstatus: 'loadmore',
				total: 0,
			}
		},
		filters: {
			filter_time(value) {
				return /\d{4}-\d{1,2}-\d{1,2}/g.exec(value)[0];
			}
		},
		async onLoad() {
			const industryOptions = await this.$u.api.getDictionaryItem({
				code: "industry_type"
			})
			const educationOptions = await this.$u.api.getDictionaryItem({
				code: "education_type"
			})
			this.industryOptions = industryOptions.list
			this.educationOptions = educationOptions.list
			this.industryOptions.unshift({
				"label": "全部",
				"value": 0
			})
			this.educationOptions.unshift({
				"label": "全部",
				"value": 0
			})
			await this.getSalaryList()
		},
		methods: {
			// 模糊搜索
			async search() {
				this.list = []
				this.page = 0
				this.loadingstatus = 'loadmore',
				await this.getSalaryList()
			},
			// 清空搜索
			async clear() {
				this.list = []
				this.page = 0
				this.loadingstatus = 'loadmore',
				await this.getSalaryList()
			},
			// 页面跳转
			toUrl(url) {
				this.$u.route(url);
			},
			// 跳转薪资爆料详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/salary/details?id=' + id
				})
			},
			// 获取薪资爆料数据
			async getSalaryList() {
				const res = await this.$u.api.getSalaryInfoList({
					"page": this.page + 1,
					"pageSize": this.pageSize,
					"industry": this.industry,
					"education": this.education,
					"keyWord": this.keyWord
				})
				this.list = this.list.concat(res.list)
				this.page = res.pagination.currentPage
				this.pageSize = res.pagination.perPageCount
				this.total = res.pagination.total
				if (res.pagination.currentPage * res.pagination.perPageCount >= res.pagination.total) {
					this.loadingstatus = "nomore"
				}
			},
			// 行业下拉值改变
			async industryChange() {
				// 修改Title
				this.industryOptions.forEach((elem, index) => {
					if (elem.value == 0) {
						this.industryTitle = "行业"
						return
					}
					if (elem.value == this.industry) {
						this.industryTitle = elem.label
						return
					}
				});
				this.list = []
				this.page = 0
				this.loadingstatus = 'loadmore',
				await this.getSalaryList()
			},
			// 学历下拉值改变
			async educationChange() {
				// 修改Title
				this.educationOptions.forEach((elem, index) => {
					if (elem.value == 0) {
						this.educationTitle = "学历"
						return
					}
					if (elem.value == this.education) {
						this.educationTitle = elem.label
						return
					}
				});
				this.list = []
				this.page = 0
				this.loadingstatus = 'loadmore',
				await this.getSalaryList()
			},
			async reachBottom() {
				if (this.loadingstatus != "nomore") {
					await this.getSalaryList()
				}
			},
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
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 200rpx;
		padding: 60rpx 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #33adff;
	}

	.choose-menu {
		height: 80rpx;
		display: block;
		background-color: #FFFFFF;
	}

	.info {
		width: 90%;
		height: 250rpx;
		margin: 30rpx auto;
		padding: 20rpx;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;

		.one {
			display: flex;
			margin: 20rpx 0rpx;

			.campany {
				flex: 1;
				font-size: 30rpx;
				font-weight: bold;
				order: 1;
			}

			.reliability {
				order: 3;
			}

			.education {
				order: 2;
				margin-right: 10rpx;
			}
		}

		.two {
			display: flex;
			justify-content: space-between;
			margin: 10rpx 0rpx;

			.post {
				font-size: 26rpx;
				font-weight: bold;
			}

			.salary {
				font-size: 30rpx;
				color: red;
			}
		}

		.three {
			display: flex;
			margin-top: 20rpx;

			.time {
				flex: 1;
				margin-left: 30rpx;
			}
		}
	}
</style>
