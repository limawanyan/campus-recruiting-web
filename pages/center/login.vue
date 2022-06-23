<template>
	<view class="content">
		<view class="logo-bg-box">
			<view class="logo-bg-box-first">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
			<view class="logo-bg-box-second">
				<view class="login-bg-item-top"></view>
				<view class="login-bg-item-bottom"></view>
			</view>
		</view>
		<view class="logo-box">
			<view class="logo-item">校招卷王交流平台</view>
			<button class="logo-btn" @tap="getUserInfo">
				<view class="weixin iconfont iconweix"></view>微信授权
			</button>
			<view @tap="cancelLogin" class="cancel-login">暂不登录，返回首页</view>
			<view class="login-title-info">登录即代表您同意《用户协议》和《隐私政策》</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				avatarUrl: '',
				gender: 0,
				nickName: '',
			};
		},
		onLoad() {	
		},
		methods: {
			cancelLogin: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			getUserInfo() {
				// 展示加载框
				uni.showLoading({
					title: '授权登录中',
				});
				uni.getUserProfile({
					desc: '登录后可同步数据',
					success: async (obj) => {
						this.avatarUrl = JSON.parse(obj.rawData).avatarUrl;
						this.gender = JSON.parse(obj.rawData).gender;
						this.nickName = JSON.parse(obj.rawData).nickName;
						uni.login({
							provider: 'weixin',
							success: async (res) => {
								this.code = res.code;
								if (res.errMsg == 'login:ok') {
	
									// 处理登录使用参数
									const params = {
										code: this.code,
										avatarUrl: this.avatarUrl,
										nickName: this.nickName,
										gender: this.gender
									}
	
									const loginRes = await this.$u.api.authLogin(params)
	 
									// 缓存token
									this.$u.vuex('vuex_token', loginRes.token)
									this.$u.toast('登录成功')
	
									// 缓存用户信息
									const userInfo = {
										id: loginRes.id,
										avatarUrl: loginRes.avatarUrl,
										nickName: loginRes.nickName,
										gender: loginRes.gender
									}
									this.$u.vuex('vuex_user', userInfo)
									
									// 登录之后跳转到来源页
									const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
									setTimeout(() => {
										this.$u.route({
											type:'reLaunch',
											url:backUrl
										})
									},1500)
								}
							},
						});
					},
					fail: () => {
						uni.showToast({
							title: '授权已取消',
							icon: 'error',
							mask: true,
						});
					},
					complete: () => {
						// 隐藏loading
						uni.hideLoading();
					},
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	$color-primary: #49b44a;

	.content {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #000;
	}

	.logo-bg-box {
		width: 100%;
		height: 9482rpx;
		opacity: .5;
		animation: move 60s linear infinite;

		.logo-bg-box-first,
		.logo-bg-box-second {
			width: 100%;
			height: 50%;
		}

		.login-bg-item-top {
			width: 100%;
			height: 50%;
			background: url(https://www.hualigs.cn/image/61371a7e2cf68.jpg);
			background-size: 100% 100%;
		}

		.login-bg-item-bottom {
			width: 100%;
			height: 50%;
			background: url(https://www.hualigs.cn/image/61371b501341c.jpg);
			background-size: 100% 100%;
		}

		@-webkit-keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

		@keyframes move {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-4741rpx);
			}
		}

	}

	.img-captcha {
		width: 150upx;
		height: 60upx;
	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.logo-box {

		position: fixed;
		top: 35%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;

		.logo-item {
			display: block;
			font-size: 50rpx;
			padding: 50rpx;
			color:#FFFFFF;
		}

		.logo-btn {
			width: 418rpx;
			height: 88rpx;
			background-color: #fff;
			box-shadow: 0 2rpx 16rpx 0 rgba(0, 0, 0, .08);
			border-radius: 88rpx;
			font-size: 28rpx;
			line-height: 88rpx;
			color: #93b1b1;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;

			.iconfont {
				font-size: 40rpx;
				margin-right: 20rpx;
			}

			.weixin {
				width: 10rpx;
				height: 10rpx;
				padding-left: 2rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				color: #fff;
				background-color: #49b44a;
			}
		}

		.cancel-login {
			font-size: 28rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			margin-top: 20rpx;
			z-index: 5;
		}

		.login-title-info {
			font-size: 20rpx;
			color: #fff;
			width: 500rpx;
			margin-top: 100rpx;
			text-align: center;
		}
	}

	.login-form {
		padding: 40rpx;

		.codebutton {
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;

			&:after {
				border: none
			}

			&.active {
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}

	}

	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}

	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #434343;

		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}

		.link-highlight {
			color: #434343;
		}
	}
</style>
