<template>
	<view class="wrap">
		<!-- 薪资爆料标题 -->
		<view class="title">薪资爆料</view>
		<!-- 爆料信息主体 -->
		<view class="infoBox">
			<u-form ref="uForm">
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true label="公司">
					<u-input v-model="companyName" :border=true placeholder="公司名称" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true label="岗位">
					<u-input v-model="postName" :border=true placeholder="岗位名称" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true label="城市">
					<u-input v-model="cityName" :border=true placeholder="岗位所在城市,如北京" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true
					label="薪资描述">
					<u-input v-model="description" :border=true placeholder="薪资描述,如20W或者15*16" />
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false label="学历">
					<u-input type="select" :placeholder="educationLable" :border=true @click="educationShow = true" />
					<u-select v-model="educationShow" :list="educationOptions" @confirm="clickEducation"></u-select>
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false label="行业">
					<u-input type="select" :placeholder="industryLable" @click="industryShow = true" :border=true />
					<u-select v-model="industryShow" :list="industryOptions" @confirm="clickIndustry"></u-select>
				</u-form-item>
				<u-form-item :label-style="labelStyle" label-position="top" :border-bottom=false :trim=true label="备注">
					<u-input type="textarea" :border=true height="150" v-model="remarks"
						placeholder="请填写offer相关的其他信息,如是否sp offer,是否有签字费,各类福利补贴等" />
				</u-form-item>
				<u-button class="submitBtn" type="error" @click="submit">核对内容并提交</u-button>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				companyName: '',
				postName: '',
				cityName: '',
				description: '',
				education: 0,
				industry: 0,
				remarks: '',
				educationLable: '请选择学历',
				industryLable: '请选择行业',
				educationShow: false,
				industryShow: false,
				educationOptions: [{
						value: '1',
						label: '本科'
					},
					{
						value: '2',
						label: '研究生'
					}
				],
				industryOptions: [{
						value: '1',
						label: '互联网'
					},
					{
						value: '2',
						label: '医药'
					}
				],
				labelStyle: {
					"color": "#2868c1",
					"font-size": "30rpx",
					"font-weight": "bold"
				}
			};
		},
		async onLoad() {
			const industryOptions = await this.$u.api.getDictionaryItem({
				code: "industry_type"
			})
			const educationOptions = await this.$u.api.getDictionaryItem({
				code: "education_type"
			})
			this.industryOptions = industryOptions.list
			this.educationOptions = educationOptions.list
		},
		methods: {
			clickIndustry(data) {
				this.industry = data[0].value
				this.industryLable = data[0].label
			},
			clickEducation(data) {
				this.education = data[0].value
				this.educationLable = data[0].label
			},
			async submit() {
				if (this.companyName.trim() == '') {
					uni.showToast({
						icon: "error",
						title: '请填写公司名称',
						duration: 1000
					});
				} else if (this.postName.trim() == '') {
					uni.showToast({
						icon: "error",
						title: '请填写岗位名称',
						duration: 1000
					});
				} else if (this.cityName.trim() == '') {
					uni.showToast({
						icon: "error",
						title: '请填写岗位所在城市',
						duration: 1000
					});
				} else if (this.education == 0) {
					uni.showToast({
						icon: "error",
						title: '请选择学历',
						duration: 1000
					});
				} else if (this.industry == 0) {
					uni.showToast({
						icon: "error",
						title: '请选择行业',
						duration: 1000
					});
				} else {
					const res = await await this.$u.api.createSalaryInfo({
						companyName: this.companyName,
						postName: this.postName,
						cityName: this.cityName,
						description: this.description,
						education: this.education,
						industry: this.industry,
						remarks: this.remarks
					})
					uni.showToast({
						title: '爆料成功',
						duration: 1000
					});
					//提示后跳转页面
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/salary/index',
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
		height: 100%;
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
