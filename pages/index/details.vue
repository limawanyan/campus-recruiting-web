<template>
	<view class="wrap">
		<!-- 帖子内容详情 -->
		<view class="topic-detail">
			<view class="title">
				<h3>{{postInfo.title}}</h3>
			</view>
			<view class="userInfo">
				<u-avatar size="mini" :src="postInfo.user.head"></u-avatar>
				<view class="center">
					<text class="userName">{{postInfo.user.name}}</text>
					<view class="userTag">
						<text>{{postInfo.user.intentionalWork}}</text>
						<text class="grade">{{postInfo.user.graduation}}届</text>
					</view>
				</view>
				<view class="follow_btn">
					<u-button shape="square" size="mini" type="primary" @click="tapFollow" v-if="!postInfo.user.isFocus && postInfo.user.id != user.id">
						关注</u-button>
					<u-button :plain="true" shape="square" size="mini" @click="tapFollow"  type="primary" v-else>已关注</u-button>
				</view>
			</view>
			<view class="content">
				<mp-html :content="postInfo.content" />

			</view>
			<view class="content_bottom">
				<text class="releaseTime">{{timeFormat(postInfo.createdAt)}}</text>
			</view>
		</view>

		<!-- 评论 -->
		<comment :commentList="commentList" :commentCountTotal="postInfo.CommentNum" @reply="reply"
			@tapLikes="tapcommentLike"></comment>

		<!-- 底部评论 点赞 收藏 -->
		<view :class="!isInput?'comment-submit is-show':'comment-dialog is-hide'">
			<view class="comment-submit-left">
				<view @tap="tapComment" class="comment-submit-btn">写评论...</view>
			</view>
			<view class="comment-submit-right">
				<view @tap="anchor" class="comment-submit-icon">
					<view class="comment-submit-image comment-comment"></view>
					<view v-if="detail.comments>0">{{detail.comments}}</view>
					<view v-else>评论</view>
				</view>
				<view @tap="tapFav" class="comment-submit-icon" v-if="!postInfo.isStar">
					<view class="comment-submit-image comment-star"></view>
					<view>收藏</view>
				</view>
				<view @tap="tapFav" class="comment-submit-icon" v-else>
					<view class="comment-submit-image comment-nostar-active"></view>
					<view>取消收藏</view>
				</view>
				<view @tap="tapLike" class="comment-submit-icon" v-if="postInfo.isLike === false">
					<view
						:class="!postInfo.isLike?'comment-submit-image comment-zan-2':'comment-submit-image comment-zan-active-2'">
					</view>
					<view v-if="favourSum>0">{{111}}</view>
					<view v-else>点赞</view>
				</view>
				<view @tap="tapLike" class="comment-submit-icon" v-else>
					<view
						:class="postInfo.islike?'comment-submit-image comment-zan-2':'comment-submit-image comment-zan-active-2'">
					</view>
					<view v-if="favourSum>0">{{111}}</view>
					<view v-else>取消点赞</view>
				</view>
			</view>
		</view>
		<!-- 回复弹出框 -->
		<u-popup v-model="isComments" mode="bottom" border-radius="14" height="800rpx" z-index="10" @close="outComment">
			<view class="textareacontent">
				<view class="textheaders">
					<view @tap="outComment" class="cancel">取消</view>
					<view class="publish" @tap="addComment">发布</view>
				</view>
				<view class="textareaBox">
					<textarea class="textareaInput" maxlength="140" :show-confirm-bar="false" name="content"
						@input="bindInput" :placeholder="placeholder" placeholder-class="placeholder-text"
						:value="repley_content"></textarea>
					<view class="textCount">{{count}}/140</view>
				</view>
			</view>
		</u-popup>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				postInfo: {},
				follow: true,
				advert: [],
				videoAds: false,
				isVideoAds: false,
				user: '',
				count: 0,
				detail: [],
				topshow: true,
				placeholder: '写评论...',
				commentList: [
					
				],
				page: 0,
				pageSize: 10,
				total: 0,
				repley_content: "",
				isLike: false,
				isFav: false,
				isComments: false,
				favourSum: 0,
				isInput: false,
				isPublish: false,
				isNewest: true,
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%',
					p: 'padding-top:20rpx',
					button: 'border-width: 2rpx;border-color: #5b96fe;border-style: solid;border-radius: calc((50rpx - 4rpx) / 2);font-size: 26rpx;background-color: #5b96fe;display: flex;color: #fff;align-items: center;justify-content:center;padding:20rpx 40rpx;margin:20rpx auto;'
				},
			}
		},
		async onLoad(article) {
			// 获取帖子详情
			const postInfo = await this.$u.api.getPostInfoDetail({
				postId: article.id
			})
			this.postInfo = postInfo.data
			let isFocus = postInfo.data.user.isFocus
			// 获取帖子评论
			const commentRes = await this.$u.api.getPostInfoComment({
				postId: article.id,
				page: this.page,
				pageSize: this.pageSize
			})
			this.commentList = commentRes.data
			this.page = commentRes.page
			this.pageSize = commentRes.pageSize
			this.total = commentRes.total
			// 当前登录用户
			this.user = this.vuex_user
		},
		methods: {
			// 关注用户
			tapFollow: async function() {
				console.log()
				if (this.user == '') {
					uni.navigateTo({
						url: '/pages/center/login'
					})
				} else {
					let res = await this.$u.api.followUser({
						userId: this.postInfo.user.id,
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
					this.postInfo.user.isFocus = res.isFollow
					console.log(res)
				}
			},
			// 发布时间处理
			timeFormat: function(date) {
				return this.$u.utils.getDateDiff(date)
			},
			// 回复评论
			reply: function(e) {
				console.log(e);
				let parent = e.data.id
				let reply = e.data.author.name
				this.isFocus = true,
					this.isComments = true,
					this.parent = parent,
					this.placeholder = " @" + reply + ":"

			},
			// 给评论点赞方法
			tapcommentLike: function(e) {

			},
			// 点赞
			tapLike: async function() {
				if (this.user == '') {
					uni.navigateTo({
						url: '/pages/center/login'
					})
				} else {
					let res = await this.$u.api.likePostInfo({
						postId: this.postInfo.id,
						type: 1,
					})
					if (res.isLike) {
						uni.showToast({
							title: '点赞成功',
							duration: 1000
						});
					} else {
						uni.showToast({
							title: '取消点赞',
							duration: 1000
						});
					}
					this.postInfo.isLike = res.isLike
				}
			},
			// 收藏
			tapFav: async function() {
				if (this.user == '') {
					uni.navigateTo({
						url: '/pages/center/login'
					})
				} else {

					let res = await this.$u.api.starPostInfo({
						postId: this.postInfo.id,
						type: 1,
					})
					if (res.isStar) {
						uni.showToast({
							title: '已收藏',
							duration: 1000
						});
					} else {
						uni.showToast({
							title: '取消收藏',
							duration: 1000
						});
					}
					this.postInfo.isStar = res.isStar
				}
			},
			tapComment: function() {
				this.isComments = true;
			},
			outComment: function() {
				this.isComments = false;
				this.parent = 0;
				this.placeholder = '写点评论...'
			},
			bindInput: function(e) {
				this.content = e.detail.value;
				this.count = this.content.length;
			},
			// 发布评论
			addComment: function() {
				let args = {}
				if (!this.user) {
					uni.showModal({
						title: '温馨提示',
						content: '必须登录才能发表评论, 是否前往登陆',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/center/login'
								})
							}
						}
					})
					return
				}
				args.id = this.id
				args.parent = this.parent
				args.content = this.content
				if (this.content.length === 0) {
					uni.showModal({
						title: '温馨提示',
						content: '评论内容不能为空'
					})
					return
				}
				// 请求发布评论接口

			},
			// 按最热排序
			showRecommend: function() {
				this.isNewest = true
				this.page = 1
				this.commentList = []

			},
			// 按最新评论排序
			showNewest: function() {
				this.isNewest = false
				this.page = 1
				this.commentList = []
				// 按最新获取评论数据
			},
		}
	}
</script>

<style lang="scss" scoped>
	.showloading {
		position: fixed;
		text-align: center;
		transition: .3s;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: column;

		.load {
			opacity: 1;
			transition: .3s;
			top: 0;
		}

		.loadtext {
			display: flex;
			align-items: center;
			justify-content: center;

			.text {
				font-size: 28rpx;
				opacity: .5;
			}
		}

		.loadicon {
			width: 100rpx;
			height: 100rpx;
			animation: turn .4s linear infinite;
			position: relative;
			z-index: 10;
			opacity: .6;

			&::before {
				content: "";
				position: absolute;
				border-radius: 50%;
				border-width: 10rpx;
				border-style: solid;
				width: 80rpx;
				height: 80rpx;
				transform: scale(-.7);
				left: 0rpx;
				top: 0rpx;
				z-index: 5;
			}
		}
	}

	@-webkit-keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(1turn);
		}
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(1turn);
		}
	}

	.topic-detail {
		margin-bottom: 10rpx;
		border-bottom: 10rpx solid #f9f9f9;
		padding: 20rpx 20rpx;
	}

	.comment-submit {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 130rpx;
		padding: 24rpx 18rpx 46rpx 24rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		background: #fff;
		box-shadow: 0 2px 10px 0 rgba(155, 161, 168, .3);
		z-index: 99;

		.comment-submit-btn {
			max-width: 384rpx;
			min-width: 384rpx;
			height: 80rpx;
			background: rgba(187, 194, 202, .2);
			border-radius: 40rpx;
			padding: 18rpx 30rpx 17rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			color: rgba(47, 47, 47, .5);
		}
	}

	.comment-dialog {
		position: fixed;
		flex-direction: column;
	}

	.is-show {
		display: flex;
	}

	.is-hide {
		display: none;
	}

	.comment-submit-icon,
	.comment-submit-right {
		display: flex;
	}

	.comment-submit-icon {
		flex-direction: column;
		align-items: center;
		width: 96rpx;
		height: 96rpx;
		margin-right: 6rpx;
	}

	.comment-submit-icon:last-child {
		margin-right: 0;
	}

	.comment-submit-icon .comment-submit-image {
		display: inline-block;
		width: 36rpx;
		height: 36rpx;
		margin-top: 11rpx;
	}

	.comment-submit-icon .comment-zan-2 {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-zan-2.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-zan-active-2 {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-zan-active-2.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-star {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-star.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-nostar-active {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-nostar-active.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon .comment-comment {
		background: url(https://s.ampmake.com/www/image/wx/community-comment/community-icon-comment.png) no-repeat bottom;
		background-size: 36rpx 36rpx;
	}

	.comment-submit-icon view {
		margin-top: 6rpx;
		font-size: 24rpx;
		color: #6c788e;
		line-height: 33rpx;
	}

	.container {
		height: 600rpx;
		overflow: hidden;
		position: relative;
	}

	.subScribeButton {
		text-align: center;
		margin: 30rpx 120rpx;

		button {
			font-size: 28rpx;
			background-color: #39b54a;
			color: #fff;
		}
	}

	.textareacontent {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		background-color: #fff;
		z-index: 10;

		.textheaders {
			width: 100%;
			height: 96rpx;
			border-bottom: 1rpx solid #eaeaea;
			display: flex;
			justify-content: space-between;

			.cancel {
				color: #333;
				font-size: 32rpx;
				line-height: 96rpx;
				margin-left: 32rpx;
			}

			.publish {
				color: #3ec382;
				font-size: 32rpx;
				line-height: 96rpx;
				margin-right: 32rpx;
			}
		}

		.textareaBox {
			height: 360rpx;
			position: relative;

			.textCount {
				position: absolute;
				font-size: 26rpx;
				color: #999;
				right: 32rpx;
				top: 4rpx;
			}

			.textareaInput {
				margin: 30rpx;
			}
		}
	}



	.adview {
		position: relative;
		padding: 30rpx;

		.adtext {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			padding: 5rpx 20rpx;
			background: #333;
			color: #fff;
			font-size: 24rpx;
		}

		image {
			width: 690rpx;
			height: 200rpx;
		}
	}

	.title {
		margin: 10rpx 20rpx 20rpx 0rpx;
		font-weight: bold;
	}

	.userInfo {
		display: flex;
		flex-direction: row;

		.follow_btn {
			margin-right: 30rpx;
		}

		.center {
			padding: 5rpx 10rpx;
			flex: 1;
			display: flex;
			flex-direction: column;

			.userName {
				font-size: 26rpx;
				font-weight: bold;
			}

			.userTag {
				font-size: 20rpx;
				color: #82848A;

				.grade {
					margin-left: 20rpx;
				}
			}
		}
	}

	.content {
		margin-top: 20rpx;
		font-size: 25rpx;
	}

	.content_bottom {
		margin: 20rpx 0rpx;

		.releaseTime {
			font-size: 20rpx;
			color: #606266;
		}
	}
</style>
