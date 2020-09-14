<template>
	<div class="header-box">
		<span class="title">
			<img src="../../public/img/logo.png" alt="" @click="goHome">
		</span>
		<!-- <span class="info" v-if="$Cookies.get(this.$getCookieKey())"> -->
		<span>
			<!-- <el-input placeholder="请输入搜索内容" v-model="searchVal" class="input-with-select" style="width: 300px;margin-left: 100px;">
				<el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
			</el-input> -->
			<el-autocomplete @keyup.enter="searchData()"
							 @select="searchData"
							 class="inline-input"
							 v-model="searchVal"
							 :fetch-suggestions="querySearch"
							 placeholder="请输入搜索内容"
			  style="width: 300px;margin-left: 100px;">
				<el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
			</el-autocomplete>
		</span>
		<span class="info" v-if="showUserData">
			<el-dropdown style="margin-right:20px" @command="handleCommand">
				<el-button type="primary" round>
					常用应用<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-divider direction="vertical"></el-divider>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="1" v-if="blacklistApply">黑名单报告</el-dropdown-item>
					<el-dropdown-item command="2" v-if="blacklistAudit">黑名单审批</el-dropdown-item>
					<el-dropdown-item command="3">客商初筛</el-dropdown-item>
					<el-dropdown-item command="4">信保报告申请</el-dropdown-item>
					<el-dropdown-item command="5" v-if="userManage||sub_manage">用户管理</el-dropdown-item>
					<el-dropdown-item command="6">消息中心</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span style="margin-right: 20px;" @click="showUserInfo">
				<i class="el-icon-user-solid"></i>
				{{$Cookies.get('username')}}</span>
			<el-divider direction="vertical"></el-divider>
			<span style="cursor: pointer;" @click="logOut">安全退出</span>
		</span>
		<el-button type="primary" v-else @click="openLoginDialog" style="float:right;margin-top: 12px;">登录</el-button>
		<!-- <span class="info" v-else @click="openLoginDialog">登录</span> -->
		<el-dialog title="登录" :visible.sync="dialogVisible" width="450px">
			<el-form :model="form" label-width="100px">
				<el-form-item label="用户名">
					<el-input v-model="form.username" style="width:250px"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" style="width:250px" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="login">登 录</el-button>
			</div>
		</el-dialog>

		<el-dialog title="账号设置" :visible.sync="userSettingDialog" width="450px">
			<el-form :model="userSettingForm">
				<el-form-item label="用户名：" label-width="100px">
					<el-input v-model="userSettingForm.username" disabled style="width:250px"></el-input>
				</el-form-item>
				<el-form-item label="姓名：" label-width="100px">
					<el-input v-model="userSettingForm.name" style="width:250px"></el-input>
				</el-form-item>
				<el-form-item label="密码：" label-width="100px">
					<el-input v-model="userSettingForm.password" style="width:250px" type="password">
					</el-input>
				</el-form-item>
				<el-form-item label="手机：" label-width="100px">
					<el-input v-model="userSettingForm.mobile" style="width:250px"></el-input>
				</el-form-item>
				<el-form-item label="邮箱：" label-width="100px">
					<el-input v-model="userSettingForm.email" style="width:250px"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="userSettingDialog = false">取 消</el-button>
				<el-button type="primary" @click="saveUserInfo">保 存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="信保报告申请" :visible.sync="dialogXBVisible" width="1200px">
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
								<el-option v-for="(item,index) in istranslation" :value="item.id" :key="item.id" :label="item.name">
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
							<!-- <el-input v-model="noCreditCode.reportCorpCountryCode"></el-input> -->
							<el-select v-model="noCreditCode.reportCorpCountryCode" placeholder='' filterable>
								<el-option v-for="item in nationTypeOptions" :key="item.nationCode" :label="item.nationName" :value="item.nationCode">
									<span style="float: left">{{ item.nationName }}</span>
									<span style="float: right; color: #8492a6; font-size: 13px">{{ item.nationCode }}</span>
								</el-option>
							</el-select>
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
								<el-option v-for="(item,index) in noIstranslation" :value="item.id" :key="item.id" :label="item.name">
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
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		data() {
			return {
				dialogVisible: false,
				form: {
					username: '',
					password: ''
				},
				loginUserName: '',
				userSettingDialog: false,
				userSettingForm: {
					// username: this.$Cookies.get('username'),
					username: this.$Cookies.get('userCode'),
					name: '',
					password: '',
					email: '',
					mobile: ''
				},
				showUserData: sessionStorage.getItem('username'),
				blacklistAudit: false,
				userManage: false,
				sub_manage: false,
				blacklistApply: false,
				dialogXBVisible: false,
				haveCreditCode: {
					clientNo: '',
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
					clientNo: '',
					userId: parseInt(this.$Cookies.get('userId')),
					reportbuyerNo: '',
					reportCorpCountryCode: '',
					reportCorpChnName: '',
					reportCorpEngName: '',
					reportCorpaddress: '',
					creditno: '',
					noIstranslation: '0',
				},
				nationTypeOptions: [],
				istranslation: [{
					name: '否',
					id: '0'
				}, {
					name: '是',
					id: '1'
				}],
				noIstranslation: [{
					name: '否',
					id: '0'
				}, {
					name: '是',
					id: '1'
				}],
				searchVal: '',
				latestSearchList: []
			}
		},
		created() {
			this.$Bus.$on('showDialog', () => {
				this.dialogVisible = true;
			})
		},
		mounted() {
			if (this.$route.query.username) {
				this.skipLogin();
			}
			this.verifyPermissions();
			this.getLatestSearchList();
			this.getNationCode();
		},
		methods: {
			getNationCode () {
				this.$ajax.manage.getNationCode({}).then(res => {
					console.log(res);
					if (res.status == 200) {
						this.nationTypeOptions = res.data.nationCode
					}
				})
			},
			getLatestSearchList() {
				let param = {
					userId: this.$Cookies.get('userId')
				}
				this.$ajax.manage.latestWords(param).then(res => {
					console.log(res)
					if (res.status == 200) {
						this.latestSearchList = res.data.latestWords.map(row=>{
							row.value=row.keyWord;
							return row
						})
					}
				})
			},
			querySearch(queryString, cb) {
				console.log(queryString)
				var latestSearchList = this.latestSearchList;
				var results = queryString ? latestSearchList.filter(this.createFilter(queryString)) : latestSearchList;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
			        return (restaurant) => {
			          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			        };
			      },
			searchData() {
				if (this.searchVal == '') {
					this.$message.warning('请输入搜索内容');
					return;
				} else {
					this.$router.push({
						path: '/searchResult',
						query: {
							searchVal: this.searchVal
						}
					});
					this.getLatestSearchList();
				}
			},
			verifyPermissions() {
				//权限
				let param = {
					userId: this.$Cookies.get("userId"),
					permissionPoint: "user.manage,user.sub_manage,blacklist.audit,blacklist.apply"
				}
				this.$ajax.manage.verifyPermissions(param).then(res => {
					console.log(res)
					if (res.data.code == 0) {
						this.blacklistAudit = res.data.verifyPermissionResult['blacklist.audit'];
						this.blacklistApply = res.data.verifyPermissionResult['blacklist.apply'];
						this.userManage = res.data.verifyPermissionResult['user.manage'];
						this.sub_manage = res.data.verifyPermissionResult['user.sub_manage'];
						if (this.userManage || this.sub_manage) {
							this.$Cookies.set('userManage', 'true');
						}
					}
				})
			},
			handleCommand(command) {
				console.log(command)
				if (command == 1) {
					//黑名单申报
					this.goHmdsb()
				} else if (command == 2) {
					//黑名单审批
					this.goHmdsp()
				} else if (command == 3) {
					//客商初筛
					this.goKstb()
				} else if (command == 4) {
					//信保报告申请
					this.applyReport()
				} else if (command == 5) {
					//用户管理
					if (this.$Cookies.get('username') != 'admin' && this.$Cookies.get('userManage') != 'true') {
						this.$message.warning('您暂没有查看该功能的权限，请联系管理员')
					} else {
						//55109783
						this.$router.push({
							path: '/userManage'
						})
					}
				} else if (command == 6) {
					this.$router.push({
						path: '/messageCenter'
					})
				}
			},
			goHmdsb() {
				this.$router.push({
					path: '/iframePage',
					query: {
						title: encodeURIComponent('黑名单申报'),
						url: encodeURIComponent(
							`http://10.0.130.27:8080/webroot/decision/view/form?viewlet=/Homepage/BlackList.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`
						)
					}
				})
				this.reload()
			},
			goHmdsp() {
				this.$router.push({
					path: '/iframePage',
					query: {
						title: encodeURIComponent('黑名单审批'),
						url: encodeURIComponent(
							`http://10.0.130.27:8080/webroot/decision/view/form?viewlet=/Homepage/BlackList_check.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`
						)
					}
				})
				this.reload()
			},
			goKstb() {
				this.$router.push({
					path: '/iframePage',
					query: {
						title: encodeURIComponent('客商填报'),
						url: encodeURIComponent(
							`http://10.0.130.27:8080/webroot/decision/view/form?viewlet=/Homepage/客商填报.cpt&op=write&userCode=${sessionStorage.getItem('userCode')}`
						)
					}
				})
				this.reload()
			},
			openLoginDialog() {
				//打开登录弹框
				this.dialogVisible = true;
			},
			login() {
				//登录
				if (this.form.username === '') {
					this.$message.warning('请输入用户名');
					return;
				} else if (this.form.password === '') {
					this.$message.warning('请输入密码');
					return;
				}
				let param = {
					username: this.form.username,
					password: this.form.password,
				}
				this.$ajax.manage.login(param).then(res => {
					console.log(res);
					if (res.data.code === '0') {
						this.$Cookies.set(this.$getCookieKey(), res.data.token, {
							expires: 30
						});
						this.$Cookies.set('username', res.data.name, {
							expires: 30
						});
						this.$Cookies.set('userCode', res.data.username, {
							expires: 30
						});
						this.$Cookies.set('userId', res.data.userId, {
							expires: 30
						});
						sessionStorage.setItem('username', res.data.name);
						sessionStorage.setItem('userCode', res.data.username);
						sessionStorage.setItem('userId', res.data.userId);
						this.dialogVisible = false;
						this.loginUserName = res.data.name;
						//this.reload()
						this.$router.push({
							path: '/homePage'
						});
						this.reload()
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			logOut() {
				//退出
				this.$Cookies.remove(this.$getCookieKey());
				this.$Cookies.remove('username');
				this.$Cookies.remove('userCode');
				this.$Cookies.remove('userId');
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('userCode');
				sessionStorage.removeItem('userId');
				this.$router.push({
					path: '/'
				});
				this.reload()
				// this.$router.go(0);
			},
			skipLogin() {
				let param = {
					username: this.$route.query.username,
					loginType: 'skip',
				}
				this.$ajax.manage.login(param).then(res => {
					console.log(res);
					if (res.data.code === '0') {
						this.$Cookies.set(this.$getCookieKey(), res.data.token, {
							expires: 30
						});
						this.$Cookies.set('username', res.data.name, {
							expires: 30
						});
						this.$Cookies.set('userCode', res.data.username, {
							expires: 30
						});
						this.$Cookies.set('userId', res.data.userId, {
							expires: 30
						});
						sessionStorage.setItem('username', res.data.name);
						sessionStorage.setItem('userCode', res.data.username);
						sessionStorage.setItem('userId', res.data.userId);
						this.loginUserName = res.data.name;
						this.$router.push({
							path: '/homePage'
						});
						this.reload()
					} else {
						this.$message.error(res.data.msg)
					}
				})
			},
			showUserInfo() {
				//维护用户基本信息弹框
				this.userSettingDialog = true;
				this.getUserInfo()
			},
			getUserInfo() {
				//获取用户信息
				let param = {
					userId: this.$Cookies.get("userId")
				};
				this.$ajax.manage.getUserInfo(param).then(res => {
					console.log(res);
					if (res.status == 200) {
						this.userSettingForm.name = res.data.user.name;
						this.userSettingForm.password = res.data.user.password;
						this.userSettingForm.email = res.data.user.email;
						this.userSettingForm.mobile = res.data.user.mobile;
					}
				})
			},
			saveUserInfo() {
				let param = {
					userId: this.$Cookies.get("userId"),
					name: this.userSettingForm.name,
					password: this.userSettingForm.password,
					email: this.userSettingForm.email,
					mobile: this.userSettingForm.mobile
				}
				this.$ajax.manage.updateUser(param).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						this.$message.success(res.data.msg);
						this.userSettingDialog = false
					}
				})
			},
			clearUserForm() {
				this.userSettingForm = {
					// username: this.$Cookies.get('username'),
					username: this.$Cookies.get('userCode'),
					name: '',
					password: '',
					email: '',
					mobile: ''
				}
			},
			goHome() {
				// 
				console.log(this.$route);
				this.$router.push({
					path: '/homePage'
				});
				// if (this.$route.path == '/') {
				//     this.reload();
				// } else {
				//     this.$router.push({ path: '/' });
				// }
			},
			applyReport() {
				//打开报告申请弹框
				this.dialogXBVisible = true;
				this.getCodeInfo();
			},
			getCodeInfo() {
				let param = {
					userId: this.$Cookies.get('userId')
				}
				this.$ajax.manage.getCodeInfo(param).then(res => {
					console.log(res)
					if (res.data.code == '0') {
						if (res.data.codeInfo) {
							this.haveCreditCode.clientNo = res.data.codeInfo.clientNo;
							this.noCreditCode.clientNo = res.data.codeInfo.clientNo;
							this.haveCreditCode.reportbuyerNo = res.data.codeInfo.reportbuyerNo
						}
					}
				})
			},
			applyNoCode() {
				if (!this.noCreditCode.clientNo || this.noCreditCode.clientNo === '') {
					// this.$message.warning('请输入买方代码');
					// return;
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
					if (res.status == 200) {
						this.$message.success(res.data.returnMsg);
						this.dialogXBVisible = false
					}
				})
			},
			applyHaveCode() {
				if (!this.haveCreditCode.clientNo || this.haveCreditCode.clientNo === '') {
					this.$message.warning('请输入买方代码');
					return;
				} else if (!this.haveCreditCode.reportbuyerNo || this.haveCreditCode.reportbuyerNo == '') {
					this.$message.warning('请输入待调查企业中国信保企业代码');
					return;
				}
				this.$ajax.manage.zhongxinbao(this.haveCreditCode).then(res => {
					if (res.status == 200) {
						this.$message.success(res.data.returnMsg);
						this.dialogXBVisible = false
					}
				})
			}
		}
	}
</script>
<style>
	.el-dropdown-link {
		cursor: pointer;
		color: #333333;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>
<style lang="less" scoped>
	.header-box {

		// background: url(../../public/img/header.png) no-repeat;
		// background-size: cover;
		.el-dropdown/deep/ {
			height: 40px;
			//float: right;
		}

		.el-dialog__header/deep/ {
			line-height: 20px;
		}

		line-height: 60px;
		white-space: nowrap;
		overflow: hidden;
		//margin-bottom: 10px;
		// background: #1b7fbd;
		background-color: #fff;
		padding: 0 60px;
		position: relative;

		img {
			height: 40px;
			cursor: pointer;
		}

		.title {
			font-size: 16px;
			font-weight: bold;
			color: rgba(71, 140, 209, 1);
			margin-left: 16px;
			//color: #fff;
			color: #333333;

			img {
				vertical-align: middle;
			}
		}

		.info {
			float: right;
			margin-right: 38px;
			font-size: 16px;
			color: #333333;
			cursor: pointer;
			color: #333333;

			span {
				&:hover {
					color: #409eff;
				}
			}

			.infoImg {
				display: inline-block;
				width: 20px;
				height: 20px;
				vertical-align: middle;
				margin-right: 6px;
			}
		}

		table {
			width: 100%;
			text-align: center;
			border-collapse: collapse;
			border-spacing: 0;
			border: 1px solid #e3e3e3;
			margin: 15px auto;
			table-layout: fixed;

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
