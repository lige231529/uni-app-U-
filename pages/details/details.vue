<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="goodsInfo.img | imgUrl">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{goodsInfo.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{goodsInfo.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian">-</label>
					<label class="zhi">2</label>
					<label class="jia">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{goodsInfo.specsname}}</label>
					<view class="threed3i1" v-for="(item,index) in goodsInfo.specsattr" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<rich-text :nodes="goodsInfo.description"></rich-text>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="@/static/detail/2.jpg" @load="autoImage" :style="{width:autoWidth+'px',height:autoHeight+'px'}" /> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">交易很好，物流很快</label>

				<view class="evalImage">
					<image src="@/static/detail/pingjia1.jpg">
						<image src="@/static/detail/pingjia2.jpg">
							<image src="@/static/detail/pingjia3.jpg">
				</view>
				<label class="evalTime">2020-02-12</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<!-- 点击传入商品id -->
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>

<script>
	// 导入图片自适应工具类
	let actionimage = require('../../utils/ActionImage.js');
	export default {
		data() {
			return {
				autoHeight: '',
				autoWidth: '',
				id: ",//商品id",
				goodsInfo: {}, //商品信息
				uid: "2be08210-70fa-11ea-9c17-a5b3f9b0d2ba",
				num: 1, //添加商品的数量
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getGoodsInfo(options.id)
		},
		methods: {
			//处理图片自适应方法
			autoImage(e) {
				// 调用图片自适应工具类方法，进行处理图片
				let auto = actionimage.default(e)
				this.autoHeight = auto.autoHeight;
				this.autoWidth = auto.autoWidth;
			},
			async getGoodsInfo(id) {
				let res = await this.$HTTP({
					url: "/api/getgoodsinfo",
					data: {
						id
					}
				})
				// console.log(id)
				this.goodsInfo = res.data.list[0]
				this.goodsInfo.specsattr = this.goodsInfo.specsattr.split(",")
				// console.log(this.goodsInfo)
			},
			
			async addCart() {
				let token = await getApp().getToken()
				if (!token) { //token过期  
					uni.showToast({
						title: "请登录~",
						icon: 'none',
						mask: true,
						duration: 1000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/send/send"
						})
					}, 1000)
					return
				}
				let goodsid = this.id
				let uid = this.uid
				let num = "1"
				let checked = 1
				let res = await this.$HTTP({
					url: "/api/cartadd",
					data: {
						goodsid,
						uid,
						num,
						checked,
						authorization:token
					}
				})
				if (res.data.msg === "添加成功") {
					uni.showToast({
						title: "添加成功",
						mask: true,
						duration: 1000
					})
				}
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}, 1000)

			}

		},


	}
</script>

<style>
	@import url("../../common/css/details.css");
</style>
