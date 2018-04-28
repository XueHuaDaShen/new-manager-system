<template>
  <div class="hello">
    <myHeader></myHeader>
    <div class="content-wrap">
      <div class="content">
        <lottery></lottery>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import lottery from './lottery';
import myHeader from './header';
import myFooter from './footer';
export default {
  name: 'HelloWorld',
  components: {
    lottery,
    myHeader,
    myFooter
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-wrap{
  width:100%;
  color:#fff;
}
.content{
  width:1024px;
  margin:0 auto;
}
.hello{
  width:100%;
  height:100%;
}
</style>
