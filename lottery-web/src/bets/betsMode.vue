<template>
  <div>
    <div class="bets-mode-components">
      <div class="bets-mode-wrap" v-for="(item, index) in betsMode" :key="index">
        <span class="title">{{item.title}}</span>
        <div>
          <span class="bets-mode" @click="handleChangeBetsMode(k, item.title)" :class="k.checked?'currentMode':''" v-for="(k, i) in item.data" :key="i">{{k.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'betsMode',
  props: {
    betsMode: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: [
        {title: '万', data: []},
        {title: '千', data: []},
        {title: '百', data: []},
        {title: '十', data: []},
        {title: '个', data: []}
      ]
    }
  },
  methods: {
    handleChangeBetsMode(k, title) {
      var newData = [];
      for(var i in this.data){
        newData.push(this.data[i])
      }
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
      for(let i in k.betsTitle){
        let o = new Object();
        o.title = k.betsTitle[i];
        o.data = [];
        betsArr.push(o);
      }
      this.$store.dispatch('setBets', 0);
      this.$emit('sendBetsArr', {data: betsArr, item: k, title: title, type: k.type});
    }
  },
  mounted() {
    this.handleChangeBetsMode(this.betsMode[0].data[0], this.betsMode[0].title)
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
  /* height:28px; */
  display:-webkit-box;
  margin-bottom:7px;
}
.bets-mode-wrap span{
  font-size:12px;
  cursor: pointer;
}
.bets-mode-wrap>div{
  -webkit-box-flex:1;
  display:flex;
  align-items:center;
  flex-wrap:wrap;
}
.bets-mode-wrap .title{
  display: block;
  color:#666;
  margin-right:13px;
  padding-top:7px;
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

