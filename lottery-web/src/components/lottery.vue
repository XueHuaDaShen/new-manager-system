<template>
  <div class="lottery-wrap">
    <nav class="lottery-nav">
      <span :class="item.checked?'currentTabs':''" @click="handleChangeNav(item)" v-for="(item, index) in navData" :key="index">{{item.title}}</span>
    </nav>
    <div class="lottery-content">
      <div class="lottery-num"></div>
      <div class="bets-wrap-parent">
        <div class="bets-wrap">
          <newBetsMode :betsMode="fiveStar" @sendBetsArr="handlesendBetsArr"></newBetsMode>
          <betsAreaTen @sendJoinIsClick="handlesendJoinIsClick" :betsArr="betsArr"></betsAreaTen>
        </div>
      </div>
      <div class="bets-result-wrap">
        <div class="bets-detail-wrap">
          <div class="bets-detail">已选注数 <span class="bets-style">{{setBetsFn()}}</span> 注 / 共金额数 <span class="bets-money">￥{{setMoneyFn()}}</span> 元</div>
          <div class="bets-number">{{betsNumber}}</div>
        </div>
        <div class="join-shopping-wrap">
          <el-button @click="handleJoin" :disabled="joinDisabled">加入购彩篮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import newBetsMode from '../bets/newBetsMode';
import betsAreaTen from '../bets/betsAreaTen';
export default {
  name: 'lottery',
  components: {
    newBetsMode,
    betsAreaTen
  },
  data() {
    return {
      bets: this.$store.state.bets,
      money: this.$store.state.bets * this.$store.state.price,
      betsNumber: '',
      joinDisabled: true,
      navData: [
        {title: '五星', checked: true},
        {title: '四星', checked: false},
        {title: '前三', checked: false},
        {title: '中三', checked: false},
        {title: '后三', checked: false},
        {title: '二星', checked: false},
        {title: '一星', checked: false},
        {title: '不定位', checked: false},
        {title: '大小单双', checked: false},
        {title: '趣味', checked: false},
        {title: '任选', checked: false},
        {title: '龙虎', checked: false},
        {title: '和值', checked: false}
      ],
      betsArr: [],
      fiveStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', checked: true, loop: 5, unit: 1},
            {title: '直选单式', type: 'single', checked: false},
            {title: '直选组合', type: 'group', checked: false, loop: 5, unit: 5}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组选120', type: 'single', num: 5, checked: false, loop: 1, unit: 1, betsTitle:''},
            {title: '组选60', type: 'double', num: [1, 3], checked: false, loop: 2, unit: 1, betsTitle: ['二重号', '单号']},
            {title: '组选30', type: 'double', num: [2, 1], checked: false, loop: 2, unit: 1, betsTitle: ['二重号', '单号']},
            {title: '组选20', type: 'double', num: [1, 2], checked: false, loop: 2, unit: 1, betsTitle: ['三重号', '单号']},
            {title: '组选10', type: 'double', num: [1, 1], checked: false, loop: 2, unit: 1, betsTitle: ['三重号', '二重号']},
            {title: '组选5', type: 'double', num: [1, 1], checked: false, loop: 2, unit: 1, betsTitle: ['四重号', '单号']}
          ]
        }
      ],
      fourStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式',type: 'compound', checked: true},
            {title: '直选单式',type: 'single', checked: false},
            {title: '直选组合',type: 'group', checked: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组选24',type: 'compound', checked: false},
            {title: '组选12',type: 'single', checked: false},
            {title: '组选6',type: 'group', checked: false},
            {title: '组选4',type: 'single', checked: false}
          ]
        }
      ],
      topThreeStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式',type: 'compound', checked: true},
            {title: '直选单式',type: 'single', checked: false},
            {title: '直选和值',type: 'group', checked: false},
            {title: '直选跨度',type: 'group', checked: false},
            {title: '直选组合',type: 'group', checked: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组三',type: 'compound', checked: false},
            {title: '组六',type: 'single', checked: false},
            {title: '组三单式',type: 'group', checked: false},
            {title: '组六单式',type: 'single', checked: false},
            {title: '混合组选',type: 'single', checked: false},
            {title: '组选和值',type: 'single', checked: false},
            {title: '包胆',type: 'single', checked: false}
          ]
        },
        {
          title: '其他',
          data: [
            {title: '和值尾数',type: 'compound', checked: false},
            {title: '特殊号码',type: 'single', checked: false}
          ]
        }
      ]
    }
  },
  methods: {
    toThousands(num) {
      var re=/\d{1,3}(?=(\d{3})+$)/g;
      var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
      return n1+'.00';
    },
    handleClick(tab, event) {
      console.log(tab.label);
      this.initData(this.fiveStar)
    },
    initData(data) {
      data.filter(function(v1){
        v1.data.filter(function(v2){
          v2.checked = false;
        })
      })
      data[0].data[0].checked = true;
    },
    handleChangeNav(item) {
      this.navData.filter(v => {
        v.checked = false;
      })
      item.checked = true;
    },
    handlesendBetsArr(data) {
      this.betsArr = data;
    },
    handleJoin() {
      console.log(this.betsArr)
    },
    handlesendJoinIsClick(val) {
      console.log(val)
      this.joinDisabled = val
    },
    setBetsFn() {
      return this.$store.state.bets
    },
    setMoneyFn() {
      return this.toThousands(this.$store.state.bets * this.$store.state.price)
    }
  },
  mounted() {
    // console.log(this.$store.state.bets)
  }
}
</script>
<style scoped>
.lottery-wrap{
  width:100%;
  height:auto;
  background:#fff;
}
.lottery-nav{
  width:100%;
  height:43px;
  display:-webkit-box;
  color:#333;
  font-size:14px;
}
.lottery-nav span{
  display:block;
  -webkit-box-flex:1;
  line-height: 43px;
  text-align:center;
  cursor: pointer;
}
.lottery-nav .currentTabs{
  background:#D4914D;
  color:#fff;
}
.lottery-content{
  width:934px;
  margin:0 auto;
  padding-bottom:84px;
  position: relative;
}
.bets-wrap-parent{
  display: table;
}
.bets-wrap{
  width:673px;
  float:left;
  padding-top:15px;
}
.lottery-num{
  position: absolute;
  right:0;
  top:20px;
  width:262px;
}
.bets-result-wrap{
  width:100%;
  height:90px;
  border:1px solid #ACACAC;
  margin-top:21px;
  display:-webkit-box;
  color:#333;
  font-size:12px;
}
.bets-result-wrap>div{
  -webkit-box-flex:1;
  display: -webkit-box;
  -webkit-box-orient:vertical;
  -webkit-box-pack:center;
}
.bets-result-wrap>div>div{
  padding:5px 0;
  font-size:14px;
}
.bets-style, .bets-money{
  color:#E10C0C;
}
</style>


