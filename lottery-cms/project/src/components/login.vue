<template>
    <div class="loginBox">
        <el-col :span="6" class="login" v-loading="loading">
            <div class="grid-content bg-purple">
                <div className="myLogo" style="margin-bottom:20px;">
                    <img src="../img/logo.png" alt=""/>
                    <h2>Theater</h2>
                </div>
                <el-form :model="loginForm" ref="loginForm" class="demo-dynamic" style="position:relative;">
                    <el-form-item
                        prop="username"
                        :rules="[
                        { required: true, message: 'Please input your E-mail!', trigger: 'blur' },
                        { type: 'email', message: 'The input is not valid E-mail!', trigger: 'blur,change' }
                        ]"
                    >
                        <el-input prefix-icon="el-icon-message" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="password"
                        :rules="{
                            required: true, message: 'Please input your Password!', trigger: 'blur'
                        }"
                    >
                        <el-input prefix-icon="el-icon-goods" type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">Log in</el-button>
                    </el-form-item>
                    <el-alert
                        :title="loginStatus"
                        v-if="isLoginError"
                        type="error"
                        center
                        show-icon>
                    </el-alert>
                </el-form>    
            </div>
        </el-col>
    </div>
</template>
<style>
html,body{
    width:100%;
    height:100%;
}
.loginBox{
    height:100%;
    background:url(../img/bg.jpg);
    background-size:cover;
}
.login{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    min-width:400px;
    height:400px;
    padding: 60px;
    border-radius:5px;
    /* background:#fff;
    opacity:.9; */
    background-color: rgba(229, 243, 255, 0.9) !important;
}
</style>

<script>
import request from '../http/http.js'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            isLoginError: false,
            duration: 1000,
            loginStatus: '',
            loading: false
        }
    },

    mounted() {
        this.handleKeyup();
    },

    methods: {
        
        error() {
            const vm = this;
            this.$message({
                message: '请求错误',
                type: 'error',
                duration: vm.duration
            })
        },
        submitForm(formName) {
            const vm = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    vm.loading = true;
                    request.login(
                        'get',
                        '/user/random',
                        {
                            email: vm.loginForm.username
                        },
                        (success)=>{
                            if( success.returncode == '200' ){
                                let salt = success.data.salt;
                                let new_password = CryptoJS.HmacMD5(CryptoJS.MD5(vm.loginForm.password).toString(), salt).toString();
                                request.login(
                                    'post',
                                    '/user/login',
                                    {
                                        username: vm.loginForm.username,
                                        password: new_password
                                    },
                                    (success)=>{
                                        let code = success.returncode;
                                        if (code == '304') {
                                            vm.isLoginError = true;
                                            vm.loginStatus = '用户不存在';
                                            setTimeout(function(){
                                                vm.isLoginError = false;
                                                vm.loginStatus = '';
                                            },2000)
                                        } else if (code == '305') {
                                            vm.isLoginError = true;
                                            vm.loginStatus = '密码错误';
                                            setTimeout(function(){
                                                vm.isLoginError = false;
                                                vm.loginStatus = '';
                                            },2000)
                                        } else if (code == '200') {
                                            vm.getToken(success.data.bearer, vm.loginForm.username);
                                        } else if (code == '306') {
                                            vm.isLoginError = true;
                                            vm.loginStatus = '您的账号被禁止登陆，请联系管理员';
                                            setTimeout(function(){
                                                vm.isLoginError = false;
                                                vm.loginStatus = '';
                                            },2000)
                                        } else {
                                            request.handleLogOut(code, vm);
                                        }
                                    },
                                    (error)=>{
                                        vm.error();
                                        vm.loading = false;
                                        console.log('/user/login---error', error)
                                    }
                                )
                            }else{
                                vm.error();
                                vm.loading = false;
                            }
                            // console.log('/user/random---success', success)
                        },
                        (error)=>{
                            vm.error();
                            vm.loading = false;
                            console.log('/user/random---error', error)
                        }
                    )
                } else {
                    vm.loading = false;
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        getToken(bearer, username) {
            const vm = this;
            var headers = {
                "authorization": bearer
            };
            request.http(
                'get',
                '/authorise',
                {},
                (success)=>{
                    if( success.returncode == 200 ){
                        request.login(
                            'post',
                            '/oauth/token',
                            {
                                code: success.data.code
                            },
                            (success)=>{
                                vm.loading = false;
                                if( success.returncode == 200 ){
                                    localStorage.setItem('A-TOKEN', success.data.access_token);
                                    localStorage.setItem('R-TOKEN', success.data.refresh_token);
                                    localStorage.setItem('USERNAME', username);
                                    vm.$router.push({path:'/HelloWorld'})
                                }
                                // console.log('/oauth/token---success', success)
                            },
                            (error)=>{
                                vm.error();
                                vm.loading = false;
                                console.log('/oauth/token---error', error)
                            },
                            headers
                        )
                    }
                    // console.log('authorise---success', success)
                },
                (error)=>{
                    vm.error();
                    vm.loading = false;
                    console.log('authorise---error', error)
                },
                headers
            )
        },
        handleKeyup() {
            const vm = this;
            document.onkeyup = function(e){
                // console.log(e.keyCode)
                if(e.keyCode==13){
                    vm.submitForm('loginForm')
                }
            }
        }
    }
}
</script>