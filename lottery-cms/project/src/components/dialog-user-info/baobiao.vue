<template>
  <div>
    <div style="padding: 12px 20px 0px;">
      <div class="baobiao-search-term">
        <div class="baobiao-search-time">
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
        <div class="baobiao-search-btn">
          <tableBtn :text="'搜索'" :size="'medium'" :btnType="'success'" :plain="false" :func="handleSearch"></tableBtn>
        </div>
        <div class="baobiao-search-btn">
          <tableBtn :text="'重置'" :size="'medium'" :btnType="'info'" :plain="false" :func="handleReset"></tableBtn>
        </div>
      </div>
      <div class="baobiao-content">
        <el-table
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
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
      </div>
    </div>
  </div>
</template>
<script>
import tableBtn from '../littleStyle/tableBtn.vue';
export default {
  name: 'baobiao',
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
    }
  },
  methods: {
    handleSearch() {},
    handleReset() {},
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '统计：';
          return;
        }
        if( index === 5 ){
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += ' 元';
            return ;
          }
        }
      });

      return sums;
    }
  }
}
</script>
<style scoped>
  *{
    box-sizing: border-box;
  }
  .baobiao-search-term{
    width:100%;
    display:-webkit-box;
    -webkit-box-pack:start;
    padding:20px;
    /* display:flex;
    flex-wrap:wrap; */
  }
  .baobiao-search-term>.baobiao-search-time{
    width:auto;
  }
  .baobiao-search-term>.baobiao-search-btn{
    width:auto;
  }
  .baobiao-content{
    background-color: #fff;
    width: 96%;
    margin: 15px auto 42px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
</style>