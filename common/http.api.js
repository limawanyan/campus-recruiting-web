// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性
	vm.$u.api = {}

	// 用户相关
	vm.$u.api.authLogin = params => vm.$u.post('/user/login', params); // 登录 
	vm.$u.api.updateUserBaseInfo = params => vm.$u.post('/user/update', params) // 更新基础信息
	vm.$u.api.getUserBaseInfo = params => vm.$u.get('/user/baseInfo', params) // 获取用户基础信息
	vm.$u.api.followUser = params => vm.$u.post('/user/follow',params) // 关注用户
	
	// 薪资爆料
	vm.$u.api.getSalaryInfoList = params => vm.$u.get('/salaryInfo/list', params) // 分页获取薪资列表
	vm.$u.api.getSalaryInfoDetail = params => vm.$u.get('/salaryInfo/' + params.salaryId) // 获取薪资爆料详情
	vm.$u.api.createSalaryInfo = params => vm.$u.post('/salaryInfo/create', params) // 爆料薪资
	vm.$u.api.voteSalaryInfo = params => vm.$u.post('/salaryInfo/vote', params) // 薪资可信度投票

	// 校招日程
	vm.$u.api.getRecruitInfoList = params => vm.$u.get('/recruitInfo/list', params) // 分页获取校招信息
	vm.$u.api.getRecruitInfoDetail = params => vm.$u.get('/recruitInfo/' + params.scheduleId) // 获取校招详情
	vm.$u.api.followRecruitInfo = params => vm.$u.post('/recruitInfo/follow', params) // 关注公司

	// 字典
	vm.$u.api.getDictionaryItem = params => vm.$u.get('/dictionary/subItem/' + params.code) // 获取字典项

	// 用户反馈
	vm.$u.api.createFeedback = params => vm.$u.post('/feedback/create', params) // 提交反馈
	vm.$u.api.getFeedbackList = params => vm.$u.get('/feedback/list', params) // 获取反馈记录

	// 帖子相关
	vm.$u.api.deletePostInfo = params => vm.$u.post('/postInfo/delete', params) // 删除帖子
	vm.$u.api.getPostInfoDetail = params => vm.$u.get('/postInfo/' + params.postId) // 获取帖子详情
	vm.$u.api.editPostInfo = params => vm.$u.post('/postInfo/edit', params) // 编辑帖子
	vm.$u.api.getPostInfoComment = params => vm.$u.get('/postInfo/comment', params) // 获取帖子评论
	vm.$u.api.getEditPostInfoDetail = params => vm.$u.get('/postInfo/edit', params) // 获取帖子编辑详情
	vm.$u.api.getPostInfoIds = params => vm.$u.get('/postInfo/ids', params) // 获取前20页帖子ID集合
	vm.$u.api.likePostInfo = params => vm.$u.post('/postInfo/like', params) // 点赞帖子
	vm.$u.api.getPostInfoListByIds = params => vm.$u.get('/postInfo/list', params) // 根据Ids获取帖子信息
	vm.$u.api.getPostInfoListBySearch = params => vm.$u.get('/postInfo/search', params) // 分页获取模糊搜索帖子列表
	vm.$u.api.getPostInfoListByUser = params => vm.$u.get('/postInfo/user', params) // 分页获取用户帖子列表
	vm.$u.api.getPostInfoListByStar = params => vm.$u.get('/postInfo/star', params) // 分页获取用户收藏的帖子列表
	vm.$u.api.createPostInfoComment = params => vm.$u.post('/postInfo/comment', params) // 评论帖子
	vm.$u.api.starPostInfo = params => vm.$u.post('/postInfo/star', params) // 收藏帖子
}

export default {
	install
}
