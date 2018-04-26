<template>
  <div>
    <form class="bets-form" action="../bets.php" method="post">
      <input type="file" size="40" name="betsfile" @change="handleChange" value="导入" id="bets-file">
      <button type="submit" @click="handleSend" class="subFile">导入注单</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'single',
  props: {},
  data() {
    return {}
  },
  methods: {
    handleSend(){
      console.log(1)
    },
    handleChange(){
      console.log(2)
      this.handleSend()
    }
  }
}
</script>
<style scoped>
.bets-form{
  width:100%;
  position: relative;
  display:-webkit-box;
}
#bets-file{
  outline: none;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  filter: alpha(opacity=0);
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 115px;
  height: 30px;
  z-index: 1;
  background: #000;
  cursor: pointer;
}
.subFile{
  position: relative;
  display: inline-block;
  height: 28px;
  padding: 0 29px;
  border: none;
  line-height: 25px;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  color: #FFF;
  cursor: pointer;
  border-radius: 2px;
  outline: none;
  padding-bottom: 2px;
  font-family: microsoft yahei;
  background-image: -webkit-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.1));
  background-image: -moz-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.16));
  background-image: -o-linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.1));
  background-image: linear-gradient(top,rgba(0,0,0,0),rgba(0,0,0,0.1));
  background-color: #AA9869;
  box-shadow: 0 1px 2px rgba(0,0,0,.2);
  background-color: #ad9f76;
}
</style>


