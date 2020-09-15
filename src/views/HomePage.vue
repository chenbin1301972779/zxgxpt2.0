<!-- 首页 -->
<template>
  <div class="main-wrapper">
    <div class="search-content">
      <div class="header-box">
        <img src="../../public/img/logo2.png" alt="" >
        <span style="font-size:16px">
          <el-dropdown style="margin-right:20px" @command="handleCommand">
            <el-button type="primary" round>
              常用应用<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1" v-if="blacklistApply">黑名单报告</el-dropdown-item>
              <el-dropdown-item command="2" v-if="blacklistAudit">黑名单审批</el-dropdown-item>
              <el-dropdown-item command="3">客商初筛</el-dropdown-item>
              <el-dropdown-item command="4">信保报告申请</el-dropdown-item>
              <el-dropdown-item command="5" v-if="userManage||sub_manage">用户管理</el-dropdown-item>
              <el-dropdown-item command="6">消息中心</el-dropdown-item>
              <el-dropdown-item command="7">信保报告列表</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-right: 15px;cursor:pointer" @click="showUserInfo">
            <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            {{$Cookies.get('username')}}
          </span>
          <span style="cursor: pointer;" @click="logOut">安全退出</span>
        </span>
      </div>
      <div class="title">
        <div style="margin-bottom:10px"><img src="../../public/img/title.png" alt=""></div>
        <div><img src="../../public/img/subtitle.png" alt=""></div>
      </div>
      <div class="content">
        <el-input @keyup.enter="seachContent" placeholder="请输入内容" v-model="searchVal" class="search-input" style="width: 840px;height: 76px;"
          clearable="" @keyup.enter.native="seachContent">
        </el-input>
        <el-button @click="seachContent">查 询</el-button>
      </div>
      <div class="latest-search">
        最近搜索：
        <span v-for="item in latestSearchList" :key="item.id" @click="searchCompany(item)">{{item.keyWord}}</span>
      </div>
    </div>
    <div v-if="showBox==1">
      <div class="main-content">
        <div class="content-item leftBox">
          <div class="title">
            <span>关注清单</span>
          </div>
          <div class="tab-content-wrapper">
            <div v-for="(item,index) in careList" :key="index" class="care-list">
              <img src="../../public/img/focus.png" alt="" @click="cancleFocus(item)">
              <span @click="moreNews(item,'0')">{{item.companyName}}</span>
              <img src="../../public/img/images/index_icon01.png" alt="" v-if="item.zhongchengxin===1" class="care">
              <img src="../../public/img/images/index_icon02.png" alt="" v-if="item.tianyancha===1" class="care">
            </div>
          </div>
        </div>
        <div class="content-item rightBox">
          <div class="title">
            <span>黑名单</span>
          </div>
          <div class="tab-content-wrapper">
            <div v-for="(item,index) in blackListData" :key="index" class="care-list">
              <img src="../../public/img/focusB.png" alt="">
              <span>{{item.entName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showBox==2">
      <div class="main-content">
        <div class="content-item " style="width:80%">
          <div class="title">
            <span>检测列表</span>
            <span class="text">
              根据关键字，共搜索到 {{searchList.length>0?searchList.length:0}} 条数据结果，结果来自
              {{sourceType}}
              <a class="postLink" @click="blarSearch">模糊接口查询</a>
            </span>
          </div>
          <div class="main">
            <ul class="proList_li " v-if="searchList.length>0">
              <li class="clear" v-for="(item,index) in searchList" :key=" index">
                <div class="fl-left proList_content">
                  <p class="proList_txt" @click="moreNews(item,'0')"
                    v-html="brightenKeyword(item.companyName,searchVal)">
                  </p>
                  <p>社会统一信用代码：{{item.creditCode}}</p>
                  <p>法人代表：{{item.operName}}</p>
                  <p>成立时间：{{item.buildDate}}</p>
                </div>
                <dl class="fl-right proList_btn">
                  <el-button plain type="primary" size="medium" @click="moreNews(item,'0')">企业基本信息
                  </el-button>
                  <el-button plain type="primary" size="medium" @click="moreNews(item,'1')">工商舆情
                  </el-button>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="账号设置" :visible.sync="userSettingDialog" width="450px">
      <el-form :model="userSettingForm">
        <el-form-item label="用户名：" label-width="100px">
          <el-input v-model="userSettingForm.username" disabled style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="userSettingForm.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px">
          <el-input v-model="userSettingForm.password" style="width:250px" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="手机：" label-width="100px">
          <el-input v-model="userSettingForm.mobile" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="100px">
          <el-input v-model="userSettingForm.email" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userSettingDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="信保报告申请" :visible.sync="dialogXBVisible" width="1200px">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      latestSearchList: [],
      activeUserTab: '1',
      searchList: [],
      sourceType: '',
      showBox: 1,
      careList: [],
      blackListData: [],
      userSettingDialog: false,
      userSettingForm: {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
	  blacklistAudit:false,
	  userManage: false,
      sub_manage: false,
	  blacklistApply: false,
      dialogXBVisible: false,
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
	  nationTypeOptions:[],
	  istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
	  noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
    }
  },
  created(){
	  console.log(this.$route.query)
	  if(this.$route.query.searchVal){
		  this.searchVal=this.$route.query.searchVal;
		  this.seachContent()
	  }
  },
  mounted () {
    if (this.$Cookies.get(this.$getCookieKey())) {
      this.getLatestSearchList();
      this.getCareList();//关注清单
      this.getBlackList();//黑名单
	  this.verifyPermissions();
	  this.getNationCode()
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
	verifyPermissions(){
		//权限
		let param = {
			userId: this.$Cookies.get("userId"),
			permissionPoint:"user.manage,user.sub_manage,blacklist.audit,blacklist.apply"
		}
		this.$ajax.manage.verifyPermissions(param).then(res=>{
			console.log(res)
			if(res.data.code==0){
				// for(let i in res.data.verifyPermissionResult){
				// 	this.blacklistAudit = res.data.verifyPermissionResult
				// }
				this.blacklistAudit = res.data.verifyPermissionResult['blacklist.audit'];
				this.blacklistApply = res.data.verifyPermissionResult['blacklist.apply']
				this.userManage = res.data.verifyPermissionResult['user.manage']
				this.sub_manage = res.data.verifyPermissionResult['user.sub_manage']
                if(this.userManage||this.sub_manage){
                  this.$Cookies.set('userManage','true');
                }
			}
		})
	},
    goHmdsb () {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单申报'),
          url: encodeURIComponent(`http://10.0.105.1/webroot/decision/view/form?viewlet=/Homepage/BlackList.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goHmdsp () {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('黑名单审批'),
          url: encodeURIComponent(`http://10.0.105.1/webroot/decision/view/form?viewlet=/Homepage/BlackList_check.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    goKstb () {
      this.$router.push({
        path: '/iframePage',
        query: {
          title: encodeURIComponent('客商填报'),
          url: encodeURIComponent(`http://10.0.105.1/webroot/decision/view/form?viewlet=/Homepage/客商填报.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`)
        }
      })
    },
    getUserInfo () {
      //获取用户信息
      let param = {
        userId: this.$Cookies.get("userId")
      };
      this.$ajax.manage.getUserInfo(param).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.userSettingForm.name = res.data.user.name;
          this.userSettingForm.password = res.data.user.password;
          this.userSettingForm.email = res.data.user.email;
          this.userSettingForm.mobile = res.data.user.mobile;
        }
      })
    },
    logOut () {
      //退出
      this.$Cookies.remove(this.$getCookieKey());
      this.$Cookies.remove('username');
      this.$Cookies.remove('userCode');
      this.$Cookies.remove('userId');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userCode');
      sessionStorage.removeItem('userId');
      this.$router.push({ path: '/' });
      // this.$router.go(0);
    },
    saveUserInfo () {
      let param = {
        userId: this.$Cookies.get("userId"),
        name: this.userSettingForm.name,
        password: this.userSettingForm.password,
        email: this.userSettingForm.email,
        mobile: this.userSettingForm.mobile
      }
      this.$ajax.manage.updateUser(param).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success(res.data.msg);
          this.userSettingDialog = false
        }
      })
    },
    clearUserForm () {
      this.userSettingForm = {
        // username: this.$Cookies.get('username'),
        username: this.$Cookies.get('userCode'),
        name: '',
        password: '',
        email: '',
        mobile: ''
      }
    },
    showUserInfo () {
      //维护用户基本信息弹框
      this.userSettingDialog = true;
      this.getUserInfo()
    },
    handleCommand (command) {
      console.log(command)
      if (command == 1) {
        //黑名单申报
        this.goHmdsb()
      } else if (command == 2) {
        //黑名单审批
        this.goHmdsp()
      } else if (command == 3) {
        //客商初筛
        this.goKstb()
      } else if (command == 4) {
        //信保报告申请
        this.applyReport()
      } else if (command == 5) {
        //用户管理
        if (this.$Cookies.get('username') != 'admin' && this.$Cookies.get('userManage') != 'true') {
          this.$message.warning('您暂没有查看该功能的权限，请联系管理员')
        } else {
          //55109783
          this.$router.push({ path: '/userManage' })
        }
      } else if (command == 6) {
        this.$router.push({ path: '/messageCenter' })
      } else if (command == 7) {
        this.$router.push({ path: '/zxbReportList' })
      }
    },
    getBlackList () {
      this.$ajax.manage.getBlackList({}).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.blackListData = res.data.blackList
        }
      })
    },
    seachContent () {
      if (this.searchVal == '') {
        this.showBox = 1;
        this.$message.warning('请输入查询内容');
        return;
      } else {
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
      }
    },
    getLatestSearchList () {
      let param = {
        userId: this.$Cookies.get('userId')
      }
      this.$ajax.manage.latestWords(param).then(res => {
        if (res.status == 200) {
          this.latestSearchList = res.data.latestWords
        }
      })
    },
    moreNews (item, index) {
      console.log(item);
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
    getCareList () {
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
    cancleFocus (item) {
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
    blarSearch () {
      //模糊接口查询
      let param = {
        keyword: this.searchVal,
        userId: this.$Cookies.get('userId'),
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
    searchCompany (item) {
      this.searchVal = item.keyWord;
      this.seachContent()
    },
    //搜索高亮
    brightenKeyword (val, keyword) {
      keyword = keyword.replace(/\s*/g,'');
      if (keyword.length > 0) {
        let keywordArr = keyword.split("");
        val = val + "";
        keywordArr.forEach(item => {
          if (val.indexOf(item) !== -1 && item !== "") {
            val = val.replace(
              new RegExp(item, 'g'),
              '<font color="#f75353">' + item + "</font>");
          }
        });
        return val;
      } else {
        return val;
      }
    },
    applyReport () {
      //打开报告申请弹框
      this.dialogXBVisible = true;
      this.getCodeInfo()
    },
    getCodeInfo () {
      let param = {
        userId: this.$Cookies.get('userId')
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
    },
    applyNoCode () {
      if (!this.noCreditCode.clientNo || this.noCreditCode.clientNo === '') {
        // this.$message.warning('请输入买方代码');
        // return;
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
        if (res.status == 200) {
          this.$message.success(res.data.returnMsg);
          this.dialogXBVisible = false
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
        if (res.status == 200) {
          this.$message.success(res.data.returnMsg);
          this.dialogXBVisible = false
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
    /deep/.el-avatar--small {
      position: relative;
      top: 9px;
      background: #00a4ff;
      color: #333333;
    }
    height: 515px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    background: url(../../public/img/bg.png) no-repeat;
    background-size: cover;
    .header-box {
	  padding: 0 20px;
      height: 70px;
      background: none;
      display: flex;
      justify-content: space-between;
      color: #fff !important;
      line-height: 70px;
      position: relative;
      img {
        vertical-align: middle;
        position: relative;
        top: 10px;
		height: 44px;
      }
    }
    .title {
      font-size: 40px;
      color: #fff;
      width: 100%;
      margin-top: 100px;
      margin-bottom: 20px;
    }
    .content {
      /deep/.el-button {
        border-radius: 0;
        height: 76px;
        width: 143px;
        background: #409eff;
        color: #fff;
        border-top-right-radius: 38px;
        border-bottom-right-radius: 38px;
        border: none;
        font-size: 20px;
        font-weight: bold;
      }
      /deep/.el-input__inner {
        height: 76px;
        line-height: 76px;
        font-size: 16px;
        border-top-left-radius: 38px;
        border-bottom-left-radius: 38px;
        padding: 0 30px;
        font-size: 20px;
        border: 1px solid #00f1fe;
        box-sizing: border-box;
        color: #9b9b9b;
        background: none;
      }
      /deep/.el-input-group__append,
      .el-input-group__prepend {
        border: none;
      }
    }
    .latest-search {
      font-size: 14px;
      color: #fff;
      margin: 25px auto;
      text-align: left;
      width: 920px;
      font-size: 16px;
      span {
        color: #00f1fe;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .main-content {
    margin: auto;
    // display: flex;
    text-align: center;
    margin-top: 20px;
    .content-item {
      padding: 15px 10px;
      background: #f8f8f8;
      //box-shadow: 0 0 5px 5px #e3e3e3;
      display: inline-block;
      text-align: left;
      box-sizing: border-box;
      .tab-content-wrapper {
        div {
          height: 46px;
          line-height: 46px;
          background: #efefef;
          font-size: 16px;
          margin-bottom: 10px;
          box-sizing: border-box;
          padding: 0 10px;
          &:hover {
            border: 1px solid #409eff;
          }
        }
      }
    }

    .leftBox {
      margin-right: 30px;
      width: 500px;
      vertical-align: top;
    }

    .rightBox {
      width: 500px;
      vertical-align: top;
    }

    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;

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
      .status-style {
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