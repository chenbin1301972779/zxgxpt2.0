<!-- 中诚信 -->
<template>
    <div class="ZCXpage">
        <div style="margin-bottom:20px">
            <p style="font-size: 14px;line-height: 30px;">统一社会信用代码：{{creditCode}}</p>
            <p style="font-size: 14px;line-height: 30px;">成立时间：{{buildDate}}</p>
        </div>
		<div>
			<el-button type="primary" @click="toCreditEvaluate">风险初筛</el-button>
			<el-button type="primary" @click="toCreditEvaluate">财务排雷</el-button>
			<el-button type="primary" @click="getLiteRatingPDF">
				<i :class="{'el-icon-loading':loading,'el-icon-download':!loading}"></i>
				产业企业信用评价</el-button>
			<el-button type="primary">区域信用评价</el-button>
			<el-button type="primary">城投企业信用评价</el-button>
<!--			<el-button type="primary" @click="toCreditEvaluate">查看JSON</el-button>-->
       </div>
	   <div class="table-box" style="margin-top: 30px;">
		   <div>历史报告列表：</div>
		   <el-table
		         :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
		         style="width: 100%" v-loading="tableLoading">
				 <el-table-column
				   prop="reportId"
				   label="报告单号" width="100px" align="center">
				 </el-table-column>
		         <el-table-column
		           prop="fileName"
		           label="报告">
				   <template slot-scope="scope">
				   		<span class="text" style="color: #409EFF;cursor: pointer;" @click="downloadFile(scope.row)">
						<i :class="{'el-icon-loading':scope.row.fileLoading}"></i>
						{{scope.row.fileName}}</span>
				   </template>
		         </el-table-column>
		         <el-table-column
		           prop="address"
		           label="报告类型">
		         </el-table-column>
				 <el-table-column
				   prop="address"
				   label="更新时间">
				   <template slot-scope="scope">
					   {{$formatDate(scope.row.updateTime)}}
				   </template>
				 </el-table-column>
		       </el-table>
	   </div>
	   <div style="text-align: center;margin-top: 10px;">
	       <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
	           :current-page.sync="page.currentPage" :pageSize="page.pageSize"
	           @current-change="handleCurrentChange">
	       </el-pagination>
	   </div>
        <el-dialog title="查看" :visible.sync="dialogVisible" width="800px">
            <div style="height: 500px;overflow: auto;">
                <JsonView :value="data"></JsonView>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import JsonView from '../../components/jsonView'
import json from '../../assets/json/产业企业信用评价data.json'
export default {
    components: {
        JsonView
    },
    data () {
        return {
            data: '',
            dialogVisible: false,
            creditCode: this.$route.query.creditCode,
            buildDate: this.$route.query.buildDate,
            credit: '1',
            options: [
                {
                    code: '1',
                    value: '产业企业信用评价'
                },
                {
                    code: '2',
                    value: '区域信用评价'
                },
                {
                    code: '3',
                    value: '城投企业信用评价'
                }
            ],
			fileName:'',
			loading:false,
			tableData:[],
			page: {
			    currentPage: 1,
			    total: 0,
			    pageSize: 10
			},
			tableLoading:false,
			fileLoading:false
        }
    },
    created () {
        this.data = JSON.stringify(json, null, '\t');
		this.getHtml();
		this.getLiteRatingList()
    },
    methods: {
		getLiteRatingList(){
			let param ={
				companyId:this.$route.query.companyId,
			}
			this.tableLoading=true;
			this.$ajax.manage.getLiteRatingList(param).then(res=>{
				console.log(res)
				this.tableLoading=false;
				if(res.data.code=='0'){
					this.tableData = res.data.reportList.map(row=>{
						row.fileLoading = false;
						return row
					});
					this.page.total = res.data.reportList.length
				}
			})
		},
			
		getHtml(){
			let param = {
				userId:this.$Cookies.get("userId"),
				companyId:this.$route.query.companyId.toString()
			}
			console.log(param);
			this.$ajax.manage.getHtml(param).then(res=>{
				if(res.status==200){
					let temp = 'content-disposition'
					let data = res.headers[temp];
					this.fileName=data.split('=')[1]
				}
			})
		},
        showJSON () {
            this.dialogVisible = true;
        },
		toCreditEvaluate(){
			this.$router.push({
			    path: '/creditEvaluate',
			    query: {
			        companyId:this.$route.query.companyId,
					companyName:this.$route.query.companyName,
					creditCode:this.$route.query.creditCode
			    }
			})
		},
		getLiteRatingPDF(){
			//产业信用评价下载
			let param={
				fileName:this.fileName
			}
			console.log(param)
			this.loading = true;
			this.$ajax.manage.getLiteRatingPDF(param).then(res => {
			   // console.log(res)
			   this.loading=false
			    const content = res.data
			    const blob = new Blob([content])
			    const fileName = `产业信用评价-${this.$route.query.companyName}.pdf`
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
		downloadFile(row){
			let param={
				fileName:row.fileName
			}
			console.log(row)
			row.fileLoading = true;
			this.$ajax.manage.getLiteRatingPDF(param).then(res => {
			   // console.log(res)
			   row.fileLoading=false
			    const content = res.data
			    const blob = new Blob([content])
			    const fileName = `${row.fileName}.pdf`
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
		handleCurrentChange(val){
			this.page.currentPage=val
		}
    }
}
</script>
<style lang="less" scoped>
.ZCXPage {
    width: 100%;
    height: 100%;
    margin: auto;
    box-sizing: border-box;
    .list-box {
        .list {
            border: 1px solid red;
        }
    }
	.text{
		color: blue!important;
	}
}
</style>