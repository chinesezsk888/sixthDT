<template>
  <div id="dt__aggregate" class="dt__aggregate">
    <div class="rl_com" @click="showCalendar" :style="styleDate">
      <p class="months">{{dateInfo.month | initMonth }}</p>
      <p class="data">{{dateInfo.day}}</p>
      <p class="week">{{dateInfo.week}}</p>
    </div>
    <div class="calendar_box" v-if="calendarData.resultCode==1">
      <DtCalendar
      v-show="showCalendarStatus"
      :bgColor="gradationColor"
      :cdata="calendarData"
      :current='dateInfo'
      @sendNewList="getNewList"
      @sendPackUpCalendarMsg="packUpCalendar"
      />
    </div>
    <div class="modal_line"></div>
    <DtAggregate :list='homeList' />
  </div>
</template>

<script>
import DtCalendar from '@/components/DtCalendar'
import DtAggregate from './components/DtAggregate'
import { apiUrl, calendarUrl, getUrlKey } from '@/util/config'
export default {
  name: 'app',
  components: {
    DtAggregate,
    DtCalendar
  },
  //  type: 1, // 0 photo 1 video 2 # 3 DATA 4 QUOTE 5 BUZZWORD 6 EDITOR'S PICK↓
  data () {
    return {
      homeList: [],
      specialInfo: {}, // 分享字段
      dateInfo: {},
      gradationColor: {},
      calendarData: {},
      showCalendarStatus: false
    }
  },
  computed: {
    styleDate () {
      let startColor = this.gradationColor.startColor
      let endColor = this.gradationColor.endColor
      let fontColor = this.gradationColor.fontColor
      return {
        backgroundImage: 'linear-gradient(134deg, ' + startColor + ' 0%, ' + endColor + ' 100%)',
        color: fontColor
      }
    }
  },
  filters: {
    initMonth (monthNum) {
      let month = ''
      if (monthNum == '01') {
        month = 'Jan'
      } else if (monthNum == '02') {
        month = 'Feb'
      } else if (monthNum == '03') {
        month = 'Mar'
      } else if (monthNum == '04') {
        month = 'Apr'
      } else if (monthNum == '05') {
        month = 'May'
      } else if (monthNum == '06') {
        month = 'Jun'
      } else if (monthNum == '07') {
        month = 'Jul'
      } else if (monthNum == '08') {
        month = 'Aug'
      } else if (monthNum == '09') {
        month = 'Sep'
      } else if (monthNum == '10') {
        month = 'Oct'
      } else if (monthNum == '11') {
        month = 'Nov'
      } else {
        month = 'Dec'
      }
      return month
    }
  },
  methods: {
    showCalendar () {
      this.showCalendarStatus = true
    },
    getNewList (value) {
      this.showCalendarStatus = false
      location.href = '/dtAggregate.jsp?n=' + value.nodeList[0].nodeId
      // this.getPageData(apiUrl + '?n=' + value.nodeList[0].nodeId)
    },
    packUpCalendar () {
      this.showCalendarStatus = false
    },
    getPageData (src) {
      let url = ''
      let nodeId = getUrlKey('n')
      if (nodeId) {
        url = src + '?n=' + nodeId
      } else {
        url = src
      }
      this.axios.get(url)
        .then(res => {
          let resp = res.data.data
          this.homeList = resp.contList
          this.dateInfo = resp.dateInfo
          this.specialInfo = resp.specialInfo
          this.gradationColor = resp.gradationColor
          this.getCalendar(this.dateInfo.year + this.dateInfo.month)
        }).catch(() => {
          console.log('请稍后重试')
        })
    },
    getCalendar (yearMonth) {
      let url = calendarUrl + yearMonth
      this.axios.get(url).then(res => {
        this.calendarData = res.data
      }).catch(() => {
        console.log('请稍后重试')
      })
    }
  },
  created () {
    // this.getPageData(apiUrl + '?n=302862')
    this.getPageData(apiUrl)
  }
}
</script>
<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }
  // html {
  //   font-size: 14px;
  // }
  html,body {
    width: 100%;
    height: 100%;
  }
  ul,li,ol {
    list-style: none;
  }
  .dt__aggregate {
    width: 100%;
    position: relative;
    .rl_com {
      position: absolute;
      width: 4.643rem;
      height: 5.714rem;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0.571rem;
      box-sizing: border-box;
      z-index: 99;
      p {
        margin: 0;
      }
      .months {
        font-size: 1rem;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 1rem;
        font-family: 'robotocondensed-regular-webfont';
      }
      .data {
        font-size: 2.143rem;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 2.643rem;
        font-family: 'robotocondensed-regular-webfont';
      }
      .week {
        font-size: 1rem;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 1rem;
        font-family: 'robotocondensed-light-webfont';
      }
    }
    .modal_line {
      width: 100%;
      height: 6.428rem;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
      z-index: 9;
    }
  }
</style>
