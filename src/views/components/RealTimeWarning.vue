<!-- 实时预警 -->
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
      <el-select v-model="search.riskleve" placeholder="请选择风险等级" clearable style="width: 200px;margin:0 5px;" multiple @change="changeRiskLeve">
        <el-option v-for="item in risklevelList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search.eventType" placeholder="请选择事件类型" clearable style="width: 200px;margin-right: 5px;" multiple  @change="changeEventType">
        <el-option v-for="item in eventTypeList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button style="margin-left:10px;" type="primary" icon="el-icon-search" @click="searchData(1)">查询</el-button>
    </el-row>
    <div style="margin: 10px 0;">
      <span style="font-size: 14px;color: #1fade5;font-weight: bold">注：部分第三方网站由于安全策略或终端不同（如微信公众号）无法直接跳转访问，请复制链接后查看；部分第三方网站由于网站本身问题可能存在过期或封停，请见谅。</span>
      <span style="float: right; font-size: 14px;font-weight: bold">数据来源：天眼查</span>
    </div>

      <ul style="font-size: 12px; background-color:#fff;">
        <li v-if="tableData.length == 0" style="border:1px solid #c1c1c1;border-top: 3px solid #00a4ff;padding: 0 10px;margin: 10px 0;font-size: 16px;text-align: center;padding: 30px;">
            暂无数据
        </li>
        <li v-for="(item,index) in tableData" :key="index" class="tableList" style="border:1px solid #c1c1c1;border-top: 3px solid #00a4ff;padding: 0 10px;margin: 10px 0;">
          <div style="margin: 5px 0;">
            <span style="font-size: 16px;font-weight: bold;">【{{item.typeName}}】{{item.companyName}}</span>
            <span style="float:right;color:orange;">{{item.riskLevel}}</span>
          </div>
          <p style="margin: 5px 0;">{{item.a}}</p>
          <p style="margin: 5px 0;">{{item.b}}</p>
          <div style="font-size: 12px;margin-bottom:5px;">
            <spa v-if="item.url">链接:</spa><a :href="item.url" target="_blank" style="margin-left: 15px; ">{{item.url}}</a>
            <span style="float: right;color: #00a4ff">推送时间:{{item.updateTime}}</span>
          </div>
        </li>
      </ul>


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
      risklevelList:["高风险","一般风险"],// 风险等级
      eventTypeList:[],// 事件类型
    }
  },
  created() {
    this.getCompanyNameList(),
        this.getEventTypeList()
  },
  methods:{
    searchData(page){
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        userName:this.$Cookies.get('userCode'),
        companyName:this.search.companyName,
        riskleve:this.search.riskleve,
        eventType:this.search.eventType,
        startDate:this.search.startDate,
        endDate:this.search.endDate
      }

      this.$ajax.manage.getRealTimeWarning(param).then(res => {
        console.log(param)
        console.log(res.data)
        if(res.data.code == '0') {
          this.tableData = res.data.realTimeWarningList;
          console.log(this.tableData);
          this.page.total = res.data.totalRecords;
          this.tableData.splice(1, 0);
          this.$message.success(res.data.msg);
        }
      })

    },
    // 更改企业名称
    changeCompanyName(val){
      this.getEventTypeList()
    },
    // 更改风险等级
    changeRiskLeve(val){
      this.getEventTypeList()
    },
    // 更改事件类型
    changeEventType(val){

    },
    handleCurrentChange(val){
      this.searchData(val);
    },
    getCompanyNameList(){
      let param = {
        userName:this.$Cookies.get('userCode')
      }
      this.$ajax.manage.getCompayNameList(param).then(res => {
        if(res.data.code == '0'){
          this.companyNameList = res.data.companyNameList;
        }
      })
    },
    getEventTypeList(){
      let param = {
        userName:this.$Cookies.get('userCode'),
        riskleve:this.search.riskleve,
        companyName: this.search.companyName,
        startDate: this.search.startDate,
        endDate: this.search.endDate
      }
      this.$ajax.manage.getEventTypeList(param).then(res => {
        if(res.data.code == '0'){
          this.eventTypeList = res.data.eventTypeList;
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .realTimeWarning{

  }
</style>