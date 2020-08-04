<!-- 单次信用评价 -->
<template>
	<div class="credit-evaluate">
		<div style="margin-bottom: 15px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>单次信用评价</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content">
			<div class="steps">
				<el-steps :active="active" finish-status="success" align-center >
				  <el-step title="主体信息"></el-step>
				  <el-step title="财务信息"></el-step>
				  <el-step title="风险评价"></el-step>
				  <el-step title="评价结果"></el-step>
				</el-steps>
			</div>
			<div class="main" v-if="active===0">
				<table >
					<tr>
						<td style="text-align: right;" width="300px">企业名称：</td>
						<td>{{companyName}}</td>
					</tr>
					<tr>
						<td style="text-align: right;">统一社会信用代码/注册码：</td>
						<td>{{creditNo}}</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align: right;">
							<el-button type="primary" size="small" @click="reset">恢复默认</el-button>
						</td>
					</tr>
					<tr>
						<td style="text-align: right;">
							<span style="color:red">*</span>
							所属行业：
						</td>
						<td>
							<el-select v-model="profession" placeholder="请选择" size="medium" @change="changeProfession">
							    <el-option
							      v-for="item in professionOptions"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							  </el-select>
							  <el-select v-model="professionDetail" placeholder="请选择" size="medium" style="margin-left: 15px;">
							      <el-option
							        v-for="item in professionDetailOptions"
							        :key="item"
							        :label="item"
							        :value="item">
							      </el-option>
							  </el-select>
						</td>
					</tr>
					<tr>
						<td style="text-align: right;">
							<span style="color:red">*</span>
							企业性质：
							</td>
						<td>
							<el-select v-model="companyType" placeholder="请选择" size="medium">
							    <el-option
							      v-for="item in companyTypeOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							  </el-select>
						</td>
					</tr>
				</table>
			</div>
			
			<div class="main" v-if="active===1">
				<table >
					<tr>
						<td style="text-align: right;" width="300px">企业名称：</td>
						<td>{{companyName}}</td>
					</tr>
					<tr>
						<td style="text-align: right;">统一社会信用代码/注册码：</td>
						<td>{{creditNo}}</td>
					</tr>
					<tr>
						<td style="text-align: right;">所属行业：</td>
						<td>{{profession}}-{{professionDetail}}</td>
					</tr>
				</table>
				<el-table
				      :data="tableData"
				      style="width: 100%;margin-top: 80px;" @selection-change="handleSelectionChange" ref="multipleTable">
					   <el-table-column
						type="selection"
						width="55">
					   </el-table-column>
				      <el-table-column
				        prop="year"
				        label="报表年份">
				      </el-table-column>
				      <el-table-column
				        prop="month"
				        label="报表月份">
				      </el-table-column>
				      <el-table-column
				        prop="time"
				        label="报表周期">
				      </el-table-column>
					  <el-table-column
					    prop="from"
					    label="来源">
					  </el-table-column>
					  <el-table-column
					    prop="uploaderName"
					    label="上传者">
					  </el-table-column>
					  <el-table-column
					    prop="uploadTime"
					    label="上传事件">
					  </el-table-column>
					  <!-- <el-table-column
					    label="操作" width="200px">
						<template>		
							<el-button type="primary" plain size="medium">查看</el-button>
							<el-button type="danger" plain size="medium">删除</el-button>
						</template>
					  </el-table-column> -->
				    </el-table>
			</div>
			
			<div class="main" v-if="active===2" >
				<el-card class="box-card">
				  <div v-html="htmlContent" style="overflow: auto;height: 400px;margin: auto;"></div>
				</el-card>
				
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
				active: 0,
				companyName:this.$route.query.companyName,
				creditNo:this.$route.query.creditCode,
				profession:'',
				professionDetail:'',
				companyType:'',
				professionOptions:[],
				professionDetailOptions:[],
				companyTypeOptions:[],
				lastDisabled:true,
				nextDisabled:false,
				tableData:[
					{
						year:'2019',
						month:'12',
						time:'年报',
						from:'系统内置',
						uploaderName:'系统',
						uploadTime:'2019/12/30'
					},
					{
						year:'2019',
						month:'12',
						time:'年报',
						from:'系统内置',
						uploaderName:'系统',
						uploadTime:'2019/12/30'
					},
				],
				htmlContent:'',
				backData:{},
				multipleSelection:[]
				//htmlPage: () => import('../../static/zhongchengxin.html')
			}
		},
		watch:{
			active(newVal,oldVal){
				//console.log(newVal,oldVal)
				if(newVal===0){
					this.lastDisabled = true;
					this.nextDisabled=false;
				}else if(newVal==3){
					this.lastDisabled = false;
					this.nextDisabled=true;
				}else if(newVal>0){
					this.lastDisabled = false;
				}
			}
		},
		created(){
			this.getHtml();
			this.getIndustry();
		},
		mounted(){
		},
		methods:{
			nextStep(){
				if(this.active==1){
					if(this.multipleSelection.length==0){
						this.$message.warning('请选择数据');
						return;
					}
				}
				this.active++
			},
			lastStep(){
				if(this.active>0){
					this.active--;
					this.lastDisabled=false
				}else{
					this.lastDisabled=true
				}
				this.multipleSelection=[]
			},
			getHtml(){
				let param = {
					userId:this.$Cookies.get("userId"),
					companyId:this.$route.query.companyId.toString()
				}
				this.$ajax.manage.getHtml(param).then(res=>{
					console.log(res);
					if(res.status==200){
						this.htmlContent = res.data;
						//document.getElementById("html").innerHTML=res.data
					}
				})
			},
			getIndustry(){
				console.log(123)
				this.$ajax.manage.getIndustry({}).then(res=>{
					console.log(res)
					if(res.status==200){
						let list = [];
						for(let i in res.data.areaList){
							list.push(i)
						}
						this.professionOptions =list;
						this.backData=res.data.areaList
					}
				})
			},
			changeProfession(val){
				console.log(this.backData)
				for(let i in this.backData){
					if(i==val){
						this.professionDetailOptions = this.backData[i]
					}
				}
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			reset(){
				this.profession=this.professionOptions[0];
				for(let i in this.backData){
					if(i==this.profession){
						this.professionDetailOptions = this.backData[i]
					}
				}
				this.professionDetail=this.professionDetailOptions[0];
			}
		}
	}
</script>
<style>
	.header {
		margin-bottom: 0!important;
		margin-top: 0!important;
	}
	p{
		margin: 0!important;
	}
</style>
<style lang="less" scoped>
	
	.credit-evaluate{
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
