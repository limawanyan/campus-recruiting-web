<template>
	<view class="wrap">
		<!-- 爆料信息详情 -->
		<view class="detailBox">
			<view class="item">
				<text class="label">公司</text>
				<text class="value highlight">{{salaryInfo.company}}</text>
			</view>
			<view class="item">
				<text class="label">职位</text>
				<text class="value highlight">{{salaryInfo.postName}}</text>
			</view>
			<view class="item">
				<text class="label">地点</text>
				<text class="value highlight">{{salaryInfo.cityName}}</text>
			</view>
			<view class="item">
				<text class="label">工资</text>
				<text class="value">{{salaryInfo.description}}</text>
			</view>
			<view class="item">
				<text class="label">可信度</text>
				<text class="value">{{salaryInfo.reliability}}</text>
			</view>
			<view class="item">
				<text class="label">发布时间</text>
				<text class="value">{{salaryInfo.createdAt | filter_time}}</text>
			</view>
			<view class="two">
				<view class="item2">
					<text class="label">行业</text>
					<text class="value item">{{ salaryInfo.industry }}</text>
				</view>
				<view class="item2">
					<text class="label">学历</text>
					<text class="value">{{salaryInfo.education}}</text>
				</view>

				<!-- 	<view class="item2">
					<text class="label">浏览量</text>
					<text class="value">999</text>
				</view> -->
			</view>
			<view class="item2 remarks">
				<text class="label">备注信息</text>
				<text class="value">{{salaryInfo.remarks ? salaryInfo.remarks : "无" }}</text>
			</view>
		</view>
		<view class="votelabel">- 您觉得这条薪资爆料是否可信 -</view>
		<!-- 底部投票 -->
		<view class="voteBox">
			<view class="btn">
				<u-modal :show-cancel-button=true :show-confirm-button=true confirm-text="不真实" confirm-color="#bec0c3"
					title="感谢评价" v-model="opShow" :content="opContent" @confirm="clickVote(false)"></u-modal>
				<u-button :hair-line=false @click="opShow = !opShow">
					不真实
				</u-button>
			</view>
			<view class="btn">
				<u-modal :show-cancel-button=true :show-confirm-button=true confirm-text="爆料可信" title="感谢评价"
					v-model="favorShow" :content="favorContent" @confirm="clickVote(true)"></u-modal>
				<u-button :hair-line=false @click="favorShow = !favorShow">
					爆料可信
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				opShow: false,
				favorShow: false,
				opContent: "该薪资是否不真实？您的评价对求职者很重要，再次感谢！",
				favorContent: "该薪资是否真实？您的评价对求职者很重要，再次感谢！",
				salaryInfo: {},
				isRepeat: false,
			}
		},
		async onLoad(salary) {
			// 获取帖子详情
			const salaryInfo = await this.$u.api.getSalaryInfoDetail({
				salaryId: salary.id,
			})
			this.salaryInfo = salaryInfo.data
		},
		filters: {
			filter_time(value) {
				return /\d{4}-\d{1,2}-\d{1,2}/g.exec(value)[0];
			}
		},
		methods: {
			async clickVote(type) {
				if (this.isRepeat) {
					uni.showToast({
						icon: 'none',
						title: '已投票，请勿重复投票!',
					});
				} else {
					if (!this.$u.utils.isLogin()) return
					const res = await this.$u.api.voteSalaryInfo({
						id: this.salaryInfo.id,
						isSupport: type,
					})
					if (res.isRepeat) {
						uni.showToast({
							icon: 'none',
							title: '已投票，请勿重复投票!',
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '感谢评价!',
						});
					}
					this.isRepeat = true
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f3f3;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.detailBox {
		width: 95%;
		margin: 20rpx auto;
		padding: 0rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;

		.item {
			width: 100%;
			padding: 20rpx;
			margin: 30rpx auto;
			background-color: #f9fafe;
			border-radius: 15rpx;
			display: flex;
			justify-content: flex-start;

			.label {
				flex: 1;
				font-size: 20rpx;
				color: #888989;
			}

			.votelabel {}

			.value {
				flex: 3;
				font-size: 26rpx;
			}

			.highlight {
				font-weight: bold;
				color: #33adff;
			}
		}

		.two {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.item2 {
			width: 45%;
			display: flex;
			flex-direction: column;

			.label {
				margin-left: 20rpx;
				flex: 1;
				font-size: 20rpx;
				color: #888989;
			}

			.value {
				flex: 3;
				font-size: 26rpx;
				background-color: #f9fafe;
				padding: 20rpx;
				margin: 10rpx 0rpx 30rpx 0rpx;
				border-radius: 15rpx;
			}

			.highlight {
				font-weight: bold;
				color: #33adff;
			}
		}

		.remarks {
			width: 100%;
		}
	}

	.votelabel {
		color: #909399;
		font-size: 20rpx;
		margin: 10rpx auto;
	}

	.voteBox {
		width: 95%;
		height: 100rpx;
		margin: 10rpx auto;
		display: flex;
		justify-content: space-between;

		.btn {
			width: 48%;
		}
	}
</style>
