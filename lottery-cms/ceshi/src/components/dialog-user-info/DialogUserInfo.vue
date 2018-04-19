<template>
  <div class="dialog-user-info">
    <div class="dialog-bj"></div>
    <div class="dialog-content">
        <i class="el-icon-close dialog-close" @click="handleCloseClick"></i>
        <div class="dialog-title">查看用户资料</div>
        <div class="user-info-title">
            <div class="user-status" @click="handleClickUserStatus('ziliao')" :class="ziliao?'user-status-active':''">
                <i class="el-icon-document"></i>
                <span>基本资料</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('xinxi')" :class="xinxi?'user-status-active':''">
                <i class="el-icon-info"></i>
                <span>备注信息</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('jilu')" :class="jilu?'user-status-active':''">
                <i class="el-icon-tickets"></i>
                <span>帐变记录</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('zijin')" :class="zijin?'user-status-active':''">
                <i class="el-icon-goods"></i>
                <span>锁定资金</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('zhanghu')" :class="zhanghu?'user-status-active':''">
                <i class="el-icon-service"></i>
                <span>游戏账户</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('rizhi')" :class="rizhi?'user-status-active':''">
                <i class="el-icon-more"></i>
                <span>用户日志</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('yinhangka')" :class="yinhangka?'user-status-active':''">
                <i class="el-icon-edit"></i>
                <span>银行卡绑定</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('zhanneixin')" :class="zhanneixin?'user-status-active':''">
                <i class="el-icon-message"></i>
                <span>站内信</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('baobiao')" :class="baobiao?'user-status-active':''">
                <i class="el-icon-printer"></i>
                <span>盈亏报表</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('tiaozheng')" :class="tiaozheng?'user-status-active':''">
                <i class="el-icon-setting"></i>
                <span>配额调整</span>
            </div>
            <div class="user-status" @click="handleClickUserStatus('shebei')" :class="shebei?'user-status-active':''">
                <i class="el-icon-mobile-phone"></i>
                <span>登录设备</span>
            </div>
        </div>
        <div class="user-info-content">
            <statusziliao :ziliao="data" v-if="ziliao"></statusziliao>
            <statusxinxi v-if="xinxi"></statusxinxi>
            <statusjilu v-if="jilu"></statusjilu>
            <statuszijin v-if="zijin"></statuszijin>
            <statuszhanghu v-if="zhanghu"></statuszhanghu>
            <statusrizhi v-if="rizhi"></statusrizhi>
            <statusyinhangka v-if="yinhangka"></statusyinhangka>
            <statuszhanneixin v-if="zhanneixin"></statuszhanneixin>
            <statusbaobiao v-if="baobiao"></statusbaobiao>
            <statustiaozheng v-if="tiaozheng"></statustiaozheng>
            <statusshebei v-if="shebei"></statusshebei>
        </div>
    </div>
  </div>
</template>
<script>
import statusziliao from '../dialog-user-info/ziliao';
import statusxinxi from '../dialog-user-info/xinxi';
import statusjilu from '../dialog-user-info/jilu';
import statuszijin from '../dialog-user-info/zijin';
import statuszhanghu from '../dialog-user-info/zhanghu';
import statusrizhi from '../dialog-user-info/rizhi';
import statusyinhangka from '../dialog-user-info/yinhangka';
import statuszhanneixin from '../dialog-user-info/zhanneixin';
import statusbaobiao from '../dialog-user-info/baobiao';
import statustiaozheng from '../dialog-user-info/tiaozheng';
import statusshebei from '../dialog-user-info/shebei';
import request from '../../http/http.js';
export default {
    components: {
        statusziliao,
        statusxinxi,
        statusjilu,
        statuszijin,
        statuszhanghu,
        statusrizhi,
        statusyinhangka,
        statuszhanneixin,
        statusbaobiao,
        statustiaozheng,
        statusshebei,
    },
    data() {
        return {
            data: null,
            ziliao: false,
            xinxi: false,
            jilu: false,
            zijin: false,
            zhanghu: false,
            rizhi: false,
            yinhangka: false,
            zhanneixin: false,
            baobiao: false,
            tiaozheng: false,
            shebei: false,
        }
    },
    methods: {
        handleClickUserStatus(ref) {
            this.setUserInfoStatus(ref);
        },
        handleCloseClick() {
            this.$emit('closeDialog', false)
        },
        setUserInfoStatus(ref) {
            this.ziliao = false;
            this.xinxi = false;
            this.jilu = false;
            this.zijin = false;
            this.zhanghu = false;
            this.rizhi = false;
            this.yinhangka = false;
            this.zhanneixin = false;
            this.baobiao = false;
            this.tiaozheng = false;
            this.shebei = false;
            this[ref] = true;
            this.getziiao();
        },
        getziiao() {
            var vm = this;
            var data = new Object();
            data.id = "12354";
            data.name = "ziliao";
            data.type = "daili";
            this.data = data;
            // request.http('get', '/treasure/winner/list', {"page": 1,"size": 10}, 'callback', 'fallback');
        },
    },
    mounted() {
        this.ziliao = true;
        this.getziiao();
    }
}
</script>

<style scoped>
  .el-aside .el-menu .el-submenu .el-submenu__title{
    display: -webkit-box !important;
  }
  .el-header, .el-footer {
    color: #333;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  *{
      box-sizing: border-box;
  }
  .dialog-user-info{
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
  }
  .dialog-user-info>.dialog-bj{
    position: absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:100;
    background:#000;
    opacity:.3;
  }
  .dialog-user-info>.dialog-content{
    width:900px;
    height:600px;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:102;
    border-radius:5px;
    box-shadow:0px 0px 5px #000;
    overflow: hidden;
    display:-webkit-box;
    -webkit-box-orient:vertical;
  }
  .dialog-user-info .dialog-close{
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
    /* z-index:101; */
    color:#fff;
  }
  .dialog-user-info .dialog-title{
    width:100%;
    height:48px;
    line-height:48px;
    color:#fff;
    text-align: left;
    padding-left:20px;
    background: #409EFF;
  }
  .dialog-user-info .user-info-title{
    width:100%;
    height:64px;
    color:#fff;
    background: #409EFF;
    display:-webkit-box;
    -webkit-box-pack:end;
  }
  .user-info-title .user-status{
    padding:.5rem 0;
    margin:0 12px;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-box-pack:justify;
    -webkit-box-align:center;
    cursor: pointer;
  }
  .user-status>i{
    font-size: 26px;
  }
  .user-info-title .user-status:hover{
    color:lightsalmon;
  }
  .user-info-title .user-status-active{
    color:lightsalmon;
  }
  .user-status>span{
    font-weight: normal;
    font-size: 12px;
    display: block;
    line-height: normal;
  }
  .dialog-user-info .user-info-content{
    -webkit-box-flex:1;
    background:#fff;
  }
</style>

