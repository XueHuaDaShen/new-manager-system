<template>
  <div>
    <div v-for="(item, index) in ballsNumber" :key="index">
      <div class="sum-of-value-wrap">
        <b class="balls-number" v-if="leopard?true:(i>0&&i<27)" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBalls(item, i)" v-for="(k, i) in balls" :key="k">{{i}}</b>
      </div>
      <div class="balls-oprate">
        <em v-for="(oprate, oi) in oprateArr" @click="handleClickOprate(item, oprate.type, oi)" :key="oi">{{oprate.title}}</em>
      </div>
    </div>
    <div class="bets-detail">
      已选 <span class="bets-num">{{bets}}</span> 注，共 <strong class="bets-money">{{toThousands(money)}}</strong> 元
    </div>
  </div>
</template>
<script>
import lottery from '../../../static/lottery';
export default {
  name: 'sumOfValue',
  props: {
    ballsNumber: {
      type: Array,
      required: true
    },
    betsType: {
      type: String,
      required: true
    },
    leopard: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      balls: new Array(28),
      oprateArr: [
        {title: '全', type: 'all'},
        {title: '大', type: 'large'},
        {title: '小', type: 'small'},
        {title: '奇', type: 'odd'},
        {title: '偶', type: 'even'},
        {title: '清', type: 'clean'}
      ],
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
    handleClickOprate(item, type) {
      var len = 28
      item.data = [];
      for(var i=0; i<len; i++){
        if(type === 'all'){
          item.data.push(i)
        }else if(type === 'large'){
          if(i > (len/2 -1) ){
            item.data.push(i)
          }
        }else if(type === 'small'){
          if(i < len/2 ){
            item.data.push(i)
          }
        }else if(type === 'odd'){
          if(i % 2 === 0){
            item.data.push(i)
          }
        }else if(type === 'even'){
          if(i % 2 != 0){
            item.data.push(i)
          }
        }else if(type === 'clean'){
          item.data = [];
        }
      }
      this.setBetsMoney();
    },
    setBetsMoney() {
      const ballsArr = [];
      const vm = this;
      for(var i in this.ballsNumber[0].data){
        ballsArr.push(this.ballsNumber[0].data[i]);
      }
      if(vm.leopard){
        this.bets = lottery.sunOfValue(ballsArr);
      }else{
        this.bets = lottery.groupSunOfValue(ballsArr);
      }
      this.money = this.bets * this.price;
    }
  },
  mounted() {
    this.setBetsMoney();
  }
}
</script>

<style scoped>
.sum-of-value-wrap{
  width:550px;
  padding-left:20px;
  display:flex;
  flex-wrap: wrap;
}
.balls-number{
  display: block;
  width: 40px;
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
  border-radius:50%;
  font-weight:500;
  margin-right:5px;
  cursor: pointer;
}
.balls-number:hover{
  text-decoration: none;
  color: #ee661f;
  border-color:#ee661f;
}
.sum-of-value-wrap .balls-number-active{
  background:#ee661f;
  color:#fff;
}
.balls-oprate{
  margin-left:30px;
  text-align:left;
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
  color:#000
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

