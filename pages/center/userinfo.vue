<template>
	<view class="wrap">
		<image class="top_photo" src="../../static/images/default_head.jpeg"></image>
		<view class="info_box">
			<!-- 顶部头像关注 -->
			<view class="top">
				<image class="companyLogo" src="https://thirdwx.qlogo.cn/mmopen/vi_32/AOf6D7ExY80xJ5QjGdmjvakQuRib2YA1t96VTYVB05E6elqzN89oia3d2lmMKgugAic13wBdSz8Bdic7ohK5Vd9rZQ/132">
				</image>
				<view class="top_center"></view>
				<button class="follow"> 关注</button>
			</view>
			<!-- 用户昵称 性别 标签 关注 粉丝 签名-->
			<view class="middle">
				<!-- 昵称 性别 -->
				<view>
					<text class="nikeName">南方知码胡</text>
					<u-icon name="man" class="u-m-l-10" color="#33adff"></u-icon>
				</view>
				<!-- 粉丝 关注 -->
				<view class="fans_follow">
					<view><text>0</text>关注</view>
					<view><text>1</text>粉丝</view>
				</view>
				<!-- 标签 -->
				<view class="tags">
					<text class="tag">Golang开发工程师</text>
					<text class="tag">2022届</text>
				</view>
				<!-- 个性签名 -->
				<view class="autograph">
					<text>我们之所以觉得成长是一件很糟糕的事，是因为我们没有变成自己喜欢的样子。</text>
				</view>
				<!-- 分割线 -->
				<view class="line"></view>
			</view>
			<!-- 发布的面经面题 -->
			<view class="bottom">
				<view class="u-tabs-box">
					<u-tabs-swiper activeColor="#33adff" ref="tabs" :list="list" :current="current" @change="change"
						 swiperWidth="750"></u-tabs-swiper>
				</view>
			</view>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<view>
							<view class="center">
								<image src="../../static/images/wushuju.png" mode=""></image>
								<view class="explain">
									暂未发布面经
								</view>
							</view>
						</view>
						<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<!-- 点赞 -->
						<view>
							<view class="center">
								<image src="../../static/images/wushuju.png" mode=""></image>
								<view class="explain">
									暂未爆料面题
								</view>
							</view>
						</view>
						<!-- <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore> -->
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '面经'
					},
					{
						name: '面题'
					},
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore', 'loadmore'],
			}
		},
		methods: {
			reachBottom() {
				// 此tab为空数据
				if (this.current != 2) {
					this.loadStatus.splice(this.current, 1, "loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
			// 页面数据
			getOrderList(idx) {

			},
			// tab栏切换
			change(index) {
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>
<style>
	page {
		background-color: #f3f3f3;
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
	}

	.top_photo {
		width: 100%;
		height: 200rpx;
		object-fit: cover;
	}

	.info_box {
		padding: 10rpx 30rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx 25rpx 0rpx 0rpx;
		margin-top: -20rpx;
	}

	.top {
		width: 100%;
		margin-bottom: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.companyLogo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			margin-top: -40rpx;
		}
		
		.top_center {
			flex: 1;
		}
		
		.follow {
			margin-top: 20rpx;
			margin-right: 20rpx;
			width: 100rpx;
			height: 50rpx;
			font-size: 20rpx;
			color: white;
			background-color: $u-type-success;
		}
	}

	.middle {
		display: flex;
		flex-direction: column;

		.nikeName {
			font-weight: bold;
		}

		.tags {
			margin-top: 10rpx;

			.tag {
				background-color: #F3F3F3;
				margin-bottom: 20rpx;
				padding: 10rpx 15rpx;
				margin-right: 15rpx;
				border-radius: 10rpx;
				font-size: 20rpx;
				color: #82848A;
			}
		}

		.fans_follow {
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			display: flex;
			flex-direction: row;
			font-size: 20rpx;
			view {
				margin-right: 30rpx;
				color: #82848A;
				text {
					color: #000000;
					margin: 0rpx 10rpx;
					font-weight: bold;
				}
			}
		}

		.autograph {
			margin-top: 30rpx;
			font-size: 26rpx;
			color: #82848A;
		}

		.line {
			margin-top: 30rpx;
			border: 0.1rpx solid #F3F3F3;
		}
	}

	.swiper-box {
		border-color: #F3F3F3;
		height: 1000rpx;
	}

	.center {
		text-align: center;
		font-size: 30rpx;
		padding: 10% ;
		image {
			width: 250rpx;
			height: 250rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
