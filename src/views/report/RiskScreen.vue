<!-- 风险初筛 -->
<template>
	<div class="risk-screen">
		<div style="margin-bottom: 15px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/essInfo' ,query:$route.query}">查看</el-breadcrumb-item>
			  <el-breadcrumb-item>风险初筛</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content">
			<div class="steps">
				<el-steps :active="active" finish-status="success" align-center >
				  <el-step title="风险评价"></el-step>
				  <el-step title="评价结果下载"></el-step>
				</el-steps>
			</div>
			<div class="main" v-if="active===0">
				<el-card class="box-card">
				  <div v-html="htmlContent" style="overflow: auto;height: 400px;margin: auto;"></div>
				</el-card>
			</div>
			<div class="main" v-if="active===1" >
				<div class="btn-box">
					<el-button type="primary" style="align:center">
						<i :class="{'el-icon-loading':loading,'el-icon-download':!loading}"></i>
						报告下载</el-button>
				</div>
			</div>
			<div class="btn-box">
				<el-button type="primary" size="medium" @click="lastStep" :disabled="lastDisabled">上一步</el-button>
				<el-button type="primary" size="medium" @click="nextStep" :disabled="nextDisabled">下一步</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				active:0,
				companyName:this.$route.query.companyName,
				creditNo:this.$route.query.creditCode,
				htmlContent:'',
				loading:false,
				lastDisabled:true,
				nextDisabled:false,
			}
		},
		mounted(){
			this.getRiskScreenHtml()
		},
		watch:{
			active(newVal,oldVal){
				console.log(newVal);
				if(newVal==1){
					this.nextDisabled = true;
					this.lastDisabled = false
				}else if(newVal==0){
					this.nextDisabled = false;
					this.lastDisabled = true
				}
			}
		},
		methods:{
			getRiskScreenHtml(){
				let param = {
					companyId:this.$route.query.companyId.toString(),
					creditCode:this.$route.query.creditCode
				}
				console.log(param)
				this.$ajax.manage.getRiskScreenHtml(param).then(res=>{
					console.log(res);
					// if(res.status==200){
					// 	this.htmlContent = res.data;
					// 	let temp = 'content-disposition'
					// 	let data = res.headers[temp];
					// 	this.fileName=data.split('=')[1];
					// }
				})
			},
			nextStep(){
				// if(this.active<1){
				// 	this.active++;
				// 	this.nextDisabled=true;
				// 	this.lastDisabled=false
				// }else if(this.active==1){
				// 	this.nextDisabled=true;
				// 	this.lastDisabled=false
				// }
				this.active++
			},
			lastStep(){
				this.active--;
			}
		}
	}
</script>

<style lang="less" scoped="">
	.risk-screen{
		width: 100%;
		min-width: 1300px;
		height: 100%;
		margin: auto;
		padding: 20px 5%;
		box-sizing: border-box;
		overflow: auto;
		.content{
			background-color: #FFF;
			padding: 30px;
			.main{
				//padding-left: 200px;
				padding: 0 100px;
				margin-top: 40px;
				table{
					width: 100%;
					tr{
						height: 40px;
					}
				}
			}
			.btn-box{
				text-align: center;
				margin-top: 40px;
			}
		}
	}
</style>
