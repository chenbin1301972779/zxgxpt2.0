<!-- 首页 -->
<template>
    <div class="main-wrapper">
        <div class="search-content">
            <div><img src="../../public/img/bannerLogo.png" alt=""> </div>
            <div>
                <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select" style="width: 500px;"
                    clearable="" @keyup.enter.native="seachContent">
                    <el-button slot="append" icon="el-icon-search" style="background-color: #1b7fbd;color: #FFFFFF;"
                        @click="seachContent"></el-button>
                </el-input>
                <div class="latest-search">
                    最近搜索：
                    <span v-for="item in latestSearchList" :key="item.id"
                        @click="searchContent(item)">{{item.keyWord}}</span>
                </div>
            </div>
        </div>
        <div v-if="$Cookies.get(this.$getCookieKey())&&showBox==1">
            <div class="main-content">
                <div class="content-item leftBox">
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
                <div class="content-item rightBox">
                    <div class="title">
                        <span class="icon"></span>
                        <span>用户名单</span>
                    </div>
                    <div class="main">
                        <el-tabs v-model="activeUserTab" stretch>
                            <el-tab-pane label="关注清单" name="1">
                                <div class="tab-content-wrapper">
                                    <div v-for="(item,index) in careList" :key="index" class="care-list">
                                        <img src="../../public/img/images/notice.png" alt="" @click="cancleFocus(item)">
                                        <span @click="moreNews(item,'0')">{{item.companyName}}</span>
                                        <img src="../../public/img/images/index_icon01.png" alt=""
                                            v-if="item.zhongchengxin===1" class="care">
                                        <img src="../../public/img/images/index_icon02.png" alt=""
                                            v-if="item.tianyancha===1" class="care">
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="灰名单" name="2">灰名单</el-tab-pane>
                            <el-tab-pane label="黑名单" name="3">黑名单</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>

            <div class="usually-box">
                <div class="title">
                    <span class="icon"></span>
                    <span>常用应用</span>
                </div>
                <div class="main">
                    <div class="img-box" v-for="(item,index) in useList" :key="index" @click="goToApp(index)">
                        <el-card shadow="hover">
                            <img :src="item.img" alt="">
                            <div>{{item.name}}</div>
                        </el-card>

                    </div>
                </div>
            </div>
        </div>
        <div v-if="showBox==2">
            <div class="main-content">
                <div class="content-item leftBox">
                    <div class="title">
                        <span class="icon"></span>
                        <span>检测列表</span>
                        <span class="text">
                            根据关键字，共搜索到 {{searchList.length>0?searchList.length:0}} 条数据结果，结果来自
                            {{sourceType}}
                            <a class="postLink" @click="blarSearch">模糊接口查询</a>
                        </span>
                    </div>
                    <div class="main">
                        <ul class="proList_li" v-if="searchList.length>0">
                            <li class="clear" v-for="(item,index) in searchList" :key="index">
                                <div class="fl-left proList_content">
                                    <p class="proList_txt" @click="moreNews(item,'0')" v-html="brightenKeyword(item.companyName,searchVal)">
                                    </p>
                                    <p>社会统一信用代码：{{item.creditCode}}</p>
                                    <p>法人代表：{{item.operName}}</p>
                                    <p>成立时间：{{item.buildDate}}</p>
                                </div>
                                <dl class="fl-right proList_btn">
                                    <el-button plain type="primary" size="medium" @click="moreNews(item,'1')">天眼查
                                    </el-button>
                                    <el-button plain type="primary" size="medium" @click="moreNews(item,'2')">中信保
                                    </el-button>
                                    <el-button plain type="primary" size="medium" @click="moreNews(item,'3')">中诚信
                                    </el-button>
                                    <el-button plain type="primary" size="medium" @click="moreNews(item,'0')">更多详情
                                    </el-button>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="content-item rightBox">
                    <div class="title">
                        <span class="icon"></span>
                        <span>我的关注</span>
                    </div>
					<div class="tab-content-wrapper">
					    <div v-for="(item,index) in careList" :key="index" class="care-list">
					        <img src="../../public/img/images/notice.png" alt="" @click="cancleFocus(item)">
					        <span @click="moreNews(item,'0')">{{item.companyName}}</span>
					        <img src="../../public/img/images/index_icon01.png" alt=""
					            v-if="item.zhongchengxin===1" class="care">
					        <img src="../../public/img/images/index_icon02.png" alt=""
					            v-if="item.tianyancha===1" class="care">
					    </div>
					</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchVal: '',
                latestSearchList: [],
                activeAlarmTab: "1",
                activeUserTab: '1',
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
                useList: [
                    { img: require('../../public/img/images/use_icon01.png'), name: '黑名单申报' },
                    { img: require('../../public/img/images/use_icon02.png'), name: '黑名单审批' },
                    { img: require('../../public/img/images/use_icon03.png'), name: '站内信' },
                    { img: require('../../public/img/images/use_icon04.png'), name: '关注清单' },
                    { img: require('../../public/img/images/use_icon05.png'), name: '用户管理' },
                ],
                searchList: [],
                sourceType: '',
                showBox: 1,
                careList: []
            }
        },
        mounted() {
            if (this.$Cookies.get(this.$getCookieKey())) {
                this.getLatestSearchList();
                this.getCareList();//关注清单
            }
        },
        methods: {
            seachContent() {
                if (this.searchVal === '') {
                    this.showBox = 1
                } else {
                    if (this.$Cookies.get(this.$getCookieKey())) {
                        //已登录=>搜索
                        let param = {
                            "keyword": this.searchVal,
                            "page": 1,
                            "userId": parseInt(this.$Cookies.get('userId'))
                        }
                        this.$ajax.manage.getSearchList(param).then(res => {
                            console.log(res);
                            if (res.status == 200) {
                                //console.log(res.data);
                                this.searchList = res.data.searchList
                                this.sourceType = res.data.sourceType;
                                this.showBox = 2;
                            }
                        })
                    } else {
                        //未登录=>去登陆
                        this.dialogVisible = true;
                        this.$Bus.$emit('showDialog')
                    }

                }
            },
            getLatestSearchList() {
                let param = {
                    userId: this.$Cookies.get('userId')
                }
                this.$ajax.manage.latestWords(param).then(res => {
                    if (res.status == 200) {
                        this.latestSearchList = res.data.latestWords
                    }
                })
            },
            goToApp(index) {
                //常用应用
                console.log(index)
                if (index == 0) {
                    //黑名单申报
                } else if (index == 1) {
                    //黑名单审批
                } else if (index == 2) {
                    //站内信
                } else if (index == 3) {
                    //关注清单
                } else if (index == 4) {
                    //用户管理
                    if (this.$Cookies.get('username') != 'admin') {
                        this.$message.warning('您暂没有查看该功能的权限，请联系管理员')
                    } else {
                        //55109783
                        this.$router.push({ path: '/userManage' })
                    }
                }
            },
            moreNews(item, index) {
                console.log(item)
                if (index === 0) {
                    //基本信息
                } else if (index === 1) {
                    //天眼查
                } else if (index === 2) {
                    //中信保
                } else if (index === 3) {
                    //中诚信
                } else if (index === 4) {
                    //更多详情
                }
                this.$router.push({
                    path: '/essInfo',
                    query: {
                        companyName: item.companyName,
                        companyId: item.companyId,
                        creditCode: item.creditCode,
                        buildDate: item.buildDate,
                        index: index
                    }
                })
            },
            getCareList() {
                //关注清单列表
                let param = {
                    userId: this.$Cookies.get('userId')
                }
                this.$ajax.manage.getCareList(param).then(res => {
                    if (res.data.code == 0) {
                        this.careList = JSON.parse(res.data.careList)
                    }
                })
            },
            cancleFocus(item) {
                console.log(item)
                //取消关注
                let param = {
                    "userId": this.$Cookies.get('userId'),
                    "companyId": item.companyId,
                    "zhongchengxin": 0,
                    "zhongxinbao": 0
                }
                this.$ajax.manage.careOrNot(param).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$message.success(res.data.msg);
                        this.getCareList()
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            blarSearch() {
                //模糊接口查询
                let param = {
                    keyword: this.searchVal,
                    userId:this.$Cookies.get('userId'),
                    page: 1
                }
                this.$ajax.manage.directSearchList(param).then(res => {
                    if (res.status == 200) {
                        this.searchList = res.data.searchList
                        this.sourceType = res.data.sourceType;
                        this.showBox = 2;
                    }
                })
            },
            searchContent(item) {
                this.searchVal = item.keyWord;
                this.seachContent()
            },
			 //搜索高亮
			brightenKeyword(val, keyword) {
			    if (keyword.length > 0) {
			        let keywordArr = keyword.split("");
			        val = val + "";
			        keywordArr.forEach(item => {
			          if (val.indexOf(item) !== -1 && item !== "") {
			                val = val.replace(
								new RegExp(item,'g'),
								'<font color="#f75353">' + item + "</font>");
							}
						});
			        return val;
			      } else {
			        return val;
			      }
			    },
            gobi(){
                this.$router.push({
                    path: '/iframePage',
                    query: {
                        title:encodeURIComponent('中诚信'),
                        url:encodeURIComponent(`http://10.0.130.27:8080/webroot/decision/view/form?viewlet=test.cpt&op=view&userCode=${this.$Cookies.get('username')}`)
                    }
                })
            }
        },
    }
</script>
<style>
    .el-card {
        border: none;
        background: #f8f8f8;
    }
</style>
<style lang="less" scoped>
    .main-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;

        .search-content {
            height: 250px;
            width: 700px;
            text-align: center;
            padding-top: 30px;
            box-sizing: border-box;
            margin: auto;

            img {
                height: 100px;
                margin-bottom: 30px;
            }

            .latest-search {
                font-size: 14px;
                color: #333333;
                margin-top: 10px;
                text-align: left;
                padding-left: 110px;

                span {
                    margin-right: 10px;
                    cursor: pointer;

                    &:hover {
                        color: #1b7fbd;
                        text-decoration-line: underline;
                    }
                }
            }
        }

        .main-content {
            width: 1300px;
            margin: auto;
            display: flex;

            .content-item {
                padding: 20px 20px 10px;
                background: #f8f8f8;
                box-shadow: 0 0 5px 5px #e3e3e3;
            }

            .leftBox {
                flex: 1;
                margin-right: 20px;
            }

            .rightBox {
                width: 450px;
            }

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

            .main {
                

                .proList_li {
                    li {
                        padding: 10px;
                        border-bottom: 1px solid #d3d3d3;
                    }

                    .clear {
                        font-size: 12px;
                        color: #666;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #e3e3e3;

                        .pro_content_right {
                            display: flex;
                            align-items: center;
                        }
                    }

                    .proList_txt {
                        font-weight: 600;
                        margin-bottom: 5px;
                        color: #000;
                        font-size: 14px;
                        cursor: pointer;
                    }

                    .proList_btn {
                        display: flex;
                        align-items: center;
                        // width: 40%;
                        // text-align: right;
                        // position: relative;
                        // top: 25px;
                    }
                }
            }
        }

        .usually-box {
            width: 1300px;
            padding: 20px;
            background: #f8f8f8;
            box-shadow: 0 0 5px 5px #e3e3e3;
            margin: 15px auto;
            box-sizing: border-box;

            .title {
                margin-bottom: 10px;

                .icon {
                    display: inline-block;
                    width: 5px;
                    height: 20px;
                    background: #1b7fbd;
                    vertical-align: middle;
                    margin-right: 5px;
                }
            }

            .img-box {
                display: inline-block;
                text-align: center;
                width: 120px;
                font-size: 14px;

                img {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 10px;
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
		
		    .care-list {
		        height: 36px;
		        line-height: 36px;
		        font-size: 14px;
		
		        &:hover {
		            background: #efefef;
		            cursor: pointer;
		        }
		
		        span {
		            margin: 0 5px;
		        }
		
		        img {
		            width: 24px;
		            height: 24px;
		            vertical-align: middle;
		            position: relative;
		            bottom: 2px;
		        }
		
		        .care {
		            width: 20px;
		            height: 20px;
		            margin: 0 5px;
		        }
		    }
		}
    }
</style>