<template>
  <div>
    <div class="balls-wrap" v-for="(item, index) in ballsNumber" :key="index">
      <strong class="balls-title" :style="showTitle?'opacity:0':''">{{item.title}}</strong>
      <b class="balls-number" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBalls(item, i)" v-for="(k, i) in balls" :key="i">{{k}}</b>
    </div>
    <div class="bets-detail">
      已选 <span class="bets-num">{{bets}}</span> 注，共 <strong class="bets-money">{{toThousands(money)}}</strong> 元
    </div>
  </div>
</template>
<script>
import lottery from '../../../static/lottery';
export default {
  name: 'moweishu',
  props: {
    ballsNumber: {
      type: Array,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      balls: ['豹子','顺子','对子'],
      bets: 0,
      price: 2,
      money: 0
    }
  },
  methods: {
    toThousands(num) {
      var re=/\d{1,3}(?=(\d{3})+$)/g;
      var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
      return n1+'.00';
    },
    handleClickBalls(item, i){
      var index = item.data.indexOf(i)
      if( index > -1 ){
        item.data.splice(index, 1);
      }else{
        item.data.push(i);
      }
      this.setBetsMoney();
    },
    setBetsMoney() {
      const ballsArr = [];
      const vm = this;
      for(var i in this.ballsNumber[0].data){
        ballsArr.push(this.ballsNumber[0].data[i]);
      }
      this.bets = ballsArr.length;
      this.money = this.bets * this.price;
    }
  },
  mounted() {
    this.setBetsMoney();
  }
}
</script>
<style scoped>
.balls-wrap{
  display:-webkit-box;
  -webkit-box-align:center;
  position: relative;
  margin: 0;
  padding: 10px 0;
  border-bottom: 1px dotted #d3d3d3;
}
.balls-number{
  display: block;
  width: 80px;
  height: 40px;
  line-height: 37px;
  text-indent: 0px;
  text-indent: -4px\9;
  text-align: center;
  color: #4F4F4F;
  font-size: 24px;
  outline: none;
  background:#fff;
  border:1px solid #cdcdcd;
  border-radius:50px;
  font-weight:500;
  margin-right:5px;
  cursor: pointer;
}
.balls-number:hover{
  text-decoration: none;
  color: #ee661f;
  border-color:#ee661f;
}
.balls-wrap .balls-number-active{
  background:#ee661f;
  color:#fff;
}
.balls-title{
  color:#555;
  padding:5px 20px;
}
.balls-oprate{
  margin-left:30px;
}
.balls-oprate em{
  font-style:normal;
  font-weight: normal;
  display: inline-block;
  font-size: 14px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #b5b5b5;
  border-radius: 50%;
  margin: 6px 1px;
  text-align: center;
  color: #4f4f4f;
  vertical-align: middle;
  background: #fff;
  cursor: pointer;
}
.balls-oprate em:hover, .balls-oprate em.active{
  color: #000;
  background: #fed017;
}
.bets-detail{
  margin-top:20px;
}
.bets-num{
  color:#A68F4C;
  font-size: 12px;
}
.bets-money{
  color:#A68F4C;
  font-weight: 600;
  font-size:19px;
}
</style>


