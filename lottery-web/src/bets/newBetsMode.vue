<template>
  <div>
    <div class="bets-mode-components">
      <div class="bets-mode-wrap" v-for="(item, index) in betsMode" :key="index">
        <span class="title">{{item.title}}</span>
        <span class="bets-mode" @click="handleChangeBetsMode(k)" :class="k.checked?'currentMode':''" v-for="(k, i) in item.data" :key="i">{{k.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newBetsMode',
  props: {
    betsMode: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: [
        {title: '万位', data: []},
        {title: '千位', data: []},
        {title: '百位', data: []},
        {title: '十位', data: []},
        {title: '个位', data: []}
      ]
    }
  },
  methods: {
    handleChangeBetsMode(k) {
      var betsArr = [];
      this.data.filter(v => {
        v.data = [];
      })
      this.betsMode.filter(function(v1){
        v1.data.filter(function(v2){
          v2.checked = false;
        })
      })
      k.checked = true;
      if(k.betsTitle === undefined){
        betsArr = this.data;
      }else if(k.betsTitle === ''){
        let o = new Object();
        o.title = '';
        o.data = [];
        betsArr.push(o);
      }else{
        for(let i in k.betsTitle){
          let o = new Object();
          o.title = k.betsTitle[i];
          o.data = [];
          betsArr.push(o);
        }
      }
      this.$store.dispatch('setBets', 0);
      this.$emit('sendBetsArr', [betsArr, k]);
    }
  },
  mounted() {
    this.handleChangeBetsMode(this.betsMode[0].data[0])
  }
}
</script>

<style scoped>
.bets-mode-components{
  width:100%;
  height:auto;
  border-bottom:1px dotted #BABABA;
}
.bets-mode-wrap{
  width:100%;
  height:28px;
  display:-webkit-box;
  -webkit-box-align:center;
  margin-bottom:7px;
}
.bets-mode-wrap span{
  font-size:12px;
  cursor: pointer;
}
.bets-mode-wrap .title{
  color:#666;
  margin-right:13px;
}
.bets-mode-wrap .bets-mode{
  color:#BF9270;
  padding:7px 5px;
  margin-right:22px;
}
.bets-mode-wrap span.currentMode{
  color:#fff;
  background:#D4914D;
}
</style>

