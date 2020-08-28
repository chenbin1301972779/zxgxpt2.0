<!-- 用户管理 -->
<template>
  <div class="userManage">
    <div style="margin-bottom: 15px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="searchbox">
      <el-input class="fl-left manageTableInput" v-model="search.userName" placeholder="请输入姓名" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-input class="fl-left manageTableInput" v-model="search.userCode" placeholder="请输入工号" clearable
        style="width: 200px;margin-right: 10px;">
      </el-input>
      <el-select v-model="search.status" placeholder="请选择状态" clearable style="width: 200px;margin-right: 10px;">
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      <el-button type="success" icon="el-icon-plus" v-on:click="newUser">新增</el-button>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
        v-loading="loading" :default-sort="{prop: 'status', order: 'descending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="工号">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="permissionLevel" label="权限级别">
        </el-table-column>
        <el-table-column prop="email" show-overflow-tooltip label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="companyName" show-overflow-tooltip label="所属公司名称">
        </el-table-column>
        <el-table-column prop="deptName" show-overflow-tooltip label="所属部门名称">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" sortable>
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.status==1" disable-transitions>已启用</el-tag>
            <el-tag type="info" v-else-if="scope.row.status==0">已停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="250px" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">点击启用</el-button>
                        <el-button size="mini" type="primary" @click="handleDelete(scope.$index, scope.row)">点击停用

                        </el-button> -->
            <el-button size="mini" type="primary" @click="editUser(scope.row)" plain>
              编辑</el-button>
            <el-button size="mini" type="danger" @click="updateStatus(scope.row,'0')" plain v-if="scope.row.status==1">
              点击停用</el-button>
            <el-button size="mini" type="primary" @click="updateStatus(scope.row,'1')" plain v-if="scope.row.status==0">
              点击启用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="text-align: center;margin-top: 10px;">
        <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
          :current-page.sync="page.currentPage" :pageSize="page.pageSize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

    <el-dialog :title="editType" :visible.sync="editUserDialog" width="450px" @close="closeDialog" :rules="rules">
      <el-form :model="userInfo" label-width="100px" :rules="rules" ref="userInfo">
        <el-form-item label="用户ID：" v-show="!isNew">
          <el-input v-model="userInfo.userId" disabled style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="工号：" prop="username">
          <el-input v-model="userInfo.username" :disabled="!isNew" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="userInfo.name" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="userInfo.password" style="width:250px" type="password">
          </el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <el-input v-model.number="userInfo.mobile" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userInfo.email" style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="公司代码：">
          <el-input v-model="userInfo.companyCode" disabled style="width:250px"></el-input>
        </el-form-item>
        <el-form-item label="公司：" prop="companyName">
          <el-select v-model="userInfo.companyName" placeholder="请选择公司" @change="selectChange" style="width:250px">
            <el-option v-for="item in newCompany" :disabled="!isNew" :key="item.name" :label="item.name"
              :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="userInfo.deptName" style="width:250px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveUserInfo('userInfo')">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      let TEL_REGEXP = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!TEL_REGEXP.test(value)) {
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      search: {
        userName: '',
        userCode: '',
        status: ''
      },
      statusOptions: [
        {
          label: '已启用',
          value: '1'
        },
        {
          label: '已停用',
          value: '0'
        }
      ],
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      tableData: [],
      loading: false,
      editUserDialog: false,//用户编辑对话框
      isNew: false, //是否是新增用户
      editType: '',
      userInfo: {
        userId: '',
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        companyCode: '',
        companyName: '',
        deptName: ''
      },
      newCompany: [],
      newCompanyFlag: 0,
      rules: {
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入工号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    }
  },
  created () {
    this.getNewCompany();
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData (page) {
      let param = {
        pageIndex: page ? page : 1,
        pageSize: this.page.pageSize,
        username: this.search.userCode,
        name: this.search.userName,
        status: this.search.status
      }
      this.loading = true;
      this.$ajax.manage.getUserList(param).then(res => {
        //console.log(res);
        if (res.data.code == 0) {
          this.loading = false;
          this.tableData = res.data.userList;
          this.page.total = res.data.totalRecords
        }
      })
    },
    searchData () {
      this.page.currentPage = 1;
      this.getData()
    },
    handleCurrentChange (val) {
      //页码切换
      this.getData(val)
    },
    updateStatus (row, status) {
      // console.log(status)
      //点击启用或停用
      let param = {
        userId: row.userId,
        status: status
      }
      this.$ajax.manage.updateUser(param).then(res => {
        if (res.status == 200) {
          this.getData(this.page.currentPage)
          this.editUserDialog = false
        }
      })
    },
    newUser () {
      this.isNew = true;
      this.editType = '新增用户';
      this.userInfo = { newCompanyFlag: 1 };
      this.editUserDialog = true;
    },
    editUser (row) {
      this.isNew = false;
      this.editType = '编辑用户';
      row.newCompanyFlag = 0;
      this.userInfo = row;
      this.editUserDialog = true;
    },
    getNewCompany () {
      let param = {

      }
      this.$ajax.manage.getNewCompany(param).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.newCompany = res.data.newCompany;
        }
      })
    },
    selectChange (selectValue) {
      // console.log(selectValue);
      this.userInfo.companyCode = this.newCompany.find(item => item.name === selectValue).code;
    },
    saveUserInfo (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax.manage.updateUser(this.userInfo).then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.editUserDialog = false;
              this.clearUserInfo();
              this.$refs.userInfo.resetFields();
            }
          })
        } else {
          return false;
        }
      });
    },
    clearUserInfo () {
      this.userInfo = {
        userId: '',
        username: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        companyCode: '',
        companyName: '',
        deptName: ''
      };
    },
    closeDialog () {
      this.clearUserInfo();
      this.$nextTick(() => {
        this.$refs.userInfo.resetFields();
      })
    }
  }
}
</script>
<style lang="less" scoped>
.userManage {
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