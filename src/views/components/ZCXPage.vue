<!-- 中诚信 -->
<template>
  <div class="ZCXpage">
    <div style="margin-bottom:20px">
      <!-- <p style="font-size: 14px;line-height: 30px;">统一社会信用代码：{{creditCode}}</p>
      <p style="font-size: 14px;line-height: 30px;">成立时间：{{buildDate}}</p> -->
    </div>
    <div>
      <el-button type="primary" @click="toReportPage(1)">风险初筛</el-button>
      <el-button type="primary" @click="toReportPage(2)">财务排雷</el-button>
      <el-button type="primary" @click="toReportPage(3)">产业企业信用评价</el-button>
      <!-- <el-button type="primary" @click="getLiteRatingPDF">
				<i :class="{'el-icon-loading':loading,'el-icon-download':!loading}"></i>
				产业企业信用评价</el-button> -->
      <el-button type="primary" @click="toReportPage(4)">区域信用评价</el-button>
      <el-button type="primary" @click="toReportPage(5)">城投企业信用评价</el-button>
      <!--			<el-button type="primary" @click="toCreditEvaluate">查看JSON</el-button>-->
    </div>
    <div class="table-box" style="margin-top: 30px;">
      <div>历史报告列表：</div>
      <el-table :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
        style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="reportId" label="报告单号" width="100px" align="center">
        </el-table-column>
        <el-table-column prop="pdfName" label="报告">
          <template slot-scope="scope">
            <span class="text" style="color: #409EFF;cursor: pointer;" @click="downloadFile(scope.row)">
              <i :class="{'el-icon-loading':scope.row.fileLoading}"></i>
              {{scope.row.pdfName}}
            </span>
            <el-button type="primary" size="mini" plain style="margin-left: 10px;" @click="checkPdf(scope.row)">预览
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="报告类型">
          <template slot-scope="scope">
            {{scope.row.reportType}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="更新时间">
          <template slot-scope="scope">
            {{$formatDate(scope.row.updateTime)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
        :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <el-dialog title="查看" :visible.sync="dialogVisible" width="800px">
      <div style="height: 500px;overflow: auto;">
        <JsonView :value="data"></JsonView>
      </div>
    </el-dialog>
    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%">
      <div v-loading="pdfLoading">
        <iframe :src="src" frameborder="0" width="100%" height="600px"></iframe>
<!--        <embed :src="src" width="100%" height="600px"></embed>-->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import JsonView from '../../components/jsonView'
import json from '../../assets/json/产业企业信用评价data.json'
export default {
  components: {
    JsonView,
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
      fileName: '',
      loading: false,
      tableData: [],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      tableLoading: false,
      fileLoading: false,
      src: '',
      pdfDialogVisible: false,
      pdfLoading: false
    }
  },
  created () {
    this.data = JSON.stringify(json, null, '\t');
    //this.getHtml();
    this.getReportList()
  },
  methods: {
    getReportList () {
      let param = {
        companyId: this.$route.query.companyId,
      }
      this.tableLoading = true;
      //this.$ajax.manage.getLiteRatingList(param).then(res=>{
      this.$ajax.manage.getReportList(param).then(res => {
        this.tableLoading = false;
        if (res.data.code == '0') {
          this.tableData = res.data.reportList.map(row => {
            row.fileLoading = false;
            return row
          });
          this.page.total = res.data.reportList.length
        }
      })
    },

    getHtml () {
      let param = {
        userId: this.$Cookies.get("userId"),
        companyId: this.$route.query.companyId.toString()
      }
      console.log(param);
      this.$ajax.manage.getHtml(param).then(res => {
        if (res.status == 200) {
          let temp = 'content-disposition'
          let data = res.headers[temp];
          this.fileName = data.split('=')[1]
        }
      })
    },
    showJSON () {
      this.dialogVisible = true;
    },
    toReportPage (type) {
      let param = {
        companyId: this.$route.query.companyId,
        companyName: this.$route.query.companyName,
        creditCode: this.$route.query.creditCode,
        id: this.$route.query.id,
        index: this.$route.query.index,
      }
      if (type == 1) {
        //风险初筛
        this.$router.push({
          path: '/report/riskScreen',
          query: param
        })
      } else if (type == 2) {
        //财务排雷
      } else if (type == 3) {
        //产业企业信用评价
        this.$router.push({
          path: '/report/creditEvaluate',
          query: param
        })
      } else if (type == 4) {
        //区域信用评价
        this.$router.push({
          path: '/report/areaCreditEvaluate',
          query: param
        })
      } else if (type == 5) {
        //城投企业信用评价  
        this.$router.push({
          path: '/report/cityInvEvaluate',
          query: param
        })
      }
    },
    downloadFile (row) {
      let param = {
        fileName: row.fileName
      }
      row.fileLoading = true;
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，请耐心等待...',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
        console.log(res)
        row.fileLoading = false
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
    checkPdf (row) {
      this.src = '';
      let param = {
        fileName: row.fileName
      }
      this.pdfDialogVisible = true
      this.pdfLoading = true;
      this.$notify({
        title: '提示',
        message: 'PDF正在加载中，请耐心等待...',
        position: 'top-left',
        duration: 10000,
        type: 'success'
      });
      this.$ajax.manage.getLiteRatingPDF(param).then(res => {
        console.log(res)
        this.pdfLoading = false;
        const content = res.data
        const fileName = `${row.fileName}.pdf`
        const blob = new Blob([content], {
          type: 'application/pdf;chartset=UTF-8'
        })
        let fileURL = URL.createObjectURL(blob);
        //window.open(fileURL);
        this.src = fileURL
      })
    },
    handleCurrentChange (val) {
      this.page.currentPage = val
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
  .text {
    color: blue !important;
  }
}
</style>