<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" placeholder="输入手机号" maxlength="12" v-model="phone" value="" name="userPhone" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="getCode">{{str}}</text>
			</view>
			<input type="text" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button @click="goLogin" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<!-- <text style="color: #006699;text-align: center;" >通过微信授权登录</text> -->
		</view>
	</view>
</template>

<script>
	
	let app = getApp()
	
	export default {
		data() {
			return {
				phone:'15137895035',
				str:"获取手机验证码",
				timer:null,
				isButton:false//获取验证码按钮是否禁用 true 禁用，默认false不禁用
			}
		},
		methods: {
			async getCode(){
				
					let phone=this.phone
					
					let num = 5//倒计时60秒
					clearInterval(this.timer)  
					this.timer=setInterval(()=>{
						if(num<=0){
							clearInterval(this.timer) //防止连续点击，速度加快
							this.str = "请重新发送"
							this.isButton=false
							return
						}
						num--
						this.str = num+"秒后请重新发送"
					},1000)
					
					let res = await this.$HTTP({
						url:"/api/sms",
						data:{
							phone
						}
					})
					let code = res.data.list.code
					uni.setStorageSync("code",code)
				},
				async goLogin(){
					let phone = this.phone
					let code = uni.getStorageSync("code") || []
					
					
					let res = await this.$HTTP({
						url:"/api/wxlogin",
						data:{
							phone
						}
					})
					if(res.data.code==200){
						uni.setStorageSync("loginstatus",res.data.list)
						uni.showToast({
							title:"登陆成功",
							mask:true
						})
						// 登录成功后跳到原来的页面
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
					
				}
			},
			
		
	}
</script>

<style>
	/* 导入外部的样式文件 */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
