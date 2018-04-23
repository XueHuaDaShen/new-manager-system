<template>
  <div style="width:100%;">
    <table id="ziliao-table">
      <tbody>
        <tr>
          <td colspan="4" class="table-text-center">
            <label class="table-text-primary table-text-lg">{{username}}</label>
            <el-button class="table-float" type="success" size="small" round>刷新缓存</el-button>
            <el-switch
              style="float:right;margin-top:7px;margin-right:1.3rem;"
              v-model="isCeshi"
              active-text="测试账户">
            </el-switch>
          </td>
        </tr>
        <tr>
          <td style="width:42%;">
            <label>用户ID：</label>{{userID}}
          </td>
          <td>
            <label>提款账户：</label><tableInput :inputModel="drawingUser"></tableInput>
          </td>
        </tr>
        <tr>
          <td>
            <label>会员类型：</label>{{userType}}
          </td>
          <td>
            <label>返点：</label><tableInput :inputModel="returnNum"></tableInput>
          </td>
        </tr>
        <tr>
          <td>
            <label>手机号码：</label><tableInput :inputModel="phone"></tableInput>
          </td>
          <td>
            <label>电子邮件：</label>{{email}}<tableBtn :text="'重置'" :func="handleReset"></tableBtn>
          </td>
        </tr>
        <tr>
          <td>
            <label>昵称：</label>{{nickname}}
          </td>
          <td>
            <label>QQ：</label>{{QQ}}<tableBtn :text="'重置'" :func="handleReset"></tableBtn>
          </td>
        </tr>
        <tr>
          <td colspan="2">所属分组：
            <tableInput :inputModel="rent"></tableInput>
            <tableBtn :text="'更改'" :func="handleReset"></tableBtn>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <switchbar :data="lockStatus" @switchCheck="handleSwitchCheck"></switchbar>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <switchbar :data="abilityOpen" @switchCheck="handleSwitchCheck"></switchbar>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <label>层级关系：</label><span style="color:#F56C6C">{{nexus}}</span>
            <el-button class="table-float" type="primary" size="small" round @click="handleEditUp">修改上级</el-button>
          </td>
        </tr>
        <tr>
          <td>
            <label>注册时间：</label>{{createAt}}
          </td>
          <td>
            <label>注册IP：</label>{{createIp}}
          </td>
        </tr>
        <tr>
          <td>
            <label>登陆时间：</label>{{loginAt}}
          </td>
          <td>
            <label>登录IP：</label>{{loginIp}}
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table-text-center">
            <label>账号安全</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>登录密码：</label>{{isSet(loginPwdStatus)}}<tableBtn :text="'重置'" :func="handleReset"></tableBtn>
          </td>
          <td>
            <label>支付密码：</label>{{isSet(payPwdStatus)}}<tableBtn :text="'重置'" :func="handleReset"></tableBtn>
          </td>
        </tr>
        <tr>
          <td>
            <label>登录密码：</label>{{isSet(bankCard)}}
          </td>
          <td>
            <label>支付密码：</label>{{isSet(chromeCode)}}<tableBtn :text="'重置'" :func="handleReset"></tableBtn>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table-text-center">
            <label>账户余额信息</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>总资产：</label><strong>{{totalAssets}}</strong>
          </td>
          <td>
            <label>锁定金额：</label><strong>{{lockMoney}}</strong>
          </td>
        </tr>
        <tr>
          <td>
            <label>可用余额：</label><strong>{{balance}}</strong>
          </td>
          <td>
            <label>可提现金：</label><tableInput :inputModel="cash"></tableInput>
          </td>
        </tr>
        <tr>
          <td>
            <label>第三方钱包：</label><strong>{{wallet}}</strong>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <dialogEditUp v-if="dialogEditUpModel" @closeDialog="handleCloseDialog"></dialogEditUp>
  </div>
</template>
<script>
import tableInput from '../littleStyle/tableInput.vue';
import tableBtn from '../littleStyle/tableBtn.vue';
import switchbar from '../littleStyle/switchbar.vue';
import dialogEditUp from './dialogEditUp.vue';
export default {
  name: 'ziliao',
  props: {
    ziliao: {
      type: Object,
      required: true
    },
    inputModel: {
      default: '',
    }
  },
  components: {
    tableInput,
    tableBtn,
    switchbar,
    dialogEditUp,
  },
  data() {
    return {
      data: this.ziliao,
      dialogEditUpModel: false,
      isCeshi: false,
      lockStatus: {
        title: '锁定状态(正常)：',
        data: [
          {text: '登录', val: false},
          {text: '充值', val: false},
          {text: '投注', val: false},
          {text: '提现', val: false},
          {text: '转账', val: false},
          {text: '契约', val: false}
        ],
        text: '选中即为锁定该操作类型'
      },
      abilityOpen: {
        title: '功能开放：',
        data: [
          {text: '上级转账', val: false},
          {text: '下级转账', val: false},
          {text: '总代分红', val: false}
        ],
        text: '选中即为开放该功能'
      },
      username: 'hang5324',
      userID: '35464',
      drawingUser: '',
      userType: '代理',
      returnNum: '1960',
      phone: '18518460112',
      email: '839033104@qq.com',
      nickname: '雪花',
      QQ: '839033104',
      rent: '测试分组',
      nexus: 'ceshi110',
      createAt: '2018/4/19 15:19:00',
      createIp: '113.109.233.211 (广东省广州市电信)',
      loginAt: '2018/4/19 15:19:00',
      loginIp: '113.109.233.211 (广东省广州市电信)',
      loginPwdStatus: 1,
      payPwdStatus: 0,
      bankCard: 0,
      chromeCode: 0,
      totalAssets: '￥0.00元',
      lockMoney: '￥0.00元',
      balance: '￥0.00元',
      cash: '0.000',
      wallet: '￥0.00元',
    }
  },
  methods: {
    handleReset() {
      this.$emit('dialogShow', true);
    },
    isSet(val) {
      switch(val){
        case 0: return '未设置';
        case 1: return '已设置';
      }
    },
    handleEditUp() {
      this.dialogEditUpModel = true;
    },
    handleCloseDialog() {
      this.dialogEditUpModel = false;
    },
    handleSwitchCheck(data) {
      // console.log(data)
    }
  }
}
</script>
<style>
#ziliao-table{
  width: 100%;
  border: 1px solid #ddd;
  border-left: none;
  margin-bottom: 1.6rem;
  border-spacing: 0;
  border-collapse: separate;
  max-width: 100%;
  background-color: transparent;
  empty-cells: show;
}
#ziliao-table>tbody>tr:nth-child(odd)>td{
  background:#f5f7fa;
}
#ziliao-table tr>td{
  padding: .5rem;
  line-height: 1.4;
  vertical-align: top;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  text-align:left;
}
#ziliao-table tr:first-child{
  border-top:none;
}
#ziliao-table tr>td.table-text-center{
  text-align:center;
}
.table-text-primary{
  color:#409EFF;
}
.table-text-lg{
  font-size:1.5rem;
}
.table-float{
  float:right;
}
#ziliao-table label{
  display: inline-block;
  font-weight: 600;
  margin-bottom:5px;
}
#ziliao-table strong{
  display: inline-block;
  font-weight: 600;
  color:#F56C6C;
}

</style>


