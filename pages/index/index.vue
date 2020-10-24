<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView" >
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView" >
				<input @focus="goSearch" class="textinput" style="text-align: center;" type="text" value="" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->

		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" scroll-x="{true}">
				<view class="uni-tab-item" v-for="(item,index) in cateList" :key="item.id" @click="tabChange(index,item.id)">
					<text 
					:class="tabIndex===index?'uni-tab-item-title uni-tab-item-title-active':'uni-tab-item-title'"
					>{{item.catename}} </text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="banner-container">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000"
			circular="true"
			>
				<swiper-item v-for="item in bannerList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img | imgUrl" mode=""></image>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="@/static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toClassify">
				<image src="@/static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="@/static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{seckTime.h}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{seckTime.m}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{seckTime.s}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="seckillInfo.img | imgUrl" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="@/static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="@/static/index/swiper.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="goodsTabIndex===0?'tag_list active_tag_list':'tag_list'" @click="goodsTab(0)">
					<label for="">热门推荐</label>
				</view>
				<view :class="goodsTabIndex===1?'tag_list active_tag_list':'tag_list'" @click="goodsTab(1)">
					<label for="">最新好货</label>
				</view>
				<view :class="goodsTabIndex===2?'tag_list active_tag_list':'tag_list'" @click="goodsTab(2)">
					<label for="">所有商品</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product" v-if="goodsList.length>0">
				<view class="product" v-for="(item,index) in goodsList[goodsTabIndex].content" :key="index" @click="goDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img | imgUrl" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售50件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: [], //1顶部分类列表
				tabIndex:0,//顶部分类激活index
				bannerList:[],//2轮播图数据列表
				seckillInfo:{},//3 秒杀信息
				timer:null,
				seckTime:{},
				goodsList:[],//三个模块的数据
				goodsTabIndex:0,//三个模块的tab切换下标
				id:null, //去商品详情，的商品id
			}
		},
		onShow() {
			this.getCateList()
			this.getBannerList()
			this.getSeckillInfo()
			this.getGoodsList()
			this.getSeckTime()
			this.getSeckTime()
		},
		onHide(){
			clearInterval(this.timer)
		},
		methods: {
			goSearch(){
				uni.navigateTo({
					url:"/pages/search/search"
				})
			},
			// 去分类页面classify
			toClassify(){
				uni.navigateTo({
					url:"/pages/classify/classify"
				})
			},
			// 1  获取顶部分类列表
			async getCateList() {
				let res = await this.$HTTP({
					url: "/api/getcates"
				})
				this.cateList = res.data.list
			},
			tabChange(index,fid){
				// console.log(index,fid)
				this.tabIndex = index
				uni.navigateTo({
					url:`/pages/product/product?fid=${fid}`
				})
			},
			// 2   请求轮播图列表
			async getBannerList(){
				let res = await this.$HTTP({
					url:"/api/getbanner"
				})
				this.bannerList=res.data.list
				// console.log(this.bannerList)
			},
			async getSeckillInfo(){
				let res = await this.$HTTP({
					url:"/api/getseckill"
				})
			this.seckillInfo = res.data.list[0]
			   this.getSeckTime(this.seckillInfo.endtime)
			},
			// 处理秒杀倒计时
			getSeckTime(endtime){
				clearInterval(this.timer)
				this.timer = setInterval(()=>{
					let currentTime = new Date().getTime()
					let difTime = (currentTime-endtime)/1000 
					if(difTime<0){
						clearInterval(this.timer)
						return
					}
					let h = parseInt(difTime%86400/3600)
					let m = parseInt(difTime%3600/60)
					let s = parseInt(difTime%60)
					h = h < 10 ? '0' + h : h
					m = m < 10 ? '0' + m : m
					s = s < 10 ? '0' + s : s
					this.seckTime={h,m,s}
				},1000)	
				// console.log(this.seckTime)
			},
			// 3   三个tab切换模块的数据
			async getGoodsList(){
				let res = await this.$HTTP({
					url:"/api/getindexgoods"
				})
				// console.log(res.data.list)
				this.goodsList = res.data.list
			},
			
			goodsTab(index){
				this.goodsTabIndex=index
			},
			goDetail(id){
				this.id = id
				uni.navigateTo({
					url:`/pages/details/details?id=${id}`
				})	
			}
		},
		// 顶部分类切换动态样式

	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
