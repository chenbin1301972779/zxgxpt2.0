<!-- 企业基本信息 -->
<template>
    <div class="companyBasicInfo">
        <div class="main-box">
            <div class="left-box">
                <div>
                    <div class="titile">基本信息</div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">法定代表人</td>
                                <td>{{basicInfo.operName}}</td>
                                <td class="gbGray">经营状态</td>
                                <td></td>
                                <td class="gbGray">成立日期</td>
                                <td>{{basicInfo.buildDate}}</td>
                            </tr>
                            <tr>
                                <td class="gbGray">注册资本</td>
                                <td>&nbsp;</td>
                                <td class="gbGray">实缴资本</td>
                                <td></td>
                                <td class="gbGray">缴费日期</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="gbGray">统一社会信用代码</td>
                                <td>{{basicInfo.creditCode}}</td>
                                <td class="gbGray">组织机构代码</td>
                                <td></td>
                                <td class="gbGray">所属行业</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="gbGray">曾用名</td>
                                <td></td>
                                <td class="gbGray">英文名</td>
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td class="gbGray">SinoRating说明</td>
                                <td colspan="5">{{basicInfo.sinoRating}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="margin-top:80px;">
                    <div class="titile">预警推送</div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">企业名称</td>
                                <td class="gbGray">风险原因</td>
                                <td class="gbGray">发布单位</td>
                                <td class="gbGray">审核机构</td>
                                <td class="gbGray">风险提示起止时间</td>
                            </tr>
                            <tr>
                                <td>{{basicInfo.companyName}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div>
                    <div class="titile">资信信息综合画像</div>
                    <div class="table-wrapper">
                        <useMap :main="main"></useMap>
                    </div>
                </div>
                <div style="margin-top:30px;">
                    <div class="titile">预警推送</div>
                    <div class="table-wrapper">
                        <table border="1">
                            <tr>
                                <td class="gbGray">报告名称</td>
                                <td class="gbGray">查看地址</td>
                                <td class="gbGray">报告来源</td>
                                <td class="gbGray">更新日期</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useMap from '@/components/useMap'
export default {
    components: {
        useMap
    },
    data () {
        return {
            basicInfo: {},
            main: 'userMap',
        }
    },
    created () {
        console.log(this.$route.query)
        this.basicInfo = this.$route.query
    }
}
</script>
<style lang="less" scoped>
.companyBasicInfo {
    width: 100%;
    height: 100%;
    margin: auto;
    //background-color: #f8f8f8;
    box-sizing: border-box;
    .main-box {
        display: flex;
        .titile {
            font-weight: bold;
            font-size: 14px;
        }
        table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border-spacing: 0;
            table-layout: fixed;
            margin: 15px auto;
            border: 1px solid #e3e3e3;
            td {
                word-break: break-all; /*允许在字内换行,即单词可分*/
                word-wrap: break-word; /*允许长单词或URL地址换行*/
                border-right: 1px solid #e3e3e3;
                border-bottom: 1px solid #e3e3e3;
                font-size: 14px;
                height: 36px;
            }
            .gbGray {
                background: #f1f3f4;
            }
        }
        .left-box {
            flex: 2;
            margin-right: 15px;
        }
        .right-box {
            flex: 1;
        }
    }
}
</style>