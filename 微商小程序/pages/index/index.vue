<template>
	<view class="container">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval">  
			<swiper-item v-for="(img,index) in imgUrls" :key="index">  
				<image :src="img.url" class="slide-image" mode="aspectFill"/>  
			</swiper-item>   
		</swiper>  
		<view @click="getInfo">点击</view>
		<text>{{text}}</text>
		<view @click="getCity">北京</view>
		<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
		                    授权登录
		                </button>
	</view>
</template>

<script>
	import http from "../../utils/http.js"
	export default {
		data(){
			return{
				text:'',
				index:'这是首页加载可行',
				imgUrls: [
				      { 
				        url:"http://pic1.win4000.com/wallpaper/9/55064ecdca763.jpg"
				      },
				      {
				        url: "http://pic1.win4000.com/wallpaper/1/579ebc88b52ce.jpg"
				      },
				      {
				        url: "http://pic1.win4000.com/wallpaper/8/5604e5440d30a.jpg"
				      }
				    ],
				    indicatorDots: true,
				    autoplay: true,
				    interval: 5000,
				    duration: 1000

			}
		},
		onLoad() {},
		
		onPullDownRefresh:function(){
			
			wx.stopPullDownRefresh();  //停止下拉刷新
		},
		methods: {
			getInfo(){
				
				http.getArticleList({city_id:'1',weather_date:'2017-05-15',key:'221a7b2fdeb854ee2ecdca1d91888ada'}).then(res =>{
					uni.showLoading({
							    title: '加载中'
							});
					console.log(res.reason)
					this.text = res.reason
					uni.hideLoading()
				})
				// uni.request({
				// 	url:'https://api.apiopen.top/videoCategory',
				// 	methods:'GET',
				// 	success:res => {
				// 		console.log(res)
				// 		
				// 		this.text = res.data.message
				// 		
				// 	},
				// })
			},
			getCity(){
				http.getArticleList2({city_id:'3',weather_date:'2017-05-15',key:'221a7b2fdeb854ee2ecdca1d91888ada'}).then(res => {
					console.log(res)
				})
			},
			wxGetUserInfo() {
			                let _this = this;
			                uni.getUserInfo({
			                    provider: 'weixin',
			                    success: function(infoRes) {
			                        let nickName = infoRes.userInfo.nickName; //昵称
			                        let avatarUrl = infoRes.userInfo.avatarUrl; //头像
			                        try {
			                            uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
			                            // _this.updateUserInfo();
			                        } catch (e) {}
			                    },
			                    fail(res) {}
			                });
			            },
		},
	}

</script>

<style>
.swiper {
 height: 400rpx;
 width: 100%;
}

.swiper image {
 height: 100%;
 width: 100%;
}
</style>
