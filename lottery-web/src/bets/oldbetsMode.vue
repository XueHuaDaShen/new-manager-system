<template>
  <div>
    <div class="bets" v-for="(item,index1) in betsMode" :key="index1">
      <div class="bets-title">{{item.title}}</div>
      <div class="bets-mode-wrap">
        <div class="bets-mode" @click="handleChangebetsMode(betsMode, index1, index2)" :class="item.checked?'bets-active':''" v-for="(item, index2) in item.data" :key="index2">{{item.title}}</div>
      </div>
    </div>
    <div v-if="betstype==='five'" style="margin-top:20px">
      <compound :ballsNumber="fiveStarCompound" :betsType="'compound'" v-if="betsMode[0].data[0].checked"></compound>
      <single v-if="betsMode[0].data[1].checked"></single>
      <compound :ballsNumber="fiveStarGroup" :betsType="'group'" v-if="betsMode[0].data[2].checked"></compound>
      <groupSelect :star="5" :ballsNumber="groupSelect120" v-if="betsMode[1].data[0].checked"></groupSelect>
      <groupSelect60 :ballsCount="3" :ballsNumber="groupSelect60" v-if="betsMode[1].data[1].checked"></groupSelect60>
      <groupSelect30 :ballsNumber="groupSelect30" v-if="betsMode[1].data[2].checked"></groupSelect30>
      <groupSelect20 :ballsNumber="groupSelect20" v-if="betsMode[1].data[3].checked"></groupSelect20>
      <groupSelect10 :ballsNumber="groupSelect10" v-if="betsMode[1].data[4].checked"></groupSelect10>
      <groupSelect10 :ballsNumber="groupSelect5" v-if="betsMode[1].data[5].checked"></groupSelect10>
    </div>
    <div v-if="betstype==='four'" style="margin-top:20px">
      <compound :ballsNumber="fourStarCompound" :betsType="'compound'" v-if="betsMode[0].data[0].checked"></compound>
      <single v-if="betsMode[0].data[1].checked"></single>
      <compound :ballsNumber="fourStarGroup" :betsType="'group'" v-if="betsMode[0].data[2].checked"></compound>
      <groupSelect :star="4" :ballsNumber="groupSelect24" v-if="betsMode[1].data[0].checked"></groupSelect>
      <groupSelect60 :showTitle="true" :ballsCount="2" :ballsNumber="groupSelect60" v-if="betsMode[1].data[1].checked"></groupSelect60>
      <groupSelect :star="2" :ballsNumber="groupSelect6" v-if="betsMode[1].data[2].checked"></groupSelect>
      <groupSelect10 :ballsNumber="groupSelect4" v-if="betsMode[1].data[3].checked"></groupSelect10>
    </div>
    <div v-if="betstype==='topThree'" style="margin-top:20px">
      <compound :ballsNumber="topThreeStarCompound" :betsType="'compound'" v-if="betsMode[0].data[0].checked"></compound>
      <single v-if="betsMode[0].data[1].checked"></single>
      <sumOfValue :ballsNumber="topThreeStarAnd" :betsType="'group'" v-if="betsMode[0].data[2].checked"></sumOfValue>
      <differenceValue :ballsNumber="dValue" v-if="betsMode[0].data[3].checked"></differenceValue>
      <compound :ballsNumber="topThreeStarGroup" :betsType="'group'" v-if="betsMode[0].data[4].checked"></compound>
      <groupSelect :star="2" :ballsNumber="group3" v-if="betsMode[1].data[0].checked"></groupSelect>
      <groupSelect :star="3" :ballsNumber="group6" v-if="betsMode[1].data[1].checked"></groupSelect>
      <single v-if="betsMode[1].data[2].checked"></single>
      <single v-if="betsMode[1].data[3].checked"></single>
      <single v-if="betsMode[1].data[4].checked"></single>
      <sumOfValue :leopard="false" :ballsNumber="topThreeStarAnd" :betsType="'group'" v-if="betsMode[1].data[5].checked"></sumOfValue>
      <packBets :showTitle="true" :ballsNumber="packBets" v-if="betsMode[1].data[6].checked"></packBets>
      <moweishu :showTitle="true" :ballsNumber="moweishu" v-if="betsMode[2].data[0].checked"></moweishu>
      <specialNum :showTitle="true" :ballsNumber="specialNum" v-if="betsMode[2].data[1].checked"></specialNum>
    </div>
  </div>
</template>
<script>
import compound from './fiveStar/compound';
import single from './fiveStar/single';
import groupSelect from './fiveStar/groupSelect';
import groupSelect60 from './fiveStar/groupSelect60';
import groupSelect30 from './fiveStar/groupSelect30';
import groupSelect20 from './fiveStar/groupSelect20';
import groupSelect10 from './fiveStar/groupSelect10';
import sumOfValue from './fiveStar/sumOfValue';
import differenceValue from './fiveStar/differenceValue';
import packBets from './fiveStar/packBets';
import moweishu from './fiveStar/moweishu';
import specialNum from './fiveStar/specialNum';
export default {
  name: 'betsMode',
  props: {
    betsMode: {
      type: Array,
      required: true
    },
    betstype: {
      type: String,
      required: true
    }
  },
  components: {
    compound,
    single,
    groupSelect,
    groupSelect60,
    groupSelect30,
    groupSelect20,
    groupSelect10,
    sumOfValue,
    differenceValue,
    packBets,
    moweishu,
    specialNum,
  },
  data() {
    return {
      fiveStarCompound: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ],
      fiveStarGroup: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ],
      groupSelect120: [{title: '万位', data: []}],
      groupSelect60: [{title: '二重号', data: []},{title: '单号', data: []}],
      groupSelect30: [{title: '二重号', data: []},{title: '单号', data: []}],
      groupSelect20: [{title: '三重号', data: []},{title: '单号', data: []}],
      groupSelect10: [{title: '三重号', data: []},{title: '二重号', data: []}],
      groupSelect5: [{title: '四重号', data: []},{title: '单号', data: []}],
      
      fourStarCompound: [
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ],
      fourStarGroup: [
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ],
      groupSelect24: [{title: '万位', data: []}],
      groupSelect12: [{title: '二重号', data: []},{title: '单号', data: []}],
      groupSelect6: [{title: '二重号', data: []}],
      groupSelect4: [{title: '三重号', data: []},{title: '单号', data: []}],
      
      topThreeStarCompound: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []}
      ],
      topThreeStarAnd: [{title: '万位', data: []}],
      dValue: [{title: '万位', data: []}],
      topThreeStarGroup: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []}
      ],
      group3: [{title: '组三', data: []}],
      group6: [{title: '组三', data: []}],
      packBets: [{title: '包胆', data: []}],
      moweishu: [{title: '包胆', data: []}],
      specialNum: [{title: '包胆', data: []}],
    }
  },
  methods: {
    handleChangebetsMode(data, index1, index2){
      data.filter(function(v1){
        v1.data.filter(function(v2){
          v2.checked = false;
        })
      })
      data[index1].data[index2].checked = true;
      this.fiveStarCompound.filter(v => {v.data=[]});
      this.fiveStarGroup.filter(v => {v.data=[]});
      this.groupSelect120.filter(v => {v.data=[]});
      this.groupSelect60.filter(v => {v.data=[]});
      this.groupSelect30.filter(v => {v.data=[]});
      this.groupSelect20.filter(v => {v.data=[]});
      this.groupSelect10.filter(v => {v.data=[]});
      this.groupSelect5.filter(v => {v.data=[]});
      this.fourStarCompound.filter(v => {v.data=[]});
      this.fourStarGroup.filter(v => {v.data=[]});
      this.groupSelect24.filter(v => {v.data=[]});
      this.groupSelect12.filter(v => {v.data=[]});
      this.groupSelect6.filter(v => {v.data=[]});
      this.groupSelect4.filter(v => {v.data=[]});
      this.topThreeStarCompound.filter(v => {v.data=[]});
      this.topThreeStarAnd.filter(v => {v.data=[]});
      this.dValue.filter(v => {v.data=[]});
      this.topThreeStarGroup.filter(v => {v.data=[]});
      // console.log(data, index1, index2);
    }
  }
}
</script>
<style scoped>
.bets{
  width:100%;
  height:auto;
  margin:10px 0;
  display:-webkit-box;
  color:#555;
}
.bets-mode-wrap{
  height:auto;
  display:-webkit-box;
}
.bets-title, .bets-mode{
  padding:5px 20px;
}
.bets-mode{
  border:1px solid #cdcdcd;
  background:#fff;
  margin-right: 10px;
  cursor: pointer;
}
.bets-mode:hover{
  background: #f0ede6;
  border-color: #b3a391;
}
.bets-mode-wrap .bets-active{
  color: #FFF;
  background: #f17e2e;
  border: 1px solid #ef6c25;
}
</style>


