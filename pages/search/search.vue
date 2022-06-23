<template>
	<view class="wrap">
		<view class="home">
			<u-search placeholder="请输入关键词搜索" bg-color="#ffffff" v-model="keyword" :actionStyle="actionStyle"></u-search>
			<view class="u-m-t-20">
				<view class="u-flex u-row-between">
					<view class="title">历史记录</view>
					<view>
						<u-icon name="trash" size="32"></u-icon>
					</view>
				</view>
				<view class="history">
					<u-tag class="tag" text="春招" mode="light" shape="circle" />
					<u-tag class="tag" text="春招公司" mode="light" shape="circle" />
					<u-tag class="tag" text="字节跳动" mode="light" shape="circle" />
				</view>
			</view>
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
				keyword: '',
				actionStyle: {
					'color': '#33adff',
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>
<style>
	page {
		background-color: #f2f2f2;
	}
</style>
<style lang="scss" scoped>
	.wrap {
		padding: 20rpx 20rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: 700;
	}

	.u-navbar-placeholder {
		height: 0rpx;
	}
	
	.history {
		padding: 20rpx 0rpx;
		.tag {
			margin-right: 10rpx;
		}
	}
</style>
