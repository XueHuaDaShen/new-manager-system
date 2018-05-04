<template>
  <div class="lottery-wrap">
    <nav class="lottery-nav">
      <span :class="item.checked?'currentTabs':''" @click="handleChangeNav(item)" v-for="(item, index) in navData" :key="index">{{item.title}}</span>
    </nav>
    <div class="lottery-content">
      <div class="lottery-num"></div>
      <div class="bets-wrap-parent">
        <div class="bets-wrap">
          <betsMode v-if="randernewBetsMode" :betsMode="betsMode" @sendBetsArr="handlesendBetsArr"></betsMode>
          <betsAreaTen v-if="randerbetsAreaTen" :betsArr="betsArr"></betsAreaTen>
        </div>
      </div>
      <div class="bets-result-wrap">
        <div class="bets-detail-wrap">
          <div class="bets-detail">已选注数 <span class="bets-style">{{setBetsFn()}}</span> 注 / 共金额数 <span class="bets-money">￥{{setMoneyFn()}}</span> 元</div>
          <div class="bets-number">{{betsNumber}}</div>
        </div>
        <div class="join-shopping-wrap">
          <el-button @click="handleJoin" :disabled="setJoinBtnDis()">加入购彩篮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import betsMode from '../bets/betsMode';
import betsAreaTen from '../bets/betsAreaTen';
const bit = ['万位', '千位', '百位', '十位', '个位'];
export default {
  name: 'lottery',
  components: {
    betsMode,
    betsAreaTen
  },
  created() {
    this.betsMode = this.fiveStar;
  },
  data() {
    return {
      bets: this.$store.state.bets,
      money: this.$store.state.bets * this.$store.state.price,
      betsNumber: '',
      randernewBetsMode: true,
      randerbetsAreaTen: true,
      groupName: '',
      betsType: '',
      betsModeName: '',
      navData: [
        {title: '五星', checked: false},
        {title: '四星', checked: false},
        {title: '前三', checked: false},
        {title: '中三', checked: false},
        {title: '后三', checked: false},
        {title: '二星', checked: false},
        {title: '一星', checked: false},
        {title: '不定位', checked: false},
        {title: '大小单双', checked: false},
        {title: '趣味', checked: false},
        {title: '任选', checked: false},
        {title: '龙虎', checked: false},
        {title: '和值', checked: false}
      ],
      betsArr: {},
      betsMode: [],
      fiveStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: bit, betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '直选单式', type: 'single', showOprateBtn: true, checked: false, checkBit: false},
            {title: '直选组合', type: 'compound', showOprateBtn: true, checked: false, unit: 5, betsTitle: bit, betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组选120', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 5, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选60', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号', '单号'], doubleArr: [1, 3], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选30', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号', '单号'], doubleArr: [2, 1], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选20', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['三重号', '单号'], doubleArr: [1, 2], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选10', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['三重号', '二重号'], doubleArr: [1, 1], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选5', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['四重号', '单号'], doubleArr: [1, 1], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
          ]
        }
      ],
      fourStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['千位', '百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '直选单式', type: 'single', showOprateBtn: true, checked: false, checkBit: false},
            {title: '直选组合', type: 'compound', showOprateBtn: true, checked: false, unit: 4, betsTitle: ['千位', '百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组选24', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 4, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选12', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号', '单号'], doubleArr: [1, 2], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选6', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组选4', type: 'double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['三重号', '单号'], doubleArr: [1, 1], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
          ]
        }
      ],
      topThreeStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['万位', '千位', '百位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '直选单式', type: 'single', showOprateBtn: true, checked: false, checkBit: false},
            {title: '直选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选跨度', type: 'diff', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选组合', type: 'compound', showOprateBtn: true, checked: false, unit: 3, betsTitle: ['万位', '千位', '百位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组三', type: 'single', showOprateBtn: true, checked: false, unit: 2, betsTitle: ['组三'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组六', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组六'], betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组三单式', type: 'single', showOprateBtn: false, checked: false, betsTitle: ['组三']},
            {title: '组六单式', type: 'single', showOprateBtn: false, checked: false, betsTitle: ['组三']},
            {title: '混合组选', type: 'single', showOprateBtn: false, checked: false, betsTitle: ['组三']},
            {title: '组选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '包胆', type: 'guts', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3}
          ]
        },
        {
          title: '其他',
          data: [
            {title: '和值尾数', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '特殊号码', type: 'special', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        }
      ],
      cenThreeStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['千位', '百位', '十位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '直选单式', type: 'single', showOprateBtn: true, checked: false, checkBit: false},
            {title: '直选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选跨度', type: 'diff', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选组合', type: 'compound', showOprateBtn: true, checked: false, unit: 3, betsTitle: ['千位', '百位', '十位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组三', type: 'single', showOprateBtn: true, checked: false, unit: 2, betsTitle: ['组三'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组六', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组六'], betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组三单式', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '组六单式', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '混合组选', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '组选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '包胆', type: 'guts', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3}
          ]
        },
        {
          title: '其他',
          data: [
            {title: '和值尾数', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '特殊号码', type: 'special', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        }
      ],
      botThreeStar: [
        {
          title: '直选',
          data: [
            {title: '直选复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '直选单式', type: 'single', showOprateBtn: true, checked: false, checkBit: false},
            {title: '直选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选跨度', type: 'diff', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选组合', type: 'compound', showOprateBtn: true, checked: false, unit: 3, betsTitle: ['百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '组选',
          data: [
            {title: '组三', type: 'single', showOprateBtn: true, checked: false, unit: 2, betsTitle: ['组三'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组六', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组六'], betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '组三单式', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '组六单式', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '混合组选', type: 'single', showOprateBtn: true, checked: false, betsTitle: '组三'},
            {title: '组选和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '包胆', type: 'guts', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3}
          ]
        },
        {
          title: '其他',
          data: [
            {title: '和值尾数', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '特殊号码', type: 'special', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        }
      ],
      twoStar: [
        {
          title: '直选',
          data: [
            {title: '后二复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '后二单式', type: 'single', checked: false},
            {title: '后二和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '后二跨度', type: 'diff', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '前二复式', type: 'compound', showOprateBtn: true, checked: true, unit: 1, betsTitle: ['万位', '千位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前二单式', type: 'single', checked: false},
            {title: '前二和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '前二跨度', type: 'diff', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 2},
          ]
        },
        {
          title: '组选',
          data: [
            {title: '后二复式', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '后二单式', type: 'single', checked: false},
            {title: '后二和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '后二包胆', type: 'guts', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '前二复式', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前二单式', type: 'single', checked: false},
            {title: '前二和值', type: 'and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '前二包胆', type: 'guts', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 2},
          ]
        }
      ],
      oneStar: [
        {
          title: '定位胆',
          data: [
            {title: '定位胆', type: 'position', showOprateBtn: true, checked: true, unit: 1, betsTitle: bit, betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: true, checkBit: false}
          ]
        }
      ],
      nonPos: [
        {
          title: '三星不定位',
          data: [
            {title: '后三一码不定位', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '后三二码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前三一码不定位', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前三二码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '中三一码不定位', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '中三二码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '四星不定位',
          data: [
            {title: '四星一码不定位', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '四星二码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        },
        {
          title: '五星不定位',
          data: [
            {title: '五星二码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '五星三码不定位', type: 'single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['不定位'], betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
          ]
        }
      ],
      sizeDouble: [
        {
          title: '大小单双',
          data: [
            {title: '后二大小单双', type: 'sizeDouble', showOprateBtn: false, checked: true, unit: 1, betsTitle: ['十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '后三大小单双', type: 'sizeDouble', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前二大小单双', type: 'sizeDouble', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['万位', '千位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '前三大小单双', type: 'sizeDouble', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['万位', '千位', '百位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '中三大小单双', type: 'sizeDouble', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['千位', '百位', '十位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
          ]
        }
      ],
      interest: [
        {
          title: '趣味',
          data: [
            {title: '五码趣味三星', type: 'interest', showOprateBtn: true, checked: true, unit: 1, betsTitle: bit, betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interest'},
            {title: '四码趣味三星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['千位', '百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interest'},
            {title: '后三趣味二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interest'},
            {title: '前三趣味二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['万位', '千位', '百位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interest'},
            {title: '中三趣味二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['千位', '百位', '十位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interest'},
          ]
        },
        {
          title: '区间',
          data: [
            {title: '五码区间三星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: bit, betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interestArea'},
            {title: '四码区间三星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['千位', '百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interestArea'},
            {title: '后三区间二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['百位', '十位', '个位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interestArea'},
            {title: '前三区间二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['万位', '千位', '百位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interestArea'},
            {title: '中三区间二星', type: 'interest', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['千位', '百位', '十位'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, area: 'interestArea'}
          ]
        },
        {
          title: '特殊',
          data: [
            {title: '一帆风顺', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '好事成双', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '三星报喜', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '四季发财', type: 'end', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
          ]
        }
      ],
      optional: [
        {
          title: '任选二',
          data: [
            {title: '直选复式', type: 'optional', showOprateBtn: true, checked: true, unit: 1, betsTitle: bit, betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 2},
            {title: '直选单式', type: 'optional', checked: false, loop: 5, num: 2, unit: 1},
            {title: '直选和值', type: 'optional-and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 2, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: true, valueLen: 2},
            {title: '组选复式', type: 'optional-single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 2},
            {title: '组选单式', type: 'optional', checked: false, loop: 5, num: 2, unit: 1},
            {title: '组选和值', type: 'optional-and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 2, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: true, valueLen: 2},
          ]
        },
        {
          title: '任选三',
          data: [
            {title: '直选复式', type: 'optional', showOprateBtn: true, checked: false, unit: 1, betsTitle: bit, betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 3},
            {title: '直选单式', type: 'optional', checked: false, loop: 5, num: 3, unit: 1, count: 3},
            {title: '直选和值', type: 'optional-and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 3, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: true, valueLen: 3},
            {title: '组三复式', type: 'optional-single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 3},
            {title: '组三单式', type: 'optional', checked: false, loop: 5, num: 3, unit: 1, count: 3},
            {title: '组六复式', type: 'optional-single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 3, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 3},
            {title: '组六单式', type: 'optional', checked: false, loop: 5, num: 3, unit: 1, count: 3},
            {title: '混合组选', type: 'optional', checked: false, loop: 5, num: 3, unit: 1, count: 3},
            {title: '组选和值', type: 'optional-and', showOprateBtn: true, checked: false, unit: 1, betsTitle: [''], betsMode: 3, isDouble: false, oprateBtn: 'bottom', vertOprate: false, checkBit: true, valueLen: 3},
          ]
        },
        {
          title: '任选四',
          data: [
            {title: '直选复式', type: 'optional', showOprateBtn: true, checked: false, unit: 1, betsTitle: bit, betsMode: 4, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false, valueLen: 4},
            {title: '直选单式', type: 'optional', checked: false, loop: 5, num: 3, unit: 1, count: 4},
            {title: '组选24', type: 'optional-single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['组选'], betsMode: 4, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 4},
            {title: '组选12', type: 'optional-double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号', '单号'], doubleArr: [1, 2], betsMode: 4, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 4},
            {title: '组选6', type: 'optional-single', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号'], betsMode: 2, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 4},
            {title: '组选4', type: 'optional-double', showOprateBtn: true, checked: false, unit: 1, betsTitle: ['二重号', '单号'], doubleArr: [1, 1], betsMode: 4, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: true, valueLen: 4},
          ]
        }
      ],
      tiger: [
        {
          title: '龙虎和',
          data: [
            {title: '万千', type: 'tiger-end', showOprateBtn: false, checked: true, unit: 1, betsTitle: ['万千'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '万百', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['万百'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '万十', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['万十'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '万个', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['万个'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '千百', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['千百'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '千十', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['千十'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '千个', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['千个'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '百十', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['百十'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '百个', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['百个'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false},
            {title: '十个', type: 'tiger-end', showOprateBtn: false, checked: false, unit: 1, betsTitle: ['十个'], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        }
      ],
      andValue: [
        {
          title: '五星玩法',
          data: [
            {title: '五星和值', type: 'and-value', showOprateBtn: true, checked: true, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'bottom', vertOprate: false, checkBit: false, valueLen: 5},
            {title: '大小单双', type: 'sizeDouble', showOprateBtn: false, checked: false, unit: 1, betsTitle: [''], betsMode: 1, isDouble: true, oprateBtn: 'right', vertOprate: false, checkBit: false}
          ]
        }
      ],
    }
  },
  methods: {
    toThousands(num) {
      var re=/\d{1,3}(?=(\d{3})+$)/g;
      var n1=(num || 0).toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
      return n1+'.00';
    },
    initData(data) {
      data.filter(function(v1){
        v1.data.filter(function(v2){
          v2.checked = false;
        })
      })
      data[0].data[0].checked = true;
      this.betsMode = data;
    },
    handleChangeNav(item) {
      const vm = this;
      this.betsNumber = '';
      this.groupName = item.title;
      this.randernewBetsMode = false;
      setTimeout(function(){
        vm.randernewBetsMode = true;
      },10)
      this.navData.filter(v => {
        v.checked = false;
      })
      item.checked = true;
      if( item.title === '五星' ){
        this.initData(this.fiveStar);
      }else if( item.title === '四星' ){
        this.initData(this.fourStar);
      }else if( item.title === '前三' ){
        this.initData(this.topThreeStar);
      }else if( item.title === '中三' ){
        this.initData(this.cenThreeStar);
      }else if( item.title === '后三' ){
        this.initData(this.botThreeStar);
      }else if( item.title === '二星' ){
        this.initData(this.twoStar)
      }else if( item.title === '一星' ){
        this.initData(this.oneStar)
      }else if( item.title === '不定位' ){
        this.initData(this.nonPos)
      }else if( item.title === '大小单双' ){
        this.initData(this.sizeDouble)
      }else if( item.title === '趣味' ){
        this.initData(this.interest)
      }else if( item.title === '任选' ){
        this.initData(this.optional)
      }else if( item.title === '龙虎' ){
        this.initData(this.tiger)
      }else if( item.title === '和值' ){
        this.initData(this.andValue)
      }
    },
    handlesendBetsArr(data) {
      const vm = this;
      this.betsNumber = '';
      this.randerbetsAreaTen = false;
      setTimeout(function(){
        vm.randerbetsAreaTen = true;
      },10)
      this.betsArr = data;
      this.betsType = data.title;
    },
    handleJoin() {
      var data = this.betsArr.data;
      var arr = [];
      for(let i in data){
        arr.push(data[i].data)
      }
      this.betsModeName = this.betsArr.item.title;
      var str1 = '', str2 = '';
      var arr1 = [];
      arr.filter(v => {
        arr1.push(v.join("-"))
      })
      this.betsNumber = arr1.join("|")
    },
    setJoinBtnDis() {
      return ! this.$store.state.bets > 0
    },
    setBetsFn() {
      return this.$store.state.bets
    },
    setMoneyFn() {
      return this.toThousands(this.$store.state.bets * this.$store.state.price)
    }
  },
  mounted() {
    // console.log(this.$store.state.bets)
    this.handleChangeNav(this.navData[0])
  }
}
</script>
<style scoped>
.lottery-wrap{
  width:100%;
  height:auto;
  background:#fff;
}
.lottery-nav{
  width:100%;
  height:43px;
  display:-webkit-box;
  color:#333;
  font-size:14px;
}
.lottery-nav span{
  display:block;
  -webkit-box-flex:1;
  line-height: 43px;
  text-align:center;
  cursor: pointer;
}
.lottery-nav .currentTabs{
  background:#D4914D;
  color:#fff;
}
.lottery-content{
  width:934px;
  margin:0 auto;
  padding-bottom:84px;
  position: relative;
}
.bets-wrap-parent{
  display: table;
}
.bets-wrap{
  width:673px;
  float:left;
  padding-top:15px;
}
.lottery-num{
  position: absolute;
  right:0;
  top:20px;
  width:262px;
}
.bets-result-wrap{
  width:100%;
  height:90px;
  border:1px solid #ACACAC;
  margin-top:21px;
  display:-webkit-box;
  color:#333;
  font-size:12px;
}
.bets-result-wrap>div{
  -webkit-box-flex:1;
  display: -webkit-box;
  -webkit-box-orient:vertical;
  -webkit-box-pack:center;
}
.bets-result-wrap>div>div{
  padding:5px 0;
  font-size:14px;
}
.bets-style, .bets-money{
  color:#E10C0C;
}
</style>


