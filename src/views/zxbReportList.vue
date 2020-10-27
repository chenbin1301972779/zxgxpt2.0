<template>
    <div class="zxbReportList">
        <div style="margin-bottom: 15px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>信保报告列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="searchbox">
            <el-input class="fl-left manageTableInput" v-model="search.xcode" placeholder="请输入信保代码" clearable
                      style="width: 200px;margin-right: 10px;">
            </el-input>
            <el-input class="fl-left manageTableInput" v-model="search.name" placeholder="请输入中/英文名称" clearable
                      style="width: 200px;margin-right: 10px;">
            </el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
        </div>
        <div class="table-box">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
                      v-loading="loading" :default-sort="{prop: 'status', order: 'descending'}">
                <!--<el-table-column type="selection" width="55">
                </el-table-column>-->
                <el-table-column prop="reportbuyerno" label="信保代码">
                </el-table-column>
<!--                <el-table-column prop="reportcorpchnname" show-overflow-tooltip label="中文名称">-->
<!--                </el-table-column>-->
<!--                <el-table-column prop="reportcorpengname" show-overflow-tooltip label="英文名称">-->
<!--                </el-table-column>-->
              <el-table-column prop="reportcorpchnname,reportcorpengname" show-overflow-tooltip label="中英文名称">
                <template slot-scope="scope">
                  {{scope.row.reportcorpchnname}}/{{scope.row.reportcorpengname}}
                </template>
              </el-table-column>
                <el-table-column prop="reportName" show-overflow-tooltip label="PDF名称">
                </el-table-column>
                <el-table-column prop="updatetime" show-overflow-tooltip label="更新时间">
                </el-table-column>
                <el-table-column align="center" width="250px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="viewPdf(scope.row)" plain>
                            预览</el-button>
                        <el-button size="mini" type="primary" @click="downPdf(scope.row)" plain>
                            下载</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="text-align: center;margin-top: 10px;">
                <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                               :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%" :fullscreen="false">
            <el-progress v-if="pdfProgressVisible" :text-inside="true" :stroke-width="20" :percentage="progressNum"></el-progress>
            <div v-loading="pdfLoading" style="height: 100%;">
                <iframe :src="src" frameborder="0" width="100%" :height="iframeHeight"></iframe>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import JsonView from "../components/jsonView";

    export default {
        name: "zxbReportList",
        components: {
            JsonView,
        },
        data(){
            return{
                search:{
                    xcode:'',
                    name:''
                },
                loading: false,
                page:{
                    total:0,
                    currentPage:0,
                    pageSize:10
                },
                tableData:[],
                fileLoading: false,
                src: '',
                pdfDialogVisible: false,
                pdfLoading: false,
                iframeHeight: document.documentElement.clientHeight*0.67 || document.body.clientHeight*0.67,
                pdfProgressVisible: true,
                progressNum: 0,
                startTimer: '',
                endTimer: ''
            }
        },
        mounted () {
            this.getData();
        },
        methods:{
            getData(page){
                let param = {
                    pageIndex: page ? page : 1,
                    pageSize: this.page.pageSize,
                     companyName: this.search.name,
                    xcode: this.search.xcode,
                }
                this.loading = true;
                this.$ajax.manage.getPDFListAll(param).then(res => {
                    this.loading = false;
                    if (res.data.code == 0) {
                        console.log(res.data);
                        this.tableData = res.data.pdfList;
                        this.page.total = res.data.totalRecords
                    }else{
                        this.$message.error(res.data.msg)
                        console.log(res.data.msg)
                    }
                }).catch(error=>{
                    console.log(error);
                    this.$message.error(error)
                })
            },
            searchData() {
                this.page.currentPage = 1;
                this.getData()
            },
            handleCurrentChange(val) {
                //页码切换
                this.getData(val)
            },
            downPdf (row) {
                //pdf下载
                let param = {
                    "noticeSerialno":row.reportName,
                    "reportbuyerno":row.reportbuyerno,
                    "reportcorpchnname":row.reportcorpchnname,
                    "reportcorpengname":row.reportcorpengname,
                    "updatetime":row.updatetime,
                    "isDownload":"1"
                }
                this.$ajax.manage.getPDF(param).then(res => {
                    console.log(res)
                    const content = res.data
                    const blob = new Blob([content])
                    const fileName = pdfName
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        console.log(elink.href);
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },
            viewPdf (row) {
                let src = '';
                let param = {
                  "noticeSerialno":row.reportName,
                  "reportbuyerno":row.reportbuyerno,
                  "reportcorpchnname":row.reportcorpchnname,
                  "reportcorpengname":row.reportcorpengname,
                  "updatetime":row.updatetime,
                  "isDownload":"0"
                }
                this.pdfDialogVisible = true;
                this.pdfProgressVisible = true;
                this.startProgress();
                this.pdfLoading = true;
                this.$ajax.manage.getPDF(param).then(res => {
                    this.pdfLoading = false;
                    this.pdfProgressVisible=false;
                    const content = res.data
                    const blob = new Blob([content], {
                        type: 'application/pdf;chartset=UTF-8'
                    })
                    let fileURL = URL.createObjectURL(blob);
                    this.src = fileURL
                });
            },
            startProgress () {
                this.progressNum = 0;
                this.startTimer = setInterval(() => {
                    this.progressNum ++
                    if (this.progressNum > 95) {
                        clearInterval(this.startTimer)
                    }
                }, 100);
            },
            endProgress () {
                clearInterval(this.startTimer)
                this.endTimer = setInterval(() => {
                    this.progressNum ++
                    if (this.progressNum > 99) {
                        clearInterval(this.endTimer)
                        this.finishProgress()
                    }
                }, 10);
            },
            finishProgress () {
                this.$emit('finishProgress', false)
            },
        }
    }
</script>

<style scoped>
    .zxbReportList {
        width: 90%;
        height: 100%;
        margin: auto;
        background-color: #f8f8f8;
        box-sizing: border-box;
        padding: 20px;
        overflow-block: auto;
        .table-box {
            margin: 20px auto;
        }
    }
</style>