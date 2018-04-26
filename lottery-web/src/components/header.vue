<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="header-left">
          <span class="pc-client">PC客户端</span>
          <span class="moble-client">手机客户端</span>
        </div>
        <div class="header-right">
          <span>平台公告</span>
          <span>管理中心</span>
          <span class="user"><img class="user-icon" src="../img/user.png"> 账户余额：{{blance}}元</span>
          <span>充值</span>
          <span>提现</span>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="container">
        <div class="nav-left"><img src="../img/logo.png"></div>
        <div class="nav-right">
          <span>首页</span>
          <span>彩票</span>
          <span>真人娱乐</span>
          <span>电子游艺</span>
          <span>体育竞技</span>
          <span>优惠活动</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blance: '0.00',
    }
  }
}
</script>
<style scoped>
img{
  width:100%;
}
.header{
  width:100%;
  background:#545454;
}
.nav{
  width:100%;
  background: #1B1B1B;
}
.container{
  width:1024px;
  margin:0 auto;
  color:#FFFFFF;
  font-size:12px;
}
.header .container{
  height:40px;
}
.nav .container{
  height:80px;
}
.container .header-left{
  float:left;
  height:100%;
  display:-webkit-box;
  -webkit-box-align:center;
}
.header span{
  cursor: pointer;
}
.moble-client{
  margin-left:35px;
}
.header-right{
  float:right;
  height:100%;
  display:-webkit-box;
  -webkit-box-align:center;
}
.header-right span{
  margin-left:35px;
}
.header-right span.user{
  position: relative;
  margin-left:64px;
}
.user-icon{
  width:13px;
  position: absolute;
  left:-26px;
}
.nav-left{
  float: left;
  width:160.5px;
  height:100%;
  display:-webkit-box;
  -webkit-box-align:center;
}
.nav-right{
  float: right;
  height:100%;
  display:-webkit-box;
  -webkit-box-align:center;
  font-size:16px;
  color:#E1C79B;
}
.nav-right span{
  margin-left:35px;
}
</style>


