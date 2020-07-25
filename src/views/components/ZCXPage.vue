<!-- 中诚信 -->
<template>
    <div class="ZCXpage">
        <el-button type="primary" @click="showJSON">查看JSON</el-button>
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
        data() {
            return {
                data: '',
                dialogVisible: false
            }
        },
        created() {
            this.data = JSON.stringify(json)
        },
        methods: {
            showJSON() {
                this.dialogVisible = true;
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
    }
</style>