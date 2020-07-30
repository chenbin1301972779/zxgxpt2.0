<!-- 中诚信 -->
<template>
    <div class="ZCXpage">
        <div style="margin-bottom:20px">
            <p style="font-size: 14px;line-height: 30px;">统一社会信用代码：{{creditCode}}</p>
            <p style="font-size: 14px;line-height: 30px;">成立时间：{{buildDate}}</p>
        </div>
        <el-button type="primary" @click="toCreditEvaluate">风险初筛</el-button>
        <el-button type="primary" @click="toCreditEvaluate">财务排雷</el-button>
		<el-button type="primary" @click="toCreditEvaluate">产业企业信用评价</el-button>
		<el-button type="primary" @click="toCreditEvaluate">区域信用评价</el-button>
		<el-button type="primary" @click="toCreditEvaluate">城投企业信用评价</el-button>
        <el-button type="primary" @click="toCreditEvaluate">查看JSON</el-button>
       <!-- <el-select v-model="credit" placeholder="请选择" style="margin-left:10px">
            <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
        </el-select> -->
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
            ]
        }
    },
    created () {
        this.data = JSON.stringify(json, null, '\t')
    },
    methods: {
        showJSON () {
            this.dialogVisible = true;
        },
		toCreditEvaluate(){
			this.$router.push({
			    path: '/creditEvaluate',
			    query: {
			        companyId:this.$route.query.companyId
			    }
			})
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
}
</style>