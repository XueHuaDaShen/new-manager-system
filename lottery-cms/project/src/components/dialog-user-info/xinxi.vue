<template>
  <div>
    <div class="xinxi-wrap">
      <el-table
        :data="tableData"
        v-loading="dataLoading"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="操作人"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="备注">
        </el-table-column>
      </el-table>
      <table class="xinxi-table" v-loading="subLoading">
        <tbody>
          <tr>
            <th>备注内容：</th>
            <td style="position:relative">
              <el-input
                ref="textArea"
                type="textarea"
                :rows="3"
                style="width:574px"
                placeholder="请输入内容"
                @change="handleTextChange"
                v-model="textarea">
              </el-input>
              <div class="xinxi-alert-tip" v-if="(textarea==''?isTextEmpty:textarea=='')">
                <span class="sanjiao"></span>
                <i class="el-icon-warning" style="color:#E6A23C"></i>
                请填写此字段。
              </div>
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <tableBtn :text="'提交'" :size="'medium'" :btnType="'success'" :plain="false" :func="handleReset"></tableBtn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import tableBtn from '../littleStyle/tableBtn.vue';
export default {
  name: 'xinxi',
  components: {
    tableBtn
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        content: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        content: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        content: '上海市普陀区金沙江路 1516 弄'
      }],
      textarea: '',
      isTextEmpty: false,
      setTime: null,
      subLoading: false,
      dataLoading: false,
    }
  },
  methods: {
    handleReset() {
      const vm = this;
      if( !vm.textarea ){
        vm.isTextEmpty = true;
        vm.$refs.textArea.focus();
        vm.setTime = setTimeout(function(){
          vm.isTextEmpty = false;
        },5000)
      }else{
        vm.subLoading = true;
        setTimeout(function(){
          vm.subLoading = false;
          vm.dataLoading = true;
          setTimeout(function(){
            vm.dataLoading = false;
          },1000)
        },1000)
      }
    },
    handleTextChange(val) {
      const vm = this;
      vm.isTextEmpty = false;
    }
  }
}
</script>
<style scoped>
  .xinxi-wrap{
    background-color: #fff;
    width: 96%;
    margin: 15px auto 42px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  .xinxi-table{
    width:100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-collapse: collapse;
    border-spacing: 0;
  }
  .xinxi-table th{
    font-weight: 500;
    border-bottom: 1px solid rgba(0,0,0,.12);
    width: 120px;
    max-width: 120px;
    text-align: right;
    font-size: 14px;
  }
  .xinxi-table td{
    padding: 16px 8px;
    border-bottom: 1px solid rgba(0,0,0,.12);
    text-align:left;
  }
  .edit-up-table .lable-danger{
    color:#F56C6C;
  }
  .edit-up-table .lable-success{
    color:#67C23A;
  }
  .edit-up-table .lable-desc{
    color: #aaa;
    font-size: 12px;
    margin-left: 12px;
  }
  .xinxi-alert-tip{
    position: absolute;
    padding-left:10px;
    margin-left:-50px;
    bottom:-36px;
    left:35%;
    width:140px;
    height:40px;
    border:1px solid #999;
    border-radius:5px;
    background:#fff;
    display:-webkit-box;
    /* -webkit-box-pack:center; */
    -webkit-box-align:center;
  }
  .xinxi-alert-tip>.sanjiao{
    position:absolute;
    width:13px;
    height:13px;
    left:20px;
    top:-8px;
    border-top: 1px solid  #999;
    border-left: 1px solid  #999;
    background:#fff;
    transform:rotate(45deg);
    -ms-transform:rotate(45deg); 	/* IE 9 */
    -moz-transform:rotate(45deg); 	/* Firefox */
    -webkit-transform:rotate(45deg); /* Safari 和 Chrome */
    -o-transform:rotate(45deg);
  }
</style>


