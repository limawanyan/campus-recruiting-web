<template>
	<view class="wrap">
		<!-- 薪资爆料标题 -->
		<view class="title">反馈建议</view>
		<!-- 爆料信息主体 -->
		<view class="infoBox">
			<u-form :model="form" ref="uForm">
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false label="反馈类型">
					<u-input type="select"  :placeholder="typeLable" :border=true @click="feedBackTypeShow = true" />
					<u-select v-model="feedBackTypeShow" :list="feedBackTypeList" @confirm="clickFeedbackType"></u-select>
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true
					label="反馈内容">
					<u-input v-model="content" type="textarea" :border=true height="150"
						placeholder="请详细描述反馈建议,便于我们尽快为您处理!" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true
					label="联系电话">
					<u-input v-model="tel" :border=true placeholder="请输入联系电话" />
				</u-form-item>
				<u-button class="submitBtn" type="error" @click="submit">确认反馈内容并提交</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				content:'',
				tel:'',
				typeLable:'请选择反馈类型',
				feedBackTypeShow: false,
				feedBackTypeList: [],
				labelStyle: {
					"color": "#2868c1",
					"font-size": "30rpx",
					"font-weight": "bold"
				}
			};
		},
		async onLoad(article) {
			const types = await this.$u.api.getDictionaryItem({
				code: "feedback_type"
			})
			console.log(types)
			this.feedBackTypeList = types.list
		},
		methods: {
			clickFeedbackType(data) {
				this.type = data[0].value
				this.typeLable = data[0].label
			},
			async submit() {
				if (this.type == 0) {
					uni.showToast({
						icon: "error",
						title: '请选择反馈类型',
						duration: 1000
					});
				} else if (this.content == '') {
					uni.showToast({
						icon: "error",
						title: '请填写反馈内容',
						duration: 1000
					});
				} else if (this.tel == '') {
					uni.showToast({
						icon: "error",
						title: '请填写联系电话，便于我们通知到您',
						duration: 1000
					}); 
				} else {
					const res = await await this.$u.api.createFeedback({
						type: this.type,
						content: this.content,
						tel: this.tel,
					})
					uni.showToast({
						title: '反馈成功',
						duration: 1000
					});
					//提示后跳转页面
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/center/index',
						})
					}, 2000);
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f3f3;
	}

	.wrap {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
	}

	.title {
		width: 100%;
		height: 1000rpx;
		background-image: linear-gradient(#33adff, #f0eff3 50%);
		font-size: 50rpx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		padding: 50rpx;
	}

	.infoBox {
		width: 90%;
		margin-top: -850rpx;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 50rpx;
		margin-bottom: 100rpx;
		padding: 20rpx 30rpx;
	}

	.submitBtn {
		margin: 30rpx 50rpx 50rpx;
	}
</style>
