<template>
	<view class="content" style="margin-bottom: 100rpx;">
		<view class="commentlist_wrap">
			<block v-if="commentCountTotal==0">
				<view class="empty-comment">
					<h3 class="empty-comment-title">全部回帖</h3>
					<view class="sofa"></view>
					<!-- <p class="empty-comment-des">暂无回复，快来抢沙发吧</p> -->
			<!-- 		<view class="replay-content" style="display: flex;flex-direction: column;">
						<view class="comment-header">
							<view class="comment-header-left" style="display: flex;flex-direction: row;">
								<image style="width: 50rpx;height: 50rpx;border-radius: 50%;" src="../../static/images/default_head.jpeg"></image>
								<view class="comment-user-date" style="margin-left: 10rpx;margin-top: 10rpx;color: #808080;">
									<text>蜡笔小星星(作者)</text>
								</view>
							</view>
						</view> -->
			<!-- 			<view class="comment-content" style="margin-left: 50rpx;">
							<view class="commentconent">
								<view class="contentinfo" bindtap="replyComment" style="margin-left: 10rpx;font-size: 26rpx;">
									请求成功状态码：200，；找不到服务：404，服务出错：500；还有请求重定向：301
								</view>
							</view>
						</view> -->
						
					<!-- </view> -->
				</view>
			</block>
			<block v-else>
				<view class="comlist_title">
					<h2 class="title">全部回帖</h2>
					<view class="classification">
					</view>
				</view>
				<view class="comment-reply">
					<view class="comment-reply-item" v-for="(item,index) in commentList" :key="index">
						<view class="comment-header">
							<view class="comment-header-left">
								<image catchtap="gotouser" class="comment-avatar" :src="item.avatar">
								</image>
								<view @tap="replyComment(item)" class="comment-user-date">
									<text>{{item.name}}</text>
									<text>{{item.date}}</text>
								</view>
							</view>
<!-- 							<view @tap="tapcommentlike(item.id,index)" class="comment-header-right">
								<image src="@/static/images/likes_icon_click.png" v-if="item.islike"></image>
								<image src="@/static/images/likes_icon_nor.png" v-else></image>
								<text>{{item.likes}}</text>
							</view> -->
						</view>
						<view class="comment-content" @tap="replyComment(item)">
							<view class="commentconent">
								<view class="contentinfo" bindtap="replyComment">
									{{item.content}}
								</view>
							</view>
						</view>
						<!-- 一级回复 -->
					<!-- 	<view class="replay-content" v-for="(reply,idx) in item.reply" :key="idx">
							<view class="comment-header">
								<view class="comment-header-left">
									<image catchtap="gotouser" class="comment-avatar" :src="reply.author.avatar">
									</image>
									<view @tap="replyComment(reply)" class="comment-user-date">
										<text>{{reply.author.name}}</text>
										<text>{{reply.date}}</text>
									</view>
								</view>
							</view>
							<view class="comment-content">
								<view class="commentconent">
									<view class="contentinfo" bindtap="replyComment">
										{{reply.content}}
									</view>
								</view>
							</view> -->
							<!-- 二级回复 -->
					<!-- 		<view v-for="(reply1,idx1) in reply.reply" :key="idx1">
								<view class="comment-header">
									<view class="comment-header-left">
										<image catchtap="gotouser" class="comment-avatar" :src="reply1.author.avatar">
										</image>
										<view @tap="replyComment(reply1)" class="comment-user-date">
											<text>{{reply1.author.name}}</text>
											<text>{{reply1.date}}</text>
										</view>
									</view>
								</view>
								<view class="comment-content">
									<view class="commentconent">
										<view class="contentinfo" bindtap="replyComment">
											{{reply1.content}}
										</view>
									</view>
								</view> -->
								<!-- 三级回复 -->
							<!-- 	<view v-for="(reply2,idx2) in reply1.reply" :key="idx2">
									<view class="comment-header">
										<view class="comment-header-left">
											<image catchtap="gotouser" class="comment-avatar"
												:src="reply2.author.avatar">
											</image>
											<view @tap="replyComment(reply2)" class="comment-user-date">
												<text>{{reply2.author.name}}</text>
												<text>{{reply2.date}}</text>
											</view>
										</view>
									</view>
									<view class="comment-content">
										<view class="commentconent">
											<view class="contentinfo" bindtap="replyComment">
												{{reply2.content}}
											</view>
										</view>
									</view> -->
									<!-- 四级回复 -->
							<!-- 		<view v-for="(replay3,idx3) in reply2.reply" :key="idx3">
										<view class="comment-header">
											<view @tap="replyComment(reply3)" class="comment-header-left">
												<image catchtap="gotouser" class="comment-avatar"
													:src="replay3.author.avatar">
												</image>
												<view class="comment-user-date">
													<text>{{replay3.author.name}}</text>
													<text>{{replay3.date}}</text>
												</view>
											</view>
										</view>
										<view class="comment-content">
											<view class="commentconent">
												<view class="contentinfo" bindtap="replyComment">
													{{replay3.content}}
												</view>
											</view>
										</view>
									</view> -->
									<!-- 四级回复 -->

								<!-- </view> -->
								<!-- 三级回复  -->

							<!-- </view> -->
							<!-- 二级回复 -->
			<!-- 			</view>
						<view class="comment-footer" v-if="item.reply.length==0">
							<view style="height:1px;background:#f9f9f9;margin:0rpx 20rpx 0rpx 100rpx;"></view>
						</view> -->
						<!-- 一级回复 -->
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		props: {
			commentList: {
				type: Array,
				default: function() {
					return [];
				}
			},
			commentCountTotal: {
				type: Number,
				default: 0
			},
			isNewest: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {

			};
		},
		methods: {
			replyComment: function(data) {
				let datas = {
					data: data
				};
				this.$emit('reply', datas);
			},
			tapcommentlike(id, index) {
				let data = {
					id: id,
					index,
					index
				}
				this.$emit('tapLikes', data)
			},
			showRecommendList: function() {
				this.$emit('showRecommendList')
			},

			showNewestList: function() {
				this.$emit('showNewestList')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentlist_wrap {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;

		.empty-comment {
			width: 100%;
			padding: 26rpx 32rpx 80rpx;
			box-sizing: border-box;

			.empty-comment-title {
				font-size: 30rpx;
				color: #222;
				font-weight: 600;
				margin-bottom: 20rpx;
			}

			.sofa {
				width: 260rpx;
				height: 260rpx;
				margin: 24px auto 0;
				background: url("@/static/images/no-comment.png") no-repeat 50%/260rpx;
			}

			.empty-comment-des {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				color: #999;
				margin: 0 auto;
			}
		}

		.comlist_title {
			width: 100%;
			padding: 0 32rpx;
			box-sizing: border-box;
			margin-top: 48rpx;
			margin-bottom: 16rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 36rpx;
				font-weight: 700;
				color: #222;
			}

			.classification {
				display: flex;
				background-color: rgba(0, 0, 0, .03);
				border-radius: 30rpx;

				.newest {
					width: 88rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
					font-size: 24rpx;
					color: #666;
				}

				.active {
					border: 1px solid #f0f0f0;
					color: #222;
					font-weight: 700;
					background-color: #fff;
					box-sizing: border-box;
					line-height: 56rpx;
				}
			}
		}
	}

	.comment-reply {
		margin: 30rpx;
		width: 100%;
		min-height: 600rpx;

		.comment-reply-item {
			margin-bottom: 20rpx;

			.comment-header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.comment-header-left {
					display: flex;
					align-items: center;

					.comment-avatar {
						display: inline-block;
						width: 60rpx;
						height: 60rpx;
						border-radius: 100%;
						margin-right: 20rpx;
					}

					.comment-user-date {
						display: flex;
						flex-direction: column;

						text:first-child {
							font-size: 30rpx;
							font-weight: bold;
							color: #3a3a3a;
						}

						text:last-child {
							font-size: 22rpx;
							color: #a8a8a8;
						}
					}
				}

				.comment-header-right {
					display: flex;
					align-items: center;

					image {
						width: 30rpx;
						height: 30rpx;
						vertical-align: bottom;
					}

					text {
						font-size: 28rpx;
						line-height: 30rpx;
						padding-left: 10rpx;
						color: #7d7d7d;
					}

					.comment-vote-btn {
						position: relative;
						display: flex;
						align-items: center;

						&:first-child {
							margin-right: 34rpx;
						}

						text {
							display: inline-block;
							font-size: 24rpx;
							color: #a8a8a8;
							border: 10rpx solid transparent;
							border-right: 0;
						}

						image {
							display: inline-block;
							width: 20rpx;
							height: 18rpx;
							border: 10rpx solid transparent;
						}
					}

					.vote-count-actived {
						color: #f13b03 !important;
					}
				}

			}

			.comment-content {
				position: relative;
				margin: 10rpx 20rpx 30rpx 80rpx;
				font-size: 30rpx;
				color: #3a3a3a;
			}

		}

		.replay-content {
			margin-left: 80rpx;

			.comment-avatar {
				width: 50rpx !important;
				height: 50rpx !important;
			}

		}
	}
</style>
