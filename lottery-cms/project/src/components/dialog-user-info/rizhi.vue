<template>
  <div>
    <div style="padding: 12px 20px 0px;">
      <div class="rizhi-search-term">
        <div class="rizhi-search-time">
          <el-date-picker
            v-model="time1"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
        <div class="rizhi-search-keyWord">
          <el-input v-model="keyWord" placeholder="关键词"></el-input>
        </div>
        <div class="rizhi-search-btn">
          <tableBtn :text="'搜索'" :size="'medium'" :btnType="'success'" :plain="false" :func="handleSearch"></tableBtn>
        </div>
        <div class="rizhi-search-btn">
          <tableBtn :text="'重置'" :size="'medium'" :btnType="'info'" :plain="false" :func="handleReset"></tableBtn>
        </div>
      </div>
      <div class="rizhi-content">
        <el-table
          :data="tableData"
          v-loading="dataLoading"
          empty-text="没有符合当前条件的记录"
          style="width: 100%">
          <el-table-column
            prop="num"
            label="编号"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            align="center"
            label="金额">
          </el-table-column>
          <el-table-column
            prop="blance"
            align="center"
            label="余额">
          </el-table-column>
          <el-table-column
            prop="time"
            align="center"
            label="操作时间">
          </el-table-column>
          <el-table-column
            prop="beizhu"
            align="center"
            label="备注信息">
          </el-table-column>
        </el-table>
        <div class="rizhi-footer-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tableBtn from '../littleStyle/tableBtn.vue';
export default {
  name: 'rizhi',
  components: {
    tableBtn
  },
  props: {},
  data() {
    return {
      pickerOptions1: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      options3: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      tableData: [{
        num: '1',
        type: 'string',
        money: '200',
        blance: '120',
        time: '2018-2-13',
        beizhu: '2564'
      }, {
        num: '2',
        type: 'num',
        money: '300',
        blance: '120',
        time: '2018-2-13',
        beizhu: '2564'
      }, {
        num: '3',
        type: 'obj',
        money: '210',
        blance: '120',
        time: '2018-2-13',
        beizhu: '2564'
      }, {
        num: '4',
        type: 'arr',
        money: '123',
        blance: '120',
        time: '2018-2-13',
        beizhu: '2564'
      }],
      keyWord: '',
      time1: '',
      time2: '',
      type: '',
      dataLoading: false,
      currentPage: 2,
    }
  },
  methods: {
    handleSearch() {},
    handleReset() {},
     handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .rizhi-search-term{
    width:100%;
    display:-webkit-box;
    -webkit-box-pack:start;
    padding:20px;
    /* display:flex;
    flex-wrap:wrap; */
  }
  .rizhi-search-term>.rizhi-search-time{
    width:auto;
  }
  .rizhi-search-term>.rizhi-search-keyWord{
    width:auto;
    margin:0 10px;
  }
  .rizhi-search-term>.rizhi-search-btn{
    width:auto;
  }
  .rizhi-content{
    background-color: #fff;
    width: 96%;
    margin: 15px auto 42px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  .rizhi-footer-page{
    padding:20px 0;
  }
</style>
