<!-- 首页 -->
<template>
    <div class="main-wrapper">
		<div class="search-content">
		    <div class="title">资 信 共 享 平 台</div>
		    <div >
		        <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select" style="width: 600px;height: 50px; box-shadow: 0 0 5px 5px lightslategray;"
		            clearable="" @keyup.enter.native="seachContent">
					<el-button slot="append" icon="el-icon-search" style="height: 50px;width: 70px;background: #409eff;color: #fff;"
					    @click="seachContent" ></el-button>
		        </el-input>
				<div class="latest-search">
				    最近搜索：
				    <span v-for="item in latestSearchList" :key="item.id"
				        @click="searchContent(item)">{{item.keyWord}}</span>
				</div>
		    </div>
		</div>
        <div v-if="showBox==1">
            <div class="main-content">
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
                            <!-- <el-tab-pane label="灰名单" name="2">灰名单</el-tab-pane> -->
                            <el-tab-pane label="黑名单" name="2">
								<div class="tab-content-wrapper">
									<div v-for="(item,index) in blackListData" :key="index" class="care-list">
									    <span>{{item.entName}}</span>
									</div>
								</div>
							</el-tab-pane>
                        </el-tabs>
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
                activeUserTab: '1',
                searchList: [],
                sourceType: '',
                showBox: 1,
                careList: [],
				blackListData:[]
            }
        },
        mounted() {
            if (this.$Cookies.get(this.$getCookieKey())) {
                this.getLatestSearchList();
                this.getCareList();//关注清单
				this.getBlackList();//黑名单
            }
        },
        methods: {
			getBlackList(){
				this.$ajax.manage.getBlackList({}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						this.blackListData = res.data.blackList
					}
				})
			},
            seachContent() {
				console.log(sessionStorage.getItem('username'))
                if (this.searchVal === '') {
                    this.showBox = 1
                } else {
                    if (sessionStorage.getItem('username')) {
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
								this.getLatestSearchList()
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
                        id: item.id,
                        companyName: item.companyName,
                        companyId: item.companyId,
                        creditCode: item.creditCode,
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
        /deep/.el-input__inner{
        	height: 50px;
        	line-height: 50px;
        	font-size: 16px;
        }
		/deep/.el-input-group__append, .el-input-group__prepend{
			border: none;
		}
        width: 100%;
        height: 100%;
        overflow: auto;
        .search-content {
            height: 500px;
            width: 100%;
            text-align: center;
            padding-top: 30px;
            box-sizing: border-box;
        	background: url(../../public/img/bg.jpg) no-repeat;
        	background-size: cover;
			margin-bottom:20px;
			opacity: 0.8;
        	.title{
        		font-size: 40px;
        		color: #fff;
        		width: 100%;
        		height: 200px;
        		line-height: 200px;
        	}
            img {
                height: 100px;
                margin-bottom: 30px;
            }

            .latest-search {
                font-size: 14px;
                color: #fff;
                margin: 15px auto;
                text-align: left;
                padding-left: 110px;
				width: 680px;
				
                span {
                    margin-right: 10px;
                    cursor: pointer;

                    &:hover {
                        color: #409eff;
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
                width: 600px;
				//flex: 1;
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