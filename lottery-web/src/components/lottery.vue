<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="五星" name="1">
        <betsMode :betsMode="fiveStar"></betsMode>
      </el-tab-pane>
      <el-tab-pane label="四星" name="2">四星</el-tab-pane>
      <el-tab-pane label="前三" name="3">前三</el-tab-pane>
      <el-tab-pane label="中三" name="4">中三</el-tab-pane>
      <el-tab-pane label="后三" name="5">后三</el-tab-pane>
      <el-tab-pane label="二星" name="6">二星</el-tab-pane>
      <el-tab-pane label="一星" name="7">一星</el-tab-pane>
      <el-tab-pane label="不定位" name="8">不定位</el-tab-pane>
      <el-tab-pane label="大小单双" name="9">大小单双</el-tab-pane>
      <el-tab-pane label="趣味" name="10">趣味</el-tab-pane>
      <el-tab-pane label="任选" name="11">任选</el-tab-pane>
      <el-tab-pane label="龙虎" name="12">龙虎</el-tab-pane>
      <el-tab-pane label="和值" name="13">和值</el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>
<script>
import betsMode from '../bets/betsMode';
export default {
  name: 'lottery',
  components: {
    betsMode
  },
  data() {
    return {
      activeName: '2',
      fiveStar: [
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
            {title: '组选120',type: 'compound', checked: false},
            {title: '组选60',type: 'single', checked: false},
            {title: '组选30',type: 'group', checked: false},
            {title: '组选20',type: 'single', checked: false},
            {title: '组选10',type: 'single', checked: false},
            {title: '组选5',type: 'group', checked: false}
          ]
        }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

