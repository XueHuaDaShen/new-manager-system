<template>
  <div class="oprate-wrap">
    <span class="oprate-btn" v-for="(item, index) in oprateArr" @click="handleClickOprate(item.type, index)" :key="index">{{item.title}}</span>
  </div>
</template>
<script>
export default {
  name: 'oprateBtn',
  props: {
    betsIndex: {
      type: Number,
      required: true
    },
    betsType: {
      type: Object,
      required: true
    },
    betsArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      oprateArr: [
        {title: '全', type: 'all'},
        {title: '大', type: 'large'},
        {title: '小', type: 'small'},
        {title: '奇', type: 'odd'},
        {title: '偶', type: 'even'},
        {title: '清', type: 'clean'}
      ],
      joinDisabled: false,
    }
  },
  methods: {
    handleClickOprate(type, i) {
      var len = 10;
      var o = new Object();
      var arr = [];
      for(var i=0; i<len; i++){
        if(type === 'all'){
          arr.push(i)
        }else if(type === 'large'){
          if(i > (len/2 -1) ){
            arr.push(i)
          }
        }else if(type === 'small'){
          if(i < len/2 ){
            arr.push(i)
          }
        }else if(type === 'odd'){
          if(i % 2 === 0){
            arr.push(i)
          }
        }else if(type === 'even'){
          if(i % 2 != 0){
            arr.push(i)
          }
        }else if(type === 'clean'){
          arr = [];
        }
      }
      o.data = arr;
      o.index = this.betsIndex;
      this.checkBetsArr(o);
    },
    checkBetsArr(o) {
      const data = this.betsArr[0];
      const cm = this;
      const str1 = '', str2 = '';
      console.log(data)
      this.joinDisabled = data.every(v => {
        return v.data.length > 0
      })
      this.$nextTick(function(){
        
      this.$emit("sendBallsArr", [o, this.joinDisabled]);
      console.log('操作后---',this.joinDisabled)
      })
    },
  }
}
</script>

<style scoped>
.oprate-wrap{
  display:-webkit-box;
}
.oprate-btn{
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
</style>

