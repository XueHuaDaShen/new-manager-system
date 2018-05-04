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
      type: Object,
      required: true
    },
    len: {
      default: 10,
      type: Number
    },
    ballsArr: {
      type: Array,
      required: false
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
    }
  },
  methods: {
    handleClickOprate(type, i) {
      var len = this.len;
      var o = new Object();
      var arr = [];
      for(var i=0; i<len; i++){
        if(type === 'all'){
          if(this.ballsArr){
            arr.push(this.ballsArr[i])
          }else{
            arr.push(i)
          }
        }else if(type === 'large'){
          if(this.ballsArr){
            if(this.ballsArr[i] > Math.floor(this.ballsArr[len-1]/2) ){
              arr.push(this.ballsArr[i])
            }
          }else{
            if(i > (Math.ceil(len/2) -1 )){
              arr.push(i)
            }
          }
        }else if(type === 'small'){
          if(this.ballsArr){
            if(this.ballsArr[i] <= Math.floor(this.ballsArr[len-1]/2) ){
              arr.push(this.ballsArr[i])
            }
          }else{
            if(i < (Math.ceil(len/2) )){
              arr.push(i)
            }
          }
        }else if(type === 'odd'){
          if(this.ballsArr){
            if(this.ballsArr[i] % 2 !== 0){
              arr.push(this.ballsArr[i])
            }
          }else{
            if(i % 2 !== 0){
              arr.push(i)
            }
          }
        }else if(type === 'even'){
          if(this.ballsArr){
            if(this.ballsArr[i] % 2 === 0){
              arr.push(this.ballsArr[i])
            }
          }else{
            if(i % 2 === 0){
              arr.push(i)
            }
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
      const data = this.betsArr.data;
      const vm = this;
      const str1 = '', str2 = '';
      this.$emit("sendBallsArr", o);
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

