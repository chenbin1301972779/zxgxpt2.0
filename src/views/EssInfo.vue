<template>
    <div class="essInfo">
        <div class="name">{{companyName}}</div>
        <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane label="企业基本信息">
                <CompanyBasicInfo></CompanyBasicInfo>
            </el-tab-pane>
            <el-tab-pane label="企查查">
                <TYCPage></TYCPage>
            </el-tab-pane>
            <el-tab-pane label="中信保">
                <ZXBPage></ZXBPage>
            </el-tab-pane>
            <el-tab-pane label="中诚信">
                <ZCXPage></ZCXPage>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import CompanyBasicInfo from './components/CompanyBasicInfo'
    import ZXBPage from './components/ZXBPage'//中信保
    import TYCPage from './components/TYCPage' //企查查
    import ZCXPage from './components/ZCXPage' //中诚信
    export default {
        components: {
            CompanyBasicInfo,
            ZXBPage,
            TYCPage,
            ZCXPage
        },
        data() {
            return {
                companyName: this.$route.query.companyName,
                activeTab: this.$route.query.index
            }
        },
        created() {
            console.log(this.$route.query.companyId);
            this.getCareStatus()
            //this.companyInfo = this.$route.query
        },
        methods: {
            getCareStatus() {
                let param = {
                    companyId: parseInt(this.$route.query.companyId),
                    userId: parseInt(this.$Cookies.get('userId'))
                }
                this.$ajax.manage.getCareStatus(param).then(res => {
                    console.log(res)
                })
            }
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