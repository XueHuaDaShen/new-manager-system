<template>
  <div class="hello" style="height:100%;">
    <el-container style="height:100%;">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu
              router
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              :unique-opened="onlyOneMenuOpen"
              @select="handleSelect"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>首页首页首页</span>
                </template>
                <el-menu-item index="about">关于我们</el-menu-item>
                <el-menu-item index="address">联系方式</el-menu-item>
                <el-menu-item index="setAttr">设置属性</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>内容内容内容</span>
                </template>
                <el-menu-item index="lottery">中奖名单</el-menu-item>
                <el-menu-item index="productName">奖品名称</el-menu-item>
                <el-menu-item index="peopleNum">中奖人数</el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">详情详情详情</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">列表列表列表</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-header style="padding:0;">
          <el-tabs v-model="editableTabsValue" @tab-click="handleClick" type="card" closable @edit="handleTabsremove">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex: '/', //默认路由
      onlyOneMenuOpen: true, //保持一个子菜单展开
      routerArr: [],
      editableTabsValue: '0',
      editableTabs: [],
      tabIndex: 2
    }
  },
  created() {
    this.activeIndex = this.$route.name;
    this.pushRouter(this.$route.name);
  },
  methods:{
    pushRouter(index){
      this.editableTabs = [];
      if( this.routerArr.indexOf(index) < 0 ){
        this.routerArr.push(index);
      }
      for(var i in this.routerArr){
        let o = new Object();
        o.title = this.routerArr[i];
        o.name = ((i*1)+1).toString();
        this.editableTabs.push(o);
      }
      this.editableTabsValue = this.routerArr.length.toString();
    },
    handleSelect(index, indexPath){
      this.pushRouter(index);
      var selectName = '';
      for(var i in this.editableTabs){
        if( index == this.editableTabs[i].title ){
          selectName = this.editableTabs[i].name;
        }
      }
      this.editableTabsValue = selectName;
    },
    handleTabsremove(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({name: nextTab.title})
            }
          }
        });
      }
      
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    handleClick(index){
      this.$router.push({name: index.label})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    position: relative;
  }
  .el-aside .el-menu .el-submenu .el-submenu__title{
    display: -webkit-box !important;
  }
  .el-header, .el-footer {
    color: #333;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  .el-aside div{
    padding-left:0;
  }
  .el-main {
    background-color: #fff;
    color: #333;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
