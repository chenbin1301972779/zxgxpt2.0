<!-- 中信保 -->
<template>
    <div class="zxbPage">
        <div style="margin-bottom:15px;">
            <el-button type="primary" @click="applyReport">报告申请</el-button>
        </div>
        <div class="main-box">
            <div class="titile">基本信息</div>
            <div class="table-wrapper">
                <table border="1">
                    <tr>
                        <td class="gbGray">企业（机构）名称</td>
                        <td>彩虹集团电子股份有限公司</td>
                        <td class="gbGray">曾用名</td>
                        <td colspan="3">彩虹集团电子有限公司</td>
                    </tr>
                    <tr>
                        <td class="gbGray">成立日期</td>
                        <td>2004-09-10</td>
                        <td class="gbGray">法定代表人/负责人/执行事务合伙人</td>
                        <td>郭盟</td>
                        <td class="gbGray">统一社会信用代码</td>
                        <td>916100007663066019</td>
                    </tr>
                    <tr>
                        <td class="gbGray">注册资本</td>
                        <td>人民币2,232,349,400.00</td>
                        <td class="gbGray">注册地址</td>
                        <td>陕西省咸阳市彩虹路2号院内</td>
                        <td class="gbGray">企业（机构）类型</td>
                        <td>股份有限公司</td>
                    </tr>
                    <tr>
                        <td class="gbGray">电话</td>
                        <td>15107737633</td>
                        <td class="gbGray">传真</td>
                        <td>(010)8316801</td>
                        <td class="gbGray">运营地址</td>
                        <td>陕西省咸阳市彩虹路2号院内</td>
                    </tr>
                    <tr>
                        <td class="gbGray">Email</td>
                        <td>chdz@ch.com.cn</td>
                        <td class="gbGray">主营业务</td>
                        <td>电子产品</td>
                        <td class="gbGray">网址</td>
                        <td>http://www.irico.com.cn</td>
                    </tr>
                    <tr>
                        <td class="gbGray">说明</td>
                        <td colspan="3"></td>
                        <td class="gbGray">行业代码</td>
                        <td>3969</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="main-box">
            <div class="titile">背景规模概要</div>
            <div class="table-wrapper">
                <table border="1">
                    <tr>
                        <td class="gbGray">成立年限</td>
                        <td>15年</td>
                        <td class="gbGray">员工人数</td>
                        <td>997</td>
                        <td class="gbGray">企业规模</td>
                        <td>大型</td>
                    </tr>
                    <tr>
                        <td class="gbGray">上市公司</td>
                        <td>是(香港联合交易所;00438)</td>
                        <td class="gbGray">实际控制人性质</td>
                        <td colspan="3">国有</td>
                    </tr>
                    <tr>
                        <td class="gbGray">SinoRating说明</td>
                        <td colspan="5">人民币2,232,349,400.00</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="main-box">
            <div class="titile">风险异动概要</div>
            <div class="table-wrapper">
                <table border="1">
                    <tr>
                        <td class="gbGray">股东名称</td>
                        <td class="gbGray">持股比例</td>
                        <td class="gbGray">持股金额</td>
                        <td class="gbGray">币种</td>
                    </tr>
                    <tr>
                        <td>彩虹集团公司</td>
                        <td>67.26%</td>
                        <td>630,881,400</td>
                        <td>人民币</td>
                    </tr>
                    <tr>
                        <td>海外投资股东</td>
                        <td>67.26%</td>
                        <td>630,881,400</td>
                        <td>人民币</td>
                    </tr>
                    <tr>
                        <td>郭猛</td>
                        <td>67.26%</td>
                        <td>630,881,400</td>
                        <td>人民币</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="main-box">
            <div class="titile">中信保报告列表</div>
            <div class="table-wrapper">
                <table border="1">
                    <tr>
                        <td class="gbGray">报告</td>
                        <td class="gbGray">报告单号</td>
                        <td class="gbGray">文件路径</td>
                        <td class="gbGray">更新时间</td>
                    </tr>
                    <tr>
                        <td style="color:#1b7fbd;cursor:pointer" @click="downPdf">
                            中国企业资信评估准报告.pdf
                            <el-button size="mini" type="primary" v-on:click.stop="viewPdf">预览</el-button>
                        </td>
                        <td>461964000461964 </td>
                        <td>"/home/ftpuser/461964000461964.pdf"</td>
                        <td>2020/05/15</td>
                    </tr>
                </table>
            </div>
        </div>

        <el-dialog title="信保报告申请" :visible.sync="dialogVisible" width="1200px">
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
                                <el-option v-for="(item,index) in istranslation" :value="item.id" :key="item.id"
                                    :label="item.name">
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
                            <el-input v-model="noCreditCode.reportCorpCountryCode"></el-input>
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
                                <el-option v-for="(item,index) in noIstranslation" :value="item.id" :key="item.id"
                                    :label="item.name">
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
        <el-dialog title="预览" :visible.sync="dialogPDFVisible" width="80%">
            <div style="height: 500px; overflow: auto;">
                <pdfView :url="pdfUrl"></pdfView>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios';
    import pdfView from '../../components/pdfView';
    export default {
        components: {
            pdfView
        },
        data() {
            return {
                pdfUrl:'',
                dialogVisible: false,
                dialogPDFVisible:false,
                haveCreditCode: {
					clientNo:'',
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
					clientNo:'',
                    userId: parseInt(this.$Cookies.get('userId')),
                    reportbuyerNo: '',
                    reportCorpCountryCode: '',
                    reportCorpChnName: '',
                    reportCorpEngName: '',
                    reportCorpaddress: '',
                    creditno: '',
                    noIstranslation: '0',
                },
                istranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }],
                noIstranslation: [{ name: '否', id: '0' }, { name: '是', id: '1' }]

            }
        },
        methods: {
            downPdf() {
                //pdf下载
                let param = {
                    "userId": parseInt(this.$Cookies.get('userId')),
                    "username": "admin",
                    "password": "123456",
                    "clientNo": "20000340"
                }
                this.$ajax.manage.getPDF(param).then(res => {
                    console.log(res)
                    const content = res.data
                    const blob = new Blob([content])
                    const fileName = '中国企业资信评估准报告.pdf'
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        console.log(elink.href);
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },
            viewPdf(){
                let fileUrl = '';
                let param = {
                    "userId": parseInt(this.$Cookies.get('userId')),
                    "username": "admin",
                    "password": "123456",
                    "clientNo": "20000340"
                }
                this.$ajax.manage.getPDF(param).then(res => {
                    console.log(res.data);
                    const content = res.data
                    const blob = new Blob([content])
                    if (window.createObjectURL != undefined) { // basic
                        fileUrl = window.createObjectURL(blob);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        try {
                            fileUrl = window.webkitURL.createObjectURL(blob);
                        } catch (error) {

                        }
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        try {
                            fileUrl = window.URL.createObjectURL(blob);
                        } catch (error) {

                        }
                    }
                    console.log(fileUrl);
                    this.pdfUrl = '/static/pdf/web/viewer.html?file='+encodeURIComponent(fileUrl);
                    window.open(this.pdfUrl);
                    this.dialogPDFVisible = true;
                });

            },
            applyReport() {
                //打开报告申请弹框
                this.dialogVisible = true;
				this.getCodeInfo()
            },
            applyNoCode() {
				if (!this.noCreditCode.clientNo||this.noCreditCode.clientNo === '') {
				    this.$message.warning('请输入买方代码');
				    return;
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
                    console.log(res);
                    if (res.status == 200) {
                        this.$message.success(res.data.returnMsg);
                        this.dialogVisible = false
                    }
                })
            },
            applyHaveCode() {
				if (!this.haveCreditCode.clientNo||this.haveCreditCode.clientNo === '') {
				    this.$message.warning('请输入买方代码');
				    return;
				}else if (!this.haveCreditCode.reportbuyerNo||this.haveCreditCode.reportbuyerNo == '') {
				    this.$message.warning('请输入待调查企业中国信保企业代码');
				    return;
				} 
				console.log(this.haveCreditCode)
                this.$ajax.manage.zhongxinbao(this.haveCreditCode).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message.success(res.data.returnMsg);
                        this.dialogVisible = false
                    }
                })
            },
			getCodeInfo(){
				let param ={
					userId:this.$Cookies.get('userId'),
					companyId:this.$route.query.companyId
				}
				this.$ajax.manage.getCodeInfo(param).then(res=>{
					console.log(res)
					if(res.data.code=='0'){
						if(res.data.codeInfo){
							this.haveCreditCode.clientNo = res.data.codeInfo.clientNo;
							this.noCreditCode.clientNo = res.data.codeInfo.clientNo;
							this.haveCreditCode.reportbuyerNo = res.data.codeInfo.reportbuyerNo
						}
					}
				})
			}
        }
    }
</script>
<style lang="less" scoped>
    .zxbPage {
        /deep/.el-input__inner {
            border: none;
        }

        width: 100%;
        height: 100%;
        margin: auto;
        box-sizing: border-box;

        .main-box {
            .titile {
                font-weight: bold;
                font-size: 14px;
            }
        }

        table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px solid #e3e3e3;
            margin: 15px auto;

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