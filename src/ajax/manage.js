/**
 * 本模块主要用于监控管理
 */
import { ajax, redirectAjax, fileAjax ,newAjax} from './ajax.js'

//登录
async function login (param) {
    let login = await ajax.post(`/api/user/login`, param)
    return login
}

//最近搜索记录
async function latestWords (param) {
    let latestWords = await ajax.post(`/api/company/latestWords`, param)
    return latestWords
}

//搜索 
async function getSearchList (param) {
    let getSearchList = await ajax.post(`/api/company/searchList`, param)
    return getSearchList
}

//用户管理查询
async function getUserList (param) {
    let getUserList = await ajax.post(`/api/user/searchUserList`, param)
    return getUserList
}
//用户管理是否启用
async function updateUser (param) {
    let updateUser = await ajax.post(`/api/user/updateUser`, param)
    return updateUser
}
//pdf下载
async function getPDF (param) {
    let getPDF = await fileAjax.post(`/api/company/getPDF`, param)
    return getPDF
}

//关注清单列表
async function getCareList (param) {
    let getCareList = await ajax.post(`/api/user/getCareList`, param)
    return getCareList
}
//关注/取消关注 
async function careOrNot (param) {
    let careOrNot = await ajax.post(`/api/user/careOrNot`, param)
    return careOrNot
}
//申请中信保报告
async function zhongxinbao (param) {
    let zhongxinbao = await ajax.post(`/api/company/zhongxinbao`, param)
    return zhongxinbao
}
//模糊接口查询
async function directSearchList (param) {
    let directSearchList = await ajax.post(`/api/company/direct/searchList`, param)
    return directSearchList
}
//获取企业关注信息
async function getCareStatus (param) {
    let getCareStatus = await ajax.post(`/api/user/getCareStatus`, param)
    return getCareStatus
}
//获取省市区县信息 
async function getArea (param) {
    let getArea = await ajax.post(`/api/common/getArea`, param)
    return getArea
}
//获取用户信息
async function getUserInfo (param) {
    let getUserInfo = await ajax.post(`/api/user/getUserInfo`, param)
    return getUserInfo
}
//查询clientNo  
async function getCodeInfo (param) {
    let getCodeInfo = await ajax.post(`/api/company/getCodeInfo`, param)
    return getCodeInfo
}
//公司下拉框查询
async function getNewCompany (param) {
    let getNewCompany = await ajax.post(`/api/company/getNewCompany`, param)
    return getNewCompany
}
//获取html
async function getHtml (param) {
    let getHtml = await ajax.post(`/api/company/zhongChengXin/getHtml`, param)
    return getHtml
}
async function getData (param) {
    let getData = await newAjax.get(`/api2/open/${param}`)
    return getData
}
const manage = {
    login: login,
    latestWords: latestWords,
    getSearchList: getSearchList,
    getUserList: getUserList,
    getPDF: getPDF,
    updateUser: updateUser,
    getCareList: getCareList,
    careOrNot: careOrNot,
    zhongxinbao: zhongxinbao,
    directSearchList: directSearchList,
    getCareStatus: getCareStatus,
    getArea: getArea,
    getUserInfo: getUserInfo,
	getCodeInfo:getCodeInfo,
    getNewCompany:getNewCompany,
	getHtml:getHtml,
	getData:getData
}

export default manage