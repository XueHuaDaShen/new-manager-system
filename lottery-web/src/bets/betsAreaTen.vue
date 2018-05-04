<template>
  <div>
    <div class="bets-area-wrap">
      <div class="optional-oprate" v-if="checkBit">
        <span @click="handleClickLabel(k, i)" :class="setIsChecked(k)?'checked':''" v-for="(k, i) in optionalArr" :key="i"><input :checked="setIsChecked(k)" type="checkbox">{{k}}位</span>
      </div>
      <div class="bets-wrap" v-for="(item, index) in betsArr.data" :key="index">
        <strong class="bets-title">{{item.title}}</strong>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type!=='guts'&&betsArr.type!=='special'&&betsArr.type!=='sizeDouble'&&betsArr.type!=='interest'&&betsArr.type!=='tiger-end'">
          <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        </div>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type==='guts'">
          <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleGutsClick(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        </div>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='bottom'">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in andArr" :key="i">{{k}}</b>
        </div>
        <div class="bets-number-wrap special-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type==='special'">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in specialArr" :key="i">{{k}}</b>
        </div>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type==='sizeDouble'">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in sizeDouble" :key="i">{{k}}</b>
        </div>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type==='tiger-end'">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in tiger" :key="i">{{k}}</b>
        </div>
        <div class="bets-number-wrap" v-if="betsArr.item.oprateBtn==='right'&&betsArr.type==='interest'">
          <b class="special-bets-num bets-num" v-if="(betsArr.data.length===5)?index<2:index<1" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in interestArr" :key="i">{{k}}</b>
          <b class="bets-num" v-if="(betsArr.data.length===5)?index>1:index>0" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        </div>
        <oprateBtn class="oprate-components" v-if="showOprateBtn&&betsArr.type!=='interest'" :class="betsArr.item.oprateBtn==='right'?'float-right':'float-bottom'" :ballsArr="betsArr.item.oprateBtn==='bottom'?andArr:''" :len="betsArr.item.oprateBtn==='bottom'?andArr.length:10" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        <oprateBtn class="oprate-components" v-if="showOprateBtn&&betsArr.type==='interest'&&((betsArr.data.length===5)?index>1:index>0)" :class="betsArr.item.oprateBtn==='right'?'float-right':'float-bottom'" :ballsArr="betsArr.item.oprateBtn==='bottom'?andArr:''" :len="betsArr.item.oprateBtn==='bottom'?andArr.length:10" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div class="vertical-oprate" v-for="(item, index) in betsArr.data" :key="(index+1)" v-if="betsArr.item.vertOprate&&index===(betsArr.data.length-1)">
        <div class="vertical-oprate-wrap" v-for="(k, i) in balls" :key="i">
          <span class="bets-num" @click="handleVertAllClick(betsArr.data, i)">全</span>
          <span class="bets-num" @click="handleVertCleanClick(betsArr.data, i)">清</span>
        </div>
      </div>
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
      type: Object,
      required: true
    }
  },
  components: {
    oprateBtn
  },
  created() {
    var valueLen = 1;
    var isDouble = true;
    var area;
    const vm = this;
    try{
      valueLen = this.betsArr.item.valueLen;
      isDouble = this.betsArr.item.isDouble;
      area = this.betsArr.item.area;
      this.checkBit = this.betsArr.item.checkBit;
      this.showOprateBtn = this.betsArr.item.showOprateBtn;
    }catch(e){}
    this.andArr = [];
    if(isDouble){
        for(let i=0; i<=valueLen*9; i++){
        this.andArr.push(i);
      }
    }else{
      for(let i=1; i<valueLen*9; i++){
        this.andArr.push(i);
      }
    }
    if(area === 'interest'){
      this.interestArr = this.interest;
    }else{
      this.interestArr = this.interestArea;
    }
    var count = 2;
    try{
      valueLen = this.betsArr.item.valueLen;
    }catch(e){}
    if(valueLen === 2){
      this.isCheckOptional = ['十', '个']
    }else if(valueLen === 3){
      this.isCheckOptional = ['百', '十', '个']
    }else if(valueLen === 4){
      this.isCheckOptional = ['千', '百', '十', '个']
    }
  },
  data() {
    return {
      balls: new Array(10),
      specialArr: ['豹子', '顺子', '对子'],
      sizeDouble: ['大', '小', '单', '双'],
      tiger: ['龙', '虎', '和'],
      interestArr: [],
      interest: ['小(0-4)', '大(5-9)'],
      interestArea: ['一区(0,1)', '二区(2,3)', '三区(4,5)', '四区(6,7)', '五区(8,9)'],
      optionalArr: ['万', '千', '百', '十', '个'],
      andArr: [],
      isCheckOptional: [],
      checkBit: false,
      showOprateBtn: true
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
      item.data.sort((a, b) => {
        return a-b
      })
      this.setBets(this.betsArr.data);
    },
    handleGutsClick(item, i) {
      let index = item.data.indexOf(i);
      if(index > -1){
        item.data.splice(index,1);
      }else{
        item.data = [];
        item.data.push(i);
      }
      this.setBets(this.betsArr.data);
    },
    handlesendBallsArr(req) {
      const data = req
      let index = data.index;
      let arr = data.data;
      this.betsArr.data[index].data = arr;
      this.setBets(this.betsArr.data);
    },
    handleVertAllClick(data, i) {
      data.filter(v => {
        let index = v.data.indexOf(i);
        if(index < 0){
          v.data.push(i);
        }
        v.data.sort((a, b) => {
          return a-b
        })
      })
      this.setBets(this.betsArr.data);
    },
    handleVertCleanClick(data, i) {
      data.filter(v => {
        let index = v.data.indexOf(i);
        if(index > -1){
          v.data.splice(index,1);
        }
        v.data.sort((a, b) => {
          return a-b
        })
      })
      this.setBets(this.betsArr.data);
    },
    setIsChecked(k) {
      var val = false;
      if(this.isCheckOptional.indexOf(k) > -1){
        val = true
      }else{
        val = false;
      }
      return val
    },
    handleClickLabel(k) {
      const vm = this;
      var index = this.isCheckOptional.indexOf(k);
      var valueLen = this.betsArr.item.valueLen;
      if( index > -1 ){
        if(this.isCheckOptional.length < (valueLen+1)){
          this.isCheckOptional.splice(index,1)
          this.isCheckOptional.push(k);
        }else{
          this.isCheckOptional.splice(index,1)
        }
      }else{
        this.isCheckOptional.push(k);
      }
      this.setBets(this.betsArr.data);
    },
    setBets(data) {
      const unit = this.betsArr.item.unit;
      const type = this.betsArr.item.type;
      var isDouble;
      var betsMode = this.betsArr.item.betsMode;
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
        bets = lottery.groupSelectOne(arr1[0], betsMode, unit);
      }else if(type === 'double'){
        var n1 = Number(this.betsArr.item.doubleArr[0]);
        var n2 = Number(this.betsArr.item.doubleArr[1]);
        arr1 = data[0].data;
        arr2 = data[1].data;
        if(n1 === 1){
          bets = lottery.groupSelectTwoNum(arr1, arr2, n2);
        }else{
          bets = lottery.groupSelectTwoNum(arr2, arr1, n1);
        }
      }else if(type === 'diff'){
        var valueLen = this.betsArr.item.valueLen;
        arr1 = data[0].data;
        bets = lottery.dValue(arr1, valueLen);
      }else if(type === 'end'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }else if(type === 'special'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }else if(type === 'guts'){
        var valueLen = this.betsArr.item.valueLen;
        arr1 = data[0].data;
        bets = lottery.guts(arr1, valueLen);
      }else if(type === 'and'){
        var valueLen = this.betsArr.item.valueLen;
        isDouble = this.betsArr.item.isDouble;
        arr1 = data[0].data;
        if(isDouble){
          bets = lottery.sunOfValue(arr1, valueLen)
        }else{
          bets = lottery.groupSunOfValue(arr1, valueLen)
        }
      }else if(type === 'position'){
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        bets = lottery.pos(arr1);
      }else if(type === 'sizeDouble'){
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        bets = lottery.compound(arr1, unit);
      }else if(type === 'interest'){
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        bets = lottery.compound(arr1, unit);
      }else if(type === 'optional'){
        var betsMode = this.betsArr.item.betsMode;
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        if(betsMode === 2){
          bets = lottery.optionalOne(arr1);
        }else if(betsMode === 3){
          bets = lottery.optionalTwo(arr1);
        }else if(betsMode === 4){
          bets = lottery.optionalThree(arr1);
        }
      }else if(type.split('-')[1] === 'and'){
        var valueLen = this.betsArr.item.valueLen;
        isDouble = this.betsArr.item.isDouble;
        arr1 = data[0].data;
        var num1, num2;
        if(isDouble){
          num1 = lottery.sunOfValue(arr1, valueLen)
        }else{
          num1 = lottery.groupSunOfValue(arr1, valueLen)
        }
        num2 = lottery.groupSelectOne(this.isCheckOptional.length, valueLen, unit);
        bets = num1 * num2;
      }else if(type.split('-')[1] === 'single'){
        var valueLen = this.betsArr.item.valueLen;
        var betsMode = this.betsArr.item.betsMode;
        var num1, num2;
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        num1 = lottery.groupSelectOne(arr1[0], betsMode, unit);
        num2 = lottery.groupSelectOne(this.isCheckOptional.length, valueLen, unit);
        bets = num1 * num2;
      }else if(type.split('-')[1] === 'double'){
        var n1 = Number(this.betsArr.item.doubleArr[0]);
        var n2 = Number(this.betsArr.item.doubleArr[1]);
        var valueLen = this.betsArr.item.valueLen;
        arr1 = data[0].data;
        arr2 = data[1].data;
        
        var num1, num2;
        num1 = lottery.groupSelectOne(this.isCheckOptional.length, valueLen, unit);
        if(n1 === 1){
          num2 = lottery.groupSelectTwoNum(arr1, arr2, n2);
        }else{
          num2 = lottery.groupSelectTwoNum(arr2, arr1, n1);
        }
        bets = num1 * num2;
      }else if(type.split('-')[1] === 'end'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }else if(type.split('-')[1] === 'value'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }
      
      this.$store.dispatch('setBets', bets);
    },
    initData() {
      this.betsArr.data.filter(v => {
        v.data = [];
      })
      this.setBets(this.betsArr.data);
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
  padding-top:8px;
}
.bets-area-wrap .bets-wrap{
  width:100%;
  color:#333;
  margin-top:8px;
  width:100%;
  color:#333;
  position: relative;
  display:table;
}
.bets-wrap .bets-title{
  display: block;
  width:70px;
  font-size:14px;
  font-weight: 800;
  text-align: left;
  float:left;
  margin-top:3px;
}
.bets-wrap .bets-number-wrap{
  float:left;
  max-width:420px;
}
.bets-wrap .optional-single-title{
  margin-top:35px;
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
  float:left;
  margin-bottom:8px;
}
.float-right{
  float: right;
}
.float-bottom{
  width:100%;
  padding-left:70px;
  padding-top:10px;
}
.vertical-oprate{
  width:100%;
  padding-left:70px;
  padding-top:10px;
  display:-webkit-box;
}
.vertical-oprate-wrap span{
  margin-top:5px;
  float: inherit;
}
.optional-oprate{
  display: -webkit-box;
  -webkit-box-pack:end;
  width:100%;
  text-align: right;
  padding:15px 0;
  color:#333;
}
.optional-oprate>span{
  cursor: pointer;
  border: 1px solid #ccc;
  background: #eee;
  padding: 5px 10px;
  margin-right: 7px;
  border-radius: 15px;
  font-size:12px;
}
.optional-oprate>span.checked{
  background: #D4914D;
  color: #fff;
  border:none;
}
.optional-oprate>span>input{
  margin-right: 3px;
  vertical-align: middle;
}
.bets-wrap b.balls-number-active{
  color:#fff;
  background:rgba(220,133,44,1);
  box-shadow:1px 2px 6px rgba(102,66,1,0.19);
}
.special-wrap{
  padding-left:90px;
}
.special-wrap .bets-num{
  width:45px;
  border-radius:25px;
}
.bets-wrap .special-bets-num{
  border-radius:25px;
  width:55px;
}
.and-wrap{
  padding-right:35%;
  padding-bottom:30px;
  display:flex;
  flex-wrap:wrap;
}
.and-wrap .bets-num{
  margin-bottom:5px;
}
.optional-and-wrap{
  padding-top:40px;
}
.optional-single-wrap{
  padding-bottom:0;
  padding-top:40px;
}
</style>

