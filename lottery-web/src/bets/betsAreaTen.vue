<template>
  <div>
    <div class="bets-area-wrap" v-for="(item, index) in betsArr[0]" :key="index">
      <strong class="bets-title display-none">{{item.title}}</strong>
      <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
      <oprateBtn class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr[1]" @sendBallsArr="handlesendBallsArr"></oprateBtn>
    </div>
  </div>
</template>
<script>
import oprateBtn from './oprateBtn';
import lottery from '../../static/lottery';
export default {
  name: 'betsAreaTen',
  props: {
    betsArr: {
      type: Array,
      required: true
    }
  },
  components: {
    oprateBtn
  },
  data() {
    return {
      balls: new Array(10),
      joinDisabled: false,
    }
  },
  methods: {
    handleClickBetsNum(item, i) {
      let index = item.data.indexOf(i);
      if(index > -1){
        item.data.splice(index,1);
      }else{
        item.data.push(i);
      }
      this.setBets(this.betsArr[0]);
      this.checkBetsArr();
      this.$emit("sendJoinIsClick", this.joinDisabled)
    },
    checkBetsArr() {
      const data = this.betsArr[0];
      const cm = this;
      const str1 = '', str2 = '';
      this.joinDisabled = data.every(v => {
        console.log(v.data.length)
        return v.data.length > 0
      })
    },
    handlesendBallsArr(req) {
      const data = req[0]
      this.joinDisabled = req[1]
      let index = data.index;
      let arr = data.data;
      this.betsArr[0][index].data = arr;
      this.setBets(this.betsArr[0]);
      this.$emit("sendJoinIsClick", this.joinDisabled)
    },
    setBets(data) {
      const loop = this.betsArr[1].loop;
      const unit = this.betsArr[1].unit;
      const type = this.betsArr[1].type;
      var num = this.betsArr[1].num;
      var arr1 = [];
      var arr2 = [];
      var bets = 0;
      if(type === 'compound'){
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        bets = lottery.compound(arr1, unit);
      }else if(type === 'single'){
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        bets = lottery.groupSelectOne(arr1[0], num);
      }else if(type === 'double'){
        var n1 = Number(this.betsArr[1].num[0]);
        var n2 = Number(this.betsArr[1].num[1]);
        arr1 = data[0].data;
        arr2 = data[1].data;
        if(n1 === 1){
          bets = lottery.groupSelectTwoNum(arr1, arr2, n2);
        }else{
          bets = lottery.groupSelectTwoNum(arr2, arr1, n1);
        }
      }
      
      this.$store.dispatch('setBets', bets);
    },
    initData() {
      console.log(this.betsArr[0])
      this.betsArr[0].filter(v => {
        v.data = [];
      })
      this.setBets(this.betsArr[0]);
    }
  },
  mounted() {
    // this.initData();
  }
}
</script>

<style scoped>
.bets-area-wrap{
  width:100%;
  color:#333;
  display:-webkit-box;
  -webkit-box-align:center;
  -webkit-box-pack:start;
  margin-top:16px;
  position: relative;
}
.bets-area-wrap .bets-title{
  display: block;
  width:70px;
  font-size:14px;
  font-weight: 800;
  text-align: left;
}
.bets-num{
  display: block;
  width: 26px;
  height: 26px;
  line-height: 25px;
  text-indent: 0px;
  text-indent: -4px\9;
  text-align: center;
  color: #4F4F4F;
  font-size: 12px;
  outline: none;
  background:#fff;
  border:1px solid #E1C79B;
  box-shadow:1px 2px 6px rgba(0,0,0,0.19);
  border-radius:50%;
  font-weight:500;
  margin-left:8px;
  cursor: pointer;
}
.bets-area-wrap b.balls-number-active{
  color:#fff;
  background:rgba(220,133,44,1);
  box-shadow:1px 2px 6px rgba(102,66,1,0.19);
}
.oprate-components{
  position: absolute;
  right:2px;
}
</style>

