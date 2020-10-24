//导入vue组件
import Vue from 'vue'

// 导入根组件app
import App from './App'
import {baseUrl} from "@/utils/config.js"
import HTTP from "@/utils/http.js"
// 取消生产提示
Vue.config.productionTip = false
Vue.filter('imgUrl',(value)=>{
	return baseUrl + value
})
// 5 价格格式化，保留两位小数
Vue.filter("priceFmt",(value,n=2)=>{
	return value.toFixed(n)
})

Vue.prototype.$HTTP=HTTP;
//指定根组件类型
App.mpType = 'app'

// 实例化vue组件
const app = new Vue({
    ...App
})
// 进行挂载
app.$mount()
