<!-- 风险早报 -->
<template>
  <div>
    <el-row class="searchBox">
      <el-select v-model="search.companyName" placeholder="请选择企业名称" clearable style="width: 255px;margin-right:5px;" multiple   @change="changeCompanyName">
        <el-option v-for="item in companyNameList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-date-picker
          v-model="search.startDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      -
      <el-date-picker
          v-model="search.endDate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-select v-model="search.riskleve" placeholder="请选择风险等级" clearable style="width: 200px;margin:0 5px;" multiple>
        <el-option v-for="item in risklevelList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
    </el-row>
    <div style="margin: 10px 0;">
      <span style="float: right; font-size: 13px;">更新时间: 8.30 AM</span>
      <span style="float: right; font-size: 13px;margin-right: 30px;">数据来源：中诚信</span>
    </div>
    <div style="margin: 35px 0;clear: both;">
      <el-table
          :data="tableData">
        <el-table-column
            prop="enterpriseName"
            label="监控企业名称"
            width="220px"
        >
        </el-table-column>
        <el-table-column
            prop="entType"
            label="监控企业类别"
            width="110px"
        >
        </el-table-column>
        <el-table-column
            prop="levelType"
            label="风险等级"
            width="80px">
        </el-table-column>
        <el-table-column
            prop="typeName"
            label="风险类别"
            width="100px"
        >
        </el-table-column>
        <el-table-column
            prop="description"
            label="风险事件"
        >
        </el-table-column>
        <el-table-column
            prop="ud"
            label="消息日期"
            width="100px"
        >
        </el-table-column>
        <el-table-column
            prop="pushSource"
            label="推送来源"
            width="80px"
        >
        </el-table-column>
      </el-table>
    </div>

    <div style="text-align: center;margin-top: 10px;">
      <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                     :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      tableData:[],
      search:{
        companyName:[],
        riskleve:[],
        eventType:[],
        startDate:'',
        endDate:''
      },
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      companyNameList:[],//企业名称
      risklevelList:["警示","重大","一般"],// 风险等级
      copyRiskleve:[],
    }
  },
  created() {
    this.getCompanyNameList()
  },
  methods:{
    searchData(page){
      this.changeRiskLeve(this.search.riskleve)
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        userName:this.$Cookies.get('userCode'),
        companyName:this.search.companyName,
        riskleve:this.copyRiskleve,
        startDate:this.search.startDate,
        endDate:this.search.endDate
      }
      this.$ajax.manage.getRiskMorningPost(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code == '0') {
          this.tableData = res.data.riskMorningPostList;
          console.log(this.tableData);
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })
    },
    handleCurrentChange(val){
      this.searchData(val);
    },
    getCompanyNameList(){
      let param = {
        userName:this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getZCXCompayNameList(param).then(res => {
        if(res.data.code == '0'){
          this.companyNameList = res.data.companyNameList;
        }
      })
    },
    changeRiskLeve(val) {
      this.copyRiskleve = []
      for (var i = 0; i < val.length; i++) {
        switch (val[i]) {
          case "警示":
            this.copyRiskleve.push(2);
            break;
          case "重大":
            this.copyRiskleve.push(1);
            break;
          case "一般":
            this.copyRiskleve.push(0);
            break;
        }
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>