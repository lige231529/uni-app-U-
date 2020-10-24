<script>
	// 项目的根组件
	export default {
		onLaunch() {
			if(process.env.NODE_ENV === 'development'){
				//做开发操作配置设置
			    console.log('开发环境')
			}else{
				// 做生产环境配置设置
			    console.log('生产环境')
			}
			
		},
		methods:{
			// 判断token是否过期，未过期返回token,过期了返回false
			async getToken() {
				let loginstatus = uni.getStorageSync("loginstatus") || {}
				let token = loginstatus.token
				let res = await this.$HTTP({
					url: "/api/checktoken",
					header: {
						authorization: token
					}
				})
				return res.data.code === 200 ? token : false //如果登录token未过期，则返回token
			
			},
		}
		
	}
</script>

<style>
	/*每个页面公共css */
</style>
