/**
 * 本模块主要用于数据校验
 */
import { ajax, redirectAjax, fileAjax } from './ajax.js'

//模板配置校验：获取检验条目选项
async function getVerificationItemOption (param) {
    let getVerificationItemOption = await ajax.get(redirectAjax(`/api/item/getVerificationItemOption`, param))
    return getVerificationItemOption
}

//模板配置校验：通过excel获取字段
async function getFieldByExcel (param) {
    // MultipartFile content,String suffix
    let data = new FormData()
    for (let key in param) {
        data.append(key, param[key])
    }
    let getFieldByExcel = await fileAjax.post(`/api/rule/getFieldByExcel`, data)
    return getFieldByExcel
}

//检验规则模板唯一性
async function checkRule (param) {
    let checkRule = await ajax.get(redirectAjax(`/api/rule/checkRule`, param))
    return checkRule
}

//添加校验模板
async function addRule (param) {
    let addRule = await ajax.post(`/api/rule/addRule`, param)
    return addRule
}

//数据源配置规则-数据源选项
async function getDataSourceOption (param) {
    let getDataSourceOption = await ajax.get(redirectAjax(`/api/dataSource/getNoConfigOption`, param))
    return getDataSourceOption
}

//数据源配置规则-规则选项
async function getRuleOption (param) {
    let getRuleOption = await ajax.get(redirectAjax(`/api/rule/getRuleOption`, param))
    return getRuleOption
}
//数据源管理:excel数据导入的数据库选项
async function getOption () {
    let getOption = await ajax.get(`/api/dbConn/getOption`)
    return getOption
}

//数据源管理:下拉选项-所有医疗机构
async function getAllOrgOption () {
    let getAllOrgOption = await ajax.get(`/api/hospSystem/getAllOrgOption`)
    return getAllOrgOption
}
//数据源管理:下拉选项-所有【某医疗机构】系统机构
async function getAllSystemOption (param) {
    let getAllSystemOption = await ajax.get(redirectAjax(`/api/hospSystem/getAllSystemOption`, param))
    return getAllSystemOption
}
//数据源管理：新增数据源
async function addOne (param) {
    let addOne = await ajax.post(`/api/dataSource/addOne`, param)
    return addOne
}
//获取指定规则的校验字段及其校验项
async function getFieldAndItemByRuleCode (param) {
    // http://localhost:80/getFieldAndItemByRuleCode?ruleCode=test2
    let getFieldAndItemByRuleCode = await ajax.get(redirectAjax(`/api/getFieldAndItemByRuleCode`, param))
    return getFieldAndItemByRuleCode
}

//数据源配置规则
async function configDataSourceRule (param) {
    // http://localhost:80/configDataSourceRule?sn=2,3&ruleCode=test2
    // 数据源配置规则，sn是指数据源的dataSourceSn，ruleCode是指规则的ruleCode
    let configDataSourceRule = await ajax.get(redirectAjax(`/api/dataSource/configRule`, param))
    return configDataSourceRule
}

//数据校验获取列表
async function getDataSourceList (param) {
    let getDataSourceList = await ajax.get(redirectAjax(`/api/dataSource/getHadRuleList`, param))
    return getDataSourceList
}

//数据校验删除配置关系
async function clearDataSourceRule (param) {
    let clearDataSourceRule = await ajax.get(redirectAjax(`/api/dataSource/clearRule`, param))
    return clearDataSourceRule
}

//值域校验：下拉选项-有数据连接的数据源
async function getHadConnOption () {
    let getHadConnOption = await ajax.get(`/api/dataSource/getHadConnOption`)
    return getHadConnOption
}
//值域校验：根据表名或注释 模糊查询指定数据库的指定表
async function searchTable (param) {
    let searchTable = await ajax.get(redirectAjax(`/api/dbConn/searchTable`, param))
    return searchTable
}
//获取指定数据库用户下的表名
async function getTableNameList (param) {
    let getTableNameList = await ajax.get(redirectAjax(`/api/dbConn/getTableNameList`, param))
    return getTableNameList
}
//获取指定数据库的指定表的字段和字段注释
async function getTableFieldWithRange (param) {
    let getTableFieldWithRange = await ajax.get(redirectAjax(`/api/dbConn/getTableFieldWithRange`, param))
    return getTableFieldWithRange
}
async function getTableField (param) {
    let getTableField = await ajax.get(redirectAjax(`/api/dbConn/getTableField`, param))
    return getTableField
}
//关联性校验：新增
async function add (param) {
    let add = await ajax.post(`/api/relevance/add`, param)
    return add
}
const dataVerify = {
    getVerificationItemOption: getVerificationItemOption,
    getFieldByExcel: getFieldByExcel,
    addRule: addRule,
    checkRule: checkRule,
    getDataSourceOption: getDataSourceOption,
    getRuleOption: getRuleOption,
    getFieldAndItemByRuleCode: getFieldAndItemByRuleCode,
    configDataSourceRule: configDataSourceRule,
    getDataSourceList: getDataSourceList,
    clearDataSourceRule: clearDataSourceRule,
    getHadConnOption: getHadConnOption,
    getTableNameList: getTableNameList,
    getTableField: getTableField,
    getTableFieldWithRange: getTableFieldWithRange,
    add: add,
    searchTable: searchTable,
    getOption: getOption,
    getAllOrgOption: getAllOrgOption,
    getAllSystemOption: getAllSystemOption,
    addOne: addOne

}

export default dataVerify