<template>
	<view class="wrap">
		<view class="topBox">
			<u-input v-model="titleValue" type="text" placeholder="文章标题" maxlength="30" />
			<u-input type="select" :placeholder="typeLabel" @click="show = true" />
			<u-select v-model="show" mode="single-column" :list="typeList" @confirm="clickType"></u-select>
		</view>
		<cEditor htmlContent=" " ref="cEditor" @uploadFile="uploadFile" @saveContent="saveContent"></cEditor>
	</view>
</template>

<script>
	import cEditor from "@/components/editor.vue"
	export default {
		components: {
			cEditor
		},
		data() {
			return {
				titleValue: '',
				typeValue: 0,
				show: false,
				typeList: [],
				typeLabel: '所属分类',
				/* 图片上传路径 */
				uploadUrl: "XXXXXXX",
			}
		},
		async onLoad() {
			let res = await this.$u.api.getDictionaryItem({
				code: "interview_subject_type"
			})
			this.typeList = res.list
		},
		onReady() {

		},
		methods: {
			// 发布
			async saveContent(data) {
				if (this.titleValue.trim() == '') {
					uni.showToast({
						icon: "error",
						title: '请输入题目标题',
						duration: 1000
					});
				} else if (this.typeValue == 0) {
					uni.showToast({
						icon: "error",
						title: '请选择题目类别',
						duration: 1000
					});
				} else if (data.content.trim() == '') {
					uni.showToast({
						icon: "error",
						title: '内容不能为空',
						duration: 1000
					});
				} else {
					console.log(data)
					const res = await await this.$u.api.editPostInfo({
						title: this.titleValue,
						content: data.htmlContent,
						parentType: 2,
						subType: this.typeValue
					})
					uni.showToast({
						title: '发布成功',
						duration: 1000
					});
					//提示后跳转页面
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/topic/index',
						})
					}, 2000);
				}
			},
			uploadFile() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.uploadFile({
							//开发者服务器 url
							url: this.uploadUrl,
							//获取要上传文件资源的路径。
							filePath: res.tempFilePaths[0],
							//文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
							name: 'file',
							//HTTP 请求 Header, header 中不能设置 Referer。
							header: {
								authorization: "XXXXXXX"
							},
							//成功的回调
							success: uploadFileRes => {
								this.$refs.cEditor.editorCtx.insertImage({
									src: uploadFileRes,
									alt: '该图无法显示',
									data: {
										id: 'abcd',
										role: 'god'
									},
									width: '80%',
									height: '80%'
								})
							}
						})
					}
				})
			},
			submit() {
				console.log(this.$refs.texta.$el.innerHTML);
			},
			clickType(data) {
				this.typeValue = data[0].value
				this.typeLabel = data[0].label
			}
		}
	}
</script>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.topBox {
		padding: 20rpx;
	}
</style>
