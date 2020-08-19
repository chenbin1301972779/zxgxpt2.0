<!-- 首页 -->
<template>
    <div class="main-wrapper">
        <div class="search-content">
            <div class="title">资 信 共 享 平 台</div>
            <div>
                <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select" style="width: 600px;height: 50px;"
                    clearable="" @keyup.enter.native="seachContent">
					<el-button slot="append" icon="el-icon-search" style="height: 50px;width: 70px;background: #409eff;color: #fff;"
					    @click="seachContent" ></el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
		//inject: ['reload'],
        data() {
            return {
                searchVal: '',
            }
        },
        mounted() {
			if(sessionStorage.removeItem('username')){
				this.$Cookies.remove(this.$getCookieKey());
				this.$Cookies.remove('username');
				this.$Cookies.remove('userCode');
				this.$Cookies.remove('userId');
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('userCode');
				sessionStorage.removeItem('userId');
				this.go(0)
			}
        },
        methods: {
            seachContent() {
				//未登录=>去登陆
				this.dialogVisible = true;
				this.$Bus.$emit('showDialog')
            },
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
    .main-wrapper /deep/{
		/deep/.el-input__inner{
			height: 50px;
			line-height: 50px;
			font-size: 16px;
		}
		/deep/.el-input-group__append, .el-input-group__prepend{
			border: none;
		}
        width: 100%;
        height: 100%;
        overflow: auto;
        .search-content {
           height: 500px;
           width: 100%;
           text-align: center;
           padding-top: 30px;
           box-sizing: border-box;
           background: url(../../public/img/bg.jpg) no-repeat;
           background-size: cover;
           margin-bottom:20px;
           opacity: 0.8;
			.title{
				font-size: 40px;
				color: #fff;
				width: 100%;
				height: 200px;
				line-height: 200px;
			}
        }
    }
</style>