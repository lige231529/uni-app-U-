<template>
	<view class="container" v-if="cartList">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" v-for="(item,index) in cartList" :key="index">
				<view class="cartInfo">
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked?true:false" @change="editChecked(index,item.id)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img | imgUrl" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：白色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="editNum(-1,index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="editNum(1,index,item.id)">+</label>
							</view>
						</view>
					</view>

				</view>
				<view class="cartDel" @click="delCart(item.id)">
					<label for="">删除</label>
				</view>
			</scroll-view>
		</view>


		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllChecked" @change="allCheckedChange" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">总计：<label style="color: red;">{{allPrice | priceFmt}}</label></view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="confirm">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{allNum}}件)</label>
			</view>
		</view>

	</view>
	<view v-else>
		购物车空空如也~
		<button @click="goProduct">去逛逛 </button>
	</view>
</template>

<script>
	// 购物车页面思路：
	// 第一步：请求数据，渲染 （前面的勾选根据返回的数据数据处理一下，数字转布尔值）
	// 第二步：绑定是否全选的变量，并设置是否全选（every方法遍历购物车列表）
	export default {
		data() {
			return {
				uid: "2be08210-70fa-11ea-9c17-a5b3f9b0d2ba",
				cartList: [], //购物车列表数据
				isAllChecked: false, //是否全选 

			}
		},
		onShow() {
			this.getCartList()
		},
		methods: {
			// 1 获取购物车列表
			async getCartList() {
				let token =await getApp().getToken()	
				if (!token) {
					uni.showToast({
						title: "请登录~",
						icon: "none",
						mask: true,
						duration: 2000
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/send/send"
						})
					},2000)
					return
				}
				console.log(11111)
				let uid = this.uid
				let res = await this.$HTTP({
					url: "/api/cartlist",
					data: {
						uid
					},
					header: {
						authorization: token
					}
				})
				this.cartList = res.data.list
				this.isAllChecked = this.setIsAllChecked()
			},
			// 2 判断是否全选(返回布尔值)
			setIsAllChecked() {
				let allChecked = false
				if (this.cartList) {
					allChecked = this.cartList.every(item => item.checked)
				}

				return allChecked
			},
			// 6 点击加减号，修改视图及数据库,想知道操作的哪条购物车信息，传index，不要传id，不然会多一层查找
			editNum(n, index, id) {
				// console.log(n,index,"加减，购物车列表的下标")  

				this.cartList[index].num += n //6.1 修改视图
				if (this.cartList[index].num < 1) {
					this.cartList[index].num = 1
				}
				// 商品数量发生改变，修改数据库中的商品数量
				this.editCart(index)

			},
			// 6.2 修改数据库，调用编辑接口
			async editCart(index) {
				let {
					id,
					num,
					checked
				} = this.cartList[index]
				let res = await this.$HTTP({
					url: "/api/cartedit",
					data: {
						id, //商品的购物车编号
						num, //商品数量
						checked, //商品购物车编号是否选中
					}
				})
			},
			// 7 修改购物车的选中状态
			editChecked(index) {
				this.cartList[index].checked = this.cartList[index].checked ? 0 : 1
				this.editCart(index)
				this.getCartList()
			},
			// 8 点击购物车全选按钮
			allCheckedChange(e) {

				if (e.detail.value) {
					this.cartList.forEach((item, index) => {
						item.checked = 1
						this.editCart(index)
					})
				} else {
					this.cartList.forEach((item, index) => {
						item.checked = 0
						this.editCart(index)
					})
				}
			},
			// 9 去结算
			confirm() {
				let carts = this.cartList.filter(item => item.checked)
				uni.setStorageSync("carts", carts)
				uni.navigateTo({
					url: "/pages/confirm/confirm"
				})
			},
			// 10 删除
			async delCart(id) {
				let res = await this.$HTTP({
					url: "/api/cartdelete",
					data: {
						id
					}
				})
				if (res.data.msg == "删除成功") {
					this.getCartList()
				}
			},
			goProduct() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		},
		computed: {
			// 3 计算总件数 
			allNum() {
				let allNum = 0
				if (this.cartList) {
					this.cartList.forEach(item => {
						if (item.checked) {
							allNum += item.num
						}

					})
				}
				return allNum
			},
			// 4 计算总价
			allPrice() {
				let allPrice = 0
				if (this.cartList) {
					this.cartList.forEach(item => {
						if (item.checked) {
							allPrice += item.price * item.num
						}

					})
				}

				return allPrice
			},

		},

	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.foot {
		bottom: var(--window-bottom)
	}
</style>
