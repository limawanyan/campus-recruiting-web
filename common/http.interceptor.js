// common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://127.0.0.1:8081/api',
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: true, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		//config.header.Authorization = "Bearer " + vm.access_token
		config.header.Authorization = vm.vuex_token
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 响应状态码
		const {
			statusCode,
			data
		} = res

		if (statusCode < 400) {
			return data;
		} else if (statusCode == 400) {
			// 错误请求
			vm.$u.toast(data.message)
			return false;
		} else if (statusCode == 401) {
			// TODO 401 有两种情况，一种为认证未通过，一种是没有token或过期
			if (data.message == "Unauthorized") {
				vm.$u.toast("身份校验失败，请重新授权登录")
			} else {
				// 如果请求了需要登录的api跳转登录
				vm.$u.utils.isLogin()
			}
			return false;
		} else {

			return false;
		}
	}

}

export default {
	install
}
