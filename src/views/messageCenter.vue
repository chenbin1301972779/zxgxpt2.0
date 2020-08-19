<!-- 消息中心 -->
<template>
	<div class="message-center">
		<div style="margin-bottom: 15px;">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>消息中心</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="main-content">
		<div class="content-item leftBox" style="margin-top: 40px;">
		    <div class="title">
		        <span class="icon"></span>
		        <span>预警推送</span>
		    </div>
		    <div class="main">
		        <el-tabs v-model="activeAlarmTab" stretch>
		            <el-tab-pane label="天眼查" name="1">
		                <div class="tab-content-wrapper">
		                    <div class="tab-content" v-for="(item,index) in qichachaData" :key="index">
		                        <p style="font-weight:bold;font-size:14px">
		                            <span>{{item.company}}</span>
		                            <span>{{item.level}}</span>
		                        </p>
		                        <p style="color:#999;font-size:12px">
		                            <span>{{item.reason}}</span>
		                        </p>
		                        <p style="color:#617be3;font-size:12px">
		                            <span>风险推送人：{{item.person}}</span>
		                            <span>推送时间：{{item.time}}</span>
		                        </p>
		                    </div>
		                </div>
		
		            </el-tab-pane>
		            <el-tab-pane label="中诚信" name="2">
		                <div class="tab-content-wrapper">
							<div style="text-align: right;font-size: 14px;color:#617be3;margin-bottom: 10px;cursor: pointer;" @click="gobi">查看更多>></div>
							<div class="tab-content" v-for="(item,index) in zhongchengxinData" :key="index">
							    <p style="font-size:14px;margin-bottom: 10px;">
							        <span>{{item.companyName}}
										<span style="background-color:#617be3;" class="status-style" v-if="item.status==1">一般</span>
										<span style="background-color:#E6A23C;" class="status-style" v-else-if="item.status==2">重大</span>
									</span>
							    </p>
							    <p style="font-size:14px">
							        <span>风险事件类型：{{item.type}}</span>
							        <span>最新推送时间：{{item.time}}</span>
							    </p>
							</div>
						</div>
		            </el-tab-pane>
		            <el-tab-pane label="站内信" name="3">
		                <div class="tab-content-wrapper">站内信</div>
		            </el-tab-pane>
		            <el-tab-pane label="集团公示" name="4">
		                <div class="tab-content-wrapper">集团公示</div>
		            </el-tab-pane>
		        </el-tabs>
		    </div>
		</div>
	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				activeAlarmTab: "1",
				qichachaData: [
				    {
				        'company': 'ABC有限公司',
				        'level': '2级别',
				        'reason': '鉴于国内猪肉价格上涨',
				        'person': '张三',
				        'time': '2020-7-24'
				
				    },
				    {
				        'company': 'ABC有限公司',
				        'level': '2级别',
				        'reason': '鉴于国内猪肉价格上涨',
				        'person': '张三',
				        'time': '2020-7-24'
				    },
				],//天眼查
				zhongchengxinData:[
					{
						companyName:'顾家家股份有限公司',
						type:'开庭公告',
						status:'1',
						time:'2020-07-29'
					},
					{
						companyName:'顾家家股份有限公司',
						type:'注册资本',
						status:'2',
						time:'2020-07-29'
					}
				],
			}
		},
		methods:{
			gobi(){
			    this.$router.push({
			        path: '/iframePage',
			        query: {
			            title:encodeURIComponent('中诚信'),
			            url:encodeURIComponent(`http://10.0.130.27:8080/webroot/decision/view/form?viewlet=test.cpt&op=view&userCode=${this.$Cookies.get('userCode')}`)
			        }
			    })
			},
		}
	}
</script>

<style lang="less" scoped>
	.message-center{
		width: 90%;
		height: 100%;
		margin: auto;
		background-color: #f8f8f8;
		box-sizing: border-box;
		padding: 20px;
		overflow-block: auto;
		.title {
		    margin-bottom: 10px;
		    font-size: 14px;
		    .icon {
		        display: inline-block;
		        width: 5px;
		        height: 20px;
		        background: #1b7fbd;
		        vertical-align: middle;
		        margin-right: 5px;
		    }
		    .text {
		        font-size: 12px;
		        color: #999;
		        float: right;
		        .postLink {
		            color: #1b7fbd;
		            text-decoration-line: underline;
		            margin-left: 10px;
		            cursor: pointer;
		        }
		    }
		}
		.tab-content-wrapper {
		    min-height: 240px;
		    overflow: auto;
		
		    .tab-content {
		        border: 1px solid #e3e3e3;
		        border-top: 2px solid #1b7fbd;
		        padding: 10px 20px;
		        margin-bottom: 10px;
		
		        p {
		            display: flex;
		            justify-content: space-between;
		            line-height: 28px;
		        }
				.status-style{
					border-radius: 20%;
					padding: 3px;
					color: #fff;
					margin-left: 5px;
					text-align: center;
					font-size: 12px;
				}
		    }
		}
	}
</style>
