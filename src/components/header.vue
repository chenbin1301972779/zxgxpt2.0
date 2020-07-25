<template>
    <div class="header">
        <span class="title">
            <img src="../../public/img/logo.png" alt="" @click="$router.push({path:'/'});">
        </span>
        <span class="info" v-if="$Cookies.get(this.$getCookieKey())">
            <span style="margin-right: 20px;" @click="showUserInfo">
                <i class="el-icon-user-solid"></i>
                {{$Cookies.get('username')}}</span>
            <span style="cursor: pointer;" @click="logOut">安全退出</span>
        </span>
        <span class="info" v-else @click="openLoginDialog">登录</span>

        <el-dialog title="登录" :visible.sync="dialogVisible" width="450px">
            <el-form :model="form" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" style="width:250px" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login">登 录</el-button>
            </div>
        </el-dialog>

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
                <el-button type="primary" @click="userSettingDialog = false">保 存</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    inject: ['reload'],
    data () {
        return {
            dialogVisible: false,
            form: {
                username: '',
                password: ''
            },
            loginUserName: '',
            userSettingDialog: false,
            userSettingForm: {
                username: this.$Cookies.get('username'),
                name: '',
                password: '',
                email: '',
                mobile: ''
            }
        }
    },
    created () {
        this.$Bus.$on('showDialog', () => {
            this.dialogVisible = true;
        })
    },
    mounted () {
        console.log(this.$route.query.username);
        if (this.$route.query.username) {
            this.skipLogin();
        }
        //this.reload()
    },
    methods: {
        openLoginDialog () {
            //打开登录弹框
            this.dialogVisible = true;
        },
        login () {
            //登录
            if (this.form.username === '') {
                this.$message.warning('请输入用户名');
                return;
            } else if (this.form.password === '') {
                this.$message.warning('请输入密码');
                return;
            }
            let param = {
                username: this.form.username,
                password: this.form.password,
            }
            this.$ajax.manage.login(param).then(res => {
                console.log(res);
                if (res.data.code === '0') {
                    this.$Cookies.set(this.$getCookieKey(), res.data.token, { expires: 30 });
                    this.$Cookies.set('username', res.data.name, { expires: 30 });
                    this.$Cookies.set('userId', res.data.userId, { expires: 30 });
                    this.dialogVisible = false;
                    this.loginUserName = res.data.name;
                    this.reload()
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        logOut () {
            //退出
            this.$Cookies.remove(this.$getCookieKey());
            this.$Cookies.remove('username');
            this.$Cookies.remove('userId');
            this.$router.push({ path: '/' });
            this.reload()
            this.$router.go(0);
        },
        skipLogin () {
            let param = {
                username: this.$route.query.username,
                loginType: 'skip',
            }
            this.$ajax.manage.login(param).then(res => {
                console.log(res);
                if (res.data.code === '0') {
                    this.$Cookies.set(this.$getCookieKey(), res.data.token, { expires: 30 });
                    this.$Cookies.set('username', res.data.name, { expires: 30 });
                    this.$Cookies.set('userId', res.data.userId, { expires: 30 });
                    this.loginUserName = res.data.name;
                    this.$router.push({ path: '/' });
                    this.reload()
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        showUserInfo () {
            //维护用户基本信息弹框
            this.userSettingDialog = true
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    line-height: 58px;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 10px;
    background: #1b7fbd;
    padding: 0 60px;
    img {
        height: 40px;
        cursor: pointer;
    }
    .title {
        font-size: 16px;
        font-weight: bold;
        color: rgba(71, 140, 209, 1);
        margin-left: 16px;
        color: #fff;
        img {
            vertical-align: middle;
        }
    }

    .info {
        float: right;
        margin-right: 38px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        color: #fff;
        .infoImg {
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 6px;
        }
    }
}
</style>