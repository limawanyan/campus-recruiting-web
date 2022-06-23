<template>
	<view class="wrap">
		<view class="u-flex user-box u-p-10 u-m-t-20" v-if="isLogin">
			<view class="u-m-r-10">
				<image class="userHead" :src="userInfo.avatarUrl" mode=""></image>
			</view>
			<view class="u-flex-1 u-p-l-10">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickName}}</view>
				<view class="u-font-14 u-tips-color">ID：{{userInfo.id}}</view>
			</view>
			<view class="gerenzhuye u-m-r-20" @click="toUrl('/pages/center/userinfo')">
				个人主页<u-icon name="arrow-right" color="#000000" size="26"></u-icon>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="chat-fill" :iconStyle="iconStyle" title="消息中心" @click="toUrl('/pages/center/news')">
				</u-cell-item>
			<!-- 	<u-cell-item icon="file-text-fill" :iconStyle="iconStyle" title="我的发布"
					@click="toUrl('/pages/center/release')"></u-cell-item>
				<u-cell-item icon="star-fill" :iconStyle="iconStyle" title="我的收藏"
					@click="toUrl('/pages/center/collect')"></u-cell-item> -->
				<u-cell-item icon="email-fill" :iconStyle="iconStyle" title="用户反馈"
					@click="toUrl('/pages/center/feedback')"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting-fill" :iconStyle="iconStyle" title="设置"
					@click="toUrl('/pages/center/settings')"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, #2BC3C8, #84E7B9)'
				},
				iconStyle: {
					color: '#33adff',
				},
				customStyle: {
					borderRadius: '88rpx'
				},
				show: false,
				disabled: false,
				userInfo: {},
				isLogin:false,
			}
		},
		onLoad() {
			if (!this.$u.utils.isLogin()) return
			this.isLogin = true
			this.userInfo = this.vuex_user
		},
		methods: {
			toUrl(url) {
				this.$u.route(url);
			},
		}
	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}
</style>
<style lang="scss" scoped>
	.wrap {
		padding: 10rpx 10rpx;
	}

	.pupbox {
		height: 320rpx;
		background-color: #84E7B9;

		.box-icon {
			padding: 60rpx 30rpx 10rpx;
		}
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #f3f3f3;
	}

	.class-none {
		border: none;
		margin: 0;
		padding: 0;
		background: #FFFFFF;
		outline: none;
	}

	.class-none::after {
		outline: none;
		border: none;
	}

	.red {
		color: #FF0F00;
	}

	.userHead {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}

	.gerenzhuye {
		border-radius: 50px;
		padding: 5rpx 20rpx;
		background: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
	}
</style>
