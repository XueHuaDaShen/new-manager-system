<template>
  <div>
    <div class="bets" v-for="(item,index1) in betsMode" :key="index1">
      <div class="bets-title">{{item.title}}</div>
      <div class="bets-mode-wrap">
        <div class="bets-mode" @click="handleChangebetsMode(betsMode, index1, index2)" :class="item.checked?'bets-active':''" v-for="(item, index2) in item.data" :key="index2">{{item.title}}</div>
      </div>
    </div>
    <div style="margin-top:20px">
      <compound :ballsNumber="fiveStar" v-if="betsMode[0].data[0].checked"></compound>
      <single v-if="betsMode[0].data[1].checked"></single>
    </div>
  </div>
</template>
<script>
import compound from './fiveStar/compound';
import single from './fiveStar/single';
export default {
  name: 'betsMode',
  props: {
    betsMode: {
      type: Array,
      required: true
    }
  },
  components: {
    compound,
    single
  },
  data() {
    return {
      fiveStar: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ]
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
}
.bets-mode-wrap{
  height:auto;
  display:-webkit-box;
}
.bets-title, .bets-mode{
  padding:5px 15px;
}
.bets-mode{
  border:1px solid #cdcdcd;
  background:#fff;
  margin:0 10px;
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


