<!-- 中信保 -->
<template>
  <div class="zxbPage">
    <div style="margin-bottom:15px;">
      <el-button type="primary" @click="applyReport">信保报告申请</el-button>
    </div>
    <div class="main-box">
      <div class="titile">信保基本信息</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">企业（机构）名称</td>
            <td>{{businessInfo.buyerchnName}}</td>
            <td class="gbGray">报告编号</td>
            <td colspan="3">{{businessInfo.reportNo}}</td>
          </tr>
          <tr>
            <td class="gbGray">注册时间</td>
            <td>{{businessInfo.dateRegistered }}</td>
            <td class="gbGray">经营状态</td>
            <td>{{businessInfo.operationStatus}}</td>
            <td class="gbGray">信保代码</td>
            <td>{{businessInfo.sinosureBuyerno}}</td>
          </tr>
          <tr>
            <td class="gbGray">注册资本</td>
            <td>人民币{{businessInfo.registerCapital }}</td>
            <td class="gbGray">注册地址</td>
            <td>{{businessInfo.registerAddr}}</td>
            <td class="gbGray">母公司</td>
            <td>{{businessInfo.parent}}</td>
          </tr>
          <tr>
            <td class="gbGray">生产现状</td>
            <td>{{businessInfo.productionCapacity}}</td>
            <td class="gbGray">经营地类型</td>
            <td>{{businessInfo.locationType}}</td>
            <td class="gbGray">采购地区</td>
            <td>{{businessInfo.purchasingArea}}</td>
          </tr>
          <tr>
            <td class="gbGray">所属行业</td>
            <td>{{businessInfo.industName}}</td>
            <td class="gbGray">主营业务</td>
            <td>{{businessInfo.products}}</td>
            <td class="gbGray">报告获取时间</td>
            <td>{{businessInfo.updateTime}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="main-box">
      <div class="titile">背景规模</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">成立年限</td>
            <td>{{businessInfo.gisterYear}}</td>
            <td class="gbGray">员工人数</td>
            <td>{{businessInfo.employeeNum}}</td>
            <td class="gbGray">分支雇员数</td>
            <td>{{businessInfo.branchEmployeeNum}}</td>
          </tr>
          <tr>
            <td class="gbGray">上市公司</td>
            <td>{{businessInfo.listedFlag}}</td>
            <td class="gbGray">主要股票交易所</td>
            <td colspan="3">{{businessInfo.tockexChange}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="main-box" v-if="shareInfo.length>0">
      <div class="titile">持股信息</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">股东名称</td>
            <td class="gbGray">持股比例</td>
            <td class="gbGray">持股金额</td>
            <td class="gbGray">币种</td>
          </tr>
          <template v-if="shareInfo.length>0">
            <tr v-for="(item,index) in shareInfo" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.ratio}}</td>
              <td>{{item.valueHold}}</td>
              <td>人民币</td>
            </tr>
          </template>
        </table>
      </div>
    </div>

    <div class="main-box" v-if="pdfList.length>0">
      <div class="titile">信保报告列表</div>
      <div class="table-wrapper">
        <table border="1">
          <tr>
            <td class="gbGray">报告</td>
            <td class="gbGray">更新时间</td>
          </tr>
          <template v-if="pdfList.length>0">
            <tr v-for="(item,index) in pdfList" :key="index">
              <td style="color:#1b7fbd;cursor:pointer" @click="downPdf(item.noticeSerialno)">
                {{item.noticeSerialno}}
                <el-button size="mini" type="primary" plain v-on:click.stop="viewPdf(item.noticeSerialno)" style="margin-left: 10px;">预览
                </el-button>
              </td>
              <td>{{item.updateTime}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>

    <el-dialog title="信保报告申请" :visible.sync="dialogVisible" width="1200px">
      <div class="report-box">
        <table border="1">
          <tr>
            <td colspan="9" style="background:#E3E3E3;font-weight:bold">信保报告申请（已有信保代码）</td>
          </tr>
          <tr class="gbGray">
            <th width="100px">买方代码</th>
            <th width="200px">待调查企业中国信保企业代码</th>
            <th width="100px">待调查企业国别</th>
            <th width="150px">待调查企业中文名称</th>
            <th width="150px">待调查企业英文名称 </th>
            <th width="100px">待调查企业地址</th>
            <th width="220px">待调查企业统一社会信用代码</th>
            <th width="70px">是否导读</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <el-input v-model="haveCreditCode.clientNo"></el-input>
            </td>
            <td>
              <el-input v-model="haveCreditCode.reportbuyerNo"></el-input>
            </td>
            <td style="background:#FAFAFA"></td>
            <td style="background:#FAFAFA"></td>
            <td style="background:#FAFAFA"></td>
            <td style="background:#FAFAFA"></td>
            <td style="background:#FAFAFA"></td>
            <td>
              <el-select v-model="haveCreditCode.istranslation">
                <el-option v-for="(item,index) in istranslation" :value="item.id" :key="item.id" :label="item.name">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-button type="primary" size="mini" @click="applyHaveCode">点击申请</el-button>
            </td>
          </tr>
        </table>
      </div>

      <div class="report-box">
        <table border="1">
          <tr>
            <td colspan="9" style="background:#E3E3E3;font-weight:bold">信保报告申请（无信保代码）</td>
          </tr>
          <tr class="gbGray">
            <th width="100px">买方代码</th>
            <th width="200px">待调查企业中国信保企业代码</th>
            <th width="100px">待调查企业国别</th>
            <th width="150px">待调查企业中文名称</th>
            <th width="150px">待调查企业英文名称 </th>
            <th width="100px">待调查企业地址</th>
            <th width="220px">待调查企业统一社会信用代码</th>
            <th width="70px">是否导读</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <el-input v-model="haveCreditCode.clientNo"></el-input>
            </td>
            <td style="background:#FAFAFA"></td>
            <td>
              <!-- <el-input v-model="noCreditCode.reportCorpCountryCode"></el-input> -->
              <el-select v-model="noCreditCode.reportCorpCountryCode" placeholder='' filterable>
                <el-option v-for="item in nationTypeOptions" :key="item.nationCode" :label="item.nationName"
                  :value="item.nationCode">
                  <span style="float: left">{{ item.nationName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.nationCode }}</span>
                </el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="noCreditCode.reportCorpChnName"></el-input>
            </td>
            <td>
              <el-input v-model="noCreditCode.reportCorpEngName"></el-input>
            </td>
            <td>
              <el-input v-model="noCreditCode.reportCorpaddress"></el-input>
            </td>
            <td>
              <el-input v-model="noCreditCode.creditno"></el-input>
            </td>
            <td>
              <el-select v-model="noCreditCode.noIstranslation">
                <el-option v-for="(item,index) in noIstranslation" :value="item.id" :key="item.id" :label="item.name">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-button type="primary" size="mini" @click="applyNoCode">点击申请</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-dialog>
    <!-- <el-dialog title="预览" :visible.sync="dialogPDFVisible" width="80%">
            <div style="height: 500px; overflow: auto;">
                <pdfView :url="pdfUrl"></pdfView>
            </div>
        </el-dialog> -->
    <el-dialog title="预览" :visible.sync="pdfDialogVisible" width="70%">
      <div v-loading="pdfLoading">
        <iframe :src="src" frameborder="0" width="100%" height="600px"></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import pdfView from '../../components/pdfView';
export default {
  components: {
    pdfView
  },
  data () {
    return {
      pdfUrl: '',
      dialogVisible: false,
      dialogPDFVisible: false,
      haveCreditCode: {
        clientNo: '',
        userId: parseInt(this.$Cookies.get('userId')),
        reportbuyerNo: '',
        reportCorpCountryCode: '',
        reportCorpChnName: '',
        reportCorpEngName: '',
        reportCorpaddress: '',
        creditno: '',
        istranslation: '0'
      },
      noCreditCode: {
        clientNo: '',
        userId: parseInt(this.$Cookies.get('userId')),
        reportbuyerNo: '',
        reportCorpCountryCode: '',
        reportCorpChnName: '',
        reportCorpEngName: '',
        reportCorpaddress: '',
        creditno: '',
        noIstranslation: '0',
      },
      istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
      noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
      pdfDialogVisible: false,
      pdfLoading: false,
      src: '',
      businessInfo: {},
      shareInfo: [],
      nationTypeOptions: [],
      pdfList:[]
    }
  },
  mounted () {
	  if(this.$route.query.companyId){
		  this.getBusinessInfo();
		  this.getShareInfo();
		  this.getNationCode();
		  this.getPDFList();
	  }else{
		  this.dialogVisible=true;
	  }
  },
  methods: {
    getNationCode () {
      this.$ajax.manage.getNationCode({}).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.nationTypeOptions = res.data.nationCode
        }
      })
    },
    getShareInfo () {
      //持股信息
      //   let param = {
      //     "userId": "1",
      //     "companyId": "2081"
      //   }
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getShareInfo(param).then(res => {
        if (res.data.code == 0) {
          if (res.data.shareInfo) {
            this.shareInfo = res.data.shareInfo;
          }
        }
      })
    },
    getBusinessInfo () {
      let param = {
        userId: parseInt(this.$Cookies.get('userId')),
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getBusinessInfo(param).then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          if (res.data.shareInfo) {
            this.businessInfo = res.data.shareInfo;
          }
        }
      })
    },
    getPDFList (){
      let param = {
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getPDFList(param).then(res => {
        if (res.data.code == 0) {
          if (res.data.pdfList) {
            this.pdfList = res.data.pdfList;
          }
        }
      })
    },
    downPdf (pdfName) {
      //pdf下载
      let param = {
        "noticeSerialno": pdfName,
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
    // viewPdf(){
    //     let fileUrl = '';
    //     let param = {
    //         "userId": parseInt(this.$Cookies.get('userId')),
    //         "username": "admin",
    //         "password": "123456",
    //         "clientNo": "20000340"
    //     }
    //     this.$ajax.manage.getPDF(param).then(res => {
    //         console.log(res.data);
    //         const content = res.data
    //         const blob = new Blob([content])
    //         if (window.createObjectURL != undefined) { // basic
    //             fileUrl = window.createObjectURL(blob);
    //         } else if (window.webkitURL != undefined) { // webkit or chrome
    //             try {
    //                 fileUrl = window.webkitURL.createObjectURL(blob);
    //             } catch (error) {

    //             }
    //         } else if (window.URL != undefined) { // mozilla(firefox)
    //             try {
    //                 fileUrl = window.URL.createObjectURL(blob);
    //             } catch (error) {

    //             }
    //         }
    //         console.log(fileUrl);
    //         this.pdfUrl = '/static/pdf/web/viewer.html?file='+encodeURIComponent(fileUrl);
    //         window.open(this.pdfUrl);
    //         this.dialogPDFVisible = true;
    //     });

    // },
    viewPdf (pdfName) {
      let src = '';
      let param = {
        "noticeSerialno": pdfName
      }
      this.pdfDialogVisible = true
      this.pdfLoading = true;
      this.$ajax.manage.getPDF(param).then(res => {
        this.pdfLoading = false;
        const content = res.data
        const blob = new Blob([content], {
          type: 'application/pdf;chartset=UTF-8'
        })
        let fileURL = URL.createObjectURL(blob);
        this.src = fileURL
      });
    },
    applyReport () {
      //打开报告申请弹框
      this.dialogVisible = true;
      this.getCodeInfo()
    },
    applyNoCode () {
      if (!this.noCreditCode.clientNo || this.noCreditCode.clientNo === '') {
        this.$message.warning('请输入买方代码');
        return;
      } else if (this.noCreditCode.reportCorpCountryCode === '') {
        this.$message.warning('请输入待调查企业国别');
        return;
      } else if (this.noCreditCode.reportCorpChnName === '' && this.noCreditCode.reportCorpEngName === '') {
        this.$message.warning('请输入待调查企业中文名称或英文名称');
        return;
      } else if (this.noCreditCode.reportCorpaddress === '') {
        this.$message.warning('请输入待调查企业地址');
        return;
      } else if (this.noCreditCode.creditno === '') {
        this.$message.warning('请输入待调查企业统一社会信用代码');
        return;
      }
      console.log(this.noCreditCode);
      this.$ajax.manage.zhongxinbao(this.noCreditCode).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success(res.data.returnMsg);
          this.dialogVisible = false
        }
      })
    },
    applyHaveCode () {
      if (!this.haveCreditCode.clientNo || this.haveCreditCode.clientNo === '') {
        this.$message.warning('请输入买方代码');
        return;
      } else if (!this.haveCreditCode.reportbuyerNo || this.haveCreditCode.reportbuyerNo == '') {
        this.$message.warning('请输入待调查企业中国信保企业代码');
        return;
      }
      console.log(this.haveCreditCode)
      this.$ajax.manage.zhongxinbao(this.haveCreditCode).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success(res.data.returnMsg);
          this.dialogVisible = false
        }
      })
    },
    getCodeInfo () {
      let param = {
        userId: this.$Cookies.get('userId'),
        companyId: this.$route.query.companyId
      }
      this.$ajax.manage.getCodeInfo(param).then(res => {
        console.log(res)
        if (res.data.code == '0') {
          if (res.data.codeInfo) {
            this.haveCreditCode.clientNo = res.data.codeInfo.clientNo;
            this.noCreditCode.clientNo = res.data.codeInfo.clientNo;
            this.haveCreditCode.reportbuyerNo = res.data.codeInfo.reportbuyerNo
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.zxbPage {
  /deep/.el-input__inner {
    border: none;
  }

  width: 100%;
  height: 100%;
  margin: auto;
  box-sizing: border-box;

  .main-box {
    .titile {
      font-weight: bold;
      font-size: 14px;
    }
  }

  table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #e3e3e3;
    margin: 15px auto;
    table-layout: fixed;
    td {
      word-break: break-all;
      /*允许在字内换行,即单词可分*/
      word-wrap: break-word;
      /*允许长单词或URL地址换行*/
      border-right: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      font-size: 14px;
      height: 36px;
    }

    .gbGray {
      background: #f1f3f4;
    }
  }

  .report-box {
    table {
      table-layout: auto;

      th {
        border-right: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
        height: 36px;
      }

      border: none;

      td {
        // border: none;
      }
    }
  }
}
</style>