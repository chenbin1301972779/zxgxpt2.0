<!-- 企查查 -->
<template>
    <div class="TYCPage">
        <div class="title">
            <span @click="goFocus">
                <img src="../../../public/img/images/noticeDel.png" alt="">
                点击关注
            </span>
        </div>

        <el-dialog title="关注" :visible.sync="dialogFormVisible" width="500px" @close="cancle">
            <el-form :model="form" label-width="150px" :rules="rules" ref="form">
                <el-form-item label="统一社会信用代码：" prop="code">
                    <el-input v-model="form.code" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="企业名称：" prop="entName">
                    <el-input v-model="form.entName" disabled style="width:220px"></el-input>
                </el-form-item>
                <el-form-item label="企业类型：" prop="entType">
                    <el-select v-model="form.entType" placeholder="请选择企业类型" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in entTypeOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行政级别：" prop="areaLevel">
                    <el-select v-model="form.areaLevel" placeholder="请选择行政级别" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in areaLevelOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省：" prop="provinceCode">
                    <el-select v-model="form.provinceCode" placeholder="请选择省级名称" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in provinceOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市：" prop="cityCode">
                    <el-select v-model="form.cityCode" placeholder="请选择地市级名称" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in cityOptions" :key="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区：" prop="countyCode">
                    <el-select v-model="form.countyCode" placeholder="请选择区县级名称" style="width:220px" clearable>
                        <el-option :label="item.value" :value="item.code" v-for="item in countyOptions"
                            :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="confirm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        let validateAreaLevel = (rule, value, callback) => {
            if (this.form.entType == '1') {
                if (value === '') {
                    callback(new Error('请选择行政级别'));
                } else {
                    callback()
                }
            }
        };
        let validateProvince = (rule, value, callback) => {
            if (this.form.entType == '1' && this.form.areaLevel != '') {
                if (value === '') {
                    callback(new Error('请选择省级名称'));
                } else {
                    callback()
                }
            }
        };
        let validateCity = (rule, value, callback) => {
            if (this.form.entType == '1' && (this.form.areaLevel == '2' || this.form.areaLevel == '3')) {
                if (value === '') {
                    callback(new Error('请选择地市级名称'));
                } else {
                    callback()
                }
            }
        };
        let validateCounty = (rule, value, callback) => {
            if (this.form.entType == '1' && this.form.areaLevel == '3') {
                if (value === '') {
                    callback(new Error('请选择区县级名称'));
                } else {
                    callback()
                }
            }
        };
        return {
            dialogFormVisible: false,
            form: {
                code: this.$route.query.creditCode,
                entName: this.$route.query.companyName,
                entType: '',
                areaLevel: '',
                provinceCode: '',
                provinceName: '',
                cityCode: '',
                cityName: '',
                countyCode: '',
                countyName: ''
            },
            provinceOptions: [],
            cityOptions: [],
            countyOptions: [],
            entTypeOptions: [
                {
                    code: '0',
                    value: '非城投企业'
                },
                {
                    code: '1',
                    value: '城投企业'
                }
            ],
            areaLevelOptions: [
                {
                    code: '1',
                    value: '省级'
                },
                {
                    code: '2',
                    value: '地市级'
                },
                {
                    code: '3',
                    value: '区县级'
                }
            ],
            rules: {
                code: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
                entName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                entType: [
                    { required: true, message: '请选择企业类型', trigger: 'change' }
                ],
                areaLevel: [
                    { validator: validateAreaLevel, trigger: 'change' }
                ],
                provinceCode: [
                    { validator: validateProvince, trigger: 'change' }
                ],
                cityCode: [
                    { validator: validateCity, trigger: 'change' }
                ],
                countyCode: [
                    { validator: validateCounty, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        cancle () {
            this.dialogFormVisible = false;
            this.resetForm();
            this.$refs.form.resetFields();
        },
        resetForm () {
            this.form = {
                code: this.$route.query.creditCode,
                entName: this.$route.query.companyName,
                entType: '',
                areaLevel: '',
                provinceCode: '',
                provinceName: '',
                cityCode: '',
                cityName: '',
                countyCode: '',
                countyName: ''
            };
        },
        confirm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        goFocus () {
            //关注
            // this.resetForm();
            this.dialogFormVisible = true;
        }
    }
}
</script>
<style lang="less" scoped>
.TYCPage {
    width: 100%;
    height: 100%;
    margin: auto;
    box-sizing: border-box;

    .title {
        text-align: right;
        color: #ffa931;
        height: 35px;
        line-height: 35px;
        span {
            cursor: pointer;
            img {
                width: 24px;
                height: 24px;
                vertical-align: middle;
                position: relative;
                bottom: 3px;
            }
        }
    }
}
</style>