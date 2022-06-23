const install = (Vue,vm) => {
	
	/**
	 * 是否登录
	 **/
	const isLogin = () => {
		// 如果没有token 跳转到登录页面
		const token = vm.vuex_token
		if (!token) {
			// 来自哪个页面
			const currentPage = getCurrentPages().pop()
			// 获取页面路径和请求参数
			const {options,route} = currentPage
			// 参数key
			const optionKeys = Object.keys(options)
			let params = ''
			if (optionKeys.length !== 0) {
				params = optionKeys.reduce((pre,current) => {
					return `${pre}${current}=${options[current]}&`
				},'?').slice(0,-1)
			}
			// console.log(params)
			// 缓存当前页面，用于登录后跳转
			uni.setStorageSync('back_url',route + params)
			
			vm.$u.toast('请授权登录后操作')
			setTimeout(() => {
				vm.$u.route({
					type:'redirect',
					url: 'pages/center/login',
				})
			}, 1000)
			return false
		}
		return true
	}
	
	// 更新用户信息
	const updateUser = async () => {
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo()
		// 缓存用户信息
		vm.$u.vuex('vuex_user',userInfo)
	}
	
	// 格式化日期
	const getDateDiff = (dateTimeStamp) => {
		var date = new Date(dateTimeStamp);
		dateTimeStamp = date.getTime()
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var halfamonth = day * 15;
		var month = day * 30;
		var now = new Date().getTime();
		var diffValue = now - dateTimeStamp;
		if (diffValue < 0) {
			return;
		}
		var result = ""
		var monthC = diffValue / month;
		var weekC = diffValue / (7 * day);
		var dayC = diffValue / day;
		var hourC = diffValue / hour;
		var minC = diffValue / minute;
		if (monthC >= 1) {
			result = "" + parseInt(monthC) + "月前";
		} else if (weekC >= 1) {
			result = "" + parseInt(weekC) + "周前";
		} else if (dayC >= 1) {
			result = "" + parseInt(dayC) + "天前";
		} else if (hourC >= 1) {
			result = "" + parseInt(hourC) + "小时前";
		} else if (minC >= 1) {
			result = "" + parseInt(minC) + "分钟前";
		} else
			result = "刚刚";
		return result;
	}
	
	const timestampToTime = (timestamp) => {
	      var date = new Date(Number(timestamp)*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	      var Y = date.getFullYear() + '-';
	      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	      var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
	      var strDate = Y+M+D+h+m+s;
	      return strDate;//2020-07-30 01:05:54
	        
	    }
	
	vm.$u.utils = {
		isLogin,
		updateUser,
		getDateDiff
	}	
	
}

export default {
	install
}