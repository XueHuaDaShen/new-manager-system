<template>
  <div>
    <div class="bets-area-wrap" v-for="(item, index) in betsArr.data" :key="index">
      <div v-if="betsArr.type!=='special'&&betsArr.type!=='guts'&&betsArr.type!=='and'&&betsArr.type!=='position'&&betsArr.type!=='sizeDouble'&&betsArr.type!=='interest'&&betsArr.type!=='optional-and'&&betsArr.type!=='optional-single'&&betsArr.type!=='optional-double'&&betsArr.type!=='tiger-end'&&betsArr.type!=='and-value'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        <oprateBtn class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div v-if="betsArr.type==='interest'&&betsArr.item.loop==='5q3'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="special-bets-num bets-num" v-if="index<2" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in interestArr" :key="i">{{k}}</b>
        <b class="bets-num" v-if="index>1" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        <oprateBtn v-if="index>1" class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div v-if="betsArr.type==='interest'&&betsArr.item.loop==='4q3'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="special-bets-num bets-num" v-if="index<1" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in interestArr" :key="i">{{k}}</b>
        <b class="bets-num" v-if="index>0" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        <oprateBtn v-if="index>0" class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div v-if="betsArr.type==='interest'&&(betsArr.item.loop==='h3q2'||betsArr.item.loop==='q3q2'||betsArr.item.loop==='z3q2')">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="special-bets-num bets-num" v-if="index<1" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in interestArr" :key="i">{{k}}</b>
        <b class="bets-num" v-if="index>0" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        <oprateBtn v-if="index>0" class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div v-if="betsArr.type==='and'">
        <strong class="bets-title">{{item.title}}</strong>
        <div class="and-wrap">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in andArr" :key="i">{{k}}</b>
          <oprateBtn class="oprate-components" :ballsArr="andArr" :len="andArr.length" style="left:70px;bottom:0;" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        </div>
      </div>
      <div v-if="betsArr.type.split('-')[1]==='value'">
        <strong class="bets-title">{{item.title}}</strong>
        <div class="and-wrap">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in andArr" :key="i">{{k}}</b>
          <oprateBtn class="oprate-components" :ballsArr="andArr" :len="andArr.length" style="left:70px;bottom:0;" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        </div>
      </div>
      <div v-if="betsArr.type.split('-')[1]==='and'">
        <strong class="bets-title">{{item.title}}</strong>
        <div class="optional-and-wrap and-wrap">
          <div class="optional-oprate">
            <span @click="handleClickLabel(k, i)" :class="setIsChecked(k)?'checked':''" v-for="(k, i) in optionalArr" :key="i"><input :checked="setIsChecked(k)" type="checkbox">{{k}}位</span>
          </div>
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in andArr" :key="i">{{k}}</b>
          <oprateBtn class="oprate-components" :ballsArr="andArr" :len="andArr.length" style="left:70px;bottom:0;" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        </div>
      </div>
      <div v-if="betsArr.type.split('-')[1]==='single'">
        <strong class="optional-single-title bets-title">{{item.title}}</strong>
        <div class="optional-single-wrap and-wrap">
          <div class="optional-oprate" v-if="index<1">
            <span @click="handleClickLabel(k, i)" :class="setIsChecked(k)?'checked':''" v-for="(k, i) in optionalArr" :key="i"><input :checked="setIsChecked(k)" type="checkbox">{{k}}位</span>
          </div>
          <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
          <oprateBtn class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        </div>
      </div>
      <div v-if="betsArr.type.split('-')[1]==='double'">
        <strong class="optional-single-title bets-title">{{item.title}}</strong>
        <div class="optional-single-wrap and-wrap">
          <div class="optional-oprate" v-if="index<1">
            <span @click="handleClickLabel(k, i)" :class="setIsChecked(k)?'checked':''" v-for="(k, i) in optionalArr" :key="i"><input :checked="setIsChecked(k)" type="checkbox">{{k}}位</span>
          </div>
          <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
          <oprateBtn class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
        </div>
      </div>
      <div v-if="betsArr.type==='sizeDouble'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in sizeDouble" :key="i">{{k}}</b>
      </div>
      <div v-if="betsArr.type==='guts'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleGutsClick(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
      </div>
      <div v-if="betsArr.type==='special'">
        <strong class="bets-title">{{item.title}}</strong>
        <div class="special-wrap">
          <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in specialArr" :key="i">{{k}}</b>
        </div>
      </div>
      <div v-if="betsArr.type.split('-')[0]==='tiger'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="bets-num" :class="item.data.indexOf(k)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, k)" v-for="(k, i) in tiger" :key="i">{{k}}</b>
      </div>
      <div v-if="betsArr.type==='position'">
        <strong class="bets-title">{{item.title}}</strong>
        <b class="bets-num" :class="item.data.indexOf(i)>-1?'balls-number-active':''" @click="handleClickBetsNum(item, i)" v-for="(k, i) in balls" :key="i">{{i}}</b>
        <oprateBtn class="oprate-components" :betsIndex="index" :betsArr="betsArr" :betsType="betsArr.item" @sendBallsArr="handlesendBallsArr"></oprateBtn>
      </div>
      <div class="oprate-vert-wrap" v-if="betsArr.type==='position'&&index===4">
        <strong class="bets-title"></strong>
        <div class="oprate-content" v-for="(k, i) in balls" :key="i">
          <span @click="handleVertAllClick(betsArr.data, i)">全</span>
          <span @click="handleVertCleanClick(betsArr.data, i)">清</span>
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
    var star = 1;
    var isDouble = true;
    var area;
    const vm = this;
    try{
      star = this.betsArr.item.star;
      isDouble = this.betsArr.item.isDouble;
      area = this.betsArr.item.area;
    }catch(e){}
    this.andArr = [];
    if(isDouble){
        for(let i=0; i<=star*9; i++){
        this.andArr.push(i);
      }
    }else{
      for(let i=1; i<star*9; i++){
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
      count = this.betsArr.item.count;
    }catch(e){}
    if(count === 2){
      this.isCheckOptional = ['十', '个']
    }else if(count === 3){
      this.isCheckOptional = ['百', '十', '个']
    }else if(count === 4){
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
      var num =this.betsArr.item.num;
      if( index > -1 ){
        if(this.isCheckOptional.length < (num+1)){
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
      const loop = this.betsArr.item.loop;
      const unit = this.betsArr.item.unit;
      const type = this.betsArr.item.type;
      var star, isDouble;
      var num = this.betsArr.item.num;
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
        bets = lottery.groupSelectOne(arr1[0], num, unit);
      }else if(type === 'double'){
        var n1 = Number(this.betsArr.item.num[0]);
        var n2 = Number(this.betsArr.item.num[1]);
        arr1 = data[0].data;
        arr2 = data[1].data;
        if(n1 === 1){
          bets = lottery.groupSelectTwoNum(arr1, arr2, n2);
        }else{
          bets = lottery.groupSelectTwoNum(arr2, arr1, n1);
        }
      }else if(type === 'diff'){
        star = this.betsArr.item.star;
        arr1 = data[0].data;
        bets = lottery.dValue(arr1, star);
      }else if(type === 'end'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }else if(type === 'special'){
        arr1 = data[0].data;
        bets = lottery.valueEnd(arr1);
      }else if(type === 'guts'){
        star = this.betsArr.item.star;
        arr1 = data[0].data;
        bets = lottery.guts(arr1, star);
      }else if(type === 'and'){
        star = this.betsArr.item.star;
        isDouble = this.betsArr.item.isDouble;
        arr1 = data[0].data;
        if(isDouble){
          bets = lottery.sunOfValue(arr1, star)
        }else{
          bets = lottery.groupSunOfValue(arr1, star)
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
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        if(num === 2){
          bets = lottery.optionalOne(arr1);
        }else if(num === 3){
          bets = lottery.optionalTwo(arr1);
        }else if(num === 4){
          bets = lottery.optionalThree(arr1);
        }
      }else if(type.split('-')[1] === 'and'){
        star = this.betsArr.item.star;
        isDouble = this.betsArr.item.isDouble;
        arr1 = data[0].data;
        var num1, num2;
        if(isDouble){
          num1 = lottery.sunOfValue(arr1, star)
        }else{
          num1 = lottery.groupSunOfValue(arr1, star)
        }
        num2 = lottery.groupSelectOne(this.isCheckOptional.length, num, unit);
        bets = num1 * num2;
      }else if(type.split('-')[1] === 'single'){
        star = this.betsArr.item.star;
        var num1, num2;
        for(let i in data){
          arr1.push(data[i].data.length)
        }
        num1 = lottery.groupSelectOne(arr1[0], star, unit);
        num2 = lottery.groupSelectOne(this.isCheckOptional.length, num, unit);
        bets = num1 * num2;
      }else if(type.split('-')[1] === 'double'){
        var n1 = Number(this.betsArr.item.num[0]);
        var n2 = Number(this.betsArr.item.num[1]);
        var count = this.betsArr.item.count;
        arr1 = data[0].data;
        arr2 = data[1].data;
        
        var num1, num2;
        num1 = lottery.groupSelectOne(this.isCheckOptional.length, count, unit);
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
  color:#333;
  margin-top:16px;
}
.bets-area-wrap>div{
  width:100%;
  color:#333;
  display:-webkit-box;
  -webkit-box-align:center;
  -webkit-box-pack:start;
  position: relative;
}
.bets-area-wrap .bets-title{
  display: block;
  width:70px;
  font-size:14px;
  font-weight: 800;
  text-align: left;
}
.bets-area-wrap .optional-single-title{
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
.special-wrap{
  padding-left:90px;
  display:-webkit-box;
  -webkit-box-pack:center;
}
.special-wrap .bets-num{
  width:45px;
  border-radius:25px;
}
.bets-area-wrap .special-bets-num{
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
.optional-oprate{
  position: absolute;
  display: -webkit-box;
  -webkit-box-pack:end;
  right:0;
  top:0;
  width:100%;
  text-align: right;
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
.oprate-vert-wrap{
  margin-top:16px;
}
.oprate-content{
  display:-webkit-box;
  -webkit-box-orient:vertical;
}
.oprate-content>span{
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
  margin-bottom:8px;
}
</style>

