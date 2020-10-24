<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" >
			<view class="row"  v-for="(item,index) in products" :key="index" @click="goDetail(item.id)">
			<!-- <view class="row"> -->
				<image :src="item.img | imgUrl" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}} </text>	
					<text>￥{{item.price}}</text>	
					<text>3565评论</text>
				</view>
			</view>
			<view class="tishi" v-if="!isMore">
						没有数据亲！
			</view>
		</view>
		
	</view>
</template>

<script>
	
	
export default {
	data(){
		return {
			fid:"1",
			page:1,
			size:3,
			products:[],
			isMore:true
		}
	},
	onLoad(options){
		// console.log(options.fid)
		this.fid=options.fid
		this.getProducts()	
	},
	onReachBottom() {
		this.page++
		this.getProducts()
	},
	methods:{
		// 1 获取此分类下的商品信息
		async getProducts(){
			if(!this.isMore){ //如果是最后一页，就不请求了
				return
			}
			
				uni.showLoading({
								title:'玩命加载中~',
								mask: true
				})
			
			
			let {fid,page,size} = this
			let res = await this.$HTTP({
				url:"/api/getcategoodPage",
				
				data:{
					fid,page,size
				}
			})
			
			uni.hideLoading()
			
			if(!res.data.list[1]){ //最后一页
				this.isMore = false
				return
			}
			this.products =this.products.concat(res.data.list[1]) 
			// console.log(this.products)
		},
		goDetail(id){
			uni.navigateTo({
				url:`/pages/details/details?id=${id}`
			})
		}
	}
}
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
