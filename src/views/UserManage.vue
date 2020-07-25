<!-- 用户管理 -->
<template>
    <div class="userManage">
        <div class="searchbox">
            <el-input class="fl-left manageTableInput" v-model="search.userName" placeholder="请输入用户名" clearable
                style="width: 200px;margin-right: 10px;">
            </el-input>
            <el-input class="fl-left manageTableInput" v-model="search.userCode" placeholder="请输入工号" clearable
                style="width: 200px;margin-right: 10px;">
            </el-input>
            <el-select v-model="search.status" placeholder="请选择状态" clearable style="width: 200px;margin-right: 10px;">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="searchData">查询</el-button>
        </div>
        <div class="table-box">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" stripe
                v-loading="loading" :default-sort="{prop: 'status', order: 'descending'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="username" label="工号">
                </el-table-column>
                <el-table-column prop="name" label="人员">
                </el-table-column>
                <el-table-column prop="permissionLevel" label="权限级别">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
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
                        <el-button size="mini" type="danger" @click="updateStatus(scope.row,'0')" plain
                            v-if="scope.row.status==1">
                            点击停用</el-button>
                        <el-button size="mini" type="primary" @click="updateStatus(scope.row,'1')" plain
                            v-if="scope.row.status==0">
                            点击启用</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="text-align: center;margin-top: 10px;">
                <el-pagination background layout="prev, pager, next,total,jumper" :total="page.total"
                    :current-page.sync="page.currentPage" :pageSize="page.pageSize"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
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
            loading: false
        }
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
                console.log(res);
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
            console.log(status)
            //点击启用或停用
            let param = {
                userId: row.userId,
                status: status
            }
            this.$ajax.manage.updateUser(param).then(res => {
                if (res.status == 200) {
                    this.getData(this.page.currentPage)
                }
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