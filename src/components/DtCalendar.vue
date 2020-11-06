<template>
  <div class="calendar_panel" @click="closeMsg($event)">
    <div class="calendar_pbox" ref="calendardom">
      <div class="title">
        <span class="prev" @click="calendarPrev"></span>
        {{dateYearMonth}}
        <span class="next" @click="calendarNext" v-show="hasNext"></span>
      </div>
      <!-- 日历 -->
      <div class="calendar">
        <ul class='week'>
            <li>SUN</li>
            <li>MON</li>
            <li>TUE</li>
            <li>WED</li>
            <li>THU</li>
            <li>FRI</li>
            <li>SAT</li>
        </ul>
        <ul class="days">
          <li
          v-for="value in calendarData"
          :key="value.day"
          >
            <div
            :class="{ week_usable: value.nodeList, week_current:currentDay==value.day }"
            @click="initSwiperInfo(value.nodeList,value)"
            >
            {{value.day}}
            </div>
          </li>
        </ul>
      </div>
      <!-- 按钮 -->
      <div class="today_btn" @click="calendarNewest">TODAY</div>
      <!-- 收起按钮 -->
      <div class="pack_up_btn" @click="hideCalendar"></div>
    </div>
  </div>
</template>

<script>
import { calendarUrl } from '@/util/config'
export default {
  name: 'DtCalendar',
  props: {
    cdata: Object,
    current: Object
  },
  data () {
    return {
      dateInfo: {},
      calendar: {},
      minDateInfo: {},
      maxDateInfo: {},
      calendarData: {},
      currentDay: 0, // 当前的时间高亮
      nodeList: {}, // 传给父级组件的数据list
      hasNext: false
    }
  },
  watch: {
    dateInfo () {
      this.calendarData = this.getCalendarData()
    }
  },
  computed: {
    dateYearMonth () {
      let month = ''
      switch (this.dateInfo.month) {
        case "01":
          month = 'Jan'
          break;
        case "02":
          month = 'Feb'
          break;
        case "03":
          month = 'Mar'
          break;
        case "04":
          month = 'Apr'
          break;
        case "05":
          month = 'May'
          break;
        case "06":
          month = 'Jun'
          break;
        case "07":
          month = 'Jul'
          break;
        case "08":
          month = 'Aug'
          break;
        case "09":
          month = 'Sep'
          break;
        case "10":
          month = 'Oct'
          break;
        case "11":
          month = 'Nov'
          break;
        default:
          month = 'Dec'
      }
      return month + ' ' + this.dateInfo.year
    }
  },
  mounted () {
    this.getPageData()
  },
  methods: {
    getPageData () {
      let { month, year } = this.current
      if (this.cdata.resultMsg != 'success') {
        return
      }
      this.dateInfo = this.cdata.dateInfo // 当前日期
      this.minDateInfo = this.cdata.minDateInfo
      this.maxDateInfo = this.cdata.maxDateInfo
      this.calendar = this.cdata.calendar // 当前日历
      this.currentDay = parseInt(this.current.day) || 0
      if (getTime({ year, month }) < getTime(this.maxDateInfo)) {
        this.hasNext = true
      }
    },
    calendarPrev () {
      let { month, year } = this.dateInfo
      if (month == 1) {
        year--
        month = 12
      } else {
        month--
      }
      if (getTime({ year, month }) < getTime(this.minDateInfo)) {
        return
      }
      this.sendCalendar(month, year)
      this.hasNext = true
    },
    calendarNext () {
      let { month, year } = this.dateInfo
      if (month == 12) {
        year++
        month = 1
      } else {
        month++
      }
      if (getTime({ year, month }) >= getTime(this.maxDateInfo)) {
        this.hasNext = false
      }
      this.sendCalendar(month, year)
    },
    getCalendarData () {
      let result = []
      let extra = new Date(this.dateInfo.year, parseInt(this.dateInfo.month) - 1, '01').getDay() // 补充天数
      if (extra == 7) {
        extra = 0
      }
      let days = new Date(this.dateInfo.year, parseInt(this.dateInfo.month), 0).getDate() // 该月天数
      let dayIndex = '1'
      let maxDay = extra + days // 总共循环次数算上补充，比如1号是星期2，则需要补充星期7，星期1两个空对象
      for (let i = 0; i < maxDay; i++) {
        let temp = {}
        if (i >= extra) { // 补充空结束，放上实际数据
          for (let j = 0; j < this.calendar.length; j++) {
            if (this.calendar[j].day == dayIndex) {
              temp.nodeList = this.calendar[j].nodeList
              break
            }
          }
          temp.day = dayIndex
          dayIndex++
        }
        result.push(temp)
      }
      return result
    },
    initSwiperInfo (list, value) {
      if (!list) {
        return false
      }
      this.nodeList = list
      this.currentDay = value.day
      this.$emit('sendNewList', value)
    },
    calendarNewest () {
      let month = formitMonth(this.maxDateInfo.month)
      let url = calendarUrl + this.maxDateInfo.year + month
      this.axios.get(url).then(res => {
        this.dateInfo = res.data.dateInfo
        this.calendar = res.data.calendar
        this.currentDay = this.maxDateInfo.day // 最新需要默认选 天
        this.hasNext = false
      }).catch(() => {
        console.log('请稍后重试')
      })
    },
    sendCalendar (month, year) {
      month = formitMonth(month)
      console.log(month)
      let url = calendarUrl + year + month
      this.axios.get(url).then(res => {
        this.dateInfo = res.data.dateInfo
        this.calendar = res.data.calendar
        if (year + month == this.current.year + formitMonth(this.current.month)) { // 文章相同月保留文章选择信息
          this.currentDay = parseInt(this.current.day) || 0
        } else { // 其余月选择区域置空
          this.currentDay = 0
          this.nodeList = {}
        }
      }).catch(() => {
        console.log('请稍后重试')
      })
    },
    hideCalendar() {
      this.$emit('sendPackUpCalendarMsg')
    },
    closeMsg(ev) {
      if(!this.$refs.calendardom.contains(ev.target)){
        this.$emit('sendPackUpCalendarMsg')
      }
    }
  }
}
// 月份补充0
function formitMonth (month) {
  let result = parseInt(month)
  if (result < 10) {
    result = '0' + result
  } else {
    result = '' + result
  }
  return result
}
// 已知年月获取 距今秒值用于比较
function getTime (date) {
  let { year, month } = date
  return (new Date(year, month)).getTime()
}
</script>
<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
  }
ul,li,ol {
  list-style: none;
}
.calendar_panel {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  &::after {
    display: inline-block;
    content: '';
    clear: both;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .calendar_pbox {
    width: 100%;
    padding-top: 4rem;
    padding-bottom: 2.357rem;
    box-sizing: border-box;
    background: linear-gradient(137deg, #4A4A4A 0%, #191919 100%);
    position: relative;
    .title {
      font-size: 1.285rem;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 1.428rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 1.714rem;
      box-sizing: border-box;
      font-family: 'robotocondensed-regular-webfont';
      .prev {
        width: 0.857rem;
        height: 0.857rem;
        background: url(~@/assets/images/prve_icon.png) center no-repeat;
        background-size: 100% 100%;
        margin-right: 0.714rem;
      }
      .next {
        width: 0.857rem;
        height: 0.857rem;
        background: url(~@/assets/images/next_icon.png) center no-repeat;
        background-size: 100% 100%;
        margin-left: 0.714rem;
      }
    }
    .calendar {
      padding: 1rem 1.071rem 1.5rem;
      box-sizing: border-box;
      width: 100%;
      .week {
        li {
          font-size: 0.714rem;
        }
      }
    }
    .calendar ul{
      display:flex;
      flex-wrap: wrap;
    }
    .calendar li {
      width: 14%;
      height: 2.143rem;
      line-height: 2.143rem;
      text-align: center;
      font-size: 1.071rem;
      color: #FFFFFF;
      z-index: 2;
    }
    .calendar .days li div{
      opacity: 0.5;
    }
    .today_btn {
      width: 4rem;
      height: 1.643rem;
      background: linear-gradient(337deg, #B1B1B1 0%, #FFFFFF 100%);
      border-radius: 0.178rem;
      font-size: 0.964rem;
      color: #191919;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Helvetica;
    }
    .week_current{
      position: relative;
      color:#fff;
    }
    .calendar .days li .week_usable{
      opacity: 1;
    }
    .week_usable.week_current:after{
      content: " ";
      display: block;
      position: absolute;
      background: #FF5300;
      width: 1.928rem;
      height: 1.928rem;
      border-radius: 50%;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .pack_up_btn {
      width: 3.214rem;
      height: 0.214rem;
      background: #4D4D4D;
      border-radius: 0.143px;
      position: absolute;
      bottom: 0.714rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
