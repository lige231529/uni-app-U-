<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<!--  -->
			<view @click="cateChange(index)" :class="activeIndex===index?'left_list activeList':'left_list'" v-for="(item,index) in cateList" :key="index">
				<label for="">{{item}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item.id)">
						<view >
							<image :src="item.img | imgUrl" alt="">
								<span>{{item.catename}}</span>
						</view>
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
				cateList:[],
				activeIndex:0,
				goodsList:[]
			}
		},
		onLoad(){
			this.getCateList()
			this.cateChange(0)
		},
		methods: {
			goDetail(id){
				
				uni.navigateTo({
					url:`/pages/details/details?id=${id}`
				})
			},
			// tab切换
		  async	cateChange(index){
				this.activeIndex=index
				let res =await this.$HTTP({
					url:"/api/getcates"
				})
			 this.goodsList=res.data.list[index].children
			 
			},
			
			// 获取分类列表
		async getCateList(){
				let res =await this.$HTTP({
					url:"/api/getcates"
				})
				console.log(res)
			  res.data.list.forEach((item)=>{
					this.cateList.push(item.catename)
				})
			
			}
			
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}

	.bottom {
		text-align: center;
		display: flex;
		flex-direction: row;
	}
</style>
