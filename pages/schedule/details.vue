<template>
	<view class="wrap">
		<!-- 顶部公司信息 -->
		<view class="top">
			<view class="companyInfo">
				<image class="companyLogo" :src="scheduleInfo.logo">
				</image>
				<view class="info">
					<text class="name">{{scheduleInfo.name}}</text>
					<text class="details">{{scheduleInfo.industry}} | {{scheduleInfo.financingType}} | {{scheduleInfo.address}}</text>
				</view>
				<u-button class="follow" type="success" size="mini" shape="square" @click="tapFollow"
					v-if="scheduleInfo.isFollow">已关注
				</u-button>
				<u-button class="follow" type="success" size="mini" shape="square"  @click="tapFollow" v-else> + 关注</u-button>
			</view>

		</view>
		<!-- 招聘时间标题 -->
		<view class="recruit_title">招聘时间线</view>
		<!-- 招聘时间详细 -->
		<view class="recruit_details">
			<view class="item">
				<text class="key">内推</text>
				<text class="value">{{scheduleInfo.recommendTime}}</text>
			</view>
			<view class="item">
				<text class="key">网申</text>
				<text class="value">{{scheduleInfo.applyOnlineTime}}</text>
			</view>
			<view class="item">
				<text class="key">笔试</text>
				<text class="value">{{scheduleInfo.writtenExamTime}}</text>
			</view>
			<view class="item">
				<text class="key">面试</text>
				<text class="value">{{scheduleInfo.interviewTime}}</text>
			</view>
			<view class="item">
				<text class="key">offer</text>
				<text class="value">{{scheduleInfo.offerTime}}</text>
			</view>
		</view>
		<!-- 校招宣讲信息标题 -->
		<view class="recruit_title">高校宣讲信息</view>
		<!-- 宣讲内容 -->
		<view class="preach_details">
			<view class="card" v-for="(res, index) in scheduleInfo.preachList">
				<view class="item">
					<text class="key">形式</text>
					<text class="value">{{res.type}}</text>
				</view>
				<view class="item">
					<text class="key">地点</text>
					<text class="value">{{res.school}}</text>
				</view>
				<view class="item">
					<text class="key">详细地址</text>
					<text class="value">{{res.address}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scheduleInfo:{}
			}
		},
		async onLoad(schedule) {
			// 获取帖子详情
			const scheduleInfo = await this.$u.api.getRecruitInfoDetail({
				scheduleId: schedule.id,
			})
			this.scheduleInfo = scheduleInfo.data
		},
		// 图片过滤
		filters: {
			fliters_image(value) {
				if (value != undefined){
					let res = ''
					let tmp = 'https://fakeimg.pl/350x200/CFD8DC/000/?font=noto&text='
					if (value.length > tmp.length + 2) {
						return value.substr(0, tmp.length + 2)
					}
				}
				return value
			}
		},
		methods: {
			// 点击关注
			async tapFollow() {
				let res = await this.$u.api.followRecruitInfo({
					companyId: this.scheduleInfo.id,
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
				this.scheduleInfo.isFollow = res.isFollow
			}
		}
	}
</script>


<style>
	page {
		background-color: #f3f3f3;
	}
</style>
<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.top {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		background-image: linear-gradient(#33adff 10%, #f3f3f3);

		.companyInfo {
			display: flex;
			width: 90%;
			height: 200rpx;
			background-color: rgba(255, 255, 255, 0.7);
			border-radius: 25rpx;
			margin-top: 50rpx;

			.companyLogo {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-left: 30rpx;
				margin-right: 15rpx;
				margin-top: -25rpx;
			}

			.follow {
				margin-top: 20rpx;
				margin-right: 20rpx;
			}

			.info {
				flex: 1;
				width: 150rpx;
				display: flex;
				flex-direction: column;

				.name {
					margin-top: 20rpx;
					font-size: 26rpx;
					font-weight: bold;
				}

				.details {
					font-size: 20rpx;
					color: #82848A;
					display: -webkit-box;
					overflow: hidden;
					/*autoprefixer:off*/
					-webkit-box-orient: vertical;
					/*autoprefixer:on*/
					-webkit-line-clamp: 3;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.recruit_title {
		margin: auto;
		margin-top: 80rpx;
		font-size: 26rpx;
		color: #18B566;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 0.7);
	}

	.recruit_details {
		width: 90%;
		height: 300rpx;
		margin: auto;
		margin-top: 20rpx;

		.item {
			margin-bottom: 20rpx;
			padding: 10rpx 20rpx;
			display: flex;
			background-color: rgba(255, 255, 255, 0.7);
			border-radius: 20rpx;

			.key {
				width: 50%;
				font-size: 26rpx;
				font-weight: bold;
				margin-left: 20rpx;
			}

			.value {
				font-size: 26rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 100%;
			}
		}
	}
	
	.preach_details {
		width: 90%;
		margin: auto;
		margin-top: 20rpx;
		margin-bottom: 50rpx;
		.card {
			margin-bottom: 20rpx;
			padding: 20rpx 20rpx;
			display: flex;
			background-color: rgba(255, 255, 255, 0.7);
			border-radius: 20rpx;
			flex-direction: column;
			.item {
				display: flex;
				align-items: center;
				padding: 5rpx;
				.key {
					width: 50%;
					font-size: 26rpx;
					font-weight: bold;
					margin-left: 20rpx;
					align-self:flex-start
				}
				.value {
					font-size: 26rpx;
					overflow: hidden;
					width: 100%;
				}
			}
		}
	}
</style>
