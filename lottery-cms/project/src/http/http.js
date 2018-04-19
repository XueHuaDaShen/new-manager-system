import request from 'axios';
import Config from '../config/config.js'
request.defaults.baseURL = Config.request
const loginReq = request.create({
    baseURL: Config.login
});

const refreshReq = request.create({
    baseURL: Config.login
});
export default {
    http(method, url, params, callback, fallback, headers){
        var o = {};
        if(method == 'get'){
            o = {
                method: method,
                headers: headers,
                url: url,
                params: params
            }
        }else if(method == 'post'){
            o = {
                method: method,
                headers: headers,
                url: url,
                data: params
            }
        }
        request(o).then((res) => {
            let result = res.data;
            let code = result.returncode;
            if( code == 200 ){
                callback(result)
            }else{
                fallback(result)
            }
        })
    },
    login(method, url, params, callback, fallback, headers){
        var o = {};
        if(method == 'get'){
            o = {
                method: method,
                headers: headers,
                url: url,
                params: params
            }
        }else if(method == 'post'){
            o = {
                method: method,
                headers: headers,
                url: url,
                data: params
            }
        }
        loginReq(o).then((res) => {
            let result = res.data;
            let code = result.returncode;
            if( code == 200 ){
                callback(result)
            }else{
                fallback(result)
            }
        })
    },
    refresh(that, refresh_token, callback){

        refreshReq({
            url: '/oauth/refreshToken',
            data: {
                refresh_token: refresh_token
            },
            type: 'post'
        }).then((res) => {
            let result = res.data;
            let code = result.returncode;
            if (code == '200') {
                localStorage.setItem('A-TOKEN', result.data.access_token);
                localStorage.setItem('R-TOKEN', result.data.refresh_token);
                that.$store.state.A_TOKEN = result.data.access_token;
                that.$store.state.R_TOKEN = result.data.refresh_token;
                callback();
            } else if (code == '301') {
                localStorage.removeItem('A-TOKEN');
                localStorage.removeItem('R-TOKEN');
                // that.$router.push('/user');
            } else if (code == '304') {
                // debugger;
                localStorage.removeItem('A-TOKEN');
                localStorage.removeItem('R-TOKEN');
                localStorage.removeItem('USERNAME');
                that.$router.push('/login');
            }
        }).catch(function (error) {
            localStorage.removeItem('A-TOKEN');
            localStorage.removeItem('R-TOKEN');
            localStorage.removeItem('USERNAME');
            that.$router.push('/login');
        });
    },

    loginAgain(that) {
        localStorage.removeItem('A-TOKEN');
        localStorage.removeItem('R-TOKEN');
        localStorage.removeItem('USERNAME');
        that.$router.push('/login');
    },

    handlerErr(that, code, func) {
        var suc = false;
        if(code) {
            if(code == 304 || code == 102 || code == 106) {
                this.loginAgain(that);
            }else if(code == 104 || code == 103 ){
                this.refresh(that, that.$store.state.R_TOKEN, func)
            }else if(code == 303){
                that.$message({
                    message: '服务器内部错误',
                    type: 'error',
                    duration: 1000
                })
            }else if (code == 200){
                suc = true;
            } else {
                console.log('returncode-----' + code);
            }
        }else{
            that.$message({
                message: '请求服务异常',
                type: 'error',
                duration: 1000
            })
        }
        return suc;
    },

    handleLogOut(code, that) {
        // console.log(code)
        if (code == 102 || code == 106 || code == 101 || code == 304) {
            console.log('code:',code)
            this.loginAgain(that)
        } else if( code == 303 ){
            that.$message({
                message: '服务器内部错误',
                type: 'error',
                duration: 1000
            })
        } else if (code == 109) {
            that.$message({
                message: '此账号不具有相应的权限，请重新登录！',
                type: 'error',
                duration: 1000
            })
            this.loginAgain(that)
        }
    }
}