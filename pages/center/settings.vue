<template>
	<view class="wrap">
		<view class="signout">
			<u-button :custom-style="customStyle" shape="square" size="default" @click="loginOut">退出登录</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					marginTop: '20px',
					color: 'red',
				}
			};
		},
		methods: {
			loginOut:function(){
				uni.showToast({
					icon: 'none',
					title: '退出成功',
				});
				this.$u.vuex('vuex_token', "")
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/center/login',
					})
				}, 1000);
			}
		},

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f3f3;
	}

	.signout {
		padding: 20rpx 50rpx;
	}
</style>
