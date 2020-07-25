
<template>
    <div class="essInfo">
        <div class="name">{{companyName}}</div>
        <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane label="企业基本信息">
                <CompanyBasicInfo></CompanyBasicInfo>
            </el-tab-pane>
            <el-tab-pane label="企查查">企查查</el-tab-pane>
            <el-tab-pane label="中信保">
                <ZXBPage></ZXBPage>
            </el-tab-pane>
            <el-tab-pane label="中诚信">中诚信</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import CompanyBasicInfo from './components/CompanyBasicInfo'
import ZXBPage from './components/ZXBPage'
export default {
    components: {
        CompanyBasicInfo,
        ZXBPage
    },
    data () {
        return {
            companyName: this.$route.query.companyName,
            activeTab: this.$route.query.index
        }
    },
    created () {
        //this.companyInfo = this.$route.query
    }
}
</script>
<style lang="less" scoped>
.essInfo {
    width: 100%;
    min-width: 1300px;
    height: 100%;
    margin: auto;
    padding: 20px 5%;
    box-sizing: border-box;
    overflow: auto;
    .name {
        margin-bottom: 22px;
        font-size: 18px;
    }
}
</style>