<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.name }}</label>
				<label for="">{{ information.phone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<!-- cartsInfo 循环体 -->
			<view class="cartsInfo" v-for="(item,index) in carts" :key="index">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img | imgUrl" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:白色</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price | priceFmt}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：{{item.num}}
					</view>
					<view class="">
						<label for="" class="jian">-</label>
						<label for="" class="num">2</label>
						<label for="" class="jia">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice | priceFmt}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥300</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="submitOrder">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information: {
					name: 'YouSu',
					phone: '15811112222',
					address: '北京市海淀区隐泉路清林苑6号楼中公优就业总部3层'
				},
				carts:[],
				uid:"2be08210-70fa-11ea-9c17-a5b3f9b0d2ba",
				yunfei:10,//运费
				huiyuai:5,//会员
				quan:2,//优惠券
				jifen:2//积分
				
			}
		},
		onLoad(){
			this.carts= uni.getStorageSync("carts")
		},
		computed:{
			allPrice(){
				let allPrice = 0
				this.carts.forEach(item=>{
					allPrice+=item.price*item.num
				})
				return allPrice
			},
			allNum(){
				let allNum = 0
				this.carts.forEach(item=>{
					allNum+=item.num
				})
				return allNum
			}
		},
		methods: {
			// uid会员
			// idusername收货人姓名
			// userphone收货人联系方式
			// address收货人地址
			// countmoney订单总支付金额
			// countnumber订单商品数量
			// addtime订单添加时间（时间戳）
			// idstr购物车数据id字符串 
			// 例如：idstr = "1,2,3"authorizationheader头中需要添加token后台验证条件
			// **uid username userphone address countmoney countnumer addtime -> 封装到params中 以json字符串的形式传递过去，不是真正对象**
			
		async	submitOrder(){
				let uid = this.uid;
				let idusername=this.information.name
				let userphone=this.information.phone
				let address=this.information.address
				let countmoney= this.allPrice
				let countnumber = this.allNum
				let addtime = new Date().getTime()
				let params = {
					uid,idusername,userphone,address,countmoney,countnumber,addtime
				}
				params=JSON.stringify(params)
				let idstr = ""
				this.carts.forEach(item=>{
					idstr+=item.id+','
				})
				idstr = idstr.substring(0,idstr.length-1)
				let res = await this.$HTTP({
					url:"/api/orderadd",
					data:{
						params,idstr
					}
				})
				uni.switchTab({
					url:"/pages/mine/mine"
				})
				// console.log(res)
			}

		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
