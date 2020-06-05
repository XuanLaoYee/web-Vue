<!--登陆组件 -->
<template>
    <div id="login">
        <el-dialog title="登陆" width="300px" center :visible.sync="isLogin">
            <el-form :model="LoginUser" :rules="rules" status-icon ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input prefix-icon="el-icon-user-solid" placeholder="请输入账号" v-model="LoginUser.name"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input
                            prefix-icon="el-icon-view"
                            type="password"
                            placeholder="请输入密码"
                            v-model="LoginUser.pass"
                    ></el-input>
                </el-form-item>
                <el-radio v-model="user_kind" label="buyer">我是买家</el-radio>
                <el-radio v-model="user_kind" label="seller">我是卖家</el-radio>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="Login" style="width:100%;">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Login",
        data() {
            let verifyName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("请输入用户名"));
                }
                const userNameRule = /^[a-zA-Z0-9_]{1,16}$/;//用户名只允许字母数字和下划线的组合，不得超过16个字符
                if (userNameRule.test(value)) {
                    this.$refs.ruleForm.validateField("chechPass");
                    return callback();
                } else {
                    return callback(new Error("用户名只允许字母数字和下划线的组合，不得超过16个字符"));
                }
            };
            let verifyPass = (rule, value, callback) => {
                if (value === "") {
                    return callback(new Error("请输入密码"));
                }
                const passwordRule = /^[a-zA-Z0-9_]{1,16}$/;
                if (passwordRule.test(value)) {
                    this.$refs.ruleForm.validateField("checkPass");
                    return callback();
                } else {
                    return callback(new Error("用户名只允许字母数字和下划线的组合，不得超过16个字符"));
                }
            };
            return {
                LoginUser: {
                    name: "",
                    pass: ""
                },
                // rules规则，validator（校验方法）,trigger（触发方式）,blur为在组件Input失去焦点时触发
                rules: {
                    name: [{validator: verifyName, trigger: "blur"}],
                    pass: [{validator: verifyPass, trigger: "blur"}]
                },
                user_kind:'buyer'
            };
        },
        computed: {
            isLogin: {
                get() {
                    return this.$store.getters.getShowLogin;///TODO查看getShowLogin的作用
                },
                set(val) {
                    this.$refs["ruleForm"].resetFields();//清空输入框校验状态
                    this.setShowLogin(val);
                }
            }
        },
        methods: {
            ...mapActions(["setUser", "setShowLogin","setUserKind"]),
            Login() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("api/users/login", {
                                userName: this.LoginUser.name,
                                password: this.LoginUser.pass,
                                user_kind: this.user_kind
                            })
                            .then(res => {
                                if (res.data.code === "001") {///"001"表示登陆成功
                                    this.isLogin = false;
                                    let user = JSON.stringify(res.data.user);
                                    let user_kind = JSON.stringify(res.data.user.user_kind);
                                    if(user_kind==='"buyer"'){
                                        localStorage.setItem("user_kind",'buyer');
                                        this.setUserKind('buyer');
                                    }else{
                                        localStorage.setItem("user_kind",'seller');
                                        this.setUserKind('seller');
                                    }
                                    localStorage.setItem("user", user);//放到浏览器缓存中
                                    this.setUser(res.data.user);//信息写至vuex.store
                                    this.notifySucceed(res.data.msg);//弹框
                                } else {
                                    this.$refs["ruleForm"].resetFields();
                                    this.notifyError(res.data.msg);
                                }
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>

<style>

</style>
